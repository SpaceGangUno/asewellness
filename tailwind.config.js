/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translate(-50%, 0)' },
          '50%': { transform: 'translate(-50%, -10px)' },
        },
        scroll: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' }
        }
      },
      animation: {
        float: 'float 3s ease-in-out infinite',
        scroll: 'scroll 30s linear infinite'
      },
      backgroundImage: {
        'gradient-brand': 'linear-gradient(to right, rgb(6 78 59), rgb(16 185 129))',
        'gradient-brand-reverse': 'linear-gradient(to left, rgb(6 78 59), rgb(16 185 129))'
      }
    },
  },
  plugins: [],
}
