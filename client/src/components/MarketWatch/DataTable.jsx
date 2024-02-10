import React, { useEffect, useState } from "react";
import apiService from "../../services/apiService";
import { FaBookmark } from "react-icons/fa6";
import { Link } from "react-router-dom";
import {
  Card,
  Table,
  TableRow,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableBody,
  BadgeDelta,
  MultiSelect,
  MultiSelectItem,
  Badge,
} from "@tremor/react";

const DataTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timestamp, setTimestamp] = useState("");


  const [selectedStocks, setSelectedStocks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiService.get("/stocks/getStocks");
        setData(response.data.data);
        const data = response.data.data;
        setTimestamp(data.length > 0 ? data[0].timestamp : "");
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Error fetching data. Please try again later.");
      }
    };
    fetchData();
  }, []);

  const stockSymbols = data.map((stock) => stock.stock_symbol);

  const columns = [
    // { Header: "ID", accessor: "id" },
    { Header: "Stock Symbol", accessor: "stock_symbol" },
    { Header: "Open", accessor: "open" },
    { Header: "High", accessor: "high" },
    { Header: "Low", accessor: "low" },
    { Header: "Current", accessor: "current" },
    { Header: "Change", accessor: "change" },
    { Header: "Change Percent", accessor: "change_percent" },
    { Header: "LDCP", accessor: "ldcp" },
    { Header: "Volume", accessor: "volume" },
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full border-t-4 border-green-500 border-solid h-12 w-12"></div>
        <div className="ml-3 text-xl font-semibold text-green-500">
          Loading...
        </div>
      </div>
    );
  }

  if (error) {
    return <p>{error}</p>;
  }

 

  const isStockSelected = (stock) =>
    selectedStocks.length === 0 || selectedStocks.includes(stock.stock_symbol);

  const addToWatchlist = (stock) => {
    console.log("Adding to watchlist:", stock.stock_symbol);
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Market Watch</h1>
        <Badge className="bg-[#F7F7F7] text-[#84828A]">
          As of{" "}
          {new Date(timestamp).toLocaleString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
          })}
        </Badge>
      </div>
      <div className="overflow-x-auto mt-6 border p-6 bg-white rounded-md shadow-md">
        <MultiSelect
          onValueChange={setSelectedStocks}
          placeholder="Select Stocks..."
          className="max-w-xs"
        >
          {stockSymbols.map((symbol) => (
            <MultiSelectItem key={symbol} value={symbol}>
              {symbol}
            </MultiSelectItem>
          ))}
        </MultiSelect>
        <Table className="mt-6">
          <TableHead className="text-base">
            <TableRow>
              <TableHeaderCell className="border rounded-md">
                Actions
              </TableHeaderCell>
              {columns.map((column) => (
                <TableHeaderCell
                  className="border rounded-md"
                  key={column.accessor}
                >
                  {column.Header}
                </TableHeaderCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody className="text-base">
            {data
              .filter((item) => isStockSelected(item))
              .map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <button className="px-2 py-1 text-stock-tertiary"
                    onClick={() => addToWatchlist(item)}>
                      <FaBookmark className="hover:text-stock-primary active:text-stock-secondary" />
                    </button>
                  </TableCell>
                  {columns.map((column) => (
                    <TableCell key={column.accessor}>
                      {column.accessor === "stock_symbol" ? (
                        <Link to={`/stock/${item[column.accessor]}`}>
                          {item[column.accessor]}
                        </Link>
                      ) : column.accessor === "change" ? (
                        item[column.accessor] > 0 ? (
                          <BadgeDelta deltaType="increase">
                            {" "}
                            {item[column.accessor]}{" "}
                          </BadgeDelta>
                        ) : (
                          <BadgeDelta deltaType="decrease">
                            {" "}
                            {item[column.accessor]}{" "}
                          </BadgeDelta>
                        )
                      ) : column.accessor === "change_percent" ? (
                        parseFloat(item[column.accessor]) > 0 ? (
                          <BadgeDelta deltaType="increase">
                            {" "}
                            {item[column.accessor]}{" "}
                          </BadgeDelta>
                        ) : (
                          <BadgeDelta deltaType="decrease">
                            {" "}
                            {item[column.accessor]}{" "}
                          </BadgeDelta>
                        )
                      ) : column.accessor === "volume" ? (
                        item[column.accessor].toLocaleString()
                      ) : (
                        item[column.accessor]
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default DataTable;
