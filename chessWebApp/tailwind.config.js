/** @type {import('tailwindcss').Config} */

import colors from 'tailwindcss/colors';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      ...colors,
      light: "#EBECD0",
      dark: "#739552",
      background: "#312e2b",
      black20: 'rgba(0, 0 , 0,.15)'

    }
  },
  plugins: [],
}

