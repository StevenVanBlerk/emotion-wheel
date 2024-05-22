import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#EEF3F6",
        text: "#222",
        primary: "#6C8B76",
        primaryText: "#fff",
        secondary: "#7FA28A", // dayne williams green
        secondaryText: "#000",
        surfaceBackground: "#FFFFFF",
        surfaceForeground: "#F9FAFB",
        surfaceBorder: "rgb(228, 235, 239)",
      },
      fontFamily: {
        raleway: ['"Raleway"', "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
