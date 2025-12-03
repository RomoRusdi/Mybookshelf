import { useEffect } from 'react'; // Tambah useEffect
import { Link, useLocation } from 'react-router-dom';
import { Home, Search, BookOpen, Heart, User } from 'lucide-react';

export default function Layout({ children }) {
  const location = useLocation();

  // Scroll ke atas setiap kali ganti halaman
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const menus = [
    { path: '/', icon: <Home size={20} />, label: 'Beranda' },
    { path: '/search', icon: <Search size={20} />, label: 'Cari' },
    { path: '/authors', icon: <BookOpen size={20} />, label: 'Penulis' },
    { path: '/favorites', icon: <Heart size={20} />, label: 'Favorit' },
    { path: '/profile', icon: <User size={20} />, label: 'Profil' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className="min-h-screen flex bg-paper text-ink font-sans">
      
      {/* === DESKTOP SIDEBAR === */}
      <aside className="hidden md:flex flex-col w-64 bg-surface border-r border-stone-100 fixed h-full z-20 shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
        <div className="p-8">
          <h1 className="text-2xl font-black text-ink tracking-tight flex items-center gap-3 font-serif">
            <div className="bg-primary text-white p-2 rounded-lg shadow-sm">
              <BookOpen size={24} />
            </div>
            MyBookshelf
          </h1>
          <p className="text-xs text-gray-400 mt-2 ml-1">Koleksi Bacaan Pribadi</p>
        </div>

        <nav className="flex-1 px-4 space-y-2">
          {menus.map((menu) => (
            <Link
              key={menu.path}
              to={menu.path}
              className={`flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-300 font-bold ${
                isActive(menu.path)
                  ? 'bg-[#FCEFE3] text-[#8B4513] shadow-sm translate-x-2'
                  : 'text-gray-500 hover:bg-[#FFFBF7] hover:text-[#8B4513] hover:translate-x-1'
              }`}
            >
              <span className={isActive(menu.path) ? 'text-[#D97706]' : 'text-gray-400'}>
                {menu.icon}
              </span>
              <span>{menu.label}</span>
            </Link>
          ))}
        </nav>

        <div className="p-8">
          <div className="bg-[#FFFBF7] p-5 rounded-2xl border border-[#FCEFE3]">
            <p className="text-xs font-bold text-[#D97706] mb-2 uppercase tracking-wide">Quote Hari Ini</p>
            <p className="text-sm italic text-gray-600 leading-relaxed">"Buku adalah jendela dunia."</p>
          </div>
        </div>
      </aside>

      {/* === MAIN CONTENT === */}
      <main className="flex-1 md:ml-64 w-full relative">
        
        {/* Header Mobile */}
        <header className="md:hidden bg-surface/90 backdrop-blur-md p-4 sticky top-0 z-30 border-b border-stone-100 flex items-center gap-3 shadow-sm">
          <div className="bg-primary text-white p-2 rounded-lg shadow-sm">
            <BookOpen size={20} />
          </div>
          <h1 className="text-xl font-bold text-ink font-serif tracking-tight">MyBookshelf</h1>
        </header>

        {/* KUNCI ANIMASI ADA DI SINI:
            1. key={location.pathname}: Memaksa React me-render ulang div ini saat URL berubah.
            2. className="page-transition": Memicu animasi CSS yang baru kita buat.
        */}
        <div 
          key={location.pathname} 
          className="p-4 md:p-8 max-w-7xl mx-auto pb-24 md:pb-8 page-transition"
        >
          {children}
        </div>

      </main>

      {/* === MOBILE BOTTOM NAV === */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-stone-200 z-50 pb-safe shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
        <div className="flex justify-around items-center h-16">
          {menus.map((menu) => (
            <Link
              key={menu.path}
              to={menu.path}
              className={`flex flex-col items-center p-2 transition-all duration-300 ${
                isActive(menu.path) 
                  ? 'text-[#8B4513] -translate-y-1 font-bold'
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <span className={isActive(menu.path) ? 'bg-[#FCEFE3] p-1.5 rounded-xl text-[#D97706]' : ''}>
                {menu.icon}
              </span>
              <span className="text-[10px] mt-1">{menu.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}