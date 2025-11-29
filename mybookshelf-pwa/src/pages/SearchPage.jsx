import { useState, useEffect } from 'react';
import { Search as SearchIcon } from 'lucide-react';
import useBooks from '../hooks/useBooks';
import BookCard from '../components/books/BookCard';

export default function SearchPage() {
  const { books, loading } = useBooks(); // Ambil semua buku dulu
  const [query, setQuery] = useState('');
  const [filteredBooks, setFilteredBooks] = useState([]);

  // Logic Filter
  useEffect(() => {
    if (query.trim() === '') {
      setFilteredBooks(books); // Jika kosong, tampilkan semua
    } else {
      const results = books.filter(book => 
        book.title.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredBooks(results);
    }
  }, [query, books]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Cari Buku</h1>
      
      {/* Input Pencarian */}
      <div className="relative mb-6">
        <SearchIcon className="absolute left-3 top-3 text-gray-400" size={20} />
        <input 
          type="text" 
          placeholder="Judul buku..." 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full pl-10 p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 shadow-sm"
        />
      </div>

      {/* Hasil Pencarian */}
      {loading ? (
        <p className="text-center text-gray-400">Memuat data...</p>
      ) : (
        <div className="space-y-3">
          {filteredBooks.length > 0 ? (
            filteredBooks.map(book => (
              <BookCard key={book.id} book={book} />
            ))
          ) : (
            <div className="text-center py-10 text-gray-400">
              <p>Buku tidak ditemukan 😔</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}