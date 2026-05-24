/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{js,jsx,ts,tsx}',
    './src/components/**/*.{js,jsx,ts,tsx}',
    './src/context/**/*.{js,jsx,ts,tsx}',
    './src/hooks/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        black: '#0A0A0A',
        gold: '#C9A84C',
        'gold-light': '#E8C97A',
        'gold-dark': '#A07830',
        ivory: '#FAF6F0',
        beige: '#D4B896',
        grey: '#8A8A8A',
      },
      fontFamily: {
        cormorant: ['Cormorant Garamond', 'serif'],
        playfair: ['Playfair Display', 'serif'],
        poppins: ['Poppins', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
