// Dashboard.js

import React, { useEffect, useState } from "react";
import SideNavbar from "../NavBar/SideNavBar";
import TopNavbar from "../NavBar/TopNabar";
import apiService from "../../services/apiService";
import StockTable from "./StockTable";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [topAdvancers, setTopAdvancers] = useState([]);
  const [topDecliners, setTopDecliners] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simulate a delay or wait for the scraping process to complete
        const scrape = await apiService.get("/delay");
        console.log(scrape.data);
        console.log("Scraping Complete");

        // Fetch data for Top Advancers
        const topAdvancersResponse = await apiService.get("/stocks/topStocks");
        setTopAdvancers(topAdvancersResponse.data.data);

        // Fetch data for Top Decliners
        const topDeclinersResponse = await apiService.get(
          "/stocks/declinerStocks"
        );
        setTopDecliners(topDeclinersResponse.data.data);

        // Set loading to false after scraping and fetching processes complete
        setLoading(false);
      } catch (error) {
        console.error("Error running Scraper or fetching data:", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures that the effect runs only once on component mount

  return (
    <div className="flex h-screen">
      <SideNavbar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <TopNavbar />
        <div className="flex-1 overflow-auto">
          {loading ? (
            // Display loader while loading is true
            <div className="flex justify-center items-center h-screen">
              <div className="animate-spin rounded-full border-t-4 border-blue-500 border-opacity-25 h-12 w-12"></div>
            </div>
          ) : (
            // Display dashboard content once loading is false
            <div className="p-8">
              <div className="flex flex-col">
                <h1 className="text-2xl font-semibold">Dashboard</h1>

                <div className="flex gap-2 mt-8">
                  <StockTable title="Top Advancers" data={topAdvancers} />
                  <StockTable title="Top Decliners" data={topDecliners} />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
