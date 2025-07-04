/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Add your custom colors here
        netflixBlack: '#141414',
        netflixRed: '#E50914',
        netflixGray: '#303030',
      
      },
    },
  },
  plugins: [],
}