/** @type {import('tailwindcss').Config} */
module.exports = {
  // Template files are in 'public' and any other subdirectories, with file types 'html' or 'js'
  content: [
    './public/**/*.{html,js}',
    './views/**/*.{handlebars}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
