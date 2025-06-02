/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#EBCBFF",
        accent: "#C084FC",
        secondary: "#FAEBD7",
        secondaryAccent: "#FFCA83",
      },
      screens: {
        sm: "600px",
        md: "800px",
        lg: "1000px",
      },
    },
  },
  plugins: [],
};
