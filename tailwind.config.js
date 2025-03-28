/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        beige: "var(--beige)",
        "beige-70": "var(--beige-70)",
      },
      fontSize: {
        h1: "40px",
        "h1-small": "30px",
        h2: "20px",
        "body-large": "18px",
        body: "16px",
        "body-small": "14px",
        technical: "13px",
        "technical-small": "10px",
      },
      fontFamily: {
        schoolbook: ["Century Schoolbook", "serif"],
        century: ["Century Schoolbook", "Georgia", "serif"],
        arial: ["var(--font-arial)", "Arial", "sans-serif"],
      },
      letterSpacing: {
        tight: "-0.02em",
        normal: "0",
        wide: "0.05em",
      },
      lineHeight: {
        normal: "normal",
        relaxed: "1.5",
      },
      margin: {
        10: "10px",
        15: "15px",
        20: "20px",
        25: "25px",
        50: "50px",
        100: "100px",
        150: "150px",
      },
      height: {
        30: "30px",
        50: "50px",
      },
      width: {
        30: "30px",
      },
      gap: {
        10: "10px",
        20: "20px",
        25: "25px",
      },
      padding: {
        10: "10px",
        25: "25px",
        50: "50px",
      },
    },
  },
  plugins: [],
};
