import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import SideNavbar from "../NavBar/SideNavBar";
import TopNavbar from "../NavBar/TopNabar";

const StockDetails = () => {
  const { symbol } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/stocks/getStock/${symbol}`, {
          headers: {
            "auth-token": `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setData(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        // You might want to set an error state here if needed
      }
    };

    fetchData(); // Call fetchData when the component mounts
  }, [symbol]); // Re-run the effect whenever the 'symbol' parameter changes

  return (
    <div className="flex h-screen">
      <SideNavbar />
      <div className="flex flex-col flex-1 overflow-hidden bg-gray-100">
        <TopNavbar />
        <div className="p-10">
          <h1 className="text-4xl font-bold mb-4">Stock Details</h1>
          <div className="bg-white p-6 rounded-md shadow-md">
            <p className="text-gray-600 mb-2">Stock Symbol: {symbol}</p>
            {data && (
              <div>
                <p className="text-xl font-bold mb-2">{data[0].company_name}</p>
                <p className="text-gray-600 mb-2">Current Price: {data[0].current}</p>
                {/* Add more properties as needed */}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StockDetails;
