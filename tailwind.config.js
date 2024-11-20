/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        scroll: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(calc(-280px * 4 - 1rem * 3))' }  // 4 cards width + 3 gaps
        }
      },
      animation: {
        scroll: 'scroll 20s linear infinite'
      },
      backgroundImage: {
        'gradient-brand': 'linear-gradient(135deg, #4ade80, #38bdf8)'
      }
    },
  },
  plugins: [
    function({ addUtilities }) {
      addUtilities({
        '.pause-on-hover': {
          '&:hover > *': {
            'animation-play-state': 'paused',
          },
        },
      })
    },
  ],
}
