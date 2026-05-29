/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        slideUp: {
          from: { transform: 'translate(-50%, -46%)', opacity: '0' },
          to: { transform: 'translate(-50%, -50%)', opacity: '1' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.15s ease',
        slideUp: 'slideUp 0.18s ease',
      },
    },
  },
  plugins: [],
}
