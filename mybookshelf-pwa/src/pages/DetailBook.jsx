import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, User, Star, Calendar, Save, Trash2, Edit } from 'lucide-react';
import toast from 'react-hot-toast'; // Impor Toast
import bookService from '../services/bookService';

export default function DetailBook() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [ratingInput, setRatingInput] = useState(0);
  const [isRatingMode, setIsRatingMode] = useState(false);

  // Fetch Data
  const fetchDetail = async () => {
    try {
      const data = await bookService.getBookById(id);
      setBook(data);
      setRatingInput(data.rating || 0);
    } catch (error) {
      console.error("Error:", error);
      toast.error("Gagal memuat detail buku"); // Toast Error
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchDetail(); }, [id]);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    if (favorites.includes(id)) setIsFavorite(true);
  }, [id]);

  const toggleFavorite = () => {
    let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    
    if (isFavorite) {
      favorites = favorites.filter(favId => favId !== id);
      toast.success("Dihapus dari favorit"); // Notifikasi Hapus
    } else {
      favorites.push(id);
      toast.success("Ditambahkan ke favorit"); // Notifikasi Tambah
    }
    
    localStorage.setItem('favorites', JSON.stringify(favorites));
    setIsFavorite(!isFavorite);
  };

  const handleUpdateRating = async () => {
    try {
      await bookService.updateBookRating(id, ratingInput);
      setIsRatingMode(false);
      fetchDetail();
      toast.success('Rating berhasil disimpan!'); // Toast Success
    } catch (error) {
      toast.error('Gagal update rating'); // Toast Error
    }
  };

  // --- FUNGSI HAPUS BUKU ---
  const handleDelete = async () => {
    // Confirm bawaan browser masih oke untuk tindakan berbahaya
    if (window.confirm("Apakah Anda yakin ingin menghapus buku ini secara permanen?")) {
      try {
        await bookService.deleteBook(id);
        toast.success("Buku berhasil dihapus"); // Toast Success
        navigate('/', { replace: true });
      } catch (error) {
        toast.error("Gagal menghapus: " + error.message); // Toast Error
      }
    }
  };

  if (loading) return <div className="p-8 text-center font-sans">Memuat...</div>;
  if (!book) return <div className="p-8 text-center font-sans">Buku tidak ditemukan.</div>;

  return (
    <div className="bg-paper min-h-screen pb-20 font-sans">
      
      {/* Header Gambar */}
      <div className="relative w-full h-[50vh] md:h-[60vh] bg-stone-200 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center blur-2xl scale-110 opacity-60" style={{ backgroundImage: `url(${book.cover_url})` }}></div>
        <div className="absolute inset-0 bg-black/20"></div>
        <img src={book.cover_url} alt={book.title} className="relative z-10 w-full h-full object-contain py-6 mx-auto shadow-lg" />
        
        {/* Tombol Back */}
        <button onClick={() => navigate(-1)} className="absolute top-4 left-4 z-20 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-md hover:bg-white transition-all">
          <ArrowLeft size={24} className="text-ink" />
        </button>

        {/* --- TOMBOL EDIT & DELETE --- */}
        <div className="absolute top-4 right-4 z-20 flex gap-2">
          <Link to={`/edit-book/${id}`} className="bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-md hover:bg-white text-blue-600 transition-all">
            <Edit size={24} />
          </Link>
          
          <button onClick={handleDelete} className="bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-md hover:bg-red-50 text-red-600 transition-all">
            <Trash2 size={24} />
          </button>
        </div>
      </div>

      <div className="p-6 md:p-8 -mt-8 relative bg-paper rounded-t-3xl shadow-[0_-5px_20px_-5px_rgba(0,0,0,0.1)]">
        <h1 className="text-2xl md:text-3xl font-serif font-bold text-ink mb-3">{book.title}</h1>
        
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-8 border-b border-stone-200 pb-6">
          <div className="flex items-center gap-1.5 bg-stone-100 px-3 py-1 rounded-full">
            <User size={16} className="text-accent" />
            <span className="font-medium">{book.authors?.name}</span>
          </div>
          
          {/* Rating Interaktif */}
          <div className="flex items-center gap-2">
            {!isRatingMode ? (
              <button 
                onClick={() => setIsRatingMode(true)}
                className="flex items-center gap-1.5 bg-yellow-50 px-3 py-1 rounded-full text-yellow-700 border border-yellow-100 hover:bg-yellow-100 transition-colors"
                title="Klik untuk ubah rating"
              >
                <Star size={16} fill="currentColor" className="text-secondary" />
                <span className="font-bold">{book.rating || '-'}</span>
              </button>
            ) : (
              <div className="flex items-center gap-2 bg-white border border-stone-300 rounded-full px-2 py-1">
                <input 
                  type="number" step="0.1" max="5" min="0" value={ratingInput}
                  onChange={(e) => setRatingInput(e.target.value)}
                  className="w-12 text-center outline-none font-bold text-secondary"
                  autoFocus
                />
                <button onClick={handleUpdateRating} className="text-green-600 hover:text-green-800"><Save size={16}/></button>
              </div>
            )}
          </div>

          <div className="flex items-center gap-1.5 text-gray-500 px-2">
            <Calendar size={16} />
            <span>{book.published_year}</span>
          </div>
        </div>

        <h3 className="font-serif font-bold text-lg text-ink mb-3">Sinopsis</h3>
        <p className="text-ink leading-relaxed mb-10 text-base opacity-90 whitespace-pre-line">
          {book.description || "Tidak ada deskripsi untuk buku ini."}
        </p>

        <button 
          onClick={toggleFavorite}
          className={`w-full md:w-auto md:px-8 py-4 font-bold rounded-xl shadow-md transition-all flex justify-center items-center gap-2 hover:scale-[1.02] active:scale-[0.98] ${
            isFavorite 
              ? 'bg-red-50 text-red-600 border-2 border-red-200 hover:bg-red-100' 
              : 'bg-primary text-white hover:bg-[#8B4513] hover:shadow-lg'
          }`}
        >
          <Star size={20} fill={isFavorite ? "currentColor" : "none"} />
          {isFavorite ? 'Hapus dari Favorit' : 'Simpan ke Favorit'}
        </button>
      </div>
    </div>
  );
}