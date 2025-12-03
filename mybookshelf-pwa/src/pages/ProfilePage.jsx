import { useState, useEffect } from 'react';
import { User, Save, Edit2 } from 'lucide-react';
import useBooks from '../hooks/useBooks';
import toast from 'react-hot-toast'; // 1. Import Toast

export default function ProfilePage() {
  const { books } = useBooks(); 

  const [profile, setProfile] = useState({
    name: 'Romox',
    bio: 'Saya suka membaca buku.',
  });
  const [isEditing, setIsEditing] = useState(false);

  const stats = {
    joined: '2024'
  };
  
  const [favCount, setFavCount] = useState(0);

  useEffect(() => {
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
    }
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setFavCount(favorites.length);
  }, []);

  const handleSave = () => {
    localStorage.setItem('userProfile', JSON.stringify(profile));
    setIsEditing(false);
    toast.success('Profil berhasil disimpan!'); // 2. Tampilkan Toast Sukses
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      
      {/* HEADER CARD */}
      <div className="bg-white rounded-3xl p-8 shadow-soft border border-stone-50 flex flex-col items-center text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#FAE8D6] to-white z-0"></div>
        <div className="relative z-10 mt-4">
          <div className="w-28 h-28 bg-[#FCD34D] rounded-full flex items-center justify-center mx-auto mb-4 text-white shadow-lg border-4 border-white">
            <User size={56} className="text-[#8B4513]" />
          </div>

          {isEditing ? (
            <div className="w-full max-w-sm mx-auto space-y-4 animate-in fade-in slide-in-from-bottom-4">
              <input
                type="text"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                className="w-full p-3 border border-stone-300 rounded-xl text-center font-bold text-lg focus:ring-2 focus:ring-primary outline-none"
              />
              <textarea
                value={profile.bio}
                onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                className="w-full p-3 border border-stone-300 rounded-xl text-center focus:ring-2 focus:ring-primary outline-none"
                rows="2"
              />
              <button 
                onClick={handleSave}
                className="px-8 py-2 bg-primary text-white font-bold rounded-xl hover:bg-[#8B4513] transition-colors flex items-center gap-2 mx-auto"
              >
                <Save size={18} /> Simpan
              </button>
            </div>
          ) : (
            <div className="space-y-2">
              <h1 className="text-2xl font-serif font-bold text-ink">{profile.name}</h1>
              <p className="text-gray-500 max-w-md mx-auto">{profile.bio}</p>
              
              <button 
                onClick={() => setIsEditing(true)}
                className="mt-4 px-6 py-2 bg-primary text-white font-bold rounded-xl hover:bg-[#8B4513] transition-all text-sm inline-flex items-center gap-2"
              >
                <Edit2 size={14} /> Edit Profil
              </button>
            </div>
          )}
        </div>
      </div>

      {/* AKTIVITAS SECTION */}
      <div className="bg-paper p-2">
        <h3 className="font-bold text-lg text-ink mb-4 ml-2">Aktivitas</h3>
        <div className="bg-white rounded-2xl p-6 shadow-soft border border-stone-50 space-y-4">
          <div className="flex justify-between items-center border-b border-stone-100 pb-4">
            <span className="text-gray-600">Buku Ditambahkan</span>
            <span className="font-bold text-primary">{books ? books.length : 0}</span> 
          </div>
          <div className="flex justify-between items-center border-b border-stone-100 pb-4">
            <span className="text-gray-600">Favorit</span>
            <span className="font-bold text-red-500">{favCount}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Bergabung Sejak</span>
            <span className="font-bold text-ink">{stats.joined}</span>
          </div>
        </div>
      </div>

      {/* GENRE FAVORIT SECTION */}
      <div className="bg-paper p-2 pb-24">
        <h3 className="font-bold text-lg text-ink mb-4 ml-2">Genre Favorit</h3>
        <div className="bg-red-50/50 rounded-2xl p-6 border border-red-50 flex flex-wrap gap-3">
          {['Fiksi', 'Romance', 'Thriller', 'Drama', 'Sejarah', 'Sci-Fi'].map((genre) => (
            <span key={genre} className="px-4 py-2 bg-white text-ink font-medium rounded-xl shadow-sm border border-stone-100 text-sm hover:scale-105 transition-transform cursor-default">
              {genre}
            </span>
          ))}
        </div>
      </div>

    </div>
  );
}