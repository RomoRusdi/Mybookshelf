const BookModel = require('../models/bookModel');

const BookController = {
  async getAll(req, res) {
    try {
      const books = await BookModel.getAll();
      res.json(books);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async getById(req, res) {
    try {
      const book = await BookModel.getById(req.params.id);
      res.json(book);
    } catch (err) {
      res.status(404).json({ error: 'Buku tidak ditemukan atau error server' });
    }
  },

  async create(req, res) {
    try {
      // Ambil data dari body request
      const newBook = req.body;
      const data = await BookModel.create(newBook);
      res.status(201).json(data);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  async updateRating(req, res) {
    try {
      const { id } = req.params;
      const { rating } = req.body;
      const data = await BookModel.updateRating(id, rating);
      res.json(data);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      const updates = req.body;
      const data = await BookModel.update(id, updates);
      res.json(data);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  async delete(req, res) {
    try {
      const { id } = req.params;
      await BookModel.delete(id);
      res.json({ message: "Buku berhasil dihapus" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
};

module.exports = BookController;