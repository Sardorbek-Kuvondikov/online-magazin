/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html"],
  theme: {
    extend: {
      container: {
        center: true,
        padding: "12px",
      },
      boxShadow: {
        "box-shadow": " -5px 6px 5px 0px rgba(0,0,0,0.21);",
      },
    },
  },
  plugins: [],
};
