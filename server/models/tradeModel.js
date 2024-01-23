const { pool } = require('../db/pool'); // Adjust this based on your database configuration

const transactionsModel = {
  async buyStock(userId, stockSymbol, quantity, transactionPrice) {
    try {
      // Check if the user has enough balance to make the purchase
      const userBalanceResult = await pool.query('SELECT balance FROM users WHERE id = $1', [userId]);
      const userBalance = userBalanceResult.rows[0].balance;
      const totalTransactionCost = quantity * transactionPrice;

      if (userBalance < totalTransactionCost) {
        throw new Error('Insufficient funds for the transaction.');
      }

      // Insert transaction record for buying
      await pool.query(`
        INSERT INTO user_transactions (user_id, stock_symbol, transaction_type, quantity, transaction_price)
        VALUES ($1, $2, 'B', $3, $4)
      `, [userId, stockSymbol, quantity, transactionPrice]);

      // Update user balance
      await pool.query('UPDATE users SET balance = balance - $1 WHERE id = $2', [totalTransactionCost, userId]);

      return { message: 'Stock purchased successfully.' };
    } catch (error) {
      throw error;
    }
  },

  async sellStock(userId, stockSymbol, quantity, transactionPrice) {
    try {
      // Check if the user has enough stocks to make the sale
      const userStocksResult = await pool.query(`
        SELECT COALESCE(SUM(quantity), 0) AS total_quantity
        FROM user_assets
        WHERE user_id = $1 AND stock_symbol = $2
      `, [userId, stockSymbol]);
      const userTotalQuantity = userStocksResult.rows[0].total_quantity;

      if (userTotalQuantity < quantity) {
        throw new Error('Insufficient stocks for the transaction.');
      }

      // Insert transaction record for selling
      await pool.query(`
        INSERT INTO user_transactions (user_id, stock_symbol, transaction_type, quantity, transaction_price)
        VALUES ($1, $2, 'S', $3, $4)
      `, [userId, stockSymbol, quantity, transactionPrice]);

      // Update user balance
      await pool.query('UPDATE users SET balance = balance + $1 WHERE id = $2', [quantity * transactionPrice, userId]);

      return { message: 'Stock sold successfully.' };
    } catch (error) {
      throw error;
    }
  },
};

module.exports = transactionsModel;
