/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#ed7d2b",
        primary_blue: "#2b478b",
        light: "#FAF9F6",
        cream: "#EEE6DD",
        text: "#eef6ff",
        btn_hover: "#f19655",
      },
    },
  },
  plugins: [],
};
