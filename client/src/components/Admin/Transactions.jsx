import React, { useState, useEffect } from "react";
import apiService from "../../services/apiService";

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [transactionsPerPage] = useState(10); // Number of transactions per page

  useEffect(() => {
    const fetchData = async () => {
      const data = await apiService.get("/stocks/transactions");
      setTransactions(data.data.data);
    };
    fetchData();
  }, []);

  // Pagination Logic
  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  const currentTransactions = transactions.slice(
    indexOfFirstTransaction,
    indexOfLastTransaction
  );
  const totalPages = Math.ceil(transactions.length / transactionsPerPage);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  return (

    <div className="bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl shadow-black/5 rounded-3xl p-8">
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-900 tracking-tight">System Transactions</h3>
        <p className="text-sm text-gray-500 mt-1">View all user transactions</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200/60">
              {["Date", "User ID", "Stock", "Quantity", "Amount", "Type"].map((header, index) => (
                <th key={index} className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wider py-4 px-4 first:pl-2">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {currentTransactions.map((transaction) => (
              <tr key={transaction.id} className="group hover:bg-white/50 transition-colors duration-150">
                <td className="py-4 px-4 first:pl-2 text-gray-600 font-medium text-sm">
                  {new Date(transaction.transaction_date).toLocaleDateString()}
                  <span className="text-gray-400 text-xs ml-2">{new Date(transaction.transaction_date).toLocaleTimeString()}</span>
                </td>
                <td className="py-4 px-4 text-gray-900 font-medium">#{transaction.user_id}</td>
                <td className="py-4 px-4">
                  <span className="font-bold text-gray-900">{transaction.stock_symbol}</span>
                </td>
                <td className="py-4 px-4 text-gray-600">{transaction.quantity}</td>
                <td className="py-4 px-4 font-medium text-gray-900">
                  Rs {transaction.transaction_price.toLocaleString()}
                </td>
                <td className="py-4 px-4">
                  <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full ${transaction.transaction_type === "B"
                    ? "bg-green-100/80 text-green-700"
                    : "bg-red-100/80 text-red-700"
                    }`}>
                    {transaction.transaction_type === "B" ? "Buy" : "Sell"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-8 flex justify-between items-center border-t border-gray-100 pt-6">
        <span className="text-sm text-gray-500">
          Page <span className="font-medium text-gray-900">{currentPage}</span> of <span className="font-medium text-gray-900">{totalPages}</span>
        </span>
        <div className="flex gap-2">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className="px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            Previous
          </button>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Transactions;
