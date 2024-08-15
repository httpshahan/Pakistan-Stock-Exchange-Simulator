import React, { useEffect, useState } from "react";
import apiService from "../../services/apiService";
import StockTable from "./StockTable";
import Indexes from "./Indexes";
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
        // Fetch data for Top Advancers
        const topAdvancersResponse = await apiService.get("/stocks/topStocks");
        setTopAdvancers(topAdvancersResponse.data.data);

        // Fetch data for Top Decliners
        const topDeclinersResponse = await apiService.get(
          "/stocks/declinerStocks"
        );
        setTopDecliners(topDeclinersResponse.data.data);

        // Fetch user's portfolio data
        const portfolioResponse = await apiService.get(
          `/stocks/userAssets/${userId}`
        );
        setPortfolio(
          portfolioResponse.data.data.sort((a, b) =>
            a.stock_symbol.localeCompare(b.stock_symbol)
          )
        );

        // Fetch user's watchlist data
        const watchlistResponse = await apiService.get(
          `/stocks/getWatchlist/${userId}`
        );
        setWatchlist(watchlistResponse.data);

        // Set loading to false after all data is fetched
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [userId]);

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

  return (
    <div className="flex-1 overflow-auto p-8">
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <Loader />
        </div>
      ) : (
        <div className="flex flex-col space-y-8">
          <div className="text-3xl font-semibold text-center">
            Dashboard Overview
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="bg-white shadow rounded-lg p-6">
              <div className="text-lg font-medium text-gray-700">
                Portfolio Value
              </div>
              <div className="text-2xl font-semibold text-blue-600">
                {portfolioValue.toFixed(2).toLocaleString()}
              </div>
            </div>
            <div className="bg-white shadow rounded-lg p-6">
              <div className="text-lg font-medium text-gray-700">
                Invested Amount
              </div>
              <div className="text-2xl font-semibold text-green-600">
                {investedAmount.toFixed(2).toLocaleString()}
              </div>
            </div>
            <div className="bg-white shadow rounded-lg p-6">
              <div className="text-lg font-medium text-gray-700">Growth</div>
              <div className="text-2xl font-semibold text-yellow-600 flex items-end gap-2">
                {growth.toFixed(2).toLocaleString()}
                <span className="text-sm font-normal text-gray-500">
                  {growthPercentage.toFixed(2)}%
                </span>
              </div>
            </div>
            <div className="bg-white shadow rounded-lg p-6">
              <div className="text-lg font-medium text-gray-700">
                Buying Power
              </div>
              <div className="text-2xl font-semibold text-red-600">
                {balance.toLocaleString()}
              </div>
            </div>
          </div>

          <Indexes />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white shadow rounded-lg">
              <StockTable title="Top Advancers" data={topAdvancers} />
            </div>
            <div className="bg-white shadow rounded-lg">
              <StockTable title="Top Decliners" data={topDecliners} />
            </div>
            <div className="bg-white shadow rounded-lg">
              <StockTable title="Watchlist" data={watchlist} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardComp;
