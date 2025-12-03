import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast'; // 1. PASTIKAN INI ADA

import Layout from './components/common/Layout';
import LoadingScreen from './components/common/LoadingScreen';
import bookService from './services/bookService';

// Import Pages
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import AuthorsPage from './pages/AuthorsPage';
import FavoritesPage from './pages/FavoritesPage';
import ProfilePage from './pages/ProfilePage';
import DetailBook from './pages/DetailBook';
import AddBookPage from './pages/AddBookPage';
import EditBookPage from './pages/EditBookPage';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initApp = async () => {
      try {
        await Promise.all([
          bookService.getAllBooks().catch(() => null),
          new Promise(resolve => setTimeout(resolve, 2000))
        ]);
      } catch (error) {
        console.error("Gagal inisialisasi:", error);
      } finally {
        setIsLoading(false);
      }
    };
    initApp();
  }, []);

  if (isLoading) return <LoadingScreen />;

  return (
    <Router>
      <div className="animate-fade-in">
        
        {/* 2. INI BAGIAN PENTING YANG HILANG SEBELUMNYA */}
        <Toaster 
          position="top-center" 
          reverseOrder={false}
          toastOptions={{
            style: {
              borderRadius: '12px',
              background: '#333',
              color: '#fff',
            },
          }}
        />
        
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/authors" element={<AuthorsPage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/book/:id" element={<DetailBook />} />
            <Route path="/add-book" element={<AddBookPage />} />
            <Route path="/edit-book/:id" element={<EditBookPage />} />
          </Routes>
        </Layout>
      </div>
    </Router>
  );
}

export default App;