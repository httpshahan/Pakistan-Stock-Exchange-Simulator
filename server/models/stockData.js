const pool = require("../db/pool");

const insertScrapedData = async (data) => {
  try {
    await pool.query("TRUNCATE stock_data RESTART IDENTITY");

    const values = data.map((item) => [
      item[0], // symbol
      item[1].replace(/,/g, ""), // LDCP
      item[2].replace(/,/g, ""), // OPEN
      item[3].replace(/,/g, ""), // HIGH
      item[4].replace(/,/g, ""), // LOW
      item[5].replace(/,/g, ""), // CURRENT
      item[6], // CHANGE
      item[7], // CHANGE (%)
      item[8].replace(/,/g, ""), //VOLUME
      item[9], // Timestamp
    ]);

    const placeholders = values
      .map(
        (_, index) =>
          `($${index * 10 + 1}, $${index * 10 + 2}, $${index * 10 + 3}, $${
            index * 10 + 4
          }, $${index * 10 + 5}, $${index * 10 + 6}, $${index * 10 + 7}, $${
            index * 10 + 8
          }, $${index * 10 + 9}, $${index * 10 + 10})`
      )
      .join(",");

    const stockData = await pool.query(
      `INSERT INTO stock_data (stock_symbol, ldcp, open, high, low, current, change, change_percent, volume, timestamp) 
       VALUES ${placeholders} Returning *`,
      values.flat()
    );

    return stockData.rows;
    //console.log("Scraped data inserted into the stock_data table.");
  } catch (error) {
    console.error("Error inserting scraped data:", error);
    throw error;
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

module.exports = {
  insertScrapedData,
  getAllStocks,
  getStockBySymbol,
  getTopStock,
  getDeclinerStock,
  getActiveStocks,
};
