const express = require('express');
const BookController = require('../controllers/bookController');
const router = express.Router();

router.get('/', BookController.getAll);
router.get('/:id', BookController.getById);
router.post('/', BookController.create);
router.patch('/:id/rating', BookController.updateRating); // Endpoint Update Rating
router.put('/:id', BookController.update);   // Route Edit
router.delete('/:id', BookController.delete); // Route Delete

module.exports = router;