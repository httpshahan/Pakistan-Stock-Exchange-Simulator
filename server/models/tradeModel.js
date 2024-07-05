const pool = require("../db/pool");

const transactionsModel = {
  async buyStock(
    userId,
    stockSymbol,
    quantity,
    transactionPrice,
    transactionValue
  ) {
    try {
      const quantityInt = parseInt(quantity);
      const totalTransactionCost = parseFloat(transactionValue);
      const transactionPriceFloat = parseFloat(transactionPrice);
      // Check if the user already owns the stock
      const existingStockResult = await pool.query(
        "SELECT * FROM user_assets WHERE user_id = $1 AND stock_symbol = $2",
        [userId, stockSymbol]
      );

      // Check if the user has enough balance to make the purchase
      const userBalanceResult = await pool.query(
        "SELECT balance FROM users WHERE id = $1",
        [userId]
      );
      const userBalance = userBalanceResult.rows[0].balance;

      if (userBalance < totalTransactionCost) {
        throw new Error("Insufficient funds for the transaction.");
      }
      console.log("userBalance: " + userBalance);

      if (existingStockResult.rows.length > 0) {
        // Update existing stock with the new purchase
        const existingQuantity = parseInt(existingStockResult.rows[0].quantity);
        const newTotalQuantity = existingQuantity + quantityInt;
        const price = parseFloat(existingStockResult.rows[0].purchase_price);
        const newPrice = (price + transactionPriceFloat) / 2;

        await pool.query(
          `
          UPDATE user_assets
          SET quantity = $1, purchase_price = $2
          WHERE user_id = $3 AND stock_symbol = $4
        `,
          [newTotalQuantity, newPrice, userId, stockSymbol]
        );
      } else {
        // Insert new record for buying
        await pool.query(
          `
          INSERT INTO user_assets (user_id, stock_symbol, quantity, purchase_price)
          VALUES ($1, $2, $3, $4)
        `,
          [userId, stockSymbol, quantity, transactionPrice]
        );
      }

      // Insert transaction record for buying
      await pool.query(
        `
        INSERT INTO user_transactions (user_id, stock_symbol, transaction_type, quantity, transaction_price)
        VALUES ($1, $2, 'B', $3, $4) RETURNING *
      `,
        [userId, stockSymbol, quantity, transactionPrice]
      );

      // Update user balance
      await pool.query(
        "UPDATE users SET balance = balance - $1 WHERE id = $2",
        [totalTransactionCost, userId]
      );

      return { message: "Stock purchased successfully." };
    } catch (error) {
      throw error;
    }
  },

  async sellStock(
    userId,
    stockSymbol,
    quantity,
    transactionPrice,
    transactionValue
  ) {
    try {
      const quantityInt = parseInt(quantity);
      const totalTransactionValue = parseFloat(transactionValue);
      // Check if the user owns enough quantity of the specified stock
      const userStockResult = await pool.query(
        "SELECT * FROM user_assets WHERE user_id = $1 AND stock_symbol = $2",
        [userId, stockSymbol]
      );

      if (
        userStockResult.rows.length === 0 ||
        userStockResult.rows[0].quantity < quantityInt
      ) {
        throw new Error(
          "Insufficient quantity of the specified stock for the sell transaction."
        );
      }

      // Update user_assets to deduct the sold quantity
      const existingQuantity = userStockResult.rows[0].quantity;
      const newQuantity = existingQuantity - quantityInt;

      if (newQuantity === 0) {
        // If selling all stocks, delete the record from user_assets
        await pool.query(
          "DELETE FROM user_assets WHERE user_id = $1 AND stock_symbol = $2",
          [userId, stockSymbol]
        );
      } else {
        // Update the quantity if still remaining stocks
        await pool.query(
          "UPDATE user_assets SET quantity = $1 WHERE user_id = $2 AND stock_symbol = $3",
          [newQuantity, userId, stockSymbol]
        );
      }

      // Insert transaction record for selling
      await pool.query(
        "INSERT INTO user_transactions (user_id, stock_symbol, transaction_type, quantity, transaction_price) VALUES ($1, $2, 'S', $3, $4)",
        [userId, stockSymbol, quantity, transactionPrice]
      );

      // Update user balance
      await pool.query(
        "UPDATE users SET balance = balance + $1 WHERE id = $2",
        [totalTransactionValue, userId]
      );

      return { message: "Stock sold successfully." };
    } catch (error) {
      throw error;
    }
  },
  async getTransaction(userId) {
    try {
      const result = await pool.query(
        "SELECT * FROM user_transactions WHERE user_id = $1 ORDER BY transaction_date DESC",
        [userId]
      );
      return result.rows;
    } catch (error) {
      throw error;
    }
  },
  async getTransactions() {
    try {
      const result = await pool.query(
        "SELECT * FROM user_transactions ORDER BY transaction_date DESC"
      );
      return result.rows;
    } catch (error) {
      throw error;
    }
  },
};

module.exports = transactionsModel;
