const { exec } = require('child_process');
const stockDataModel = require('../models/stockData');
const path = require('path');

const runScraper = async (req, res) => {
  try {
    const scrappedTime = await stockDataModel.getScrappedTime();
    const timeScrapped = new Date(scrappedTime[0].timestamp).getTime();
    console.log('Scrapped Time:', timeScrapped);

    const currentTime = new Date().getTime();
    console.log('Current Time:', currentTime);

    const twentyMinutesInMillis = 20 * 60 * 1000;
    console.log('20 minutes in millis:', twentyMinutesInMillis);

    if (currentTime - timeScrapped < twentyMinutesInMillis) {
      return res.json({ message: 'Scraper already executed in the last 20 minutes' });
    }

    const pythonScriptPath = path.join(__dirname, '..', 'scraper', 'scraper.py');

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

      res.json({ message: 'Scraper executed successfully'});
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { runScraper };
