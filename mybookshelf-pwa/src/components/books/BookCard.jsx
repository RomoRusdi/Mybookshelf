import { Star, User } from 'lucide-react';
import { Link } from 'react-router-dom';

// Terima prop 'index' untuk mengatur delay animasi
export default function BookCard({ book, index = 0 }) {
  return (
    <Link 
      to={`/book/${book.id}`} 
      // Tambahkan class 'animate-card'
      // Tambahkan style animationDelay berdasarkan index (dikalikan 100ms)
      className="animate-card group block bg-card rounded-2xl shadow-soft border border-stone-100 overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="flex p-4 gap-5">
        {/* Cover Buku */}
        <div className="w-24 h-36 flex-shrink-0 relative rounded-lg overflow-hidden shadow-md">
          <img 
            src={book.cover_url || 'https://placehold.co/100x150?text=No+Cover'} 
            alt={book.title} 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        </div>

        {/* Info Buku */}
        <div className="flex-1 flex flex-col justify-between py-1">
          <div>
            <h3 className="font-serif font-bold text-lg text-ink line-clamp-2 leading-tight mb-2 group-hover:text-secondary transition-colors">
              {book.title}
            </h3>
            <div className="flex items-center text-sm text-gray-500 gap-1.5">
              <User size={14} className="text-accent" />
              <span className="font-sans">{book.authors?.name || 'Penulis Tidak Diketahui'}</span>
            </div>
          </div>

          <div className="flex items-center justify-between mt-3 border-t border-stone-100 pt-3">
            <div className="flex items-center gap-1.5">
              <Star size={14} className="text-secondary fill-secondary" />
              <span className="text-sm font-bold text-ink">{book.rating}</span>
            </div>
            <span className="text-xs font-medium px-2 py-1 bg-paper rounded-md text-gray-500 border border-stone-200">
              {book.published_year}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}