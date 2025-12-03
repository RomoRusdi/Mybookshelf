import api from '../config/api';

const authorService = {
  getAllAuthors: async () => {
    try {
      const response = await api.get('/authors');
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  // TAMBAHAN BARU
  createAuthor: async (authorData) => {
    try {
      const response = await api.post('/authors', authorData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  updateAuthor: async (id, authorData) => {
    try {
      const response = await api.put(`/authors/${id}`, authorData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  deleteAuthor: async (id) => {
    try {
      const response = await api.delete(`/authors/${id}`);
      return response.data;
    } catch (error) {
      // Lempar pesan error spesifik dari backend (misal: masih ada buku)
      throw error.response?.data?.error || error.message;
    }
  }
};

export default authorService;