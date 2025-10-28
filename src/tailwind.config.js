/* eslint-env node */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}', // Scans all Vue/JS/TS files
  ],
  theme: {
    extend: {
      // Add custom spacing, colors, or fonts here if needed
    },
  },
  plugins: [],
}
