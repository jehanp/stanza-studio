"use client";

import { Dispatch, SetStateAction, useCallback, useState } from "react";
import type { LyricVersion, SunoGeneration } from "@/db/queries";

interface Props {
  slug: string;
  songTitle: string;
  defaultTags: string;
  versions: LyricVersion[];
  generations: SunoGeneration[];
  onChange: Dispatch<SetStateAction<SunoGeneration[]>>;
}

function StatusBadge({ status }: { status: SunoGeneration["status"] }) {
  const map: Record<string, string> = {
    pending: "bg-studio-gold/10 text-studio-gold",
    running: "bg-studio-accent/10 text-studio-accent",
    complete: "bg-studio-green/10 text-studio-green",
    failed: "bg-studio-red/10 text-studio-red",
  };
  return (
    <span
      className={`text-xs font-medium px-2 py-0.5 rounded-full ${map[status] ?? ""}`}
    >
      {status}
    </span>
  );
}

export default function SunoPanel({
  slug,
  songTitle,
  defaultTags,
  versions,
  generations,
  onChange,
}: Props) {
  const [showForm, setShowForm] = useState(false);
  const [selectedVersionId, setSelectedVersionId] = useState<string>(
    versions[0]?.id?.toString() ?? ""
  );
  const [tags, setTags] = useState(defaultTags);
  const [instrumental, setInstrumental] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pollingIds, setPollingIds] = useState<Set<string>>(new Set());

  async function submit() {
    setSubmitting(true);
    setError(null);
    const body: Record<string, unknown> = { suno_tags: tags, instrumental };
    if (selectedVersionId) {
      body.lyric_version_id = Number(selectedVersionId);
    }
    const res = await fetch(`/api/songs/${slug}/suno`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    if (!res.ok) {
      setError(data.error ?? "Submission failed");
    } else {
      onChange([data as SunoGeneration, ...generations]);
      setShowForm(false);
      if (data.suno_clip_id) {
        startPolling(data.suno_clip_id as string, data as SunoGeneration);
      }
    }
    setSubmitting(false);
  }

  const startPolling = useCallback(
    (clipId: string, gen: SunoGeneration) => {
      if (pollingIds.has(clipId)) return;
      setPollingIds((s) => new Set(s).add(clipId));

      const interval = setInterval(async () => {
        const res = await fetch(`/api/suno/status/${clipId}`);
        if (!res.ok) return;
        const updated: SunoGeneration = await res.json();
        onChange((prev: SunoGeneration[]) =>
          prev.map((g) => (g.id === gen.id ? updated : g))
        );
        if (updated.status === "complete" || updated.status === "failed") {
          clearInterval(interval);
          setPollingIds((s) => {
            const next = new Set(s);
            next.delete(clipId);
            return next;
          });
        }
      }, 8000);
    },
    [pollingIds, onChange]
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-studio-subtle">
          {generations.length} generation{generations.length !== 1 ? "s" : ""}
        </h3>
        <button
          onClick={() => setShowForm(!showForm)}
          className="text-xs px-3 py-1.5 rounded-lg bg-studio-accent text-white hover:bg-studio-accent-dim transition-colors"
        >
          ⚡ Generate with Suno
        </button>
      </div>

      {/* Generate form */}
      {showForm && (
        <div className="mb-4 p-4 rounded-xl border border-studio-border bg-studio-surface">
          <h4 className="text-sm font-medium mb-3">New Suno generation</h4>

          <div className="mb-3">
            <label className="text-xs text-studio-subtle mb-1 block">
              Lyric version
            </label>
            <select
              className="w-full bg-studio-bg border border-studio-border rounded-lg px-3 py-2 text-sm text-studio-text focus:outline-none focus:border-studio-accent"
              value={selectedVersionId}
              onChange={(e) => setSelectedVersionId(e.target.value)}
            >
              <option value="">— No lyrics (instrumental) —</option>
              {versions.map((v) => (
                <option key={v.id} value={v.id}>
                  {v.version_label} · {v.language === "si" ? "Sinhala" : "English"}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label className="text-xs text-studio-subtle mb-1 block">
              Style tags
            </label>
            <input
              className="w-full bg-studio-bg border border-studio-border rounded-lg px-3 py-2 text-sm font-mono text-studio-text focus:outline-none focus:border-studio-accent"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
            />
            <p className="text-xs text-studio-subtle mt-1">
              Comma-separated Suno style tags
            </p>
          </div>

          <label className="flex items-center gap-2 mb-4 cursor-pointer select-none">
            <input
              type="checkbox"
              className="accent-studio-accent"
              checked={instrumental}
              onChange={(e) => setInstrumental(e.target.checked)}
            />
            <span className="text-sm text-studio-subtle">Instrumental (no vocals)</span>
          </label>

          {error && (
            <p className="text-studio-red text-xs mb-3">{error}</p>
          )}

          <div className="flex gap-2">
            <button
              disabled={submitting}
              onClick={submit}
              className="text-xs px-4 py-2 rounded-lg bg-studio-accent text-white hover:bg-studio-accent-dim transition-colors disabled:opacity-50"
            >
              {submitting ? "Submitting…" : "Submit to Suno"}
            </button>
            <button
              onClick={() => { setShowForm(false); setError(null); }}
              className="text-xs px-4 py-2 rounded-lg border border-studio-border text-studio-subtle hover:text-studio-text transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Generations list */}
      {generations.length === 0 && !showForm && (
        <div className="text-center py-10 text-studio-subtle text-sm">
          <p className="mb-1">No generations yet.</p>
          <p className="text-xs">
            Make sure SUNO_API_URL or SUNO_COOKIE is set in .env.local, then
            click ⚡ Generate with Suno.
          </p>
        </div>
      )}

      <div className="space-y-3">
        {generations.map((gen) => (
          <div
            key={gen.id}
            className="rounded-xl border border-studio-border bg-studio-surface p-4"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <StatusBadge status={gen.status} />
                {gen.suno_clip_id && (
                  <span className="text-xs font-mono text-studio-subtle">
                    {gen.suno_clip_id}
                  </span>
                )}
                {pollingIds.has(gen.suno_clip_id ?? "") && (
                  <span className="text-xs text-studio-accent animate-pulse">
                    polling…
                  </span>
                )}
              </div>
              <span className="text-xs text-studio-subtle font-mono">
                {new Date(gen.created_at).toLocaleDateString()}
              </span>
            </div>

            {gen.suno_tags && (
              <p className="text-xs font-mono text-studio-subtle mb-2">
                {gen.suno_tags}
              </p>
            )}

            {gen.audio_url && (
              <audio
                controls
                className="w-full mt-2"
                src={gen.audio_url}
              />
            )}

            {gen.status === "complete" && !gen.audio_url && (
              <p className="text-xs text-studio-subtle mt-1">
                Audio URL not yet available — refresh to poll.
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
