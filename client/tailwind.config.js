const colors = require("tailwindcss/colors");

module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      // Allows horizontal and vertical flipping
      scale: {
        "-1": "-1",
      },
      screens: {
        tablet: "640px",
      },
      animation: {
        "spin-slow": "spin 16s linear infinite",
        "spin-ease": "spin 1.5s ease-in-out infinite",
        "ping-slow": "ping 3s linear infinite",
      },
      minWidth: {
        0: "0",
        "1/4": "25%",
        "1/3": "33.33%",
        "1/2": "50%",
        "3/4": "75%",
        full: "100%",
      },
      minHeight: {
        1: "1rem",
        4: "4rem",
        textarea: "70vh",
        "3/4": "75%",
        "1/2": "50%",
      },
      maxHeight: {
        1: "1rem",
        4: "4rem",
        chat: "70vh",
        "3/4": "75%",
      },
      maxWidth: {
        "1/2": "50%",
        "1/3": "33.33%",
        almostFull: "90%",
      },
      colors: {
        blue: {
          superlight: "#D9F0FC",
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
        red: {
          negative: "#FC5F67",
          dark: "#A31420",
        },
        yellow: {
          backgrounds: "#EDE5A6",
        },
        map: {
          blue: colors.blue,
          green: colors.emerald,
          red: colors.red,
          purple: colors.violet,
          orange: colors.amber,
        },
      },
      inset: {
        "5/100": "5%",
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
      backgroundColor: ["odd", "even"],
      opacity: ["disabled"],
    },
  },
  plugins: [],
};
