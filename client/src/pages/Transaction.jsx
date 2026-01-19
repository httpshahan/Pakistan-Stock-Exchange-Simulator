import React, { useState, useEffect } from "react";
import apiService from "../services/apiService";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Loader from "../components/loader/Loader";

const Transaction = () => {
  const userId = sessionStorage.getItem("userId");
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [transactionsPerPage] = useState(10);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getHistory = async () => {
      try {
        const response = await apiService.get(`/trade/history/${userId}`);
        // Sort by date descending (newest first) if not already
        const sortedData = response.data.sort((a, b) => new Date(b.transaction_date) - new Date(a.transaction_date));
        setData(sortedData);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    getHistory();
  }, [userId]);

  // Pagination Logic
  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  const currentTransactions = data.slice(
    indexOfFirstTransaction,
    indexOfLastTransaction
  );
  const totalPages = Math.ceil(data.length / transactionsPerPage);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  return (
    <div className="flex-1 p-8 bg-[#F5F5F7] min-h-screen overflow-auto">
      {loading ? (
        <div className="flex justify-center items-center h-full">
          <Loader />
        </div>
      ) : (
        <div className="max-w-7xl mx-auto space-y-8 pb-10">
          <div className="text-center">
            <h1 className="text-3xl font-semibold text-gray-900 tracking-tight">Transaction History</h1>
            <p className="text-gray-500 mt-1">View your past buy and sell orders</p>
          </div>

          <div className="bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl shadow-black/5 rounded-3xl p-8">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200/60">
                    {["Date", "Stock", "Type", "Quantity", "Price", "Total Value"].map((header, index) => (
                      <th key={index} className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wider py-4 px-4 first:pl-2">
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {currentTransactions.length > 0 ? (
                    currentTransactions.map((transaction) => {
                      const isBuy = transaction.transaction_type === "B";
                      return (
                        <tr key={transaction.id} className="group hover:bg-white/50 transition-colors duration-150">
                          <td className="py-4 px-4 first:pl-2 text-sm text-gray-600 font-medium">
                            {new Date(transaction.transaction_date).toLocaleString()}
                          </td>
                          <td className="py-4 px-4 font-semibold text-gray-900">
                            {transaction.stock_symbol}
                          </td>
                          <td className="py-4 px-4">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold capitalize ${isBuy ? 'bg-green-100/50 text-green-700' : 'bg-red-100/50 text-red-700'
                              }`}>
                              {isBuy ? "Buy" : "Sell"}
                            </span>
                          </td>
                          <td className="py-4 px-4 text-gray-700">
                            {transaction.quantity}
                          </td>
                          <td className="py-4 px-4 text-gray-900 font-medium">
                            Rs {parseFloat(transaction.transaction_price).toLocaleString()}
                          </td>
                          <td className="py-4 px-4 text-gray-900 font-bold">
                            Rs {(transaction.quantity * transaction.transaction_price).toLocaleString()}
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan="6" className="text-center py-12 text-gray-400">
                        No transactions found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
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
      )}
    </div>
  );
};

export default Transaction;
