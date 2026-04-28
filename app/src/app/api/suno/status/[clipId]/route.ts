import { NextRequest, NextResponse } from "next/server";
import {
  getSunoGenerationByClipId,
  updateSunoGeneration,
} from "@/db/queries";
import { getClipStatus, sunoStatusToDb } from "@/lib/suno";

export const dynamic = "force-dynamic";

type Params = { params: Promise<{ clipId: string }> };

export async function GET(_req: NextRequest, { params }: Params) {
  const { clipId } = await params;

  const gen = getSunoGenerationByClipId(clipId);
  if (!gen) {
    return NextResponse.json({ error: "Generation not found" }, { status: 404 });
  }

  // If already terminal, return stored state
  if (gen.status === "complete" || gen.status === "failed") {
    return NextResponse.json(gen);
  }

  // Poll Suno for current status
  let clip;
  try {
    clip = await getClipStatus(clipId);
  } catch {
    return NextResponse.json(gen);
  }

  if (clip) {
    const dbStatus = sunoStatusToDb(clip.status);
    updateSunoGeneration(gen.id, {
      status: dbStatus,
      audio_url: clip.audio_url ?? null,
      video_url: clip.video_url ?? null,
    });
    return NextResponse.json({
      ...gen,
      status: dbStatus,
      audio_url: clip.audio_url ?? gen.audio_url,
      video_url: clip.video_url ?? gen.video_url,
    });
  }

  return NextResponse.json(gen);
}
