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
  const balence = sessionStorage.getItem("balance");

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
    <div className="flex h-screen bg-gray-100">
      <SideNavbar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <TopNavbar />
        <div className="flex-1 overflow-auto p-8">
          {loading ? (
            <div class="flex justify-center items-center h-screen">
            <div class="animate-spin rounded-full border-t-4 border-green-500 border-solid h-12 w-12"></div>
            <div class="ml-3 text-xl font-semibold text-green-500">Loading...</div>
          </div>
          ) : (
            <div className="flex flex-col space-y-8">
              <div className="text-3xl font-semibold mb-4">
                Dashboard Overview
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h2 className="text-xl font-semibold mb-2">
                    Total Portfolio Value
                  </h2>
                  <p className="text-2xl font-bold text-indigo-600">0000000</p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h2 className="text-xl font-semibold mb-2">
                    Invested Amount
                  </h2>
                  <p className="text-2xl font-bold text-green-600">0000000</p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h2 className="text-xl font-semibold mb-2">
                    Growth Percentage
                  </h2>
                  <p
                    className={`text-2xl font-bold ${
                      16 >= 0 ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    16%
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h2 className="text-xl font-semibold mb-2">Cash in Hand</h2>
                  <p className="text-2xl font-bold text-blue-600">{balence}</p>
                </div>
              </div>

              <div className="flex gap-4 mt-8">
                <StockTable title="Top Advancers" data={topAdvancers} />
                <StockTable title="Top Decliners" data={topDecliners} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
