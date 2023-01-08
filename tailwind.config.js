/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'], //configure the paths to all of your HTML templates, typescript components, and any other source files that contain Tailwind class names.
  safelist: ['bg-blue-400', 'bg-green-400', 'bg-red-400'], //use when it’s impossible to scan certain content for class names.
  theme: {
    extend: {},
  },
  plugins: [],
}
