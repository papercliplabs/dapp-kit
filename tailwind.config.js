/** @type {import('tailwindcss').Config} */
export default {
  prefix: 'dk-', // Add this line
  darkMode: "class",
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      colors: {
        primary: 'var(--dk-color-primary)',
        secondary: 'var(--dk-color-secondary)',
      },
    },
  },
  plugins: [],
}
