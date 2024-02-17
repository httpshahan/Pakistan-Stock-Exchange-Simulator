import React, { useState, useEffect } from "react";
import SideNavbar from "../NavBar/SideNavBar";
import TopNavbar from "../NavBar/TopNabar";
import apiService from "../../services/apiService";
import {
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
  Metric,
} from "@tremor/react";

const Transaction = () => {
  const userId = sessionStorage.getItem("userId");
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [transactionsPerPage] = useState(10); // Number of transactions per page

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

  // Pagination Logic
  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  const currentTransactions = data.slice(
    indexOfFirstTransaction,
    indexOfLastTransaction
  );
  const totalPages = Math.ceil(data.length / transactionsPerPage);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      <SideNavbar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <TopNavbar />
        <div className="flex-1 overflow-auto">
          <div className="p-8">
            <Card>
              <Metric className="text-center">Transaction History</Metric>
              <Table className="mt-8">
                <TableHead className="text-lg ">
                  <TableRow>
                    <TableHeaderCell>Date</TableHeaderCell>
                    <TableHeaderCell>Stock</TableHeaderCell>
                    <TableHeaderCell>Quantity</TableHeaderCell>
                    <TableHeaderCell>Type</TableHeaderCell>
                    <TableHeaderCell>Price</TableHeaderCell>
                    <TableHeaderCell>Total Value</TableHeaderCell>
                  </TableRow>
                </TableHead>
                <TableBody className="text-base">
                  {currentTransactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell>
                        {new Date(
                          transaction.transaction_date
                        ).toLocaleString()}
                      </TableCell>
                      <TableCell>{transaction.stock_symbol}</TableCell>
                      <TableCell>{transaction.quantity}</TableCell>
                      <TableCell>
                        {transaction.transaction_type == "B" ? "Buy" : "Sell"}
                      </TableCell>
                      <TableCell>{transaction.transaction_price}</TableCell>
                      <TableCell>
                        {transaction.quantity * transaction.transaction_price}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
            <div className="mt-4 flex justify-between items-center">
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Prev
              </button>
              <span className="text-gray-600">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transaction;
