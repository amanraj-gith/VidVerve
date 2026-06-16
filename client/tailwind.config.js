/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          bg:         '#0C0A07',
          surface:    '#161310',
          card:       '#1E1A15',
          border:     '#2C271F',
          accent:     '#F0A500',
          'accent-2': '#E05A3A',
          text:       '#EDE9E2',
          muted:      '#7A7065',
          faint:      '#3D3830',
        },
      },
      fontFamily: {
        display: ['"DM Serif Display"', 'serif'],
        ui:      ['Syne', 'sans-serif'],
        body:    ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      animation: {
        'fade-up': 'fadeUp 0.45s ease forwards',
        shimmer:   'shimmer 1.8s linear infinite',
      },
      keyframes: {
        fadeUp: {
          from: { opacity: 0, transform: 'translateY(18px)' },
          to:   { opacity: 1, transform: 'translateY(0)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-400px 0' },
          '100%': { backgroundPosition: '400px 0' },
        },
      },
      boxShadow: {
        'amber-sm': '0 0 0 1px rgba(240,165,0,0.15), 0 4px 24px rgba(240,165,0,0.06)',
        'amber-md': '0 0 0 1px rgba(240,165,0,0.25), 0 8px 32px rgba(240,165,0,0.12)',
      },
    },
  },
  plugins: [],
};
