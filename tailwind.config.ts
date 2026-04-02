import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: {
          DEFAULT: "#08090e",
          light: "#0d0f17",
          card: "#11131d",
          border: "#1a1d2e",
        },
        electric: {
          DEFAULT: "#00a0ff",
          dim: "#0070cc",
          bright: "#40bdff",
        },
        "slate-accent": "#3a3f54",
        "slate-muted": "#545a72",
        "slate-text": "#8890a8",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "-apple-system", "sans-serif"],
      },
      letterSpacing: {
        "ultra-wide": "0.15em",
      },
      lineHeight: {
        relaxed: "1.75",
        loose: "2",
      },
    },
  },
  plugins: [],
};
export default config;
