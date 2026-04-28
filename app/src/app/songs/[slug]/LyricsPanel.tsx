"use client";

import { useState } from "react";
import type { LyricVersion } from "@/db/queries";

interface Props {
  slug: string;
  versions: LyricVersion[];
  onChange: (v: LyricVersion[]) => void;
}

type EditState = {
  id: number | null;
  version_label: string;
  language: string;
  content_md: string;
  content_txt: string;
};

const BLANK_EDIT: EditState = {
  id: null,
  version_label: "",
  language: "en",
  content_md: "",
  content_txt: "",
};

function langLabel(lang: string) {
  if (lang === "si") return "🇱🇰 Sinhala";
  if (lang === "en") return "🇬🇧 English";
  return lang;
}

export default function LyricsPanel({ slug, versions, onChange }: Props) {
  const [expanded, setExpanded] = useState<number | null>(
    versions[0]?.id ?? null
  );
  const [editing, setEditing] = useState<EditState | null>(null);
  const [showNew, setShowNew] = useState(false);
  const [newForm, setNewForm] = useState<EditState>(BLANK_EDIT);
  const [saving, setSaving] = useState(false);
  const [copied, setCopied] = useState<number | null>(null);

  async function saveEdit() {
    if (!editing) return;
    setSaving(true);
    const res = await fetch(`/api/songs/${slug}/lyrics/${editing.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editing),
    });
    if (res.ok) {
      const updated: LyricVersion = await res.json();
      onChange(versions.map((v) => (v.id === updated.id ? updated : v)));
    }
    setSaving(false);
    setEditing(null);
  }

  async function createVersion() {
    setSaving(true);
    const res = await fetch(`/api/songs/${slug}/lyrics`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newForm),
    });
    if (res.ok) {
      const created: LyricVersion = await res.json();
      onChange([...versions, created]);
      setExpanded(created.id);
    }
    setSaving(false);
    setShowNew(false);
    setNewForm(BLANK_EDIT);
  }

  async function deleteVersion(id: number) {
    if (!confirm("Delete this lyric version?")) return;
    await fetch(`/api/songs/${slug}/lyrics/${id}`, { method: "DELETE" });
    const remaining = versions.filter((v) => v.id !== id);
    onChange(remaining);
    if (expanded === id) setExpanded(remaining[0]?.id ?? null);
  }

  function copyTxt(v: LyricVersion) {
    const text = v.content_txt ?? v.content_md ?? "";
    navigator.clipboard.writeText(text).then(() => {
      setCopied(v.id);
      setTimeout(() => setCopied(null), 1500);
    });
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-studio-subtle">
          {versions.length} version{versions.length !== 1 ? "s" : ""}
        </h3>
        <button
          onClick={() => setShowNew(!showNew)}
          className="text-xs px-3 py-1.5 rounded-lg bg-studio-accent text-white hover:bg-studio-accent-dim transition-colors"
        >
          + New version
        </button>
      </div>

      {/* New version form */}
      {showNew && (
        <div className="mb-4 p-4 rounded-xl border border-studio-border bg-studio-surface">
          <h4 className="text-sm font-medium mb-3">New lyric version</h4>
          <div className="grid grid-cols-2 gap-3 mb-3">
            <div>
              <label className="text-xs text-studio-subtle mb-1 block">
                Version label
              </label>
              <input
                className="w-full bg-studio-bg border border-studio-border rounded-lg px-3 py-2 text-sm text-studio-text focus:outline-none focus:border-studio-accent"
                placeholder="e.g. v2, v5, alternate"
                value={newForm.version_label}
                onChange={(e) =>
                  setNewForm((f) => ({ ...f, version_label: e.target.value }))
                }
              />
            </div>
            <div>
              <label className="text-xs text-studio-subtle mb-1 block">
                Language
              </label>
              <select
                className="w-full bg-studio-bg border border-studio-border rounded-lg px-3 py-2 text-sm text-studio-text focus:outline-none focus:border-studio-accent"
                value={newForm.language}
                onChange={(e) =>
                  setNewForm((f) => ({ ...f, language: e.target.value }))
                }
              >
                <option value="en">English</option>
                <option value="si">Sinhala</option>
              </select>
            </div>
          </div>
          <div className="mb-3">
            <label className="text-xs text-studio-subtle mb-1 block">
              Suno-ready text (plain)
            </label>
            <textarea
              rows={8}
              className="w-full bg-studio-bg border border-studio-border rounded-lg px-3 py-2 text-sm font-mono text-studio-text focus:outline-none focus:border-studio-accent resize-y"
              placeholder="[Verse 1]&#10;&#10;..."
              value={newForm.content_txt}
              onChange={(e) =>
                setNewForm((f) => ({ ...f, content_txt: e.target.value }))
              }
            />
          </div>
          <div className="mb-3">
            <label className="text-xs text-studio-subtle mb-1 block">
              Full markdown (with imagery notes — optional)
            </label>
            <textarea
              rows={5}
              className="w-full bg-studio-bg border border-studio-border rounded-lg px-3 py-2 text-sm font-mono text-studio-text focus:outline-none focus:border-studio-accent resize-y"
              value={newForm.content_md}
              onChange={(e) =>
                setNewForm((f) => ({ ...f, content_md: e.target.value }))
              }
            />
          </div>
          <div className="flex gap-2">
            <button
              disabled={saving || !newForm.version_label}
              onClick={createVersion}
              className="text-xs px-4 py-2 rounded-lg bg-studio-accent text-white hover:bg-studio-accent-dim transition-colors disabled:opacity-50"
            >
              {saving ? "Saving…" : "Create"}
            </button>
            <button
              onClick={() => { setShowNew(false); setNewForm(BLANK_EDIT); }}
              className="text-xs px-4 py-2 rounded-lg border border-studio-border text-studio-subtle hover:text-studio-text transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Version list */}
      <div className="space-y-2">
        {versions.map((v) => {
          const isOpen = expanded === v.id;
          const isEditing = editing?.id === v.id;

          return (
            <div
              key={v.id}
              className="rounded-xl border border-studio-border bg-studio-surface overflow-hidden"
            >
              {/* Header */}
              <button
                className="w-full flex items-center justify-between px-4 py-3 hover:bg-studio-muted/10 transition-colors text-left"
                onClick={() => setExpanded(isOpen ? null : v.id)}
              >
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs bg-studio-muted/40 px-2 py-0.5 rounded">
                    {v.version_label}
                  </span>
                  <span className="text-xs text-studio-subtle">
                    {langLabel(v.language)}
                  </span>
                  {v.content_md && (
                    <span className="text-xs text-studio-accent">
                      has notes
                    </span>
                  )}
                </div>
                <span className="text-studio-subtle text-xs">
                  {isOpen ? "▲" : "▼"}
                </span>
              </button>

              {/* Body */}
              {isOpen && (
                <div className="px-4 pb-4 border-t border-studio-border">
                  {isEditing ? (
                    /* Edit mode */
                    <div className="pt-3">
                      <div className="mb-3">
                        <label className="text-xs text-studio-subtle mb-1 block">
                          Suno-ready text
                        </label>
                        <textarea
                          rows={12}
                          className="w-full bg-studio-bg border border-studio-border rounded-lg px-3 py-2 text-sm font-mono text-studio-text focus:outline-none focus:border-studio-accent resize-y"
                          value={editing.content_txt}
                          onChange={(e) =>
                            setEditing((ed) =>
                              ed ? { ...ed, content_txt: e.target.value } : ed
                            )
                          }
                        />
                      </div>
                      <div className="mb-3">
                        <label className="text-xs text-studio-subtle mb-1 block">
                          Full markdown (with notes)
                        </label>
                        <textarea
                          rows={8}
                          className="w-full bg-studio-bg border border-studio-border rounded-lg px-3 py-2 text-sm font-mono text-studio-text focus:outline-none focus:border-studio-accent resize-y"
                          value={editing.content_md}
                          onChange={(e) =>
                            setEditing((ed) =>
                              ed ? { ...ed, content_md: e.target.value } : ed
                            )
                          }
                        />
                      </div>
                      <div className="flex gap-2">
                        <button
                          disabled={saving}
                          onClick={saveEdit}
                          className="text-xs px-4 py-2 rounded-lg bg-studio-accent text-white hover:bg-studio-accent-dim transition-colors disabled:opacity-50"
                        >
                          {saving ? "Saving…" : "Save"}
                        </button>
                        <button
                          onClick={() => setEditing(null)}
                          className="text-xs px-4 py-2 rounded-lg border border-studio-border text-studio-subtle hover:text-studio-text transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    /* View mode */
                    <div className="pt-3">
                      {v.content_txt && (
                        <pre className="text-sm font-mono text-studio-text whitespace-pre-wrap leading-relaxed max-h-96 overflow-y-auto mb-3">
                          {v.content_txt}
                        </pre>
                      )}
                      {!v.content_txt && v.content_md && (
                        <pre className="text-sm font-mono text-studio-text whitespace-pre-wrap leading-relaxed max-h-96 overflow-y-auto mb-3">
                          {v.content_md}
                        </pre>
                      )}
                      <div className="flex gap-2 flex-wrap">
                        <button
                          onClick={() =>
                            setEditing({
                              id: v.id,
                              version_label: v.version_label,
                              language: v.language,
                              content_md: v.content_md ?? "",
                              content_txt: v.content_txt ?? "",
                            })
                          }
                          className="text-xs px-3 py-1.5 rounded-lg border border-studio-border text-studio-subtle hover:text-studio-text transition-colors"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => copyTxt(v)}
                          className="text-xs px-3 py-1.5 rounded-lg border border-studio-border text-studio-subtle hover:text-studio-text transition-colors"
                        >
                          {copied === v.id ? "✓ Copied" : "Copy Suno-ready"}
                        </button>
                        <button
                          onClick={() => deleteVersion(v.id)}
                          className="text-xs px-3 py-1.5 rounded-lg border border-studio-red/30 text-studio-red hover:bg-studio-red/10 transition-colors ml-auto"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
