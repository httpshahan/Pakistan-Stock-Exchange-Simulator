const transactionsModel = require('../models/tradeModel');

const transactionsController = {
  async buyStock(req, res) {
    try {
      const { userId } = req.params;
      const { stockSymbol, quantity, totalPrice, transaction } = req.body;
      const result = await transactionsModel.buyStock(userId, stockSymbol, quantity, totalPrice, transaction);
      res.status(201).json(result); // 201 Created
    } catch (error) {
      console.error('Error buying stock:', error);
      if (error.message === 'Insufficient funds for the transaction.') {
        res.status(400).json({ error: 'Insufficient funds for the transaction.' }); // 400 Bad Request
      } else {
        res.status(500).json({ error: 'Internal Server Error' }); // 500 Internal Server Error
      }
    }
  },

  async sellStock(req, res) {
    try {
      const { userId } = req.params;
      const { symbol, quantity, totalPrice, transaction } = req.body;
      const result = await transactionsModel.sellStock(userId, symbol, quantity, totalPrice, transaction);
      res.status(201).json(result); // 201 Created
    } catch (error) {
      console.error('Error selling stock:', error);
      if (error.message === 'Insufficient stocks for the transaction.') {
        res.status(400).json({ error: 'Insufficient stocks for the transaction.' }); // 400 Bad Request
      } else {
        res.status(500).json({ error: 'Internal Server Error' }); // 500 Internal Server Error
      }
    }
  },
};

module.exports = transactionsController;
