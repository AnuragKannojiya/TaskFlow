/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#17202a",
        brand: "#2563eb",
        mint: "#0f766e"
      }
    }
  },
  plugins: []
};
