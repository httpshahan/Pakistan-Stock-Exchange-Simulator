import React, { useEffect, useState } from "react";
import apiService from "../../services/apiService";
import StockTable from "./StockTable";
import Indexes from "./Indexes";
import Loader from "../loader/Loader";
import { FaArrowUp, FaArrowDown, FaWallet, FaChartPie, FaChartLine } from "react-icons/fa";

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
        const topAdvancersResponse = await apiService.get("/stocks/topStocks");
        setTopAdvancers(topAdvancersResponse.data.data);

        const topDeclinersResponse = await apiService.get("/stocks/declinerStocks");
        setTopDecliners(topDeclinersResponse.data.data);

        const portfolioResponse = await apiService.get(`/stocks/userAssets/${userId}`);
        setPortfolio(
          portfolioResponse.data.data.sort((a, b) =>
            a.stock_symbol.localeCompare(b.stock_symbol)
          )
        );

        const watchlistResponse = await apiService.get(`/stocks/getWatchlist/${userId}`);
        setWatchlist(watchlistResponse.data);

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
  const growthPercentage = investedAmount > 0
    ? ((portfolioValue - investedAmount) / investedAmount) * 100
    : 0;

  const StatCard = ({ title, value, subValue, icon, type = "neutral" }) => (
    <div className="bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl shadow-black/5 rounded-3xl p-6 flex flex-col justify-between h-auto min-h-[160px] transition-transform hover:scale-[1.02] duration-300">
      <div className="flex justify-between items-start">
        <div className={`p-3 rounded-2xl ${type === 'positive' ? 'bg-green-100/50 text-green-600' :
            type === 'negative' ? 'bg-red-100/50 text-red-600' :
              'bg-gray-100/50 text-gray-900'
          }`}>
          {icon}
        </div>
        {subValue && (
          <div className={`flex items-center gap-1 text-sm font-semibold px-2 py-1 rounded-full ${growth >= 0 ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
            }`}>
            {growth >= 0 ? <FaArrowUp size={10} /> : <FaArrowDown size={10} />}
            {subValue}
          </div>
        )}
      </div>
      <div>
        <h3 className="text-gray-500 font-medium text-sm uppercase tracking-wider mb-1">{title}</h3>
        <p className="text-3xl font-bold text-gray-900 tracking-tight">{value}</p>
      </div>
    </div>
  );

  return (
    <div className="flex-1 p-8 bg-[#F5F5F7] min-h-screen overflow-auto">
      {loading ? (
        <div className="flex justify-center items-center h-full">
          <Loader />
        </div>
      ) : (
        <div className="max-w-7xl mx-auto space-y-8 pb-10">

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
              title="Portfolio Value"
              value={`Rs ${portfolioValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
              icon={<FaChartPie size={20} />}
              type="neutral"
            />
            <StatCard
              title="Invested Amount"
              value={`Rs ${investedAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
              icon={<FaWallet size={20} />}
              type="neutral"
            />
            <StatCard
              title="Total Growth"
              value={`Rs ${Math.abs(growth).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
              subValue={`${Math.abs(growthPercentage).toFixed(2)}%`}
              icon={<FaChartLine size={20} />}
              type={growth >= 0 ? 'positive' : 'negative'}
            />
            <StatCard
              title="Buying Power"
              value={`Rs ${balance.toLocaleString()}`}
              icon={<FaWallet size={20} />}
              type="neutral"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Chart / Indexes Area */}
            <div className="lg:col-span-3">
              <Indexes />
            </div>

            {/* Stock Tables */}
            <div className="lg:col-span-1">
              <StockTable title="Top Advancers" data={topAdvancers} type="positive" />
            </div>
            <div className="lg:col-span-1">
              <StockTable title="Top Decliners" data={topDecliners} type="negative" />
            </div>
            <div className="lg:col-span-1">
              <StockTable title="Watchlist" data={watchlist} type="neutral" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardComp;
