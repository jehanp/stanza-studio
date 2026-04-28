import { NextRequest, NextResponse } from "next/server";
import {
  getSongBySlug,
  getLyricVersion,
  createSunoGeneration,
  updateSunoGeneration,
} from "@/db/queries";
import { generate, getClipStatus, sunoStatusToDb } from "@/lib/suno";

export const dynamic = "force-dynamic";

type Params = { params: Promise<{ slug: string }> };

export async function POST(req: NextRequest, { params }: Params) {
  const { slug } = await params;
  const song = getSongBySlug(slug);
  if (!song) {
    return NextResponse.json({ error: "Song not found" }, { status: 404 });
  }

  const body = await req.json();
  const { lyric_version_id, suno_tags, instrumental } = body;

  // Resolve lyric content
  let lyricContent = body.prompt as string | undefined;
  if (lyric_version_id) {
    const version = getLyricVersion(Number(lyric_version_id));
    if (version) {
      lyricContent = version.content_txt ?? version.content_md ?? lyricContent;
    }
  }

  if (!lyricContent) {
    return NextResponse.json(
      { error: "Provide lyric_version_id or a prompt string" },
      { status: 400 }
    );
  }

  // Create a DB record first (status: pending)
  const gen = createSunoGeneration({
    song_id: song.id,
    lyric_version_id: lyric_version_id ? Number(lyric_version_id) : null,
    suno_tags: suno_tags ?? song.suno_tags,
    instrumental: !!instrumental,
  });

  // Submit to Suno
  let clips;
  try {
    clips = await generate({
      prompt: lyricContent,
      tags: suno_tags ?? song.suno_tags,
      title: song.title,
      instrumental: !!instrumental,
    });
  } catch (err) {
    updateSunoGeneration(gen.id, { status: "failed" });
    return NextResponse.json({ error: String(err) }, { status: 502 });
  }

  const first = clips[0];
  if (!first) {
    updateSunoGeneration(gen.id, { status: "failed" });
    return NextResponse.json({ error: "No clips returned from Suno" }, { status: 502 });
  }

  updateSunoGeneration(gen.id, {
    suno_clip_id: first.id,
    audio_url: first.audio_url ?? null,
    video_url: first.video_url ?? null,
    status: sunoStatusToDb(first.status),
  });

  return NextResponse.json({ ...gen, suno_clip_id: first.id, status: sunoStatusToDb(first.status) }, { status: 201 });
}
