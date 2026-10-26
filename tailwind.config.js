/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          DEFAULT: '#183E35', // Refined brand forest green
          dark: '#0F2923',
          light: '#225247',
          emerald: '#2D7A57',
          deep: '#0B1E19',
          50: '#F2F7F5',
          100: '#E1EFEA',
          200: '#C2DFD4',
          800: '#14342D',
          900: '#0F2621',
          950: '#071813',
        },
        ivory: {
          DEFAULT: '#F7F5F0', // Refined warm ivory
          light: '#FFFFFF',
          dark: '#EEEAE1',
          warm: '#E6E0D4',
          border: 'rgba(24, 62, 53, 0.08)',
          card: '#FFFFFF',
        },
        amber: {
          DEFAULT: '#D7A66A', // Refined muted amber
          hover: '#C29153',
          light: '#E5BE8C',
          soft: '#FBF3E8',
          50: '#FFFDF9',
        },
        stone: {
          50: '#FAF9F6',
          100: '#F3F1EC',
          200: '#E7E3D8',
          300: '#D5CFC2',
          400: '#A49D8E',
          500: '#756F62',
          600: '#585348',
          700: '#403C34',
          800: '#2C2923',
          900: '#1B1916',
        },
        gold: {
          DEFAULT: '#D4AF37',
          light: '#F5E6B3',
          dark: '#9A7B1C',
          glow: 'rgba(212, 175, 55, 0.35)',
        },
        obsidian: {
          DEFAULT: '#081712',
          light: '#0E241D',
          dark: '#040C09',
        },
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Outfit', 'Plus Jakarta Sans', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'glass': '0 8px 32px rgba(24, 62, 53, 0.06), 0 1px 2px rgba(0, 0, 0, 0.02)',
        'glass-hover': '0 16px 40px -8px rgba(24, 62, 53, 0.14), 0 2px 6px rgba(0, 0, 0, 0.04)',
        'glass-float': '0 20px 48px -12px rgba(24, 62, 53, 0.20), 0 4px 16px rgba(0, 0, 0, 0.06)',
        'soft': '0 2px 10px -2px rgba(24, 62, 53, 0.04), 0 1px 3px -1px rgba(0, 0, 0, 0.02)',
        'card': '0 4px 20px -2px rgba(24, 62, 53, 0.06), 0 2px 6px -1px rgba(0, 0, 0, 0.03)',
        'lift': '0 12px 32px -4px rgba(24, 62, 53, 0.10), 0 4px 12px -2px rgba(0, 0, 0, 0.04)',
        'modal': '0 30px 60px -15px rgba(15, 41, 35, 0.35)',
        'glow-emerald': '0 0 35px -5px rgba(45, 122, 87, 0.35)',
        'glow-amber': '0 0 35px -5px rgba(215, 166, 106, 0.40)',
        'glow-gold': '0 0 35px -5px rgba(212, 175, 55, 0.40)',
        'glass-luxury': '0 25px 50px -12px rgba(15, 41, 35, 0.18), inset 0 1px 1px 0 rgba(255, 255, 255, 0.9)',
      },
      backdropBlur: {
        'xs': '2px',
        'md': '14px',
        'lg': '20px',
        'xl': '28px',
        '2xl': '40px',
      },
      animation: {
        'pulse-slow': 'pulse 5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float-slow': 'floatSlow 4.5s ease-in-out infinite',
        'float-delayed': 'floatSlow 4.5s ease-in-out 2.25s infinite',
      },
      keyframes: {
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        }
      }
    },
  },
  plugins: [],
}
