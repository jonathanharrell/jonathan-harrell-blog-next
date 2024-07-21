import type { Config } from "tailwindcss";
import TailwindTypography from "@tailwindcss/typography";

const config: Config = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.mdx",
  ],
  theme: {
    fontFamily: {
      "mercury": ["Mercury", "serif"],
      "requiem": ["RequiemTDA", "RequiemTDB", "serif"],
      "sentinel": ["Sentinel", "sans-serif"],
    },
    extend: {},
  },
  plugins: [
    TailwindTypography,
  ],
};

export default config;
