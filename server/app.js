// app.js
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const stockRoutes = require('./routes/stockRoutes');
const scraperRoutes = require('./routes/scraperRoutes');
const tradeRoutes = require('./routes/tradeRoute');
const verifyToken = require('./middleware/verifyToken');


dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/stocks',verifyToken, stockRoutes);
app.use('/api/scraper', scraperRoutes);
app.use('/api/trade',verifyToken, tradeRoutes);

//proxy server

app.get('/api/proxy/:symbol', async (req, res) => {
  //const { symbol } = req.params;
  console.log("proxy server");
  
  try {
    // Modify the external API URL to include the symbol parameter
    const response = await axios.get(`https://dps.psx.com.pk/timeseries/eod/${req.params.symbol}`);

    res.status(200).json(response.data);

  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.get('/api/delay', verifyToken, (req, res) => {
  setTimeout(() => {
    res.send('delayed response');
  }, 3000);
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
