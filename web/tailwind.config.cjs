module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: ["Roboto", "ui-sans-serif", "sans-serif"],
    },
    screens: {
      sm: "382px",
      md: "768px",
    },
    extend: {},
  },
  variants: {
    fill: ["hover"],
  },
  plugins: [],
};
