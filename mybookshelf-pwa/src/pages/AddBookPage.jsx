import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Save, ArrowLeft, Plus, X } from 'lucide-react';
import toast from 'react-hot-toast';
import authorService from '../services/authorService';
import bookService from '../services/bookService';

export default function AddBookPage() {
  const navigate = useNavigate();
  const [authors, setAuthors] = useState([]);
  const [showAuthorModal, setShowAuthorModal] = useState(false); // State untuk Popup
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    published_year: '',
    cover_url: '',
    author_id: ''
  });

  const [newAuthor, setNewAuthor] = useState({ name: '', bio: '', photo_url: '' });

  const loadAuthors = async () => {
    try {
      const data = await authorService.getAllAuthors();
      setAuthors(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadAuthors();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await bookService.createBook({ ...formData, rating: 0 });
      toast.success('Buku berhasil ditambahkan!', { duration: 3000 });
      navigate('/'); // Kembali ke Home
    } catch (error) {
      toast.error('Gagal menambahkan buku: ' + error.message);
    }
  };

  const handleAddAuthor = async (e) => {
    e.preventDefault();
    try {
      await authorService.createAuthor(newAuthor);
      toast.success('Penulis berhasil ditambahkan!');
      
      setShowAuthorModal(false);
      setNewAuthor({ name: '', bio: '', photo_url: '' });
      loadAuthors(); // Reload dropdown agar nama baru muncul
    } catch (error) {
      toast.error('Gagal menambah penulis');
    }
  };

  return (
    <div className="bg-paper min-h-screen p-4 pb-24 font-sans text-ink">
      
      <div className="flex items-center gap-4 mb-8 pt-4">
        <button 
          onClick={() => navigate(-1)} 
          className="p-2 bg-white border border-stone-200 rounded-full hover:bg-stone-100 transition-colors"
        >
          <ArrowLeft size={20} className="text-ink" />
        </button>
        <h1 className="text-2xl font-serif font-bold text-ink">Tambah Buku Baru</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5 max-w-lg mx-auto">
        <div>
          <label className="block text-sm font-bold text-gray-500 uppercase mb-2">Judul Buku</label>
          <input 
            required 
            name="title" 
            onChange={handleChange} 
            type="text" 
            className="w-full p-4 border border-stone-300 rounded-xl bg-white focus:ring-2 focus:ring-secondary focus:border-transparent outline-none transition-all shadow-sm" 
            placeholder="Contoh: Laut Bercerita" 
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-500 uppercase mb-2">URL Gambar Sampul</label>
          <input 
            required 
            name="cover_url" 
            onChange={handleChange} 
            type="url" 
            className="w-full p-4 border border-stone-300 rounded-xl bg-white focus:ring-2 focus:ring-secondary focus:border-transparent outline-none transition-all shadow-sm" 
            placeholder="https://example.com/cover.jpg" 
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-500 uppercase mb-2">Tahun Terbit</label>
          <input 
            required 
            name="published_year" 
            onChange={handleChange} 
            type="number" 
            className="w-full p-4 border border-stone-300 rounded-xl bg-white focus:ring-2 focus:ring-secondary focus:border-transparent outline-none transition-all shadow-sm" 
            placeholder="2023" 
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-500 uppercase mb-2">Penulis</label>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <select 
                required 
                name="author_id" 
                onChange={handleChange} 
                className="w-full p-4 border border-stone-300 rounded-xl bg-white focus:ring-2 focus:ring-secondary focus:border-transparent outline-none appearance-none shadow-sm cursor-pointer"
              >
                <option value="">-- Pilih Penulis --</option>
                {authors.map(author => (
                  <option key={author.id} value={author.id}>{author.name}</option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-gray-400">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/></svg>
              </div>
            </div>

            <button 
              type="button" 
              onClick={() => setShowAuthorModal(true)}
              className="bg-secondary text-white p-4 rounded-xl hover:bg-yellow-700 transition-colors shadow-sm flex items-center justify-center"
              title="Tambah Penulis Baru"
            >
              <Plus size={24} />
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-500 uppercase mb-2">Sinopsis</label>
          <textarea 
            name="description" 
            onChange={handleChange} 
            rows="5" 
            className="w-full p-4 border border-stone-300 rounded-xl bg-white focus:ring-2 focus:ring-secondary focus:border-transparent outline-none transition-all shadow-sm resize-none" 
            placeholder="Tulis ringkasan cerita di sini..."
          ></textarea>
        </div>

        <button 
          type="submit" 
          className="w-full py-4 bg-primary text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:translate-y-[-2px] transition-all flex justify-center items-center gap-2 mt-8"
        >
          <Save size={20} /> 
          Simpan Buku
        </button>
      </form>

      {showAuthorModal && (
        <div className="fixed inset-0 bg-ink/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
          <div className="bg-paper p-6 md:p-8 rounded-2xl w-full max-w-sm shadow-2xl border border-stone-100 transform scale-100 transition-all">
            
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-serif font-bold text-ink">Penulis Baru</h3>
              <button onClick={() => setShowAuthorModal(false)} className="text-gray-400 hover:text-red-500 transition-colors">
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleAddAuthor} className="space-y-4">
              <div>
                <input 
                  required 
                  type="text" 
                  placeholder="Nama Lengkap"
                  value={newAuthor.name}
                  onChange={e => setNewAuthor({...newAuthor, name: e.target.value})}
                  className="w-full p-3 border border-stone-300 rounded-xl focus:ring-2 focus:ring-secondary outline-none"
                />
              </div>
              <div>
                <input 
                  type="text" 
                  placeholder="Bio Singkat (Contoh: Penulis Fiksi)"
                  value={newAuthor.bio}
                  onChange={e => setNewAuthor({...newAuthor, bio: e.target.value})}
                  className="w-full p-3 border border-stone-300 rounded-xl focus:ring-2 focus:ring-secondary outline-none"
                />
              </div>
              <div>
                <input 
                  type="url" 
                  placeholder="URL Foto (Opsional)"
                  value={newAuthor.photo_url}
                  onChange={e => setNewAuthor({...newAuthor, photo_url: e.target.value})}
                  className="w-full p-3 border border-stone-300 rounded-xl focus:ring-2 focus:ring-secondary outline-none"
                />
              </div>
              
              <button type="submit" className="w-full py-3 bg-secondary text-white font-bold rounded-xl shadow-md hover:bg-yellow-700 transition-all mt-2">
                Simpan Penulis
              </button>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}