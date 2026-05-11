/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans:      ["'Inter'", "sans-serif"],
        hero:      ["'Dancing Script'", "'Caveat'", "cursive"],
        title:     ["'Caveat'", "'Kalam'", "cursive"],
        heading:   ["'Kalam'", "'Patrick Hand'", "cursive"],
        journal:   ["'Patrick Hand'", "cursive"],
        script:    ["'Sacramento'", "'Great Vibes'", "cursive"],
        signature: ["'Great Vibes'", "cursive"],
        note:      ["'Shadows Into Light'", "cursive"],
      },
      letterSpacing: {
        journal: "0.02em",
        hero:    "-0.015em",
        wide2:   "0.06em",
      },
      lineHeight: {
        journal: "1.75",
        heading: "1.15",
      },
      colors: {
        primary: "#7c3aed",
        secondary: "#d946ef",
        accent: "#67e8f9",
      },
      animation: {
        "fade-up":    "fadeInUp 0.65s cubic-bezier(0.4,0,0.2,1) both",
        "fade-in":    "fadeIn 0.5s ease both",
        "scale-in":   "scaleIn 0.4s cubic-bezier(0.4,0,0.2,1) both",
        "float":      "float 4s ease-in-out infinite",
        "pulse-glow": "pulseGlow 2.5s ease-in-out infinite",
        "shimmer":    "shimmer 1.8s ease-in-out infinite",
        "write-in":   "writeIn 1s ease both",
      },
      keyframes: {
        fadeInUp:  { from: { opacity:"0", transform:"translateY(24px)" }, to: { opacity:"1", transform:"translateY(0)" } },
        fadeIn:    { from: { opacity:"0" }, to: { opacity:"1" } },
        scaleIn:   { from: { opacity:"0", transform:"scale(0.96)" }, to: { opacity:"1", transform:"scale(1)" } },
        float:     { "0%,100%": { transform:"translateY(0)" }, "50%": { transform:"translateY(-8px)" } },
        pulseGlow: { "0%,100%": { boxShadow:"0 0 20px rgba(139,92,246,0.3)" }, "50%": { boxShadow:"0 0 40px rgba(139,92,246,0.6)" } },
        shimmer:   { "0%": { backgroundPosition:"-200% 0" }, "100%": { backgroundPosition:"200% 0" } },
        writeIn:   { from: { opacity:"0", transform:"translateX(-10px) skewX(-3deg)" }, to: { opacity:"1", transform:"translateX(0) skewX(0)" } },
      },
    },
  },
  plugins: [],
};