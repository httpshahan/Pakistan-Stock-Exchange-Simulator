// DataTable.js
import React, { useEffect, useState } from "react";
import axios from "axios";

const DataTable = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timestamp, setTimestamp] = useState("");

  useEffect(() => {
    // Fetch data from the database or API
    axios
      .get("http://localhost:3000/api/scraper/getStocks")
      .then((response) => {
        setData(response.data.data);
        const data = response.data.data;
        setTimestamp(data[0].timestamp);
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

  return (
    <>
      <h1 className="text-3xl font-semibold tracking-wide mt-6 mb-2">
        Market Watch
      </h1>
      <p className="text-gray-500">{timestamp}</p>
      <div className="mt-8 mx-auto max-h-screen overflow-y-auto">
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-200">
              {columns.map((column) => (
                <th key={column.accessor} className="border p-2">
                  {column.Header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr key={row.id} className="border-t">
                {columns.map((column) => (
                  <td
                    key={column.accessor}
                    className={`border p-2 ${
                      ["change", "change_percent"].includes(column.accessor)
                        ? getConditionalClass(row[column.accessor])
                        : ""
                    }`}
                  >
                    {row[column.accessor]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default DataTable;
