/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {

      'sm': '280px',

      'md': '730px',

      'lg': '1024px',

      'xl': '1280px',
    },
  },
  plugins: [],
}