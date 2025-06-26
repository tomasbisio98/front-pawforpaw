/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
  "bg-green-100", "text-green-700",
  "bg-red-100", "text-red-700",
  "bg-yellow-100", "text-yellow-700",
  "bg-gray-100", "text-gray-700",
  "bg-gray-200", "text-gray-800",
  ],
  theme: {
    extend: {
      colors: {
        verdeOscuro: "#2C5959",
        verdeClaro: "#33A691",
        verdeSuave: "#B8D9C4",
        verdeMOscuro: "#1B9780", // Ojo: estaba sin # al inicio
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

