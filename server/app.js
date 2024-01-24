// app.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const stockRoutes = require('./routes/stockRoutes');
const scraperRoutes = require('./routes/scraperRoutes');
const verifyToken = require('./middleware/verifyToken');


dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/stocks',verifyToken, stockRoutes);
app.use('/api/scraper', scraperRoutes);

app.get('/api/delay', verifyToken, (req, res) => {
  setTimeout(() => {
    res.send('delayed response');
  }, 3000);
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
