/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        flowRight: {
          'from': { transform: 'translateX(-50%)' },
          'to': { transform: 'translateX(0)' }
        }
      },
      animation: {
        flowRight: 'flowRight 2s linear infinite'
      }
    },
  },
  plugins: [],
}
