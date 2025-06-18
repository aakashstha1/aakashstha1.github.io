/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#001F3F",
        secondary: "#40E0D0",
        tertiary: "#00FF7F",
        silver: "#C0C0C0",
      },
    },
    screens: {
      sm: { max: "639px" },
      md: { max: "767px" },
      lg: { max: "1023px" },
    },
  },

  plugins: [],
};
