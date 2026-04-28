import Link from "next/link";
import { getSongs } from "@/db/queries";
import type { Song } from "@/db/queries";

function StatusBadge({ status }: { status: Song["status"] }) {
  return (
    <span
      className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full ${
        status === "complete"
          ? "bg-studio-green/10 text-studio-green"
          : "bg-studio-muted/40 text-studio-subtle"
      }`}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full ${
          status === "complete" ? "bg-studio-green" : "bg-studio-subtle"
        }`}
      />
      {status === "complete" ? "Complete" : "Draft"}
    </span>
  );
}

function SongCard({ song }: { song: Song }) {
  const num = String(song.number).padStart(2, "0");
  return (
    <Link
      href={`/songs/${song.slug}`}
      className="group block rounded-xl border border-studio-border bg-studio-surface p-5 hover:border-studio-accent transition-colors"
    >
      <div className="flex items-start justify-between mb-3">
        <span className="font-mono text-xs text-studio-subtle">#{num}</span>
        <StatusBadge status={song.status} />
      </div>
      <h2 className="font-semibold text-base mb-1 group-hover:text-studio-accent transition-colors">
        {song.title}
      </h2>
      <p className="text-studio-subtle text-xs mb-3">{song.scripture_ref}</p>
      <div className="flex flex-wrap gap-1">
        <span className="text-xs bg-studio-muted/30 text-studio-subtle rounded px-2 py-0.5">
          {song.genre}
        </span>
        <span className="text-xs bg-studio-muted/30 text-studio-subtle rounded px-2 py-0.5">
          {song.core_theme}
        </span>
      </div>
      <p className="text-studio-subtle text-xs mt-3 font-mono">
        {song.scheduled_date}
      </p>
    </Link>
  );
}

export default function DashboardPage() {
  const songs = getSongs();
  const complete = songs.filter((s) => s.status === "complete").length;

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-1">Song Schedule</h2>
        <p className="text-studio-subtle text-sm">
          {complete} of {songs.length} songs complete · April – October 2026
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {songs.map((song) => (
          <SongCard key={song.id} song={song} />
        ))}
      </div>
    </div>
  );
}
