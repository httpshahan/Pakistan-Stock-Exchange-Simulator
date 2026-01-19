import React, { useState, useEffect } from "react";
import apiService from "../services/apiService";
import { toast } from "react-toastify";
import { FaTrash, FaArrowUp, FaArrowDown } from "react-icons/fa";

const Watchlist = () => {
  const userId = sessionStorage.getItem("userId");
  const [watchlist, setWatchlist] = useState([]);
  const [noData, setNoData] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiService.get(`/stocks/getWatchlist/${userId}`);
        setWatchlist(response.data);
        setLoading(false);
        if (response.data.length === 0) {
          setNoData(true);
        }
      } catch (error) {
        if (error.response && error.response.status === 404) {
          setNoData(true);
          console.error("Error fetching data:", error.response);
          setError(error.response.data.error);
        } else {
          console.error("Error fetching data:", error);
          setError("Error fetching data. Please try again later.");
        }
      }
    };
    fetchData();
  }, [userId]);

  const removeFromWatchlist = async (symbol) => {
    try {
      await apiService.delete(
        `/stocks/removeFromWatchlist/${userId}/${symbol}`
      );
      setWatchlist((current) => current.filter((item) => item.symbol !== symbol));
      if (watchlist.length === 1) setNoData(true);
      toast.success("Stock removed from watchlist");
    } catch (error) {
      console.error("Error removing item from watchlist:", error);
      setError("Error removing item from watchlist. Please try again later.");
    }
  };

  return (
    <div className="flex-1 p-8 bg-[#F5F5F7] min-h-screen overflow-auto">
      <div className="max-w-7xl mx-auto space-y-8 pb-10">
        <div className="text-center">
          <h1 className="text-3xl font-semibold text-gray-900 tracking-tight">Your Watchlist</h1>
          <p className="text-gray-500 mt-1">Track your favorite stocks in real-time</p>
        </div>

        <div className="bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl shadow-black/5 rounded-3xl p-8">
          {noData ? (
            <div className="text-center py-12 text-gray-400">
              No watchlist items found. Start adding stocks to track them here.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200/60">
                    {["Symbol", "Name", "Price", "Change", "Change %", "Actions"].map((header, index) => (
                      <th key={index} className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wider py-4 px-4 first:pl-2">
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {watchlist.map((stock) => {
                    const isPositive = stock.change > 0;
                    return (
                      <tr key={stock.symbol} className="group hover:bg-white/50 transition-colors duration-150">
                        <td className="py-4 px-4 first:pl-2 font-semibold text-gray-900">
                          {stock.symbol}
                        </td>
                        <td className="py-4 px-4 text-gray-600 font-medium">
                          {stock.company_name}
                        </td>
                        <td className="py-4 px-4 text-gray-900 font-bold">
                          {stock.current}
                        </td>
                        <td className={`py-4 px-4 font-medium ${isPositive ? "text-green-600" : "text-red-600"}`}>
                          {stock.change}
                        </td>
                        <td className="py-4 px-4">
                          <div className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full ${isPositive ? 'bg-green-100/50 text-green-700' : 'bg-red-100/50 text-red-700'
                            }`}>
                            {isPositive ? <FaArrowUp size={8} /> : <FaArrowDown size={8} />}
                            {stock.change_percent}
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <button
                            onClick={() => removeFromWatchlist(stock.symbol)}
                            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all duration-200"
                            title="Remove from watchlist"
                          >
                            <FaTrash size={14} />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          {loading && !noData && (
            <div className="text-center py-12 text-gray-500">
              Loading watchlist...
            </div>
          )}

          {error && !noData && (
            <div className="text-center py-4 text-red-500 bg-red-50 rounded-xl mt-4">
              {error}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Watchlist;
