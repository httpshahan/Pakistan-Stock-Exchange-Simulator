import React, { useState, useEffect } from "react";
import apiService from "../services/apiService";
import { FaArrowUp, FaArrowDown, FaWallet, FaMoneyBillWave, FaChartLine, FaCoins } from "react-icons/fa";
import Loader from "../components/loader/Loader";

const Portfolio = () => {
  if (!sessionStorage.getItem("token")) {
    console.log("No token");
    window.location.href = "/";
  }

  const [portfolio, setPortfolio] = useState([]);
  const [loading, setLoading] = useState(true);
  const [balance, setBalance] = useState(
    Number(sessionStorage.getItem("balance"))
  );
  const userId = sessionStorage.getItem("userId");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiService.get(`/stocks/userAssets/${userId}`);
        const sortedPortfolio = response.data.data.sort((a, b) =>
          a.stock_symbol.localeCompare(b.stock_symbol)
        );
        setPortfolio(sortedPortfolio);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
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
  const accountValue = balance + portfolioValue;

  const StatCard = ({ title, value, subValue, icon, type = "neutral", colorClass }) => (
    <div className="bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl shadow-black/5 rounded-3xl p-6 flex flex-col justify-between h-auto min-h-[160px] transition-transform hover:scale-[1.02] duration-300">
      <div className="flex justify-between items-start">
        <div className={`p-3 rounded-2xl ${colorClass}`}>
          {icon}
        </div>
        {subValue && (
          <div className={`flex items-center gap-1 text-sm font-semibold px-2 py-1 rounded-full ${growth >= 0 ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
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
          <h1 className="text-3xl font-semibold text-center text-gray-900 tracking-tight">Portfolio Overview</h1>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard
              title="Account Value"
              value={`Rs ${accountValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
              icon={<FaWallet size={20} />}
              colorClass="bg-blue-100/50 text-blue-600"
            />
            <StatCard
              title="Cash in Hand"
              value={`Rs ${balance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
              icon={<FaMoneyBillWave size={20} />}
              colorClass="bg-gray-100/50 text-gray-700"
            />
            <StatCard
              title="Invested"
              value={`Rs ${investedAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
              icon={<FaCoins size={20} />}
              colorClass="bg-yellow-100/50 text-yellow-600"
            />
            <StatCard
              title="Current Value"
              value={`Rs ${portfolioValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
              icon={<FaChartLine size={20} />}
              colorClass="bg-indigo-100/50 text-indigo-600"
            />
            <StatCard
              title="Total Growth"
              value={`Rs ${Math.abs(growth).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
              subValue={`Rs`} // Placeholder to keep layout alignment if needed, or remove
              icon={<FaChartLine size={20} />}
              colorClass={growth >= 0 ? "bg-green-100/50 text-green-600" : "bg-red-100/50 text-red-600"}
              subValue={null} // We are showing growth value itself as main metric
            />
            <StatCard
              title="Growth %"
              value={`${growthPercentage.toFixed(2)}%`}
              icon={growth >= 0 ? <FaArrowUp size={20} /> : <FaArrowDown size={20} />}
              colorClass={growthPercentage >= 0 ? "bg-green-100/50 text-green-600" : "bg-red-100/50 text-red-600"}
            />
          </div>

          {/* Assets Table */}
          <div className="bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl shadow-black/5 rounded-3xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-6 rounded-full bg-gray-800" />
              <h2 className="text-xl font-semibold text-gray-900 tracking-tight">Your Assets</h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200/60">
                    {["Asset", "Quantity", "Avg Price", "Current Price", "Growth", "Total Value"].map((header, index) => (
                      <th key={index} className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wider py-4 px-4 first:pl-2">
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {portfolio.map((stock) => {
                    const growthValue = stock.current - stock.purchase_price;
                    const isPositive = growthValue >= 0;

                    return (
                      <tr key={stock.stock_symbol} className="group hover:bg-white/50 transition-colors duration-150">
                        <td className="py-4 px-4 first:pl-2">
                          <div className="flex flex-col">
                            <span className="font-semibold text-gray-900">{stock.stock_symbol}</span>
                            {/* Optional company name check if available, else just symbol */}
                          </div>
                        </td>
                        <td className="py-4 px-4 text-gray-700 font-medium">
                          {stock.quantity}
                        </td>
                        <td className="py-4 px-4 text-gray-700">
                          Rs {stock.purchase_price.toLocaleString()}
                        </td>
                        <td className="py-4 px-4 font-semibold text-gray-900">
                          Rs {stock.current.toLocaleString()}
                        </td>
                        <td className="py-4 px-4">
                          <div className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${isPositive ? 'bg-green-100/50 text-green-700' : 'bg-red-100/50 text-red-700'
                            }`}>
                            {isPositive ? <FaArrowUp size={8} /> : <FaArrowDown size={8} />}
                            Rs {Math.abs(growthValue).toFixed(2)}
                          </div>
                        </td>
                        <td className="py-4 px-4 font-bold text-gray-900">
                          Rs {(stock.current * stock.quantity).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              {portfolio.length === 0 && (
                <div className="text-center py-12 text-gray-400">
                  You don't own any stocks yet.
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Portfolio;
