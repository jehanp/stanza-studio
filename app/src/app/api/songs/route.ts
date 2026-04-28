import { NextResponse } from "next/server";
import { getSongs } from "@/db/queries";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const songs = getSongs();
    return NextResponse.json(songs);
  } catch (err) {
    return NextResponse.json(
      { error: String(err) },
      { status: 500 }
    );
  }
}
