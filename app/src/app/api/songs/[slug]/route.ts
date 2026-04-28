import { NextRequest, NextResponse } from "next/server";
import {
  getSongBySlug,
  getLyricVersions,
  getSunoGenerations,
  updateSongStatus,
} from "@/db/queries";

export const dynamic = "force-dynamic";

type Params = { params: Promise<{ slug: string }> };

export async function GET(_req: NextRequest, { params }: Params) {
  const { slug } = await params;
  const song = getSongBySlug(slug);
  if (!song) {
    return NextResponse.json({ error: "Song not found" }, { status: 404 });
  }
  const lyrics = getLyricVersions(song.id);
  const generations = getSunoGenerations(song.id);
  return NextResponse.json({ ...song, lyrics, generations });
}

export async function PATCH(req: NextRequest, { params }: Params) {
  const { slug } = await params;
  const song = getSongBySlug(slug);
  if (!song) {
    return NextResponse.json({ error: "Song not found" }, { status: 404 });
  }
  const body = await req.json();
  if (body.status === "draft" || body.status === "complete") {
    updateSongStatus(slug, body.status);
  }
  return NextResponse.json(getSongBySlug(slug));
}
