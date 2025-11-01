import { defineConfig } from "tailwindcss";

export default defineConfig({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        body: ["Inter", "sans-serif"],
        display: ["Playfair Display", "serif"],
      },
      colors: {
        primary: {
          50: "#fdf4ec",
          100: "#fbe4ce",
          200: "#f6c89b",
          300: "#f0a968",
          400: "#e9893c",
          500: "#d96e26",
          600: "#b7521d",
          700: "#8f3c19",
          800: "#6c2f18",
          900: "#572817",
        },
      },
    },
  },
});
