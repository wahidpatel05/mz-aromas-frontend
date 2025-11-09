import { defineConfig } from "tailwindcss";

export default defineConfig({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", "sans-serif", "Cormorant Garamond", "serif"], // Clean modern text font
        display: ["Playfair Display", "serif", "Manrope"], // Premium elegant headings
      },
      colors: {
        primary: {
          50: "#fffaf3",
          100: "#fef3e0",
          200: "#fde0b2",
          300: "#fbc97a",
          400: "#f2a74e",
          500: "#e48a25", // Rich Amber tone (matches your brand)
          600: "#c86e18",
          700: "#a15513",
          800: "#7b4112",
          900: "#633611",
        },
        accent: {
          50: "#fdf6f0",
          100: "#fbead9",
          200: "#f7d4b1",
          300: "#f2b37c",
          400: "#e78d4d",
          500: "#d96a26",
          600: "#b7521d",
          700: "#8f3c19",
          800: "#6c2f18",
          900: "#572817",
        },
      },
      boxShadow: {
        soft: "0 2px 8px rgba(0, 0, 0, 0.05)",
        glow: "0 0 15px rgba(255, 200, 100, 0.3)",
      },
    },
  },
  plugins: [],
});
