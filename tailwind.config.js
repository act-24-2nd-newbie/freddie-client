import { fontFamily } from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        header: '#6C77A7',
        content: '#2C3E50',
        primary: '#2A82F0',
        error: '#D15050',
      },
      fontFamily: {
        sans: ['Noto Sans KR', ...fontFamily.sans],
      },
      backgroundImage: {
        'arrow-down': 'url(./src/assets/arrow_down.svg)',
        'arrow-up': 'url(./src/assets/arrow_up.svg)',
      },
      boxShadow: {
        'drop-down-close': '0 2px 4px 0 rgba(0,0,0,0.2)',
        'drop-down-open': '0 4px 4px 0 rgba(0,0,0,0.2)',
      },
      height: {
        list: 'calc(100vh - 340px)',
        empty: 'calc(100vh - 424px)',
      },
    },
  },
  plugins: [],
};
