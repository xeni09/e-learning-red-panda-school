module.exports = {
  mode: "jit",
  content: ["./src/**/*.{js,jsx}", "./src/**/*.css", "./index.html"],
  theme: {
    extend: {
      colors: {
        primary: "#C1510E",
        secondary: "#EBBA09",
        light: "#FFF9F4",
        dark: "#303030",
      },
      screens: {
        xs: "200px",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
