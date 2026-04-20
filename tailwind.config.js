/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: { 950: "#060D1F", 900: "#0A1628", 800: "#0F2041", 700: "#1A3160", 600: "#1E3A6E" },
        sky: { DEFAULT: "#2563EB", light: "#3B82F6", pale: "#EFF6FF" },
        gold: { DEFAULT: "#F59E0B", light: "#FCD34D", pale: "#FFFBEB" },
        slate: { 50: "#F8FAFC", 100: "#F1F5F9", 200: "#E2E8F0", 500: "#64748B", 700: "#334155", 900: "#0F172A" },
      },
      fontFamily: {
        display: ['"Inter"', 'system-ui', 'sans-serif'],
        body: ['"Inter"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: "0 1px 3px rgba(0,0,0,.08), 0 4px 12px rgba(0,0,0,.06)",
        lifted: "0 4px 16px rgba(0,0,0,.12), 0 1px 4px rgba(0,0,0,.08)",
        cta: "0 0 0 3px rgba(37,99,235,.25)",
      },
    },
  },
  plugins: [],
};
