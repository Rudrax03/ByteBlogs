/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class", // Enable dark mode via class strategy
  content: ["./src/**/*.{js,ts,jsx,tsx}"],

  theme: {
    extend: {
      fontFamily: {
        traditional: ["Merriweather", "serif"], // Traditional serif font
      },
      colors: {
        wine: {
          DEFAULT: "#722f37", // Base wine
          light: "#8f3b47", // Slightly lighter variant
          dark: "#5a242b", // Darker wine shade
        },
      },
    },
  },
  plugins: [],
};
