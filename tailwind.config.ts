import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: "#1B1464",
          "navy-dark": "#0F0B3D",
          "navy-light": "#2A2085",
          "navy-muted": "#16114E",
          gold: "#A88A00",
          "gold-light": "#C9A71A",
          "gold-dark": "#7F6800",
          "gold-subtle": "rgba(168, 138, 0, 0.15)",
          "gold-border": "rgba(168, 138, 0, 0.25)",
          slate: "#0F172A",
          "slate-light": "#1E293B",
          "slate-muted": "#64748B",
          canvas: "#FFFFFF",
          "canvas-alt": "#F8FAFC",
          "canvas-warm": "#FAF9F6",
          border: "#E2E8F0",
        },
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "Playfair Display", "Cormorant Garamond", "Georgia", "serif"],
        sans: ["var(--font-jakarta)", "Plus Jakarta Sans", "Inter", "system-ui", "sans-serif"],
        display: ["var(--font-cormorant)", "Cormorant Garamond", "Playfair Display", "serif"],
      },
      letterSpacing: {
        luxury: "0.2em",
        "luxury-wide": "0.3em",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gold-shimmer": "linear-gradient(135deg, #A88A00 0%, #E6C84F 50%, #A88A00 100%)",
        "navy-luxury": "linear-gradient(180deg, #1B1464 0%, #0F0B3D 100%)",
      },
      gridTemplateColumns: {
        '7': 'repeat(7, minmax(0, 1fr))',
      },
      boxShadow: {
        luxury: "0 10px 40px -10px rgba(27, 20, 100, 0.12)",
        "luxury-hover": "0 20px 50px -10px rgba(27, 20, 100, 0.22)",
        gold: "0 0 25px rgba(168, 138, 0, 0.25)",
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-6px)" },
        },
      },
      animation: {
        shimmer: "shimmer 3s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
