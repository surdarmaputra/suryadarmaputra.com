import type { Config } from 'tailwindcss';

export default {
  content: ['./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'Poppins',
          'Roboto',
          'Segoe UI',
          'Arial',
          'system-ui',
          'sans-serif',
        ],
      },
      animation: {
        'scroll-guide-fade-1': 'scroll-guide-fade 1s ease-in-out infinite 0s',
        'scroll-guide-fade-2': 'scroll-guide-fade 1s ease-in-out infinite 0.3s',
        'scroll-guide-fade-3': 'scroll-guide-fade 1s ease-in-out infinite 0.6s',
      },
      keyframes: {
        'scroll-guide-fade': {
          '0%, 20%': { opacity: '0' },
          '40%': { opacity: '1' },
          '60%': { opacity: '1' },
          '80%, 100%': { opacity: '0' },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
