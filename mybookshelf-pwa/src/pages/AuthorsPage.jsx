import { useEffect, useState } from 'react';
import authorService from '../services/authorService';
import { Edit2, Trash2, X, Save, User, Plus } from 'lucide-react';
import toast from 'react-hot-toast'; // Import Toast

export default function AuthorsPage() {
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // State untuk Modal
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [formData, setFormData] = useState({ id: '', name: '', bio: '', photo_url: '' });

  // 1. LOAD DATA
  const fetchAuthors = async () => {
    try {
      const data = await authorService.getAllAuthors();
      setAuthors(data);
    } catch (error) {
      toast.error("Gagal memuat penulis"); // Toast Error
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAuthors();
  }, []);

  // Logic Modal
  const openAddModal = () => {
    setModalMode('add');
    setFormData({ id: '', name: '', bio: '', photo_url: '' });
    setShowModal(true);
  };

  const openEditModal = (author) => {
    setModalMode('edit');
    setFormData({
      id: author.id,
      name: author.name,
      bio: author.bio || '',
      photo_url: author.photo_url || ''
    });
    setShowModal(true);
  };

  // Logic Hapus
  const handleDelete = async (id, name) => {
    // Confirm bawaan browser masih oke untuk keamanan
    if (confirm(`Yakin ingin menghapus penulis "${name}"?`)) {
      try {
        await authorService.deleteAuthor(id);
        toast.success('Penulis berhasil dihapus'); // Toast Success
        fetchAuthors();
      } catch (error) {
        toast.error('Gagal hapus: ' + error); // Toast Error
      }
    }
  };

  // Logic Submit (Tambah/Edit)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (modalMode === 'add') {
        await authorService.createAuthor({
          name: formData.name,
          bio: formData.bio,
          photo_url: formData.photo_url
        });
        toast.success('Penulis berhasil ditambahkan!'); // Toast Success
      } else {
        await authorService.updateAuthor(formData.id, {
          name: formData.name,
          bio: formData.bio,
          photo_url: formData.photo_url
        });
        toast.success('Data penulis diperbarui!'); // Toast Success
      }
      setShowModal(false);
      fetchAuthors();
    } catch (error) {
      toast.error('Gagal menyimpan: ' + error.message); // Toast Error
    }
  };

  return (
    <div className="p-4 pb-24 min-h-screen relative">
      <h1 className="text-2xl font-serif font-bold mb-6 text-ink">Daftar Penulis</h1>
      
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {authors.map((author, index) => (
            <div 
              key={author.id} 
              className="animate-card group relative bg-white p-6 rounded-2xl shadow-soft border border-stone-100 text-center hover:shadow-md transition-all"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              
              <div className="absolute top-2 right-2 flex gap-1 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity z-10">
                <button 
                  onClick={() => openEditModal(author)}
                  className="p-2 bg-stone-100 rounded-full text-blue-600 hover:bg-blue-50 transition-colors"
                  title="Edit"
                >
                  <Edit2 size={14} />
                </button>
                <button 
                  onClick={() => handleDelete(author.id, author.name)}
                  className="p-2 bg-stone-100 rounded-full text-red-500 hover:bg-red-50 transition-colors"
                  title="Hapus"
                >
                  <Trash2 size={14} />
                </button>
              </div>

              <div className="w-24 h-24 rounded-full mx-auto mb-4 p-1 border-2 border-stone-100 overflow-hidden relative shadow-sm">
                {author.photo_url ? (
                  <img 
                    src={author.photo_url} 
                    alt={author.name}
                    className="w-full h-full object-cover rounded-full group-hover:scale-110 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full bg-stone-200 flex items-center justify-center text-stone-400">
                    <User size={32} />
                  </div>
                )}
              </div>

              <h3 className="font-bold text-lg text-ink mb-1 line-clamp-1">{author.name}</h3>
              <p className="text-xs text-gray-500 line-clamp-2 h-8 leading-relaxed">{author.bio || 'Tidak ada bio.'}</p>
            </div>
          ))}
        </div>
      )}

      <button 
        onClick={openAddModal}
        className="fixed bottom-24 right-6 md:bottom-10 md:right-10 bg-primary text-white p-4 rounded-2xl shadow-xl hover:bg-[#8B4513] hover:scale-110 transition-all z-40 flex items-center justify-center"
        title="Tambah Penulis Baru"
      >
        <Plus size={28} />
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-ink/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
          <div className="bg-paper p-6 rounded-3xl w-full max-w-sm shadow-2xl border border-stone-100">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-serif font-bold text-ink">
                {modalMode === 'add' ? 'Tambah Penulis' : 'Edit Penulis'}
              </h3>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-red-500 transition-colors">
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Nama Lengkap</label>
                <input 
                  required 
                  type="text" 
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  className="w-full p-3 border border-stone-300 rounded-xl bg-white focus:ring-2 focus:ring-secondary outline-none"
                  placeholder="Contoh: Andrea Hirata"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Bio Singkat</label>
                <textarea 
                  rows="3"
                  value={formData.bio}
                  onChange={e => setFormData({...formData, bio: e.target.value})}
                  className="w-full p-3 border border-stone-300 rounded-xl bg-white focus:ring-2 focus:ring-secondary outline-none resize-none"
                  placeholder="Deskripsi singkat penulis..."
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">URL Foto</label>
                <input 
                  type="url" 
                  value={formData.photo_url}
                  onChange={e => setFormData({...formData, photo_url: e.target.value})}
                  className="w-full p-3 border border-stone-300 rounded-xl bg-white focus:ring-2 focus:ring-secondary outline-none"
                  placeholder="https://..."
                />
              </div>
              <button type="submit" className="w-full py-3 bg-primary text-white font-bold rounded-xl shadow-md hover:bg-[#8B4513] transition-all mt-4 flex justify-center items-center gap-2">
                <Save size={18} /> {modalMode === 'add' ? 'Simpan' : 'Update'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}