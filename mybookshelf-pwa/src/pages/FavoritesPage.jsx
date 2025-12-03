import { useState, useEffect } from 'react';
import bookService from '../services/bookService';
import BookCard from '../components/books/BookCard';
import { Heart, Trash2 } from 'lucide-react';

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      const favIds = JSON.parse(localStorage.getItem('favorites') || '[]');

      if (favIds.length === 0) {
        setFavorites([]);
        setLoading(false);
        return;
      }

      try {
        const bookPromises = favIds.map(async (id) => {
          try {
            return await bookService.getBookById(id);
          } catch (error) {
            return null;
          }
        });

        const results = await Promise.all(bookPromises);
        
        const validBooks = results.filter(book => book !== null);
        
        setFavorites(validBooks);

        const validIds = validBooks.map(b => b.id);
        if (validIds.length !== favIds.length) {
          localStorage.setItem('favorites', JSON.stringify(validIds));
        }

      } catch (error) {
        console.error("Gagal memuat favorit:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  const handleClearFavorites = () => {
    if (confirm("Hapus semua daftar favorit?")) {
      localStorage.removeItem('favorites');
      setFavorites([]);
    }
  };

  return (
    <div className="p-4 pb-24 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-serif font-bold text-ink flex items-center gap-2">
          <Heart className="text-red-500 fill-red-500" />
          Koleksi Favorit
        </h1>
        {favorites.length > 0 && (
          <button onClick={handleClearFavorites} className="text-sm text-red-500 hover:underline flex items-center gap-1">
            <Trash2 size={14} /> Reset
          </button>
        )}
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      ) : favorites.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {favorites.map((book, index) => ( // Ambil index
            <BookCard key={book.id} book={book} index={index} /> // Kirim index
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-3xl border-2 border-dashed border-stone-200">
          <p className="text-gray-400 font-medium mb-2">Belum ada buku favorit.</p>
          <p className="text-sm text-gray-300 px-6">
            Buku yang Anda sukai akan muncul di sini. <br/>
            (Jika buku dihapus dari database, otomatis hilang dari sini).
          </p>
        </div>
      )}
    </div>
  );
}