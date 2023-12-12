/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        xs: "300px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
      fontSize: {
        brand__font__size__xs: "12px",
        brand__font__size__sm: "14px",
        brand__font__size__base: "16px",
        brand__font__size__md: "18px",
        brand__font__size__lg: "20px",
        brand__font__size__xl: "24px",
        brand__font__size__2xl: "52px",
        brand__font__size__3xl: "74px",
      },
      fontFamily: {
        brand__font__family: "Public Sans",
      },
      fontWeight: {
        brand__font__light: "300",
        brand__font__regular: "400",
        brand__font__medium: "500",
        brand__font__semibold: "600",
        brand__font__bold: "700",
      },
      colors: {
        primary: "#1976D2",
        secondary: "#1565c0",
        danger: "#F70000",
        success: "green",
        brand__heading__text: "#919EAB",
        brand__detail__text: "#637381",
        brand__gray__border: "#ffffff4d",
      },
      backgroundImage: {
        login__bg: "url('../src/assets/images/background/login__page__bg.jpg')",
      },
    },
  },
  plugins: [],
};
