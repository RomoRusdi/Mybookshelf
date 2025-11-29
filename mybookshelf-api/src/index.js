const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

const bookRoutes = require('./routes/bookRoutes');
const authorRoutes = require('./routes/authorRoutes');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Agar bisa diakses dari Frontend PWA
app.use(express.json());

// Routes Dasar
app.get('/', (req, res) => {
  res.send('MyBookshelf API is Running!');
});

// API Routes
app.use('/api/books', bookRoutes);
app.use('/api/authors', authorRoutes);

// Start Server
app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});