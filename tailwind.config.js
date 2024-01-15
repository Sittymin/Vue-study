/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require("daisyui")
  ],
  daisyui: {
    themes: [
      "dark",
      "light"
    ]
  },
  variants: {
    extend: {
      borderRadius: ['first', 'last'], // 启用first变体
    },
  },
}

