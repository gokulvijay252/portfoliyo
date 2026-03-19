/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        light: {
          DEFAULT: '#c9d5e0',
          card: '#b8c8d8',
          lighter: '#d6e0ea',
          border: '#a8b8c8',
        },
        navy: {
          DEFAULT: '#1c2b3a',
          hover: '#263a4d',
        },
        avatar: '#7a92a8',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        marquee: 'marquee 20s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
};
