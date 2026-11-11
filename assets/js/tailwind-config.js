// Our Tailwind settings (colours and fonts). Every page loads this straight after Tailwind itself.
tailwind.config = {
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eef6ff',
          100: '#d9eaff',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          900: '#1e3a8a',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        // Narrower font for the big headings
        display: ['"Inter Tight"', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0) rotate(var(--r, 0deg))' },
          '50%': { transform: 'translateY(-10px) rotate(var(--r, 0deg))' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
      },
    },
  },
};
