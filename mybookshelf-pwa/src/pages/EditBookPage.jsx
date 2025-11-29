import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Save, ArrowLeft } from 'lucide-react';
import authorService from '../services/authorService';
import bookService from '../services/bookService';

export default function EditBookPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    published_year: '',
    cover_url: '',
    author_id: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const authorsData = await authorService.getAllAuthors();
        setAuthors(authorsData);

        const bookData = await bookService.getBookById(id);
        setFormData({
          title: bookData.title,
          description: bookData.description || '',
          published_year: bookData.published_year,
          cover_url: bookData.cover_url,
          author_id: bookData.author_id
        });
      } catch (err) {
        alert("Gagal memuat data buku");
        navigate('/');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await bookService.updateBook(id, formData);
      alert('Buku berhasil diperbarui!');
      navigate(`/book/${id}`); 
    } catch (error) {
      alert('Gagal update: ' + error.message);
    }
  };

  if (loading) return <div className="p-8 text-center">Memuat data...</div>;

  return (
    <div className="bg-paper min-h-screen p-4 pb-24 font-sans text-ink">
      <div className="flex items-center gap-4 mb-8 pt-4">
        <button onClick={() => navigate(-1)} className="p-2 bg-white border border-stone-200 rounded-full hover:bg-stone-100">
          <ArrowLeft size={20} className="text-ink" />
        </button>
        <h1 className="text-2xl font-serif font-bold text-ink">Edit Buku</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5 max-w-lg mx-auto">
        <div>
          <label className="block text-sm font-bold text-gray-500 uppercase mb-2">Judul Buku</label>
          <input required name="title" value={formData.title} onChange={handleChange} type="text" className="w-full p-4 border border-stone-300 rounded-xl bg-white focus:ring-2 focus:ring-secondary outline-none" />
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-500 uppercase mb-2">URL Gambar Sampul</label>
          <input required name="cover_url" value={formData.cover_url} onChange={handleChange} type="url" className="w-full p-4 border border-stone-300 rounded-xl bg-white focus:ring-2 focus:ring-secondary outline-none" />
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-500 uppercase mb-2">Tahun Terbit</label>
          <input required name="published_year" value={formData.published_year} onChange={handleChange} type="number" className="w-full p-4 border border-stone-300 rounded-xl bg-white focus:ring-2 focus:ring-secondary outline-none" />
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-500 uppercase mb-2">Penulis</label>
          <select required name="author_id" value={formData.author_id} onChange={handleChange} className="w-full p-4 border border-stone-300 rounded-xl bg-white focus:ring-2 focus:ring-secondary outline-none">
            <option value="">-- Pilih Penulis --</option>
            {authors.map(author => (
              <option key={author.id} value={author.id}>{author.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-500 uppercase mb-2">Sinopsis</label>
          <textarea name="description" value={formData.description} onChange={handleChange} rows="5" className="w-full p-4 border border-stone-300 rounded-xl bg-white focus:ring-2 focus:ring-secondary outline-none resize-none"></textarea>
        </div>

        <button type="submit" className="w-full py-4 bg-secondary text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all flex justify-center items-center gap-2 mt-8">
          <Save size={20} /> Simpan Perubahan
        </button>
      </form>
    </div>
  );
}