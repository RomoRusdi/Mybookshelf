/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: '#FFFBF7',      
        surface: '#FFFFFF',
        primary: '#A0522D',  
        secondary: '#F4E3CF', 
        ink: '#2D2424',        
        accent: '#D97706',     
      },
      fontFamily: {
        serif: ['Merriweather', 'serif'],
        sans: ['Lato', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 30px rgba(0, 0, 0, 0.03)',
      }
    },
  },
  plugins: [],
}