module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        blue: {
          light: "#879be5",
          DEFAULT: "#4766D7",
          dark: "#2848B8",
        },
        green: {
          light: "#90E0CC",
          DEFAULT: "#a0e4d3",
          dark: "#50CEAE",
        },
        gray: {
          light: "#A9ACB2",
          DEFAULT: "#60646c",
        },
        white: {
          dark: "#EBEBEB",
          DEFAULT: "#FFFFFF",
          cream: "#F5F5F5",
          ghost: "#EFF1FB",
        },
      },
    },
  },
  fontFamily: {
    title: ["Inter", "sans-serif"],
    body: ["Roboto", "sans-serif"],
  },
  variants: {
    extend: {
      fill: ["hover", "focus"],
    },
  },
  plugins: [],
};
