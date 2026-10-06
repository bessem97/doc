import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        emerald: {
          950: '#041D14',
          900: '#06281E',
          800: '#0C4A34',
          700: '#0F5C41',
          600: '#10B981',
          500: '#34D399',
          400: '#6EE7B7',
          300: '#A7F3D0',
        },
        aqua: {
          500: '#06B6D4',
          400: '#22D3EE',
          300: '#67E8F9',
        }
      },
    },
  },
  plugins: [],
};

export default config;
