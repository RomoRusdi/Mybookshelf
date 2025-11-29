const supabase = require('../config/supabaseClient');

const BookModel = {
  async getAll() {
    // Mengambil buku beserta nama penulisnya (Join tabel)
    const { data, error } = await supabase
      .from('books')
      .select('*, authors(name)');
    if (error) throw error;
    return data;
  },

  async getById(id) {
    const { data, error } = await supabase
      .from('books')
      .select('*, authors(*)') // Ambil detail buku + detail lengkap penulis
      .eq('id', id)
      .single();
    if (error) throw error;
    return data;
  },

  async create(bookData) {
    const { data, error } = await supabase
      .from('books')
      .insert([bookData])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async updateRating(id, rating) {
    const { data, error } = await supabase
      .from('books')
      .update({ rating: rating })
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async update(id, bookData) {
    const { data, error } = await supabase
      .from('books')
      .update(bookData)
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async delete(id) {
    const { error } = await supabase
      .from('books')
      .delete()
      .eq('id', id);
    if (error) throw error;
    return true;
  }
};

module.exports = BookModel;