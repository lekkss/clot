/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: {
          100: "#8E6CEF",
          50: "#EFEAF5",
        },
        lemon: "#B3B68B",
        red: "#FA3636",
        blue: "#4468E5",
        yellow: "#F4BD2F",
        orange: "#EC6D26",
        green: "#5FB567",
        light: {
          1: "#FFFFFF",
          2: "#F4F4F4",
        },
        black: {
          100: "#272727",
          50: "#272727/50",
        },
      },
    },
  },
  plugins: [],
};
