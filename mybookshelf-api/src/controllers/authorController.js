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
      const newAuthor = req.body;
      const data = await AuthorModel.create(newAuthor);
      res.status(201).json(data);
    } catch (err) {
      res.status(400).json({ error: err.message });
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
  } 
};

module.exports = AuthorController;