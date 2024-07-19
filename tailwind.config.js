/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-to-r': 'linear-gradient(to right, #627EEA 54.37%, #EC4467 111.49%)'
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      fontFamily: {
        'opensans': ['Open Sans', 'sans-serif'],
        'cinzel': ['Cinzel', 'serif'],
      },
      fontSize: {
        'base': ['16px', { // 'base' is commonly used for body text
          lineHeight: '23.44px',
        }],
        '44': '44px',
        '20': '20px',
      },
      fontWeight: {
        normal: '400' // 'normal' is typically 400
      },
      textAlign: {
        left: 'left' // This might already exist by default
      },
      lineHeight: {
        '64': '64.47px', // This is a specific line height, normally not found in default Tailwind settings
      },
      borderWidth: {
        '1': '1px'
      }
    },
  },
  plugins: [],
}
