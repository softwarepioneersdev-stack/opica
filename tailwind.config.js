/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // ← enables dark: utilities via <html class="dark">
  theme: {
    extend: {
      fontFamily: {
        sans: ['DM Sans', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
      colors: {
        navy: '#1e3a5f',
        'navy-mid': '#2a5298',
      },
    },
  },
  plugins: [],
}
