const pool = require("../db/pool");

const insertScrapedData = async (data) => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN"); // Start a transaction

    // Truncate the table and restart identity
    await client.query("TRUNCATE stock_data RESTART IDENTITY");

    // Fetch symbols from the main table
    const mainTableSymbolsQuery = await client.query(
      "SELECT symbol FROM stock"
    );
    const mainTableSymbols = mainTableSymbolsQuery.rows.map(
      (row) => row.symbol
    );

    // Prepare data for insertion, filtering out invalid symbols
    const validValues = data
      .map((item) => [
        item[0], // symbol
        item[1].replace(/,/g, ""), // LDCP
        item[2].replace(/,/g, ""), // OPEN
        item[3].replace(/,/g, ""), // HIGH
        item[4].replace(/,/g, ""), // LOW
        item[5].replace(/,/g, ""), // CURRENT
        item[6].replace(/,/g, ""), // CHANGE
        item[7], // CHANGE (%)
        item[8].replace(/,/g, ""), // VOLUME
        item[9], // Timestamp
      ])
      .filter((item) => mainTableSymbols.includes(item[0]));

    if (validValues.length > 0) {
      // Construct the SQL query for bulk insertion
      const placeholders = validValues
        .map(
          (_, index) =>
            `($${index * 10 + 1}, $${index * 10 + 2}, $${index * 10 + 3}, $${
              index * 10 + 4
            }, $${index * 10 + 5}, $${index * 10 + 6}, $${index * 10 + 7}, $${
              index * 10 + 8
            }, $${index * 10 + 9}, $${index * 10 + 10})`
        )
        .join(",");

      const params = validValues.flat();

      // Execute the insertion query
      const stockData = await client.query(
        `
        INSERT INTO stock_data (stock_symbol, ldcp, open, high, low, current, change, change_percent, volume, timestamp)
        VALUES ${placeholders} RETURNING *
      `,
        params
      );

      await client.query("COMMIT"); // Commit the transaction

      // Process successful insertion here, if needed
    } else {
      console.log("No valid data to insert.");
    }
  } catch (error) {
    await client.query("ROLLBACK"); // Rollback the transaction in case of error
    console.error("Error during insertion:", error.message);
  } finally {
    client.release(); // Release the client back to the pool
  }
};

const getAllStocks = async () => {
  try {
    const result = await pool.query(`
      SELECT stock_data.*, stock.company_name
      FROM stock_data
      INNER JOIN stock ON stock_data.stock_symbol = stock.symbol
    `);

    return result.rows;
  } catch (err) {
    console.error("Error getting all stocks:", err);
    throw err;
  }
};

const searchStocks = async (query) => {
  try {
    const result = await pool.query(
      `
      SELECT stock_data.*, stock.company_name
      FROM stock_data
      INNER JOIN stock ON stock_data.stock_symbol = stock.symbol
      WHERE stock.company_name ILIKE $1 || '%' OR stock_data.stock_symbol ILIKE $1 || '%'
    `,
      [`%${query}%`]
    );
    return result.rows;
  } catch (err) {
    console.error("Error searching stocks:", err);
    throw err;
  }
};

const getUserAssets = async (userId) => {
  try {
    const user = await pool.query(`SELECT * FROM users WHERE id = $1`, [
      userId,
    ]);
    if (user.rows.length === 0) {
      return null;
    }
    const result = await pool.query(
      `SELECT ua.quantity, s.company_name, sd.current, ua.stock_symbol, ua.purchase_price
      FROM user_assets ua
      JOIN stock s ON ua.stock_symbol = s.symbol
      JOIN stock_data sd ON s.symbol = sd.stock_symbol
      WHERE ua.user_id = $1`,
      [userId]
    );
    return result.rows;
  } catch (err) {
    console.error("Error getting user assets:", err);
    throw err;
  }
};

