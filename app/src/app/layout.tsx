import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Stanza Studio",
  description: "Scripture-to-lyrics creative workspace",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-studio-bg text-studio-text antialiased">
        <header className="border-b border-studio-border px-6 py-4 flex items-center gap-3">
          <span className="text-studio-accent font-mono font-bold text-xl">✦</span>
          <h1 className="font-bold text-lg tracking-tight">Stanza Studio</h1>
          <span className="text-studio-subtle text-sm ml-1">/ scripture-to-lyrics</span>
        </header>
        <main className="max-w-6xl mx-auto px-4 py-8">{children}</main>
      </body>
    </html>
  );
}
