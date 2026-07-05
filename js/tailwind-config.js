// Tailwind CDN configuration: custom colors, fonts, and animations.
// Must load after the Tailwind CDN script in index.html.
tailwind.config = {
  theme: {
    extend: {
      colors: {
        primary: '#f59e0b',
        accent: '#fb923c',
        steel: '#94a3b8',
        dark: '#0d1117',
        surface: '#161b22',
        card: '#1c2331',
        border: '#2d3748',
      },
      fontFamily: {
        display: ['Rajdhani', 'sans-serif'],
        mono: ['IBM Plex Mono', 'monospace'],
        sans: ['DM Sans', 'sans-serif'],
      },
      animation: {
        'blob': 'blob 9s infinite',
        'fade-in-up': 'fadeInUp 0.5s ease-out forwards',
        'fade-in': 'fadeIn 0.4s ease-out forwards',
        'scan': 'scan 3s linear infinite',
      },
      keyframes: {
        blob: {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
          '100%': { transform: 'translate(0px, 0px) scale(1)' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
      },
    },
  },
};
