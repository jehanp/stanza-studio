import { NextRequest, NextResponse } from "next/server";
import {
  getLyricVersion,
  updateLyricVersion,
  deleteLyricVersion,
  getSongBySlug,
} from "@/db/queries";

export const dynamic = "force-dynamic";

type Params = { params: Promise<{ slug: string; id: string }> };

export async function GET(_req: NextRequest, { params }: Params) {
  const { id } = await params;
  const version = getLyricVersion(Number(id));
  if (!version) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json(version);
}

export async function PUT(req: NextRequest, { params }: Params) {
  const { slug, id } = await params;
  const song = getSongBySlug(slug);
  if (!song) {
    return NextResponse.json({ error: "Song not found" }, { status: 404 });
  }
  const version = getLyricVersion(Number(id));
  if (!version || version.song_id !== song.id) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  const body = await req.json();
  const updated = updateLyricVersion(Number(id), {
    version_label: body.version_label,
    language: body.language,
    content_md: body.content_md,
    content_txt: body.content_txt,
  });
  return NextResponse.json(updated);
}

export async function DELETE(_req: NextRequest, { params }: Params) {
  const { slug, id } = await params;
  const song = getSongBySlug(slug);
  if (!song) {
    return NextResponse.json({ error: "Song not found" }, { status: 404 });
  }
  const version = getLyricVersion(Number(id));
  if (!version || version.song_id !== song.id) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  deleteLyricVersion(Number(id));
  return new NextResponse(null, { status: 204 });
}
