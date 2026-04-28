"use client";

import { useEffect, useRef, useState } from "react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface Props {
  slug: string;
}

export default function AIChat({ slug }: Props) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [initialised, setInitialised] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Load conversation history on mount
  useEffect(() => {
    fetch(`/api/songs/${slug}/ai`)
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data.messages)) {
          setMessages(
            (data.messages as Array<{ role: string; content: string }>)
              .filter((m) => m.role === "user" || m.role === "assistant")
              .map((m) => ({ role: m.role as "user" | "assistant", content: m.content }))
          );
        }
        setInitialised(true);
      })
      .catch(() => setInitialised(true));
  }, [slug]);

  // Auto-scroll to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function send() {
    const text = input.trim();
    if (!text || loading) return;
    setInput("");
    setError(null);
    setLoading(true);

    const optimistic: Message = { role: "user", content: text };
    setMessages((m) => [...m, optimistic]);

    const res = await fetch(`/api/songs/${slug}/ai`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: text }),
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error ?? "AI request failed");
      setMessages((m) => m.slice(0, -1));
    } else {
      const data = await res.json();
      const reply: Message = { role: "assistant", content: data.reply };
      setMessages((m) => [...m, reply]);
    }
    setLoading(false);
  }

  async function clearHistory() {
    if (!confirm("Clear the full conversation history for this song?")) return;
    await fetch(`/api/songs/${slug}/ai`, { method: "DELETE" });
    setMessages([]);
  }

  return (
    <div className="flex flex-col h-[70vh] rounded-xl border border-studio-border bg-studio-surface overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-studio-border">
        <div>
          <span className="text-sm font-medium">AI Assistant</span>
          <span className="text-xs text-studio-subtle ml-2">
            GitHub Models · gpt-4o
          </span>
        </div>
        {messages.length > 0 && (
          <button
            onClick={clearHistory}
            className="text-xs text-studio-subtle hover:text-studio-red transition-colors"
          >
            Clear history
          </button>
        )}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {!initialised && (
          <p className="text-studio-subtle text-sm text-center py-8">
            Loading…
          </p>
        )}
        {initialised && messages.length === 0 && (
          <div className="text-center py-10">
            <p className="text-studio-subtle text-sm mb-2">
              Start a conversation about this song.
            </p>
            <p className="text-studio-subtle text-xs max-w-sm mx-auto">
              Ask for lyric rewrites, new metaphors, structural suggestions, or
              help embedding the scripture imagery more subtly.
            </p>
            <div className="mt-4 flex flex-wrap gap-2 justify-center">
              {[
                "Suggest a stronger opening line",
                "Make the imagery more subtle",
                "Write a new bridge",
                "Give me 3 alternate chorus options",
              ].map((s) => (
                <button
                  key={s}
                  onClick={() => { setInput(s); }}
                  className="text-xs px-3 py-1.5 rounded-full border border-studio-border text-studio-subtle hover:text-studio-text hover:border-studio-accent transition-colors"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((m, i) => (
          <div
            key={i}
            className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[80%] rounded-xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap ${
                m.role === "user"
                  ? "bg-studio-accent text-white rounded-br-sm"
                  : "bg-studio-muted/30 text-studio-text rounded-bl-sm"
              }`}
            >
              {m.content}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="bg-studio-muted/30 rounded-xl rounded-bl-sm px-4 py-3">
              <span className="inline-flex gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-studio-subtle animate-bounce [animation-delay:0ms]" />
                <span className="w-1.5 h-1.5 rounded-full bg-studio-subtle animate-bounce [animation-delay:150ms]" />
                <span className="w-1.5 h-1.5 rounded-full bg-studio-subtle animate-bounce [animation-delay:300ms]" />
              </span>
            </div>
          </div>
        )}

        {error && (
          <p className="text-studio-red text-xs text-center">{error}</p>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="border-t border-studio-border p-3 flex gap-2">
        <textarea
          rows={1}
          placeholder="Ask about this song's lyrics…"
          className="flex-1 bg-studio-bg border border-studio-border rounded-lg px-3 py-2 text-sm text-studio-text placeholder:text-studio-subtle focus:outline-none focus:border-studio-accent resize-none"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              send();
            }
          }}
        />
        <button
          onClick={send}
          disabled={loading || !input.trim()}
          className="px-4 py-2 rounded-lg bg-studio-accent text-white text-sm hover:bg-studio-accent-dim transition-colors disabled:opacity-40"
        >
          Send
        </button>
      </div>
    </div>
  );
}
