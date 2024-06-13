import React, { useEffect, useState } from "react";
import apiService from "../../services/apiService";
import StockTable from "./StockTable";
import Indexes from "./Indexes";
import { Card, Grid, Metric, Text } from "@tremor/react";
import Loader from "../loader/Loader";

const DashboardComp = () => {
  const [loading, setLoading] = useState(true);
  const [topAdvancers, setTopAdvancers] = useState([]);
  const [topDecliners, setTopDecliners] = useState([]);
  const [portfolio, setPortfolio] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
  const [balance, setBalance] = useState(
    Number(sessionStorage.getItem("balance"))
  );
  const userId = sessionStorage.getItem("userId");

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simulate a delay or wait for the scraping process to complete
        // const scrape = await apiService.get("/delay");
        // console.log(scrape.data);
        // console.log("Scraping Complete");

        // Fetch data for Top Advancers
        const topAdvancersResponse = await apiService.get("/stocks/topStocks");
        setTopAdvancers(topAdvancersResponse.data.data);

        // Fetch data for Top Decliners
        const topDeclinersResponse = await apiService.get(
          "/stocks/declinerStocks"
        );
        setTopDecliners(topDeclinersResponse.data.data);

        // Fetch user's portfolio data
        try {
          const response = await apiService.get(`/stocks/userAssets/${userId}`);
          const sortedPortfolio = response.data.data.sort((a, b) =>
            a.stock_symbol.localeCompare(b.stock_symbol)
          );
          setPortfolio(sortedPortfolio);
          console.log(sortedPortfolio);
        } catch (error) {
          console.error("Error fetching data:", error);
        }

        // Fetch user's watchlist data
        try {
          const response = await apiService.get(
            `/stocks/getWatchlist/${userId}`
          );
          setWatchlist(response.data);
          console.log(response.data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
        // Set loading to false after scraping and fetching processes complete
        setLoading(false);
      } catch (error) {
        console.error("Error running Scraper or fetching data:", error);
      }
    };

    fetchData();
  }, [userId]); // Empty dependency array ensures that the effect runs only once on component mount

  const portfolioValue = portfolio.reduce(
    (total, stock) => total + stock.current * stock.quantity,
    0
  );
  const investedAmount = portfolio.reduce(
    (total, stock) => total + stock.purchase_price * stock.quantity,
    0
  );
  const growth = portfolioValue - investedAmount;
  const growthPercentage =
    ((portfolioValue - investedAmount) / investedAmount) * 100;
  const accountValue = balance + portfolioValue;

  return (
    <div className="flex-1 overflow-auto p-8">
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <Loader />
        </div>
      ) : (
        <div className="flex flex-col">
          <div className="text-3xl font-semibold mb-8 text-center">
            Dashboard Overview
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 p-4">
            <div className="bg-white shadow-lg rounded-lg p-6">
              <div className="text-lg font-medium text-gray-700 mb-2">
                Portfolio Value
              </div>
              <div className="text-2xl font-semibold text-blue-600">
                {portfolioValue.toFixed(2)}
              </div>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-6">
              <div className="text-lg font-medium text-gray-700 mb-2">
                Invested Amount
              </div>
              <div className="text-2xl font-semibold text-green-600">
                {investedAmount.toFixed(2)}
              </div>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-6">
              <div className="text-lg font-medium text-gray-700 mb-2">
                Growth
              </div>
              <div className="text-2xl font-semibold text-yellow-600">
                {growth.toFixed(2)}
              </div>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-6">
              <div className="text-lg font-medium text-gray-700 mb-2">
                Buying Power
              </div>
              <div className="text-2xl font-semibold text-red-600">
                {balance}
              </div>
            </div>
          </div>

          <div>
            <Indexes />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            <div className="border rounded-lg shadow-md">
              <StockTable title="Top Advancers" data={topAdvancers} />
            </div>
            <div className="border rounded-lg shadow-md ">
              <StockTable title="Top Decliners" data={topDecliners} />
            </div>
            <div className="border rounded-lg shadow-md">
              <StockTable title="Watchlist" data={watchlist} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardComp;
