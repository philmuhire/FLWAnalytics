module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      spacing: {
        '256': '64rem',
        '192': '48rem'
      },
    },

  },
  variants: {
    extend: {},
  },
  plugins: [],
}
