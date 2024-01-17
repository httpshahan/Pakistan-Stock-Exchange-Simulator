const express = require('express');
const router = express.Router();
const scraperController = require('../controllers/scraperController');

// Define the route to trigger data scraping
router.get('/scrape', scraperController.runScraper);

module.exports = router;
