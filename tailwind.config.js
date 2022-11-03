/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './src/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontSize: {
        // default:
        // sm: '0.8rem',
        // base: '1rem',
        // xl: '1.25rem',
        // '2xl': '1.563rem',
        // '3xl': '1.953rem',
        // '4xl': '2.441rem',
        // '5xl': '3.052rem',

        // +10 %:
        sm: '0.88rem',
        base: '1.1rem',
        xl: '1.375rem',
        '2xl': '1.719rem',
        '3xl': '2.148rem',
        '4xl': '2.685rem',
        '5xl': '3.357rem',
      },
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        'sa-black': '#000000',
        'sa-white': '#D6D9DB',
        'light-gray': '#6A6F74',
        'mid-gray': '#2F3336',
        'dark-gray': '#16181C',
        'sa-green': '#4D7C0F',
        'sa-red': '#B91C1C',
        primary: '#1A8CD9',
      },
      fontFamily: {
        sans: [
          'Inter',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          '"Noto Sans"',
          'sans-serif',
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
          '"Noto Color Emoji"',
        ],
        serif: ['ui-serif', 'Georgia', 'Cambria', '"Times New Roman"', 'Times', 'serif'],
        mono: [
          'ui-monospace',
          'SFMono-Regular',
          'Menlo',
          'Monaco',
          'Consolas',
          '"Liberation Mono"',
          '"Courier New"',
          'monospace',
        ],
      },
    },
  },

  plugins: [],
}
