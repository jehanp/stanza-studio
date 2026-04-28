/**
 * Suno API client
 *
 * Supports two modes:
 *   A) SUNO_API_URL — points to a self-hosted gcui-art/suno-api Docker container
 *      (docker run -d -p 3000:3000 -e SUNO_COOKIE=<cookie> gcui/suno-api)
 *   B) SUNO_COOKIE — direct calls to suno.ai using the session cookie
 *      (fallback when SUNO_API_URL is not set)
 */

const SUNO_API_URL = process.env.SUNO_API_URL;
const SUNO_COOKIE = process.env.SUNO_COOKIE;

export interface SunoGenerateOptions {
  prompt: string;           // lyrics / prompt text
  tags: string;             // style tags e.g. "indie folk, acoustic"
  title: string;            // song title
  instrumental?: boolean;   // true = no lyrics
  makeInstrumental?: boolean;
}

export interface SunoClip {
  id: string;
  status: "submitted" | "queued" | "streaming" | "complete" | "error";
  audio_url?: string;
  video_url?: string;
  image_url?: string;
  title?: string;
}

// ─── Mode A: self-hosted suno-api ─────────────────────────────────────────────

async function generateViaDockerApi(
  opts: SunoGenerateOptions
): Promise<SunoClip[]> {
  const url = `${SUNO_API_URL}/api/custom_generate`;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      prompt: opts.prompt,
      tags: opts.tags,
      title: opts.title,
      make_instrumental: opts.instrumental ?? false,
      wait_audio: false,
    }),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Suno API error ${res.status}: ${text}`);
  }
  const data = await res.json();
  return Array.isArray(data) ? data : [data];
}

async function getClipViaDockerApi(clipId: string): Promise<SunoClip | null> {
  const url = `${SUNO_API_URL}/api/get?ids=${clipId}`;
  const res = await fetch(url);
  if (!res.ok) return null;
  const data = await res.json();
  const clips: SunoClip[] = Array.isArray(data) ? data : [data];
  return clips.find((c) => c.id === clipId) ?? null;
}

// ─── Mode B: direct cookie calls to suno.ai ───────────────────────────────────

const SUNO_DIRECT_BASE = "https://studio-api.suno.ai";

async function generateViaCookie(
  opts: SunoGenerateOptions
): Promise<SunoClip[]> {
  if (!SUNO_COOKIE) throw new Error("SUNO_COOKIE is not set");
  const res = await fetch(`${SUNO_DIRECT_BASE}/api/generate/v2/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: SUNO_COOKIE,
    },
    body: JSON.stringify({
      gpt_description_prompt: null,
      prompt: opts.prompt,
      tags: opts.tags,
      title: opts.title,
      make_instrumental: opts.instrumental ?? false,
      mv: "chirp-v3-5",
    }),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Suno direct API error ${res.status}: ${text}`);
  }
  const data = await res.json();
  const clips = data?.clips ?? data?.data ?? [];
  return Array.isArray(clips) ? clips : [clips];
}

async function getClipViaCookie(clipId: string): Promise<SunoClip | null> {
  if (!SUNO_COOKIE) return null;
  const res = await fetch(
    `${SUNO_DIRECT_BASE}/api/feed/?ids=${clipId}`,
    { headers: { Cookie: SUNO_COOKIE } }
  );
  if (!res.ok) return null;
  const data = await res.json();
  const clips: SunoClip[] = Array.isArray(data) ? data : [data];
  return clips.find((c) => c.id === clipId) ?? null;
}

// ─── Public API ───────────────────────────────────────────────────────────────

export async function generate(
  opts: SunoGenerateOptions
): Promise<SunoClip[]> {
  if (SUNO_API_URL) {
    return generateViaDockerApi(opts);
  }
  if (SUNO_COOKIE) {
    return generateViaCookie(opts);
  }
  throw new Error(
    "Suno is not configured. Set SUNO_API_URL or SUNO_COOKIE in your .env.local file."
  );
}

export async function getClipStatus(
  clipId: string
): Promise<SunoClip | null> {
  if (SUNO_API_URL) {
    return getClipViaDockerApi(clipId);
  }
  if (SUNO_COOKIE) {
    return getClipViaCookie(clipId);
  }
  return null;
}

export function sunoStatusToDb(
  sunoStatus: SunoClip["status"]
): "pending" | "running" | "complete" | "failed" {
  switch (sunoStatus) {
    case "complete":
      return "complete";
    case "error":
      return "failed";
    case "submitted":
    case "queued":
      return "pending";
    case "streaming":
      return "running";
    default:
      return "pending";
  }
}
