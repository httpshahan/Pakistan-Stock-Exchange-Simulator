// TransactionHistory.js
import React from "react";

  const tradingData = [
    { id: 1, userId: "1", stock: "AAPL", price: "$150", quantity: "1000" },
    { id: 2, userId: "2", stock: "GOOGL", price: "$2500", quantity: "500" },
    { id: 3, userId: "2", stock: "AAPL", price: "$2500", quantity: "500" },
    { id: 4, userId: "3", stock: "MSFT", price: "$300", quantity: "800" },
    // Add more trading data as needed
  ];

const TransactionHistory = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">Trading Data</h3>
      <div className="overflow-x-auto">
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2" > User </th>
              <th className="px-4 py-2">Stock</th>
              <th className="px-4 py-2">Price</th>
              <th className="px-4 py-2">Quantity</th>
            </tr>
          </thead>
          <tbody>
            {tradingData.map((trade) => (
              <tr key={trade.id}>
                <td className="border px-4 py-2">{trade.id}</td>
                <td className="border px-4 py-2">{trade.userId}</td>
                <td className="border px-4 py-2">{trade.stock}</td>
                <td className="border px-4 py-2">{trade.price}</td>
                <td className="border px-4 py-2">{trade.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionHistory;
