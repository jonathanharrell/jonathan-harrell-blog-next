import type { Config } from "tailwindcss";
import TailwindTypography from "@tailwindcss/typography";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      "mercury": ["Mercury", "serif"],
      "sentinel": ["Sentinel", "sans-serif"],
    },
    extend: {},
  },
  plugins: [
    TailwindTypography,
  ],
};

export default config;
