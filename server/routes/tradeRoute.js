// routes/transactionsRoutes.js
const express = require('express');
const router = express.Router();
const transactionsController = require('../controllers/tradeController');

// Buy stock
router.post('/buy/:userId', transactionsController.buyStock);

// Sell stock
router.post('/sell/:userId', transactionsController.sellStock);

module.exports = router;
