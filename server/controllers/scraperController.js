const { exec } = require('child_process');
const stockDataModel = require('../models/stockData');
const path = require('path');

const getStocks = async (req, res) => {
    try {
        const result = await stockDataModel.getAllStocks();
        if(!result)
            res.status(404).json({error: 'Stock not found'});
            res.status(200).json({message:'Succesfully Get all the Stocks', data: result});
    } catch (error) {
        console.error('Error getting all stocks:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const getStock = async (req, res) => {
    try {
        console.log(req.params.symbol);
        const result = await stockDataModel.getStockBySymbol(req.params.symbol);
        if (!result) {
            return res.status(404).json({ error: 'Stock not found' });
        }
        res.status(200).json({message:'Succesfully Get the Stock', data: result});
    } catch (error) {
        console.error('Error getting all stocks:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const runScraper = async (req, res) => {
  try {
    const pythonScriptPath = path.join(__dirname, '..', 'scraper', 'scraper.py');

    //console.log(`Running scraper script: ${pythonScriptPath}`);

    // Run the Python scraper script as a child process
    exec(`python "${pythonScriptPath}"`, async (error, stdout, stderr) => {
      if (error) {
        console.error(`Error during scraper execution: ${error.message}`);
        return res.status(500).json({ error: 'Internal server error' });
      }

      if (stderr) {
        console.error(`Scraper script stderr: ${stderr}`);
        return res.status(500).json({ error: 'Internal server error' });
      }

      // Parse the JSON string from stdout
      const scrapedData = JSON.parse(stdout);
      console.log('Scraped data:', scrapedData.data[0]);
      // Check if scrapedData is an array
      if (!Array.isArray(scrapedData.data)) {
        console.error('Error: Scraped data is not in the expected format');
        return res.status(500).json({ error: 'Internal server error' });
      }

      // Insert scraped data into the database using the model
      const stockData = await stockDataModel.insertScrapedData(scrapedData.data);

      res.json({ message: 'Scraper executed successfully', data: stockData});
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { runScraper, getStocks, getStock };