const { exec } = require('child_process');
const stockDataModel = require('../models/stockData');
const path = require('path');

const runScraper = async (req, res) => {
  try {
    const scrappedTime = await stockDataModel.getScrappedTime();

    if (scrappedTime && scrappedTime.length > 0) {
      const timeScrapped = new Date(scrappedTime[0].timestamp).getTime();
      console.log('Scrapped Time:', timeScrapped);

      const currentTime = new Date().getTime();
      console.log('Current Time:', currentTime);

      const twentyMinutesInMillis = 20 * 60 * 1000;
      console.log('20 minutes in millis:', twentyMinutesInMillis);

      if (currentTime - timeScrapped < twentyMinutesInMillis) {
        return res.json({ message: 'Scraper already executed in the last 20 minutes' });
      }
    }

    const pythonScriptPath = path.join(__dirname, '..', 'scraper', 'scraper.py');

    // Run the Python scraper script as a child process
    exec(`python "${pythonScriptPath}"`, async (error, stdout, stderr) => {
      if (error) {
        console.error(`Error during scraper execution: ${error.message}`);
        return res.status(500).json({ error: error.message, stack: error.stack });
      }

      if (stderr) {
        console.warn(`Scraper script stderr: ${stderr}`);
      }

      let scrapedData;
      try {
        scrapedData = JSON.parse(stdout);
      } catch (e) {
        return res.status(500).json({ error: 'JSON Parse Error', details: e.message, stdout: stdout.substring(0, 100) });
      }

      // Check if scrapedData is an array
      if (!scrapedData.data || !Array.isArray(scrapedData.data)) {
        console.error('Error: Scraped data is not in the expected format');
        return res.status(500).json({ error: 'Internal server error: Invalid data format' });
      }

      try {
        // Insert scraped data into the database using the model
        const stockData = await stockDataModel.insertScrapedData(scrapedData.data);
        res.json({ message: 'Scraper executed successfully' });
      } catch (dbError) {
        console.error('DB Insert Error:', dbError);
        res.status(500).json({ error: 'DB Insert Error', details: dbError.message });
      }
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message, stack: error.stack });
  }
};

module.exports = { runScraper };
