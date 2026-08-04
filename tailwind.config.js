/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        accent: {
          blue: '#4f8cff',
          indigo: '#6f6cff',
          purple: '#8b5cf6',
        },
        slate: {
          950: '#060816',
        },
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(255,255,255,0.05), 0 20px 60px rgba(79, 140, 255, 0.18)',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
