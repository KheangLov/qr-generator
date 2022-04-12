const path = require('path')
const colors = require('tailwindcss/colors')
const { fontFamily } = require('tailwindcss/defaultTheme')

module.exports = {
  darkMode: 'class',
  content: [
    "./index.html",
    './docs/public/index.html',
    './docs/src/*.{vue,js,ts,jsx,tsx}',
    './src/**/*.{vue,js,ts,jsx,tsx}',
    path.resolve(__dirname, './node_modules/litepie-datepicker/**/*.js')
  ],
  theme: {
    extend: {
      colors: {
        cyan: colors.cyan,
        fuchsia: colors.fuchsia,
        lime: colors.lime,
        orange: colors.orange,
        'light-blue': colors.sky,
        'litepie-primary': colors.indigo,
        'litepie-secondary': colors.gray
      },
      fontFamily: {
        sans: ['Inter', ...fontFamily.sans]
      },
      opacity: {
        85: '0.85'
      }
    },
  },
  variants: {
    extend: {
      cursor: ['disabled'],
      textOpacity: ['disabled'],
      textColor: ['disabled']
    }
  },
  plugins: [],
}
