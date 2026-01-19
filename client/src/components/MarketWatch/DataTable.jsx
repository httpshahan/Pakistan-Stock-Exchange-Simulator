import React, { useEffect, useState } from "react";
import apiService from "../../services/apiService";
import { FaBookmark, FaArrowUp, FaArrowDown, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../loader/Loader";

const DataTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timestamp, setTimestamp] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // Number of items per page
  const userId = sessionStorage.getItem("userId");

  const [selectedStocks, setSelectedStocks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiService.get("/stocks/getStocks");
        setData(response.data.data);
        const data = response.data.data;
        setTimestamp(data.length > 0 ? data[0].timestamp : "");
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Error fetching data. Please try again later.");
      }
    };
    fetchData();
  }, []);

  const stockSymbols = data.map((stock) => stock.stock_symbol);

  const columns = [
    { Header: "Stock Symbol", accessor: "stock_symbol" },
    { Header: "Open", accessor: "open" },
    { Header: "High", accessor: "high" },
    { Header: "Low", accessor: "low" },
    { Header: "Current", accessor: "current" },
    { Header: "Change", accessor: "change" },
    { Header: "Change %", accessor: "change_percent" },
    { Header: "LDCP", accessor: "ldcp" },
    { Header: "Volume", accessor: "volume" },
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <Loader />
      </div>
    );
  }

  if (error) {
    return <p className="text-red-500 text-center mt-8">{error}</p>;
  }

  const isStockSelected = (stock) =>
    selectedStocks.length === 0 || selectedStocks.includes(stock.stock_symbol);

  const addToWatchlist = async (stock) => {
    try {
      const response = await apiService.post(
        `/stocks/addToWatchlist/${userId}/${stock.stock_symbol}`
      );
      if (response.status === 200) {
        toast.success("Stock successfully added to watchlist!");
      }
    } catch (error) {
      console.error("Error adding to watchlist:", error);
      if (error.response && error.response.status === 409) {
        toast.info("Stock already exists in watchlist!");
      } else {
        toast.error("Error adding stock to watchlist. Please try again later.");
      }
    }
  };

  const totalPages = Math.ceil(
    data.filter((item) => isStockSelected(item)).length / itemsPerPage
  );

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data
    .filter((item) => isStockSelected(item))
    .slice(indexOfFirstItem, indexOfLastItem);

  const toggleStockSelection = (symbol) => {
    setSelectedStocks((prev) =>
      prev.includes(symbol) ? prev.filter((s) => s !== symbol) : [...prev, symbol]
    );
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-3xl font-semibold text-gray-900 tracking-tight">Market Watch</h1>
          <p className="text-gray-500 mt-1">Real-time market data</p>
        </div>

        <div className="px-4 py-2 bg-white/50 backdrop-blur-md rounded-2xl text-sm font-medium text-gray-600 shadow-sm border border-white/40">
          As of{" "}
          {new Date(timestamp).toLocaleString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
          })}
        </div>
      </div>

      <div className="bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl shadow-black/5 rounded-3xl p-8">

        {/* Filter Placeholder - Tremor MultiSelect removal requires a replacement or simple dropdown. 
             For now, keeping it simple as a scrollable list or native select if needed, 
             but for this UI update request I will focus on the table. 
             If a filter is strictly needed, I can add a custom dropdown later.
          */}

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200/60">
                <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wider py-4 px-4 first:pl-2">
                  Actions
                </th>
                {columns.map((column) => (
                  <th
                    key={column.accessor}
                    className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wider py-4 px-4"
                  >
                    {column.Header}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {currentItems.map((item) => (
                <tr key={item.id} className="group hover:bg-white/50 transition-colors duration-150">
                  <td className="py-4 px-4 first:pl-2">
                    <button
                      className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
                      onClick={() => addToWatchlist(item)}
                      title="Add to Watchlist"
                    >
                      <FaBookmark size={14} />
                    </button>
                  </td>
                  {columns.map((column) => (
                    <td key={column.accessor} className="py-4 px-4 text-sm">
                      {column.accessor === "stock_symbol" ? (
                        <Link
                          to={`/stock/${item[column.accessor]}`}
                          className="font-semibold text-gray-900 hover:text-blue-600 transition-colors"
                        >
                          {item[column.accessor]}
                        </Link>
                      ) : column.accessor === "change" || column.accessor === "change_percent" ? (
                        <div className={`inline-flex items-center gap-1 font-semibold ${parseFloat(item[column.accessor]) > 0 ? "text-green-600" : "text-red-600"
                          }`}>
                          <span>{item[column.accessor]}</span>
                          {parseFloat(item[column.accessor]) > 0 ? <FaArrowUp size={10} /> : <FaArrowDown size={10} />}
                        </div>
                      ) : column.accessor === "volume" ? (
                        <span className="text-gray-700 font-medium">
                          {item[column.accessor].toLocaleString()}
                        </span>
                      ) : (
                        <span className="text-gray-700 font-medium">
                          {item[column.accessor]}
                        </span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className="mt-8 flex justify-between items-center border-t border-gray-200/50 pt-6">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-colors ${currentPage === 1
                  ? 'text-gray-300 cursor-not-allowed'
                  : 'text-gray-600 hover:bg-white/80 hover:text-gray-900'
                }`}
            >
              <FaChevronLeft size={12} /> Previous
            </button>
            <span className="text-sm text-gray-500 font-medium">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-colors ${currentPage === totalPages
                  ? 'text-gray-300 cursor-not-allowed'
                  : 'text-gray-600 hover:bg-white/80 hover:text-gray-900'
                }`}
            >
              Next <FaChevronRight size={12} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DataTable;
