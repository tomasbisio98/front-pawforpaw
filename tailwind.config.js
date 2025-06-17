/** @type {import('tailwindcss').Config} */
module.exports = {

    

  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  theme: {
    extend: {
      colors: {
        verdeOscuro: "#2C5959",
        verdeClaro: "#33A691",
        verdeSuave: "#B8D9C4",
        marronOscuro: "#593325",
        blancoSuave: "#F2F2F2",
        negro: "#171717",
        blancoConVerde: "#e4f7ec",
      },
      fontFamily: {
        geist: "var(--font-geist-sans)",
        mono: "var(--font-geist-mono)",
        nunito: "var(--font-nunito)",
        nunitoSans: "var(--font-nunito-sans)",
      },
    },
  },
  plugins: [],
};

