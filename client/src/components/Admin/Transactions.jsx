import React, { useState, useEffect } from "react";
import apiService from "../../services/apiService";

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const data = await apiService.get("/stocks/transactions");
      setTransactions(data.data.data);
    };
    fetchData();
  }, []);
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">Transactions</h3>
      <div className="overflow-x-auto">
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">User</th>
              <th className="px-4 py-2">Stock</th>
              <th className="px-4 py-2">Quantity</th>
              <th className="px-4 py-2">Amount</th>
              <th className="px-4 py-2">Type</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.id}>
                <td className="border px-4 py-2">
                  {new Date(transaction.transaction_date).toLocaleString()}
                </td>
                <td className="border px-4 py-2">{transaction.user_id}</td>
                <td className="border px-4 py-2">{transaction.stock_symbol}</td>
                <td className="border px-4 py-2">{transaction.quantity}</td>
                <td className="border px-4 py-2">
                  {transaction.transaction_price}
                </td>
                <td className="border px-4 py-2">
                  {transaction.transaction_type === "B" ? "Buy" : "Sell"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Transactions;
