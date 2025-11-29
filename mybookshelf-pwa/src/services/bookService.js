import api from '../config/api';

const bookService = {
  // Ambil semua buku
  getAllBooks: async () => {
    try {
      const response = await api.get('/books');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Ambil detail 1 buku berdasarkan ID
  getBookById: async (id) => {
    try {
      const response = await api.get(`/books/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  createBook: async (bookData) => {
    try {
      const response = await api.post('/books', bookData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  updateBookRating: async (id, rating) => {
    try {
      const response = await api.patch(`/books/${id}/rating`, { rating });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  updateBook: async (id, bookData) => {
    try {
      const response = await api.put(`/books/${id}`, bookData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  deleteBook: async (id) => {
    try {
      const response = await api.delete(`/books/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export default bookService;