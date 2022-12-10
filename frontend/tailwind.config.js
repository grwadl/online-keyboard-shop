/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}', // Note the addition of the `app` directory.
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {},
    colors: {
      'main-color': '#323232',
      'second-color': '#2d2d2d',
      'text-color': '#cbcbcb',
      'icon-color': '#8a8a8a',
      'accent-color': '#a100ed',
      white: '#fff',
      black: '#000'
    }
  },
  plugins: []
}
