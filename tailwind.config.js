/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        alpha: 'transparent',
        ppal: '#f7f7f7',
        sec: '#ffffff',
        accent1: '#5036f6',
        accent2: '#e937b1',
        accent3: '#7b3aec',
        titles: '#1e1a30',
        pg: '#5e5e5e',
        icons: '#999999',
        line: '#e6e6e6',
      },
      boxShadow: {
        custom: '0 2px 4px rgba(30, 26, 48, 0.1)',
        'inner-lg': 'inset 0 4px 10px rgba(99, 102, 241, 0.6)',
        'inner-xl': 'inset 0 6px 15px rgba(99, 102, 241, 0.7)',
      },
    },
  },
  plugins: [],
}
