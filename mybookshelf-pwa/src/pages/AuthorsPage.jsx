import { useEffect, useState } from 'react';
import authorService from '../services/authorService';
import { Edit2, X, Save, User } from 'lucide-react';

export default function AuthorsPage() {
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [editingAuthor, setEditingAuthor] = useState(null); // Data penulis yang sedang diedit
  const [showModal, setShowModal] = useState(false);

  const fetchAuthors = async () => {
    try {
      const data = await authorService.getAllAuthors();
      setAuthors(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAuthors();
  }, []);

  const handleEditClick = (author) => {
    setEditingAuthor(author);
    setShowModal(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await authorService.updateAuthor(editingAuthor.id, {
        name: editingAuthor.name,
        bio: editingAuthor.bio,
        photo_url: editingAuthor.photo_url
      });
      
      alert('Data penulis berhasil diperbarui!');
      setShowModal(false);
      fetchAuthors();
    } catch (error) {
      alert('Gagal update penulis: ' + error.message);
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
          {authors.map(author => (
            <div key={author.id} className="group relative bg-white p-6 rounded-2xl shadow-soft border border-stone-100 text-center hover:shadow-md transition-all">
              
              <button 
                onClick={() => handleEditClick(author)}
                className="absolute top-3 right-3 p-2 bg-stone-100 rounded-full text-gray-500 hover:bg-primary hover:text-white transition-colors opacity-100 md:opacity-0 group-hover:opacity-100"
                title="Edit Penulis"
              >
                <Edit2 size={16} />
              </button>

              <div className="w-24 h-24 rounded-full mx-auto mb-4 p-1 border-2 border-stone-100 overflow-hidden relative">
                {author.photo_url ? (
                  <img 
                    src={author.photo_url} 
                    alt={author.name}
                    className="w-full h-full object-cover rounded-full"
                  />
                ) : (
                  <div className="w-full h-full bg-stone-200 flex items-center justify-center text-stone-400">
                    <User size={32} />
                  </div>
                )}
              </div>

              <h3 className="font-bold text-lg text-ink mb-1 line-clamp-1">{author.name}</h3>
              <p className="text-xs text-gray-500 line-clamp-2 h-8">{author.bio || 'Tidak ada bio.'}</p>
            </div>
          ))}
        </div>
      )}

      {showModal && editingAuthor && (
        <div className="fixed inset-0 bg-ink/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
          <div className="bg-paper p-6 rounded-3xl w-full max-w-sm shadow-2xl border border-stone-100">
            
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-serif font-bold text-ink">Edit Penulis</h3>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-red-500 transition-colors">
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleUpdate} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Nama Lengkap</label>
                <input 
                  required 
                  type="text" 
                  value={editingAuthor.name}
                  onChange={e => setEditingAuthor({...editingAuthor, name: e.target.value})}
                  className="w-full p-3 border border-stone-300 rounded-xl bg-white focus:ring-2 focus:ring-secondary outline-none"
                />
              </div>
              
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Bio Singkat</label>
                <textarea 
                  rows="3"
                  value={editingAuthor.bio || ''}
                  onChange={e => setEditingAuthor({...editingAuthor, bio: e.target.value})}
                  className="w-full p-3 border border-stone-300 rounded-xl bg-white focus:ring-2 focus:ring-secondary outline-none resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">URL Foto</label>
                <input 
                  type="url" 
                  value={editingAuthor.photo_url || ''}
                  onChange={e => setEditingAuthor({...editingAuthor, photo_url: e.target.value})}
                  className="w-full p-3 border border-stone-300 rounded-xl bg-white focus:ring-2 focus:ring-secondary outline-none"
                  placeholder="https://..."
                />
              </div>
              
              <button type="submit" className="w-full py-3 bg-primary text-white font-bold rounded-xl shadow-md hover:bg-[#8B4513] transition-all mt-4 flex justify-center items-center gap-2">
                <Save size={18} /> Simpan Perubahan
              </button>
            </form>

          </div>
        </div>
      )}
    </div>
  );
}