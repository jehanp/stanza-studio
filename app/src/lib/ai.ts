import OpenAI from "openai";
import type { ChatCompletionMessageParam } from "openai/resources/chat/completions";

const GITHUB_MODELS_ENDPOINT = "https://models.inference.ai.azure.com";
const DEFAULT_MODEL =
  process.env.GITHUB_MODELS_MODEL ?? "gpt-4o";

let _client: OpenAI | null = null;

function getClient(): OpenAI {
  if (!_client) {
    if (!process.env.GITHUB_TOKEN) {
      throw new Error(
        "GITHUB_TOKEN is not set. Set it in .env.local to use the AI assistant."
      );
    }
    _client = new OpenAI({
      baseURL: GITHUB_MODELS_ENDPOINT,
      apiKey: process.env.GITHUB_TOKEN,
    });
  }
  return _client;
}

export interface SongContext {
  title: string;
  scriptureRef: string;
  scriptureBook: string;
  coreTheme: string;
  genre: string;
  currentLyrics?: string;
}

export function buildSystemPrompt(ctx: SongContext): string {
  return `You are a lyric-writing assistant for Stanza Studio — a project that transforms Bible scripture into subtle, deeply meaningful song lyrics.

The song you are helping with:
- Title: "${ctx.title}"
- Scripture source: ${ctx.scriptureRef} (${ctx.scriptureBook}) — for context only, never quote it directly
- Core theme: ${ctx.coreTheme}
- Genre: ${ctx.genre}

Your philosophy:
- Never quote scripture verbatim — let themes, imagery, and emotion flow naturally
- Use the passage's imagery as a springboard for original metaphors
- Write for a listener who doesn't know the source — the song should move them on its own terms
- Aim for 3–5 subtle echoes of the original text in any lyric suggestion
- Every word should earn its place — economy and precision matter

${
  ctx.currentLyrics
    ? `Current lyrics:\n\`\`\`\n${ctx.currentLyrics}\n\`\`\``
    : "No lyrics have been written yet for this song."
}

Respond helpfully to requests for lyric suggestions, rewrites, refinements, imagery ideas, or structural guidance. Keep suggestions concise and singable.`;
}

export async function chat(
  messages: ChatCompletionMessageParam[],
  model?: string
): Promise<string> {
  const client = getClient();
  const response = await client.chat.completions.create({
    model: model ?? DEFAULT_MODEL,
    messages,
    temperature: 0.85,
    max_tokens: 1024,
  });
  return response.choices[0]?.message?.content ?? "";
}
