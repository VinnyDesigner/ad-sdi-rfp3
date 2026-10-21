/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#07182F',
          900: '#0B2545',
          800: '#0F2B52',
          700: '#13315C',
          600: '#1A427A',
        },
        gold: {
          500: '#FFC20E',
          600: '#E5AD05',
          400: '#FFCD38',
        },
        steel: {
          400: '#7A9CC6',
          300: '#9AB5D5',
          500: '#5F84B0',
        },
        blue: {
          600: '#1F5FAD',
          700: '#174A87',
          500: '#2A72CD',
        },
        canvas: {
          DEFAULT: '#F5F7FA',
          subtle: '#EEF2F6',
        },
        surface: {
          DEFAULT: '#FFFFFF',
          hover: '#F8FAFC',
        },
        border: {
          DEFAULT: '#E3E8EF',
          subtle: '#EEF2F6',
          strong: '#CBD5E1',
        },
        text: {
          primary: '#14213D',
          secondary: '#5B6B7F',
          muted: '#8C9BAE',
        },
        status: {
          success: '#1E9E6A',
          warning: '#E8A317',
          danger: '#D64545',
          info: '#2F80ED',
        },
        dark: {
          bg: '#0A1628',
          surface: '#13233D',
          card: '#182C4B',
          border: '#1F385C',
          text: '#F1F5F9',
          muted: '#8EA2C0',
        },
        // Module Signatures
        module: {
          a: '#1F5FAD', // Clearinghouse & Portal
          b: '#7B4FD6', // GeoAI
          c: '#0E9F8E', // Marketplace
          d: '#E07B24', // Capacity Building
          e: '#2BA6DE', // Digital Twin
          f: '#5DAA3A', // Open Data
        },
      },
      fontFamily: {
        sans: ['Inter', 'Segoe UI', 'Roboto', 'sans-serif'],
        arabic: ['"IBM Plex Sans Arabic"', '"Noto Kufi Arabic"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
}
