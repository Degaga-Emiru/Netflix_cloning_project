/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
    theme: {
      extend: {
        colors: {
          netflixRed: '#E50914',
          netflixDark: '#141414',
        },
        screens: {
          'xs': '475px',
        },
      },
    },
  
  plugins: [],
}