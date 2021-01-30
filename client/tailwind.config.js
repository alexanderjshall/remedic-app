module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      blue: {
        light: "#879be5",
        default: "#4766D7",
        dark: "#2848B8",
      },
      green: {
        light: "#90E0CC",
        default: "#a0e4d3",
        dark: "#50CEAE",
      },
      gray: {
        light: "#A9ACB2",
        default: "60646c",
      },
    },
    extend: {},
  },
  fontFamily: {
    title: ["Inter", "sans-serif"],
    body: ["Roboto", "sans-serif"],
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
