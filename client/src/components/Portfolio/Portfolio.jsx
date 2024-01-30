import React, { useState, useEffect } from "react";
import SideNavbar from "../NavBar/SideNavBar";
import TopNavbar from "../NavBar/TopNabar";
import {
  Card,
  Text,
  Metric,
  Flex,
  ProgressBar,
  TableHead,
  TableHeaderCell,
  TableBody,
  TableRow,
  TableCell,
} from "@tremor/react";

const Portfolio = () => {
  if (!sessionStorage.getItem("token")) {
    console.log("No token");
    window.location.href = "/";
  }

  const [portfolio, setPortfolio] = useState([]);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    // Fetch portfolio data and balance from your backend or API
    // Replace the mock data below with actual API calls
    const mockPortfolioData = [
      { id: 1, stock: "AAPL", quantity: 50, avgPrice: 150, currentPrice: 160 },
      {
        id: 2,
        stock: "GOOGL",
        quantity: 30,
        avgPrice: 2000,
        currentPrice: 2050,
      },
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
    <div className="flex h-screen bg-gray-100">
      <SideNavbar />
      <div className="flex flex-col flex-1">
        <TopNavbar />
        <div className="flex-1 overflow-auto p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            <Card>
              <Text className="text-sm">Portfolio Value</Text>
              <Metric className="text-2xl font-bold">$ {calculateTotalValue().toLocaleString()}</Metric>
            </Card>
            <Card>
              <Text className="text-sm">Invested</Text>
              <Metric className="text-2xl font-bold">$ {calculateTotalValue().toLocaleString()}</Metric>
            </Card>
            <Card>
              <Text className="text-sm">Growth</Text>
              <Metric className={`text-2xl font-bold ${calculateGrowth() >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {calculateGrowth().toLocaleString()}%
              </Metric>
            </Card>
            <Card>
              <Text className="text-sm">Cash</Text>
              <Metric className="text-2xl font-bold">$ {calculateCash().toLocaleString()}</Metric>
            </Card>
          </div>
          
          <Card className="mb-8">
            <Text className="text-lg font-semibold">Assets</Text>
            <table className="w-full mt-4">
              <TableHead>
                <TableRow>
                  <TableHeaderCell>Asset</TableHeaderCell>
                  <TableHeaderCell>Quantity</TableHeaderCell>
                  <TableHeaderCell>Price</TableHeaderCell>
                  <TableHeaderCell>Total Value</TableHeaderCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {portfolio.map((stock) => (
                  <TableRow key={stock.id}>
                    <TableCell>{stock.stock}</TableCell>
                    <TableCell>{stock.quantity}</TableCell>
                    <TableCell>${stock.currentPrice.toFixed(2)}</TableCell>
                    <TableCell>${(stock.currentPrice * stock.quantity).toFixed(2)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </table>
          </Card>

          <Card className="mb-8">
            <Text className="text-lg font-semibold">Recent Transactions</Text>
            <table className="w-full mt-4">
              <TableHead>
                <TableRow>
                  <TableHeaderCell>Asset</TableHeaderCell>
                  <TableHeaderCell>Type</TableHeaderCell>
                  <TableHeaderCell>Quantity</TableHeaderCell>
                  <TableHeaderCell>Price</TableHeaderCell>
                  <TableHeaderCell>Total Value</TableHeaderCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {/* Add recent transactions data here */}
              </TableBody>
            </table>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
