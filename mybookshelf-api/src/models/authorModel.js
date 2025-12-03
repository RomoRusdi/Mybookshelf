const supabase = require('../config/supabaseClient');

const AuthorModel = {
  async getAll() {
    const { data, error } = await supabase.from('authors').select('*');
    if (error) throw error;
    return data;
  },

  async getById(id) {
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
  },

  async getByName(name) {
    const { data, error } = await supabase
      .from('authors')
      .select('*')
      .ilike('name', name);

    if (error) throw error;
    return data.length > 0 ? data[0] : null; 
  },

  async delete(id) {
    const { error } = await supabase
      .from('authors')
      .delete()
      .eq('id', id);
    if (error) throw error;
    return true;
  }
};

module.exports = AuthorModel;