/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx,vue}",
    "./components/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#ec4899',
          600: '#db2777',
          400: '#f472b6'
        },
        accent: { DEFAULT: '#fce7f3' }
      },
      fontFamily: { sans: ['Poppins','Inter','system-ui','sans-serif'] }
    }
  },
  plugins: [],
}
