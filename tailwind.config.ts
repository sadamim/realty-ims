import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: "1.25rem", lg: "2rem" },
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "Georgia", "serif"],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // RealtyFocus brand palette.
        // navy and red are sampled from the live site at realtyfocus.info:
        // the logo wordmark and headings are rgb(9,5,69), the Submit button and
        // accents are rgb(192,15,27). Every component already references these
        // tokens, so the whole site re-brands from these six lines.
        realty: {
          red: "#c00f1b",
          redDark: "#990c15",
          redLight: "#d93b46",
          navy: "#090545",
          navySoft: "#171150",
          darkNavy: "#060331",
          slate: "#5c6472",
          lightGray: "#f6f5f3",
          cream: "#faf8f5",
          gold: "#c9a227",
          goldLight: "#e3c765",
          green: "#9aa93e",
          blue: "#77b1c3",
          line: "#e8e4de",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        "2xl": "1.25rem",
        "3xl": "1.75rem",
      },
      boxShadow: {
        soft: "0 1px 2px rgba(9,5,69,.04), 0 8px 24px -12px rgba(9,5,69,.12)",
        card: "0 2px 6px rgba(9,5,69,.05), 0 18px 40px -24px rgba(9,5,69,.28)",
        lift: "0 8px 20px rgba(9,5,69,.08), 0 32px 64px -28px rgba(9,5,69,.38)",
        glass: "0 24px 60px -20px rgba(6,3,49,.45)",
        ring: "0 0 0 1px rgba(9,5,69,.06)",
      },
      letterSpacing: {
        luxe: "0.22em",
      },
      transitionTimingFunction: {
        luxe: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "ken-burns": {
          "0%": { transform: "scale(1) translate3d(0,0,0)" },
          "100%": { transform: "scale(1.12) translate3d(-1.5%, -1.5%, 0)" },
        },
        shimmer: {
          "100%": { transform: "translateX(200%)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        "fade-up": {
          from: { opacity: "0", transform: "translateY(18px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "scroll-cue": {
          "0%": { transform: "translateY(0)", opacity: "0" },
          "35%": { opacity: "1" },
          "100%": { transform: "translateY(14px)", opacity: "0" },
        },
        "marquee": {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "ken-burns": "ken-burns 18s ease-out forwards",
        shimmer: "shimmer 2.2s infinite",
        float: "float 5s ease-in-out infinite",
        "fade-up": "fade-up .7s cubic-bezier(0.22,1,0.36,1) both",
        "scroll-cue": "scroll-cue 1.8s ease-in-out infinite",
        marquee: "marquee 28s linear infinite",
      },
      backgroundImage: {
        'footer': "url('/images/footer-bg.webp')",
        'hero': "url('/images/slider-image.webp')",
        'about': "url('/images/about-bg.jpeg')",
        'gold-line': "linear-gradient(90deg, transparent, #c9a227, transparent)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
