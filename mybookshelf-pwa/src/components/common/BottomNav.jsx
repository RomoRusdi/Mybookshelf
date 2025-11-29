import { Home, Search, BookOpen, Heart, User } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export default function BottomNav() {
  const location = useLocation();
  
  // Fungsi untuk mengecek menu aktif
  const isActive = (path) => location.pathname === path 
    ? "text-primary scale-110" 
    : "text-gray-400 hover:text-gray-600";

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50 pb-safe">
      <div className="flex justify-around items-center h-16">
        
        <Link to="/" className={`flex flex-col items-center p-2 transition-all ${isActive('/')}`}>
          <Home size={24} />
          <span className="text-[10px] mt-1 font-medium">Home</span>
        </Link>

        <Link to="/search" className={`flex flex-col items-center p-2 transition-all ${isActive('/search')}`}>
          <Search size={24} />
          <span className="text-[10px] mt-1 font-medium">Cari</span>
        </Link>

        <Link to="/authors" className={`flex flex-col items-center p-2 transition-all ${isActive('/authors')}`}>
          <BookOpen size={24} />
          <span className="text-[10px] mt-1 font-medium">Penulis</span>
        </Link>

        <Link to="/favorites" className={`flex flex-col items-center p-2 transition-all ${isActive('/favorites')}`}>
          <Heart size={24} />
          <span className="text-[10px] mt-1 font-medium">Favorit</span>
        </Link>

        <Link to="/profile" className={`flex flex-col items-center p-2 transition-all ${isActive('/profile')}`}>
          <User size={24} />
          <span className="text-[10px] mt-1 font-medium">Profil</span>
        </Link>

      </div>
    </div>
  );
}