const express = require("express");
const router = express.Router();
const stockController = require("../controllers/stockDataController");

// Define the route to get all stocks
router.get("/getStocks", stockController.getStocks);

// Define the route to get a stock by symbol
router.get("/getStock/:symbol", stockController.getStock);
router.get("/topStocks/", stockController.getTopStocks);
router.get("/declinerStocks/", stockController.getDeclinerStocks);
router.get("/activeStocks/", stockController.activeStocks);

module.exports = router;
