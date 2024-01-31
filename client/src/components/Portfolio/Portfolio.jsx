import React, { useState, useEffect } from "react";
import SideNavbar from "../NavBar/SideNavBar";
import TopNavbar from "../NavBar/TopNabar";
import apiService from "../../services/apiService";
import {
  Card,
  Text,
  Metric,
  TableHead,
  TableHeaderCell,
  TableBody,
  TableRow,
  TableCell,
  BadgeDelta,
} from "@tremor/react";

const Portfolio = () => {
  if (!sessionStorage.getItem("token")) {
    console.log("No token");
    window.location.href = "/";
  }

  const [portfolio, setPortfolio] = useState([]);
  const [balance, setBalance] = useState(
    Number(sessionStorage.getItem("balance"))
  );
  const userId = sessionStorage.getItem("userId");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiService.get(`/stocks/userAssets/${userId}`);
        const sortedPortfolio = response.data.data.sort((a, b) =>
          a.stock_symbol.localeCompare(b.stock_symbol)
        );
        setPortfolio(sortedPortfolio);
        console.log(sortedPortfolio);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [userId]);

  const portfolioValue = portfolio.reduce(
    (total, stock) => total + stock.current * stock.quantity,
    0
  );
  const investedAmount = portfolio.reduce(
    (total, stock) => total + stock.purchase_price * stock.quantity,
    0
  );
  const growth = portfolioValue - investedAmount;
  const growthPercentage =
    ((portfolioValue - investedAmount) / investedAmount) * 100;
  const totalCash = balance - investedAmount;
  const accountValue = totalCash + portfolioValue;

  return (
    <div className="flex h-screen bg-gray-100">
      <SideNavbar />
      <div className="flex flex-col flex-1">
        <TopNavbar />
        <div className="flex-1 overflow-auto p-6">
          <Metric className="mb-6 text-3xl text-blue-600 font-semibold">
            {" "}
            Portfolio{" "}
          </Metric>

          {/* Cards Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {[
              {
                title: "Account Value",
                value: accountValue,
                color: "bg-blue-200",
                text: "text-blue-700",
              },
              {
                title: "Cash in Hand",
                value: totalCash,
                color: "bg-green-200",
                text: "text-green-700",
              },
              {
                title: "Invested",
                value: investedAmount,
                color: "bg-yellow-200",
                text: "text-yellow-700",
              },
              {
                title: "Current Value",
                value: portfolioValue,
                color: "bg-purple-200",
                text: "text-purple-700",
              },
              {
                title: "Growth",
                value: growth,
                color: growth >= 0 ? "bg-green-200" : "bg-red-200",
                text: growth >= 0 ? "text-green-700" : "text-red-700",
              },
              {
                title: "Growth Percentage",
                value: growthPercentage,
                color: growthPercentage >= 0 ? "bg-green-200" : "bg-red-200",
                text: growthPercentage >= 0 ? "text-green-700" : "text-red-700",
              },
            ].map((card, index) => (
              <Card key={index} className={`py-4 ${card.color} ${card.text}`}>
                <Text>{card.title}</Text>
                <Metric className="p-3">{card.value.toFixed(2)}</Metric>
              </Card>
            ))}
          </div>

          {/* Assets Table */}
          <Card className="mb-8">
            <Text className="text-lg font-semibold">Assets</Text>
            <table className="w-full mt-4">
              <TableHead>
                <TableRow>
                  {[
                    "Asset",
                    "Quantity",
                    "Purchase Price",
                    "Current Price",
                    "Growth",
                    "Total Value",
                  ].map((header, index) => (
                    <TableHeaderCell key={index}>{header}</TableHeaderCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {portfolio.map((stock) => (
                  <TableRow key={stock.stock_symbol}>
                    {[
                      "stock_symbol",
                      "quantity",
                      "purchase_price",
                      "current",
                    ].map((property, index) => (
                      <TableCell key={index}>{stock[property]}</TableCell>
                    ))}
                    <TableCell>
                      <BadgeDelta
                        deltaType={
                          stock.current - stock.purchase_price >= 0
                            ? "increase"
                            : "decrease"
                        }
                      >
                        {(stock.current - stock.purchase_price).toFixed(2)}
                      </BadgeDelta>
                    </TableCell>
                    <TableCell>
                      {(stock.current * stock.quantity).toFixed(2)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </table>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
