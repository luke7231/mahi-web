/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontSize: {
        "2xs": "0.625rem", // 아주 작은 폰트 크기
        xs: "0.6875rem", // 추가 폰트 크기 (작은 사이즈)
        sm: "0.75rem", // 작은 폰트 크기
        base: "0.8125rem", // 기준 폰트 크기 (기본 폰트 크기)
        md: "0.875rem", // 중간 폰트 크기
        lg: "1rem", // 큰 폰트 크기
        xl: "1.125rem", // 더 큰 폰트 크기
        "2xl": "1.25rem", // 두 배 큰 폰트 크기
        "3xl": "1.5rem", // 세 배 큰 폰트 크기
        "4xl": "1.875rem", // 네 배 큰 폰트 크기
        "5xl": "2.25rem", // 다섯 배 큰 폰트 크기
        "6xl": "3rem", // 여섯 배 큰 폰트 크기
        "7xl": "4rem", // 일곱 배 큰 폰트 크기
        "8xl": "5rem", // 여덟 배 큰 폰트 크기
        "9xl": "6rem", // 아홉 배 큰 폰트 크기
        "10xl": "7rem", // 열 배 큰 폰트 크기
      },
    },
  },
  plugins: [],
};
