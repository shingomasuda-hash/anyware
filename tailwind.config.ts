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
        ink: "#171915",
        charcoal: "#232620",
        "night-green": "#101611",
        "deep-green": "#202B22",
        bone: "#DFD5C2",
        "warm-white": "#F5F0E5",
        wood: "#8B5E3C",
        bronze: "#A47A4E",
        moss: "#526849",
        leaf: "#789366",
        water: "#9CBDB5",
        clay: "#B56F4B",
        "amber-light": "#F1B86B",
        line: "rgba(23, 25, 21, 0.14)",
        "line-light": "rgba(245, 240, 229, 0.16)",
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
        breathe: {
          "0%, 100%": { opacity: "0.5", transform: "scale(1)" },
          "50%": { opacity: "0.9", transform: "scale(1.04)" },
        },
        drip: {
          "0%": { transform: "translateY(-4px)", opacity: "0" },
          "20%": { opacity: "1" },
          "100%": { transform: "translateY(22px)", opacity: "0" },
        },
        flicker: {
          "0%, 100%": { opacity: "1" },
          "42%": { opacity: "0.9" },
          "44%": { opacity: "1" },
          "72%": { opacity: "0.82" },
          "74%": { opacity: "1" },
        },
        drift: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-6%)" },
        },
      },
      animation: {
        grain: "grain 8s steps(10) infinite",
        steam: "steam 4s ease-in infinite",
        leafSway: "leafSway 6s ease-in-out infinite",
        shimmer: "shimmer 3.2s ease-in-out infinite",
        breathe: "breathe 5s ease-in-out infinite",
        drip: "drip 2.6s ease-in infinite",
        flicker: "flicker 7s ease-in-out infinite",
        drift: "drift 40s linear infinite alternate",
      },
    },
  },
  plugins: [],
};

export default config;
