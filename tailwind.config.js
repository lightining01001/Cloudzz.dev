/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        mono: ['"Fira Code"', 'monospace'],
      },
      colors: {
        'neon-blue': '#00aaff',
      },
      boxShadow: {
        'glow': '0 0 15px 5px rgba(0, 170, 255, 0.3)',
      }
    },
  },
  plugins: [],
}