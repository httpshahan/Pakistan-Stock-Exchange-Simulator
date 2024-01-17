const e = require("express");
const { getAllStocks, getStockBySymbol } = require("../models/stockData");

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
            return res.status(404).json({ error: 'Stock not found' });
        }
        else{
            res.status(200).json({message:'Succesfully Get the Stock', data: result});
        }
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = { getStocks, getStock };
