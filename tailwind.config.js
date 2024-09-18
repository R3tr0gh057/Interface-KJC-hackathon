/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        hero_gradient: 'url(./src/assets/bg-gradient.svg)'
      }
    },
  },
  plugins: [],
}