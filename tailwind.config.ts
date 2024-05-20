import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        'primary-orange': '#FF6007'
      },
      fontFamily: {
        'pretendard-black': ['Pretendard-Black'],
        'pretendard-extrabold': ['Pretendard-ExtraBold'],
        'pretendard-bold': ['Pretendard-Bold'],
        'pretendard-semibold': ['Pretendard-SemiBold'],
        'pretendard-medium': ['Pretendard-Medium'],
        'pretendard-regular': ['Pretendard-Regular'],
        'pretendard-light': ['Pretendard-Light'],
        'pretendard-extralight': ['Pretendard-ExtraLight'],
        'pretendard-thin': ['Pretendard-Thin'],
      },
    },
  },
  plugins: [],
};
export default config;
