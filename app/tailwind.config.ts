import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "Fira Code", "monospace"],
      },
      colors: {
        studio: {
          bg: "#0f0f13",
          surface: "#1a1a22",
          border: "#2a2a38",
          muted: "#3a3a50",
          text: "#e2e2f0",
          subtle: "#8888aa",
          accent: "#7c6ef8",
          "accent-dim": "#5a4fcc",
          gold: "#f0c040",
          green: "#50e090",
          red: "#e05060",
        },
      },
    },
  },
  plugins: [],
};
export default config;
