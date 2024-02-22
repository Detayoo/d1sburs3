import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/modals/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary-black": "var(--primary-black)",
        "primary-wine": "var(--primary-wine)",
        "border-gray": "var(--border-gray)",
        "otp-gray": "var(--otp-gray)",
        "disabled-btn": "var(--disabled-btn)",
        overlay: "var(--overlay)",
        "faint-green": "var(--faint-green)",
        "faint-gray": "var(--faint-gray)",
        "light-wine": "var(--light-wine)",
        "light-text": "var(--light-text)",
        "success-bg": "var(--success-bg)",
        "success-text": "var(--success-text)",
        "failure-text": "var(--failure-text)",
        "failure-bg": "var(--failure-bg)",
        "light-green": "var(--light-green)",
        "input-border": "var(--input-border)",
        "filled-input": "var(--filled-input)",
      },
      fontFamily: {
        "InterTight-Regular": "InterTight-Regular",
        "InterTight-Medium": "InterTight-Medium",
        "InterTight-SemiBold": "InterTight-SemiBold",
      },
    },
  },
  plugins: [],
};
export default config;