const getStockBySymbol = async (symbol) => {
  try {
    //console.log(symbol);
    const result = await pool.query(
      `SELECT s.*, sd.*
      FROM stock s
      JOIN stock_data sd ON s.symbol = sd.stock_symbol
      WHERE s.symbol = $1`,
      [symbol]
    );
    if (result.rows.length === 0) {
      return null;
    }
    return result.rows;
  } catch (err) {
    console.error("Error getting all stocks:", err);
    throw err;
  }
};

const getTopStock = async () => {
  try {
    const result = await pool.query(`
      SELECT 
        sd.stock_symbol,
        s.company_name,
        sd.current,
        sd.change_percent,
        sd.change
      FROM stock_data sd
      JOIN stock s ON sd.stock_symbol = s.symbol
      ORDER BY CAST(REPLACE(sd.change_percent, '%', '') AS DECIMAL(10, 2)) DESC
      LIMIT 10
    `);
    return result.rows;
  } catch (err) {
    console.error("Error getting active stocks:", err);
    throw err;
  }
};

const getDeclinerStock = async () => {
  try {
    const result = await pool.query(`
        SELECT 
          sd.stock_symbol,
          s.company_name,
          sd.current,
          sd.change_percent,
          sd.change
        FROM stock_data sd
        JOIN stock s ON sd.stock_symbol = s.symbol
        ORDER BY CAST(REPLACE(sd.change_percent, '%', '') AS DECIMAL(10, 2)) ASC
        LIMIT 10
      `);
    return result.rows;
  } catch (err) {
    console.error("Error getting decliner stocks:", err);
    throw err;
  }
};

const getActiveStocks = async () => {
  try {
    const result = await pool.query(
      "SELECT * FROM stock_data ORDER BY volume DESC LIMIT 10"
    );
    return result.rows;
  } catch (err) {
    console.error("Error getting all stocks:", err);
    throw err;
  }
};

const addWatchlist = async (userId, symbol) => {
  try {
    const result = await pool.query(
      `INSERT INTO watchlist (user_id, stock_symbol) VALUES ($1, $2) RETURNING *`,
      [userId, symbol]
    );
    return result.rows;
  } catch (err) {
    console.error("Error adding to watchlist:", err);
    throw err;
  }
};

const compareWatchlist = async (userId, symbol) => {
  try {
    const result = await pool.query(
      `SELECT * FROM watchlist WHERE user_id = $1 AND stock_symbol = $2`,
      [userId, symbol]
    );
    return result.rows;
  } catch (err) {
    console.error("Error comparing watchlist:", err);
    throw err;
  }
};

const getWatchlist = async (userId) => {
  try {
    const result = await pool.query(
      `SELECT w.*, s.*, sd.*
      FROM watchlist w
      JOIN stock s ON w.stock_symbol = s.symbol
      JOIN stock_data sd ON s.symbol = sd.stock_symbol
      WHERE w.user_id = $1;
      `,
      [userId]
    );
    return result.rows;
  } catch (err) {
    console.error("Error getting watchlist:", err);
    throw err;
  }
};

const removeWatchlistItem = async (userId, symbol) => {
  try {
    const result = await pool.query(
      `DELETE FROM watchlist WHERE user_id = $1 AND stock_symbol = $2 RETURNING *`,
      [userId, symbol]
    );
    return result.rows;
  } catch (err) {
    console.error("Error removing from watchlist:", err);
    throw err;
  }
};

//select the 1st row of the stock_data table
const getScrappedTime = async () => {
  try {
    const result = await pool.query(`SELECT timestamp FROM stock_data LIMIT 1`);
    return result.rows;
  } catch (err) {
    console.error("Error getting first stock:", err);
    throw err;
  }
};

module.exports = {
  insertScrapedData,
  getAllStocks,
  getStockBySymbol,
  getTopStock,
  getDeclinerStock,
  getActiveStocks,
  searchStocks,
  getUserAssets,
  addWatchlist,
  compareWatchlist,
  getWatchlist,
  removeWatchlistItem,
  getScrappedTime,
};
