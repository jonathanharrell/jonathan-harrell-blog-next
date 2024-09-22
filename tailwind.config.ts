import type { Config } from "tailwindcss";
import TailwindTypography from "@tailwindcss/typography";

const config: Config = {
  darkMode: "selector",
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.mdx",
  ],
  theme: {
    fontFamily: {
      requiem: ["RequiemTextTDA", "RequiemTextTDB", "serif"],
      "requiem-display": ["RequiemDispTDA", "RequiemDispTDB", "serif"],
      "requiem-ornaments": ["RequiemOrnaments", "serif"],
    },
    extend: {},
  },
  plugins: [TailwindTypography],
};

export default config;
