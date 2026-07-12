import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  darkMode: "media",
  theme: {
    screens: {
      sm: "390px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      colors: {
        ink: "#171817",
        charcoal: "#242522",
        bone: "#F1EBDD",
        "warm-white": "#FAF7F0",
        moss: "#526348",
        "deep-green": "#253A2B",
        bronze: "#9A714A",
        clay: "#A76445",
        water: "#9EBCB5",
        line: "rgba(23, 24, 23, 0.16)",
      },
      fontFamily: {
        jp: ["var(--font-jp)", "sans-serif"],
        display: ["var(--font-display)", "sans-serif"],
      },
      transitionTimingFunction: {
        district: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      keyframes: {
        grain: {
          "0%, 100%": { transform: "translate(0, 0)" },
          "10%": { transform: "translate(-2%, -4%)" },
          "30%": { transform: "translate(3%, 2%)" },
          "50%": { transform: "translate(-4%, 3%)" },
          "70%": { transform: "translate(2%, -3%)" },
          "90%": { transform: "translate(-3%, 1%)" },
        },
        steam: {
          "0%": { transform: "translateY(0) scaleX(1)", opacity: "0.35" },
          "100%": { transform: "translateY(-40px) scaleX(1.6)", opacity: "0" },
        },
        leafSway: {
          "0%, 100%": { transform: "rotate(-2deg)" },
          "50%": { transform: "rotate(2deg)" },
        },
        shimmer: {
          "0%, 100%": { opacity: "0.55" },
          "50%": { opacity: "1" },
        },
      },
      animation: {
        grain: "grain 8s steps(10) infinite",
        steam: "steam 4s ease-in infinite",
        leafSway: "leafSway 6s ease-in-out infinite",
        shimmer: "shimmer 3.2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
