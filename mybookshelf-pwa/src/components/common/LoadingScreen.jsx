import { BookOpen } from 'lucide-react';

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-[9999] bg-paper flex flex-col items-center justify-center transition-opacity duration-500">
      
      {/* Container Logo & Animasi */}
      <div className="flex flex-col items-center animate-pulse">
        {/* Logo Buku Besar */}
        <div className="bg-primary p-4 rounded-3xl shadow-lg mb-6 rotate-3">
          <BookOpen size={64} className="text-white" />
        </div>
        
        {/* Judul Aplikasi */}
        <h1 className="text-3xl font-serif font-black text-ink tracking-tight mb-2">
          MyBookshelf
        </h1>
        <p className="text-sm text-gray-500 font-sans tracking-widest uppercase mb-12">
          Koleksi Bacaan Pribadi
        </p>
      </div>

      {/* Spinner / Loading Indicator */}
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 border-4 border-secondary border-t-primary rounded-full animate-spin"></div>
        <p className="text-xs text-gray-400 animate-pulse">Memuat data...</p>
      </div>

    </div>
  );
}