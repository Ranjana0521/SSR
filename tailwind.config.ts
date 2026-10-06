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
        navy: {
          50: "#f0f4f8",
          100: "#d9e2ec",
          200: "#bcccdc",
          300: "#9fb3c8",
          400: "#829ab1",
          500: "#627d98",
          600: "#486581",
          700: "#334e68",
          800: "#243b53",
          900: "#0f1e36",
          950: "#080f1d",
        },
        brand: {
          blue: "#1d4ed8",
          "blue-hover": "#1e40af",
          "blue-light": "#eff6ff",
          gold: "#d97706",
          "gold-light": "#fef3c7",
          "gold-dark": "#b45309",
        },
      },
      fontFamily: {
        sans: [
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "'Segoe UI'",
          "Roboto",
          "sans-serif",
        ],
        heading: [
          "Outfit",
          "-apple-system",
          "BlinkMacSystemFont",
          "'Segoe UI'",
          "sans-serif",
        ],
      },
      boxShadow: {
        subtle: "0 1px 3px 0 rgba(15, 30, 54, 0.05), 0 1px 2px 0 rgba(15, 30, 54, 0.03)",
        card: "0 4px 20px -2px rgba(15, 30, 54, 0.06), 0 2px 6px -1px rgba(15, 30, 54, 0.03)",
        "card-hover": "0 12px 30px -4px rgba(15, 30, 54, 0.12), 0 4px 12px -2px rgba(15, 30, 54, 0.05)",
        premium: "0 20px 40px -15px rgba(15, 30, 54, 0.2)",
      },
      animation: {
        "fade-in": "fadeIn 0.4s ease-in-out",
        "slide-up": "slideUp 0.4s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
