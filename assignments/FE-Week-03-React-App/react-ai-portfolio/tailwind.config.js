/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#4C5FD5",
        background: "#121212",
        text: "#F8FAFC",
        accent: "#E8A33D",
        surface: {
          DEFAULT: "#1E1E1E",
          light: "#2A2A2A",
        },
      },
      fontFamily: {
        heading: ['"Space Grotesk"', "sans-serif"],
        body: ['"Inter"', "sans-serif"],
      },
    },
  },
  plugins: [],
}