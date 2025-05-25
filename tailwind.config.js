/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.js", // Include App.js directly
    "./components/**/*.{js,jsx,ts,tsx}",
    "./screens/**/*.{js,jsx,ts,tsx}",
    "./navigation/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: '#f9c32d',
        bgLight: '#f6f5ff',
        darkText: '#100c09',
        grayText: '#b4b4b7',
      },
    },
  },
  plugins: [],
};
