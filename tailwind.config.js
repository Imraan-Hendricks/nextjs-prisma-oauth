/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto', 'Helvetica', 'Arial', 'sans-serif'],
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: 0 },
          '100%': { opactiy: 1 },
        },
      },
      animation: {
        'fade-in': 'fade-in 300ms ease-in-out forwards',
      },
    },
  },
  plugins: [],
};
