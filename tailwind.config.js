export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          cream: '#FFFCF2',
          taupe: '#CCC5B9',
          charcoal: '#403D39',
          blackolive: '#252422',
          flame: '#EB5E28',
        }
      },
    },
    plugins: [
      require('@tailwindcss/forms'),
    ],
  }