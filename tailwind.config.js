/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          primary: {
            dark: '#000100',
            gray: '#A1A6B4',
            teal: '#94C5CC',
            'light-blue': '#B4D2E7',
            background: '#F8F8F8',
          }
        },
        fontFamily: {
          sans: ['Inter', 'sans-serif'],
        },
      },
    },
    plugins: [],
  }
  