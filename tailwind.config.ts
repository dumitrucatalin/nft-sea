import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
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
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config