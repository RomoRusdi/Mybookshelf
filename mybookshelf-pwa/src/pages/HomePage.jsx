import { useState, useEffect } from 'react';
import useBooks from '../hooks/useBooks';
import authorService from '../services/authorService';
import BookCard from '../components/books/BookCard';
import { BookOpen, Plus, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function HomePage() {
  const { books, loading, error } = useBooks();
  
  // State untuk Statistik
  const [totalAuthors, setTotalAuthors] = useState(0);
  const [totalFavorites, setTotalFavorites] = useState(0);

  // Load Data Tambahan
  useEffect(() => {
    // 1. Hitung Penulis
    const fetchAuthors = async () => {
      try {
        const data = await authorService.getAllAuthors();
        setTotalAuthors(data.length);
      } catch (err) {
        console.error("Gagal hitung penulis");
      }
    };
    fetchAuthors();

    // 2. Hitung Favorit dari LocalStorage
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setTotalFavorites(favorites.length);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen pb-20">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-center text-red-500">
        <p>Gagal memuat data.</p>
        <p className="text-sm mt-2">Pastikan backend berjalan!</p>
      </div>
    );
  }

  return (
    <div className="space-y-10 relative min-h-screen pb-24">
      
      {/* === 1. BANNER MODERN === */}
      <div className="bg-gradient-to-r from-[#FAE8D6] to-[#FCEFE3] p-8 md:p-12 rounded-3xl relative overflow-hidden shadow-sm">
        {/* Dekorasi Background */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/40 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
        
        <div className="relative z-10 max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-serif font-extrabold text-ink mb-3 leading-tight">
            Selamat Datang! 👋
          </h2>
          <p className="text-gray-600 mb-8 text-base md:text-lg">
            Temukan bacaan favoritmu dan mulailah petualangan baru hari ini.
          </p>
          
          <div className="flex flex-wrap gap-4">
            {/* PERBAIKAN DI SINI: Menggunakan Link ke /search */}
            <Link 
              to="/search" 
              className="px-6 py-3 bg-primary text-white font-bold rounded-xl shadow-lg hover:bg-[#8B4513] transition-all inline-block"
            >
              Jelajahi Koleksi
            </Link>
            
            <button className="px-6 py-3 bg-white text-ink font-bold rounded-xl shadow-sm border border-stone-100 hover:bg-gray-50 transition-all flex items-center gap-2">
              Trending <TrendingUp size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* === 2. STATISTIK CARDS === */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card Total Buku */}
        <div className="bg-white p-6 rounded-2xl shadow-soft border border-stone-50 flex flex-col items-center justify-center text-center hover:scale-[1.02] transition-transform">
          <span className="text-4xl font-bold text-accent mb-1">{books.length}</span>
          <span className="text-sm text-gray-400 font-medium">Total Buku</span>
        </div>

        {/* Card Favorit */}
        <div className="bg-white p-6 rounded-2xl shadow-soft border border-stone-50 flex flex-col items-center justify-center text-center hover:scale-[1.02] transition-transform">
          <span className="text-4xl font-bold text-red-500 mb-1">{totalFavorites}</span>
          <span className="text-sm text-gray-400 font-medium">Favorit</span>
        </div>

        {/* Card Penulis */}
        <div className="bg-white p-6 rounded-2xl shadow-soft border border-stone-50 flex flex-col items-center justify-center text-center hover:scale-[1.02] transition-transform">
          <span className="text-4xl font-bold text-teal-600 mb-1">{totalAuthors}</span>
          <span className="text-sm text-gray-400 font-medium">Penulis</span>
        </div>
      </div>

      {/* === 3. BUKU TERBARU (GRID) === */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-serif font-bold text-xl text-ink flex items-center gap-2">
            <BookOpen size={24} className="text-primary" />
            Buku Terbaru
          </h3>
          <Link to="/search" className="text-sm font-bold text-primary hover:underline">
            Lihat Semua →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {books.length === 0 ? (
            <div className="col-span-full py-20 text-center text-gray-400 bg-white rounded-2xl border-2 border-dashed border-gray-100">
              <p>Belum ada buku tersedia.</p>
            </div>
          ) : (
            books.map((book) => (
              <BookCard key={book.id} book={book} />
            ))
          )}
        </div>
      </div>

      {/* TOMBOL FAB */}
      <Link 
        to="/add-book" 
        className="fixed bottom-24 right-6 md:bottom-10 md:right-10 bg-primary text-white p-4 rounded-2xl shadow-xl hover:bg-[#8B4513] hover:scale-110 transition-all z-50 flex items-center justify-center"
      >
        <Plus size={28} />
      </Link>

    </div>
  );
}