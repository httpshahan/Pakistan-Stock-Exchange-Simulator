import React, { useState, useEffect } from "react";
import SideNavbar from "../NavBar/SideNavBar";
import TopNavbar from "../NavBar/TopNabar";
import apiService from "../../services/apiService";

const Transaction = () => {
  const userId = sessionStorage.getItem("userId");
  const [data, setData] = useState([]);

  useEffect(() => {
    const getHistory = async () => {
      try {
        const response = await apiService.get(`/trade/history/${userId}`);
        setData(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    getHistory();
  }, [userId]);

  return (
    <div className="flex h-screen">
      <SideNavbar />
      <div className="flex flex-col flex-1">
        <TopNavbar />
        <div className="flex-1 overflow-auto">
          <div className="p-8">
            <div className="flex flex-col">
              <h1 className="text-2xl font-semibold">Transaction</h1>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-300">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border-b">Date</th>
                    <th className="py-2 px-4 border-b">Stock</th>
                    <th className="py-2 px-4 border-b">Quantity</th>
                    <th className="py-2 px-4 border-b">Type</th>
                    <th className="py-2 px-4 border-b">Price</th>
                    {/* Add more headers as needed */}
                  </tr>
                </thead>
                <tbody>
                  {data.map((transaction) => (
                    <tr key={transaction.id}>
                      <td className="py-2 px-4 border-b">{transaction.transaction_date}</td>
                      <td className="py-2 px-4 border-b">
                        {transaction.stock_symbol}
                      </td>
                      <td className="py-2 px-4 border-b">
                        {transaction.quantity}
                      </td>
                      <td className="py-2 px-4 border-b">
                        {transaction.transaction_type}
                      </td>
                      <td className="py-2 px-4 border-b">
                        {transaction.transaction_price}
                      </td>
                      {/* Add more cells based on your transaction object */}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transaction;
