import { notFound } from "next/navigation";
import Link from "next/link";
import { getSongBySlug, getLyricVersions, getSunoGenerations } from "@/db/queries";
import SongTabs from "./SongTabs";

type Props = { params: Promise<{ slug: string }> };

export default async function SongPage({ params }: Props) {
  const { slug } = await params;
  const song = getSongBySlug(slug);
  if (!song) notFound();

  const lyrics = getLyricVersions(song.id);
  const generations = getSunoGenerations(song.id);

  return (
    <div>
      {/* Breadcrumb */}
      <div className="mb-6 flex items-center gap-2 text-sm text-studio-subtle">
        <Link href="/" className="hover:text-studio-text transition-colors">
          Songs
        </Link>
        <span>/</span>
        <span className="text-studio-text">{song.title}</span>
      </div>

      {/* Song header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <span className="font-mono text-studio-subtle text-sm">
            #{String(song.number).padStart(2, "0")}
          </span>
          <span
            className={`text-xs font-medium px-2 py-0.5 rounded-full ${
              song.status === "complete"
                ? "bg-studio-green/10 text-studio-green"
                : "bg-studio-muted/40 text-studio-subtle"
            }`}
          >
            {song.status}
          </span>
        </div>
        <h1 className="text-3xl font-bold mb-2">{song.title}</h1>
        <p className="text-studio-subtle mb-1">
          <span className="text-studio-text">{song.scripture_ref}</span>
          {" · "}
          {song.scripture_book}
        </p>
        <p className="text-studio-subtle text-sm">
          {song.genre}
          {" · "}
          <span className="italic">{song.core_theme}</span>
        </p>
        {song.suno_tags && (
          <p className="text-studio-subtle text-xs mt-2 font-mono">
            suno: {song.suno_tags}
          </p>
        )}
      </div>

      <SongTabs
        song={song}
        lyrics={lyrics}
        generations={generations}
      />
    </div>
  );
}
