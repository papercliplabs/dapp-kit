const { fontFamily } = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
export default {
  prefix: "dk-", // Add this line
  darkMode: ["class"],
  content: ["./src/**/*.tsx"],
  theme: {
    container: {
      center: "true",
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--dk-border))",
        input: "hsl(var(--dk-input))",
        ring: "hsl(var(--dk-ring))",
        background: "hsl(var(--dk-background))",
        foreground: "hsl(var(--dk-foreground))",
        primary: {
          DEFAULT: "hsl(var(--dk-primary))",
          foreground: "hsl(var(--dk-primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--dk-secondary))",
          foreground: "hsl(var(--dk-secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--dk-destructive))",
          foreground: "hsl(var(--dk-destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--dk-muted))",
          foreground: "hsl(var(--dk-muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--dk-accent))",
          foreground: "hsl(var(--dk-accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--dk-popover))",
          foreground: "hsl(var(--dk-popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--dk-card))",
          foreground: "hsl(var(--dk-card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--dk-radius)",
        md: "calc(var(--dk-radius) - 2px)",
        sm: "calc(var(--dk-radius) - 4px)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
