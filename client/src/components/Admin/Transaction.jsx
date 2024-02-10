import React, {useState, useEffect} from "react";
import apiService from "../../services/apiService";

const TransactionHistory = () => {
  const [tradingData, setTradingData] = useState([]);

  useEffect(() => {
    const fetchTradingData = async () => {
      const tradingData = await apiService.get("/stocks/transactions");
      console.log(tradingData.data.data);
      setTradingData(tradingData.data.data);
    };
    fetchTradingData();
  }, []);
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">Trading Data</h3>
      <div className="overflow-x-auto">
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2"> User </th>
              <th className="px-4 py-2">Stock</th>
              <th className="px-4 py-2">Price</th>
              <th className="px-4 py-2">Quantity</th>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Type</th>
            </tr>
          </thead>
          <tbody>
            {tradingData.map((trade) => (
              <tr key={trade.id}>
                <td className="border px-4 py-2">{trade.id}</td>
                <td className="border px-4 py-2">{trade.user_id}</td>
                <td className="border px-4 py-2">{trade.stock_symbol}</td>
                <td className="border px-4 py-2">{trade.transaction_price}</td>
                <td className="border px-4 py-2">{trade.quantity}</td>
                <td className="border px-4 py-2">{new Date(trade.transaction_date).toLocaleString()}</td>
                <td className="border px-4 py-2">{trade.transaction_type == "B" ? "Buy" : "Sell"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionHistory;
