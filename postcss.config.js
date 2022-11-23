/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  safelist: [
    { pattern: /bg-(red|green|blue|orange|gray)-(100|200|300|400|500|600|700|800)/ },
    {
      pattern:
          /border-(red|green|blue|orange|gray)-(100|200|300|400|500|600|700|800)/,
    },
    {
      pattern: /text-(red|green|blue|orange|gray)-(100|200|300|400|500|600|700|800)/,
    },

    "text-3xl",
    "lg:text-4xl",
  ],
  theme: {
    extend: {
      blur: {
        xs: "2px",
      },
      screens: {
        print: { raw: "print" },
      },
      colors: {
        orange: {
          50: "#fff7ed",
          100: "#ffedd5",
          200: "#fed7aa",
          300: "#fdba74",
          400: "#fb923c",
          500: "#f97316",
          600: "#ea580c",
          700: "#c2410c",
          800: "#9a3412",
          900: "#7c2d12",
        },
        orient: {
          50: "#f2f7f9",
          100: "#e6eff3",
          200: "#bfd8e1",
          300: "#99c0cf",
          400: "#4d90aa",
          500: "#006186",
          600: "#005779",
          700: "#004965",
          800: "#003a50",
          900: "#003042",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
}
