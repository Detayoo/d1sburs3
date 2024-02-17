import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./layouts/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/modals/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "dashboard-1": "url('/images/dash-bg-1.png')",
        "dashboard-2": "url('/images/dash-bg-2.png')",
      },
      colors: {
        "primary-black": "var(--primary-black)",
        "primary-wine": "var(--primary-wine)",
        "deep-green": "var(--deep-green)",
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
      },
      fontFamily: {
        "Onest-Regular": "Onest-Regular",
        "Onest-Medium": "Onest-Medium",
        "Onest-SemiBold": "Onest-SemiBold",
      },
    },
  },
  plugins: [],
};
export default config;
