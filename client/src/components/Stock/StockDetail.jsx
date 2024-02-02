import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import apiService from "../../services/apiService";
import SideNavbar from "../NavBar/SideNavBar";
import TopNavbar from "../NavBar/TopNabar";
import CompanyData from "./CompanyData";
import CompanyDetails from "./CompanyDetails";
import Chart from "./Chart";

const StockDetails = () => {
  const { symbol } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiService.get(`/stocks/getStock/${symbol}`);
        setData(response.data.data);
        console.log(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData(); // Call fetchData when the component mounts
  }, [symbol]); // Re-run the effect whenever the 'symbol' parameter changes

  return (
    <div className="flex h-screen">
      <SideNavbar />
      <div className="flex flex-col flex-1 overflow-hidden bg-gray-100">
        <TopNavbar />
        <div className="p-10 overflow-auto">
          <div className="bg-white p-6 rounded-md shadow-md">
            <CompanyData symbol={symbol} />
            {data && (
              <div>
                <p className="text-gray-600 mb-2">
                  Current Price: {data[0].current}
                </p>
                {/* Add more properties as needed */}
              </div>
            )}
          </div>
          <div className="mt-4 shadow-md rounded-md">
                <Chart />
          </div>
          <div className="mt-4 shadow-md rounded-md">
            <CompanyDetails symbol={symbol} type="symbolProfile"/>
          </div>
          <div className="mt-4 shadow-md rounded-md">
            <CompanyDetails symbol={symbol} type="financials" />
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default StockDetails;
