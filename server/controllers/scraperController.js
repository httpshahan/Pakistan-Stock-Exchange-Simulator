const { exec } = require('child_process');
const stockDataModel = require('../models/stockData');
const path = require('path');

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

module.exports = { runScraper };