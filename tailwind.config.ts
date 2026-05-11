import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: {
          900: "#002f55",
          800: "#003a6a",
          700: "#00457d",
          600: "#1a588a",
          500: "#336a97",
          400: "#5384b0",
          300: "#7ea5c7",
          200: "#b3c7d8",
          100: "#d8e3ed",
          50: "#e6ecf2"
        },
        gold: {
          500: "#ffd300",
          400: "#ffdc33",
          300: "#ffe566",
          200: "#fff2b2",
          100: "#fff8d6"
        }
      },
      fontFamily: {
        sans: ["ui-sans-serif", "system-ui", "-apple-system", "Segoe UI", "Roboto", "Helvetica Neue", "Arial", "sans-serif"]
      },
      boxShadow: {
        card: "0 1px 3px rgba(0,69,125,0.06), 0 1px 2px rgba(0,69,125,0.04)",
        "card-hover": "0 10px 30px rgba(0,69,125,0.12), 0 4px 10px rgba(0,69,125,0.08)"
      }
    }
  },
  plugins: []
};

export default config;
