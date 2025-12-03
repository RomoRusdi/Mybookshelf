const AuthorModel = require('../models/authorModel');

const AuthorController = {
  async getAll(req, res) {
    try {
      const authors = await AuthorModel.getAll();
      res.json(authors);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async getById(req, res) {
    try {
      const author = await AuthorModel.getById(req.params.id);
      res.json(author);
    } catch (err) {
      res.status(404).json({ error: 'Penulis tidak ditemukan' });
    }
  },

async create(req, res) {
    try {
      const { name, bio, photo_url } = req.body;
      const existingAuthor = await AuthorModel.getByName(name);
      
      if (existingAuthor) {
        return res.status(400).json({ error: `Penulis "${name}" sudah terdaftar!` });
      }

      const data = await AuthorModel.create({ name, bio, photo_url });
      res.status(201).json(data);

    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      const updates = req.body;
      const data = await AuthorModel.update(id, updates);
      res.json(data);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  async delete(req, res) {
    try {
      const { id } = req.params;
      await AuthorModel.delete(id);
      res.json({ message: "Penulis berhasil dihapus" });
    } catch (err) {
      // Cek jika error karena ada relasi buku (Foreign Key Violation)
      if (err.code === '23503') {
        return res.status(400).json({ error: "Gagal: Penulis ini masih memiliki buku. Hapus bukunya terlebih dahulu." });
      }
      res.status(500).json({ error: err.message });
    }
  }
};

module.exports = AuthorController;