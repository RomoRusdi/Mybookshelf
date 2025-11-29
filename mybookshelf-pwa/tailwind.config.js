/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Palet Warna Baru (Sesuai Screenshot)
        paper: '#FFFBF7',       // Background Utama (Cream sangat muda)
        surface: '#FFFFFF',     // Warna Kartu (Putih)
        primary: '#A0522D',     // Warna Tombol Utama (Sienna / Coklat Bata)
        secondary: '#F4E3CF',   // Warna Aksen/Highlight (Krem tua)
        ink: '#2D2424',         // Warna Teks (Hitam kecoklatan)
        accent: '#D97706',      // Warna Ikon/Angka (Amber/Oranye)
      },
      fontFamily: {
        serif: ['Merriweather', 'serif'],
        sans: ['Lato', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 30px rgba(0, 0, 0, 0.03)', // Bayangan sangat halus
      }
    },
  },
  plugins: [],
}