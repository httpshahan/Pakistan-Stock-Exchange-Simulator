// scraperRoutes.js

const express = require('express');
const router = express.Router();
const scraperController = require('../controllers/scraperController');

// Define the route to trigger data scraping
router.get('/scrape', scraperController.runScraper);
router.get('/getStocks', scraperController.getStocks);

//get stock by symbol
router.get('/getStock/:symbol', scraperController.getStock);
module.exports = router;
