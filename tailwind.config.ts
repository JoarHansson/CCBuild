import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      darkGray: "#767676",
      lightGray: "#D9D9D9",
      lightBlue: "#488AC6",
      darkBlue: "#112F5F",
      orange: "#EFAB2C",
      red: "#FF2D2D",
      green: "#44A036",
      inputBg: "#F9F9F9",
      textBlack: "#151515",
      textWhite: "#FFFFFF",
    },

    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
};
export default config;
