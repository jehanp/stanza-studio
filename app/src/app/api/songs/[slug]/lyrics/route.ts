import { NextRequest, NextResponse } from "next/server";
import {
  getSongBySlug,
  getLyricVersions,
  createLyricVersion,
} from "@/db/queries";

export const dynamic = "force-dynamic";

type Params = { params: Promise<{ slug: string }> };

export async function GET(_req: NextRequest, { params }: Params) {
  const { slug } = await params;
  const song = getSongBySlug(slug);
  if (!song) {
    return NextResponse.json({ error: "Song not found" }, { status: 404 });
  }
  return NextResponse.json(getLyricVersions(song.id));
}

export async function POST(req: NextRequest, { params }: Params) {
  const { slug } = await params;
  const song = getSongBySlug(slug);
  if (!song) {
    return NextResponse.json({ error: "Song not found" }, { status: 404 });
  }
  const body = await req.json();
  const { version_label, language, content_md, content_txt } = body;
  if (!version_label || !language) {
    return NextResponse.json(
      { error: "version_label and language are required" },
      { status: 400 }
    );
  }
  const created = createLyricVersion({
    song_id: song.id,
    version_label,
    language,
    content_md: content_md ?? null,
    content_txt: content_txt ?? null,
  });
  return NextResponse.json(created, { status: 201 });
}
