/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        asez: {
          orange: '#E85D1F',
          'orange-dark': '#C44A12',
          green: '#2E7D32',
          maroon: '#8B1A1A',
          bg: '#FAF7F2',
          ink: '#1C1917',
          muted: '#78716C',
        },
      },
      fontFamily: {
        sans: ['system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
}