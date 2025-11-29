const supabase = require('../config/supabaseClient');

const AuthorModel = {
  async getAll() {
    const { data, error } = await supabase.from('authors').select('*');
    if (error) throw error;
    return data;
  },

  async getById(id) {
    // Ambil data penulis beserta semua buku yang ditulisnya
    const { data, error } = await supabase
      .from('authors')
      .select('*, books(*)')
      .eq('id', id)
      .single();
    if (error) throw error;
    return data;
  },

  async create(authorData) {
    const { data, error } = await supabase
      .from('authors')
      .insert([authorData])
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async update(id, authorData) {
    const { data, error } = await supabase
      .from('authors')
      .update(authorData)
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data;
  }
};

module.exports = AuthorModel;