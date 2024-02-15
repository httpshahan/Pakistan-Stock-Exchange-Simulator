import React, { useState, useEffect } from "react";
import SideNavbar from "../NavBar/SideNavBar";
import TopNavbar from "../NavBar/TopNabar";
import apiService from "../../services/apiService";
import { Metric } from "@tremor/react";
import { toast } from 'react-toastify';

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
  }, [userId, watchlist]); // Include watchlist and userId in the dependency array
  
  const removeFromWatchlist = async (symbol) => {
    try {
      await apiService.delete(`/stocks/removeFromWatchlist/${userId}/${symbol}`);
      // After successful removal, fetch updated watchlist data
      toast.success('Stock removed from watchlist');
      
    } catch (error) {
      console.error("Error removing item from watchlist:", error);
      setError("Error removing item from watchlist. Please try again later.");
    }
  };
  

  return (
    <div className="flex h-screen overflow-hidden">
      <SideNavbar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <TopNavbar />
        <div className="flex-1 overflow-auto bg-gray-200">
          <div className="p-8">
            <div className="flex justify-center">
              <Metric>Watchlist</Metric>
            </div>
            <div className="mt-4">
              {noData && <p className="text-red-500 text-center">No watchlist items found</p>}
              {!noData && (
                <div className="overflow-x-auto">
                  <table className="w-full bg-white shadow-md rounded-lg">
                    <thead>
                      <tr className="text-left bg-gray-100">
                        <th className="px-4 py-2">Symbol</th>
                        <th className="px-4 py-2">Name</th>
                        <th className="px-4 py-2">Price</th>
                        <th className="px-4 py-2">Change</th>
                        <th className="px-4 py-2">Change %</th>
                        <th className="px-4 py-2">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {watchlist.map((stock) => (
                        <tr key={stock.symbol} className="border-b">
                          <td className="px-4 py-2">{stock.symbol}</td>
                          <td className="px-4 py-2">{stock.company_name}</td>
                          <td className="px-4 py-2">{stock.current}</td>
                          <td
                            className={`px-4 py-2 ${
                              stock.change > 0 ? "text-green-500" : "text-red-500"
                            }`}
                          >
                            {stock.change}
                          </td>
                          <td
                            className={`px-4 py-2 ${
                              stock.change > 0 ? "text-green-500" : "text-red-500"
                            }`}
                          >
                            {stock.change_percent}
                          </td>
                          <td className="px-4 py-2">
                            <button
                              className="bg-red-500 text-white py-1 px-2 rounded"
                              onClick={() => removeFromWatchlist(stock.symbol)}
                            >
                              Remove
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              {loading && !noData && <p className="text-center">Loading...</p>}
              {error && !noData && <p className="text-red-500 text-center">{error}</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Watchlist;
