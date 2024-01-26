import React from "react";
import SideNavbar from "../NavBar/SideNavBar";
import TopNavbar from "../NavBar/TopNabar";

const Transaction = () => {
  if (!sessionStorage.getItem("token")) {
    console.log("No token");
    window.location.href = "/";
  }

  const transactions = [
    { id: 1, date: "2022-01-01", stock: "AAPL", quantity: 10, price: 150 },
    { id: 2, date: "2022-01-05", stock: "GOOGL", quantity: 5, price: 200 },
    // Add more transactions as needed
  ];

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
                    <th className="py-2 px-4 border-b">Price</th>
                    {/* Add more headers as needed */}
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((transaction) => (
                    <tr key={transaction.id}>
                      <td className="py-2 px-4 border-b">{transaction.date}</td>
                      <td className="py-2 px-4 border-b">
                        {transaction.stock}
                      </td>
                      <td className="py-2 px-4 border-b">
                        {transaction.quantity}
                      </td>
                      <td className="py-2 px-4 border-b">
                        {transaction.price}
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
