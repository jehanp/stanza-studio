import { NextRequest, NextResponse } from "next/server";
import { getSongBySlug, getLyricVersions, getAISession, upsertAISession } from "@/db/queries";
import { chat, buildSystemPrompt } from "@/lib/ai";
import type { ChatCompletionMessageParam } from "openai/resources/chat/completions";

export const dynamic = "force-dynamic";

type Params = { params: Promise<{ slug: string }> };

export async function GET(_req: NextRequest, { params }: Params) {
  const { slug } = await params;
  const song = getSongBySlug(slug);
  if (!song) {
    return NextResponse.json({ error: "Song not found" }, { status: 404 });
  }
  const session = getAISession(song.id);
  const messages = session ? JSON.parse(session.messages) : [];
  return NextResponse.json({ messages, model: session?.model ?? "gpt-4o" });
}

export async function POST(req: NextRequest, { params }: Params) {
  const { slug } = await params;
  const song = getSongBySlug(slug);
  if (!song) {
    return NextResponse.json({ error: "Song not found" }, { status: 404 });
  }

  const body = await req.json();
  const userMessage: string = body.message;
  const model: string = body.model ?? process.env.GITHUB_MODELS_MODEL ?? "gpt-4o";

  if (!userMessage?.trim()) {
    return NextResponse.json({ error: "message is required" }, { status: 400 });
  }

  // Load current lyrics for context (use latest v1/en version)
  const versions = getLyricVersions(song.id);
  const latestEn =
    versions.find((v) => v.version_label === "v1" && v.language === "en") ??
    versions[0];
  const currentLyrics = latestEn?.content_txt ?? latestEn?.content_md ?? undefined;

  // Build / restore conversation history (excluding system prompt — we regenerate it)
  const session = getAISession(song.id);
  const history: ChatCompletionMessageParam[] = session
    ? (JSON.parse(session.messages) as ChatCompletionMessageParam[]).filter(
        (m) => m.role !== "system"
      )
    : [];

  const systemPrompt = buildSystemPrompt({
    title: song.title,
    scriptureRef: song.scripture_ref,
    scriptureBook: song.scripture_book,
    coreTheme: song.core_theme,
    genre: song.genre,
    currentLyrics,
  });

  const messages: ChatCompletionMessageParam[] = [
    { role: "system", content: systemPrompt },
    ...history,
    { role: "user", content: userMessage },
  ];

  let assistantContent: string;
  try {
    assistantContent = await chat(messages, model);
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 502 });
  }

  const newHistory: ChatCompletionMessageParam[] = [
    ...history,
    { role: "user", content: userMessage },
    { role: "assistant", content: assistantContent },
  ];

  // Cast to AIMessage[] since we only store user/assistant turns (no developer/tool roles)
  upsertAISession(song.id, newHistory as import("@/db/queries").AIMessage[], model);

  return NextResponse.json({ reply: assistantContent, messages: newHistory });
}

export async function DELETE(_req: NextRequest, { params }: Params) {
  const { slug } = await params;
  const song = getSongBySlug(slug);
  if (!song) {
    return NextResponse.json({ error: "Song not found" }, { status: 404 });
  }
  upsertAISession(song.id, [], process.env.GITHUB_MODELS_MODEL ?? "gpt-4o");
  return NextResponse.json({ ok: true });
}
