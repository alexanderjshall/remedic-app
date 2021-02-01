module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      minWidth: {
        0: "0",
        "1/4": "25%",
        "1/2": "50%",
        "3/4": "75%",
        full: "100%",
      },
      minHeight: {
        1: "1rem",
        4: "4rem",
        textarea: "70vh",
        "3/4": "75%",
      },
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
