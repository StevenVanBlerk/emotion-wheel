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
        text: "#222", //"rgb(124, 124, 128)",
        primary: "#5395D8",
        primaryText: "#fff",
        secondary: "#5EA5EE",
        secondaryText: "#000",
        surfaceBackground: "#FFFFFF",
        surfaceForeground: "#F9FAFB",
        surfaceBorder: "rgb(228, 235, 239)",
      },
      fontFamily: {
        sans: ["Graphik", "sans-serif"],
        serif: ["Merriweather", "serif"],
      },
    },
  },
  plugins: [],
};
export default config;
