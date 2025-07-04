/ @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        netflixRed: '#e50914',
        netflixBlack: '#141414',
        netflixGray: '#303030',
        netflixLightGray: '#999',
      },
    },
  },
  plugins: [],
}