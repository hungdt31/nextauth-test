import type { Config } from 'tailwindcss'

const config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      boxShadow: {
        "inner-image": "inset 0 0 100px rgb(40,50,50)"
      },
      backgroundImage: {
        'community': "url('/music.webp')"
      },
      colors: {
        collection: 'hsl(var(--collection-color))',
        rise: 'hsl(var(--rise-color))',
        outline: 'hsl(var(--outline-color))',
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        "rise": {
          to: {
            "text-shadow": "0em 0.01em hsl(var(--rise-color)), 0em 0.02em hsl(var(--rise-color)), 0em 0.02em 0.03em hsl(var(--rise-color)),-0.01em 0.01em #333, -0.02em 0.02em #333, -0.03em 0.03em #333,-0.04em 0.04em #333, -0.01em -0.01em 0.03em #000, -0.02em -0.02em 0.03em #000,-0.03em -0.03em 0.03em #000",
            transform: "translateY(-0.025em) translateX(0.04em)"
          }
        },
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'toggle-from-right': {
          from: { transform: 'translateX(5px)'},
          to: { transform: 'translateX(0px)' }
        },
        'toggle-from-left': {
          from: { transform: 'translateX(-5px)'},
          to: { transform: 'translateX(0px)' }
        },
        "tracking-in-contract": {
          "0%" : {
            "letter-spacing": "1em",
            "opacity": "0"
          },
          "40%": {
            "opacity": "0.6",
            "letter-spacing": "normal"
          },
          "100%": {
            "letter-spacing": "normal",
            "opacity": "1"
          }
        },
        "scale-up-hor-center": {
          from: { transfrom: "scaleX(0.4)" },
          to: { transfrom: "scaleX(1)" }
        },
        "appear-from-right": {
          from : { transfrom: "translateX(5px)" },
          to: { transfrom: "translateX(0)" }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'toggle-from-right': 'toggle-from-right 0.3s ease-out',
        'toggle-from-left': 'toggle-from-left 0.3s ease-out',
        "tracking-in-contract": "tracking-in-contract 3s ease-out",
        "rise-animation": "rise 2s ease-in-out 0.5s forwards",
        "appear-from-right": "appear-from-right 2s ease-out",
        "scale-up-hor-center": "scale-up-hor-center 0.4s cubic-bezier(0.390, 0.575, 0.565, 1.000) both",
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config

export default config
