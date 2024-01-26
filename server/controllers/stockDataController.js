const e = require("express");
const {
  getAllStocks,
  getStockBySymbol,
  getTopStock,
  getDeclinerStock,
  getActiveStocks,
  searchStocks,
  getUserAssets,
} = require("../models/stockData");

const getStocks = async (req, res) => {
  try {
    const result = await getAllStocks();
    if (!result) res.status(404).json({ error: "Stock not found" });
    res
      .status(200)
      .json({ message: "Succesfully Get all the Stocks", data: result });
  } catch (error) {
    console.error("Error getting all stocks:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getStock = async (req, res) => {
  try {
    const result = await getStockBySymbol(req.params.symbol);
    if (!result) {
      return res.status(404).json({ error: "Stock not found" });
    } else {
      res
        .status(200)
        .json({ message: "Succesfully Get the Stock", data: result });
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

const getUserStocks = async (req, res) => {
  try {
    const result = await getUserAssets(req.params.userId);
    if (!result) {
      return res.status(404).json({ error: "Stock not found" });
    }
    res
      .status(200)
      .json({ message: "Succesfully Get the User Stocks", data: result });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};


const searchStock = async (req, res) => {
  try {
    const query = req.query.q; // Assuming the search query is provided as a query parameter
    if (!query) {
      return res.status(400).json({ error: 'Search query is required.' });
    }
    const searchResults = await searchStocks(query);
    res.status(200).json(searchResults);
  } catch (error) {
    console.error('Error in stock search route:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getTopStocks = async (req, res) => {
  try {
    const result = await getTopStock();
    if (!result) {
      return res.status(404).json({ error: "Stock not found" });
    } else {
      res
        .status(200)
        .json({ message: "Succesfully Get the Top Stock", data: result });
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

const getDeclinerStocks = async (req, res) => {
  try {
    const result = await getDeclinerStock();
    if (!result) {
      return res.status(404).json({ error: "Stock not found" });
    } else {
      res
        .status(200)
        .json({ message: "Succesfully Get the Decliner Stock", data: result });
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

const activeStocks = async (req, res) => {
  try {
    const result = await getActiveStocks();
    if (!result) {
      return res.status(404).json({ error: "Stock not found" });
    } else {
      res
        .status(200)
        .json({ message: "Succesfully Get the Active Stock", data: result });
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  getStocks,
  getStock,
  getTopStocks,
  getDeclinerStocks,
  activeStocks,
  searchStock,
  getUserStocks,
};
