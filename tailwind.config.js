/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      // animation: {
      //   pulsIn: "pulsIn 1.8s ease-in-out infinite",
      //   pulsOut: "pulsOut 1.8s ease-in-out infinite",
      // },
      // keyframes: {
      //   pulsIn: {
      //     "0%": {
      //       boxShadow: "inset 0 0 0 1rem #fff",
      //       opacity: "1",
      //     },
      //     "50%, 100%": {
      //       boxShadow: "inset 0 0 0 0 #fff",
      //       opacity: "0",
      //     },
      //   },
      //   pulsOut: {
      //     "0%, 50%": {
      //       boxShadow: "0 0 0 0 #fff",
      //       opacity: "0",
      //     },
      //     "100%": {
      //       boxShadow: "0 0 0 1rem #fff",
      //       opacity: "1",
      //     },
      //   },
      // },
    },
  },
  plugins: [],
};
