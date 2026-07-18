/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: '#0a0f1e',
        card: '#111827',
        'accent-blue': '#3b82f6',
        'accent-green': '#10b981',
        'accent-purple': '#8b5cf6',
        'text-primary': '#f9fafb',
        'text-secondary': '#9ca3af',
        'border-color': '#1f2937',
      },
    },
  },
  plugins: [],
}
