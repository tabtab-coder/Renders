/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        "primary-variant": "#1a1423",
        "primary-color": "#372549",
        "secondary-color": "#b75d69",
        "secondary-variant": "#774c60",
        plain: "#eacdc2",
        error: "#b00020",
      },
    },
  },
  plugins: [],
};
