import React, { useState, useEffect } from 'react';
import SideNavbar from '../NavBar/SideNavBar';
import TopNavbar from '../NavBar/TopNabar'

const Portfolio = () => {
  if (!sessionStorage.getItem('token')) {
    console.log("No token");
    window.location.href = '/';
  }

  const [portfolio, setPortfolio] = useState([]);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    // Fetch portfolio data and balance from your backend or API
    // Replace the mock data below with actual API calls
    const mockPortfolioData = [
      { id: 1, stock: 'AAPL', quantity: 50, avgPrice: 150, currentPrice: 160 },
      { id: 2, stock: 'GOOGL', quantity: 30, avgPrice: 2000, currentPrice: 2050 },
      // Add more stock data as needed
    ];

    const mockBalance = 50000; // Replace with actual balance from API

    setPortfolio(mockPortfolioData);
    setBalance(mockBalance);
  }, []);

  const calculateTotalValue = () => {
    // Calculate the total value based on the current prices
    return portfolio.reduce((total, stock) => {
      return total + stock.currentPrice * stock.quantity;
    }, 0);
  };

  const calculateGrowth = () => {
    // Calculate the overall growth based on the average and current prices
    const initialInvestment = portfolio.reduce((total, stock) => {
      return total + stock.avgPrice * stock.quantity;
    }, 0);

    const currentValue = calculateTotalValue();
    return currentValue - initialInvestment;
  };

  const calculateCash = () => {
    // Calculate the available cash by subtracting the initial investment from the total balance
    const initialInvestment = portfolio.reduce((total, stock) => {
      return total + stock.avgPrice * stock.quantity;
    }, 0);

    return balance - initialInvestment;
  };

  return (
    <div className="flex h-screen">
      <SideNavbar />
      <div className="flex flex-col flex-1">
        <TopNavbar />
        <div className="flex-1 overflow-auto bg-gray-100">
          <div className="p-8">
            <div className="flex flex-col space-y-8">
              <div className="text-3xl font-semibold mb-4">
                Portfolio Overview
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="bg-white rounded-md shadow-md p-6">
                  <div className="text-xl font-semibold mb-4">
                    Total Assets
                  </div>
                  <div className="text-2xl font-semibold">
                    ${balance.toFixed(2)}
                  </div>
                </div>
                <div className="bg-white rounded-md shadow-md p-6">
                  <div className="text-xl font-semibold mb-4">
                    Total Value
                  </div>
                  <div className="text-2xl font-semibold">
                    ${calculateTotalValue().toFixed(2)}
                  </div>
                </div>
                <div className="bg-white rounded-md shadow-md p-6">
                  <div className="text-xl font-semibold mb-4">
                    Growth
                  </div>
                  <div className={`text-2xl font-semibold ${calculateGrowth() >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    ${calculateGrowth().toFixed(2)}
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white rounded-md shadow-md p-6">
                  <div className="text-xl font-semibold mb-4">
                    Cash
                  </div>
                  <div className="text-2xl font-semibold">
                    ${calculateCash().toFixed(2)}
                  </div>
                </div>
                {/* Add more metrics as needed */}
              </div>
            </div>

            <div className="flex flex-col mt-8">
              <h1 className="text-2xl font-semibold">Portfolio Details</h1>
              <div className="overflow-x-auto mt-6 border p-6 bg-white rounded-md shadow-md">
                <table className="w-full">
                  <thead>
                    <tr>
                      <th className="text-left">Stock</th>
                      <th className="text-left">Quantity</th>
                      <th className="text-left">Avg. Price</th>
                      <th className="text-left">Current Price</th>
                      <th className="text-left">Profit/Loss</th>
                    </tr>
                  </thead>
                  <tbody>
                    {portfolio.map((stock) => (
                      <tr key={stock.id}>
                        <td className="text-left">{stock.stock}</td>
                        <td className="text-left">{stock.quantity}</td>
                        <td className="text-left">${stock.avgPrice.toFixed(2)}</td>
                        <td className="text-left">${stock.currentPrice.toFixed(2)}</td>
                        <td className={`text-left ${stock.currentPrice >= stock.avgPrice ? 'text-green-500' : 'text-red-500'}`}>
                          ${(stock.currentPrice - stock.avgPrice) * stock.quantity.toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Add additional sections like transaction history, performance metrics, etc. */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
