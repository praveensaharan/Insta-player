/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Ubuntu', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      colors: {
        'dark': {
          900: '#000000',
          800: '#0a0a0a',
          700: '#111111',
          600: '#1a1a1a',
          500: '#262626',
        },
      },
    },
  },
  plugins: [],
};
