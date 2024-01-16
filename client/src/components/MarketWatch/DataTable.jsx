import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const DataTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timestamp, setTimestamp] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Number of items to display per page

  useEffect(() => {
    // Fetch data from the database or API
    axios
      .get("http://localhost:3000/api/scraper/getStocks")
      .then((response) => {
        setData(response.data.data);
        const data = response.data.data;
        setTimestamp(data.length > 0 ? data[0].timestamp : "");
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError("Error fetching data. Please try again later.");
        setLoading(false);
      });
  }, []);

  const columns = [
    { Header: "ID", accessor: "id" },
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
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  const getConditionalClass = (value) => {
    if (parseFloat(value) > 0) {
      return "text-green-500";
    } else if (parseFloat(value) < 0) {
      return "text-red-500";
    } else {
      return ""; // No class if value is zero
    }
  };

  // Calculate the indexes of the items to be displayed on the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = data.slice(startIndex, endIndex);

  // Function to handle page changes
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <>
      <h1 className="text-3xl font-semibold tracking-wide mt-6 mb-2 text-center">
        Market Watch
      </h1>
      <p className="text-gray-500 text-center mb-2">{timestamp}</p>
      <div className="mx-auto max-h-screen overflow-x-auto">
        <table className="w-full border rounded-md overflow-hidden">
          <thead className="bg-gray-200">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.accessor}
                  className="border p-3 text-left font-semibold"
                >
                  {column.Header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentData.map((row) => (
              <tr key={row.id} className="border-t">
                {columns.map((column) => (
                  <td
                    key={column.accessor}
                    className={`border p-3 ${
                      ["change", "change_percent"].includes(column.accessor)
                        ? getConditionalClass(row[column.accessor])
                        : ""
                    }`}
                  >
                    {column.accessor === "stock_symbol" ? (
                      <Link
                        to={`/stock/${row[column.accessor]}`}
                        className="text-blue-500 underline"
                      >
                        {row[column.accessor]}
                      </Link>
                    ) : (
                      row[column.accessor]
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-between items-center mt-4">
          <button
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <button
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === Math.ceil(data.length / itemsPerPage)}
          >
            Next
          </button>
        </div>
        <p className="text-gray-500 mt-2 text-center">
          Page {currentPage} of {Math.ceil(data.length / itemsPerPage)}
        </p>
      </div>
    </>
  );
};

export default DataTable;
