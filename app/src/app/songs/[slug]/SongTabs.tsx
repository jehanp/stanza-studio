"use client";

import { useState } from "react";
import LyricsPanel from "./LyricsPanel";
import AIChat from "./AIChat";
import SunoPanel from "./SunoPanel";
import type { Song, LyricVersion, SunoGeneration } from "@/db/queries";

const TABS = ["Lyrics", "AI Chat", "Suno"] as const;
type Tab = (typeof TABS)[number];

interface Props {
  song: Song;
  lyrics: LyricVersion[];
  generations: SunoGeneration[];
}

export default function SongTabs({ song, lyrics, generations }: Props) {
  const [active, setActive] = useState<Tab>("Lyrics");
  const [lyricVersions, setLyricVersions] = useState<LyricVersion[]>(lyrics);
  const [sunoGenerations, setSunoGenerations] =
    useState<SunoGeneration[]>(generations);

  return (
    <div>
      {/* Tab bar */}
      <div className="flex gap-1 border-b border-studio-border mb-6">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActive(tab)}
            className={`px-4 py-2 text-sm font-medium transition-colors border-b-2 -mb-px ${
              active === tab
                ? "border-studio-accent text-studio-accent"
                : "border-transparent text-studio-subtle hover:text-studio-text"
            }`}
          >
            {tab}
            {tab === "Lyrics" && lyricVersions.length > 0 && (
              <span className="ml-1.5 text-xs bg-studio-muted/40 rounded-full px-1.5 py-0.5">
                {lyricVersions.length}
              </span>
            )}
            {tab === "Suno" && sunoGenerations.length > 0 && (
              <span className="ml-1.5 text-xs bg-studio-muted/40 rounded-full px-1.5 py-0.5">
                {sunoGenerations.length}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {active === "Lyrics" && (
        <LyricsPanel
          slug={song.slug}
          versions={lyricVersions}
          onChange={setLyricVersions}
        />
      )}
      {active === "AI Chat" && (
        <AIChat slug={song.slug} />
      )}
      {active === "Suno" && (
        <SunoPanel
          slug={song.slug}
          songTitle={song.title}
          defaultTags={song.suno_tags}
          versions={lyricVersions}
          generations={sunoGenerations}
          onChange={setSunoGenerations}
        />
      )}
    </div>
  );
}
