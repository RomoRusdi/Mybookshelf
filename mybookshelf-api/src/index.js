const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

const bookRoutes = require('./routes/bookRoutes');
const authorRoutes = require('./routes/authorRoutes');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('MyBookshelf API is Running!');
});

app.use('/api/books', bookRoutes);
app.use('/api/authors', authorRoutes);

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});