/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        elements: "hsl(var(--color-elements) / <alpha-value>)",
        primary: "hsl(var(--color-text) / <alpha-value>)",
        mainBg: "hsl(var(--color-bg) / <alpha-value>)",
        input: "hsl(var(--color-input)/ <alpha-value>)",
      },
      fontFamily: {
        nunito: ["Nunito Sans", "serif"],
      },
    },
  },
  plugins: [],
};
