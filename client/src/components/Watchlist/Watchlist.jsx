import React, { useState, useEffect } from "react";
import SideNavbar from "../NavBar/SideNavBar";
import TopNavbar from "../NavBar/TopNabar";
import apiService from "../../services/apiService";
import { Metric } from "@tremor/react";

const Watchlist = () => {
  const userId = sessionStorage.getItem("userId");
  const [watchlist, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiService.get(`/stocks/getWatchlist/${userId}`);
        setWatchlist(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Error fetching data. Please try again later.");
      }
    };
    fetchData();
  }, []);

  return (
    <div className="flex h-screen overflow-hidden">
      <SideNavbar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <TopNavbar />
        <div className="flex-1 overflow-auto">
          <div className="p-8">
            <div className="flex flex-col">
              <Metric className="text-center">Watchlist</Metric>
            </div>
            <div className="flex flex-col mt-4">
              <div className="overflow-x-auto">
                <table className="table-auto w-full">
                  <thead>
                    <tr>
                      <th className="px-4 py-2">Symbol</th>
                      <th className="px-4 py-2">Name</th>
                      <th className="px-4 py-2">Price</th>
                      <th className="px-4 py-2">Change</th>
                      <th className="px-4 py-2">Change %</th>
                    </tr>
                  </thead>
                  <tbody>
                    {watchlist.map((stock) => (
                      <tr key={stock.symbol}>
                        <td className="border px-4 py-2">{stock.symbol}</td>
                        <td className="border px-4 py-2">{stock.company_name}</td>
                        <td className="border px-4 py-2">{stock.current}</td>
                        <td
                          className={`border px-4 py-2 ${
                            stock.change > 0 ? "text-green-500" : "text-red-500"
                          }`}
                        >
                          {stock.change}
                        </td>
                        <td
                          className={`border px-4 py-2 ${
                            stock.change > 0 ? "text-green-500" : "text-red-500"
                          }`}
                        >
                          {stock.change_percent}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {loading && <p>Loading...</p>}
              {error && <p>{error}</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Watchlist;
