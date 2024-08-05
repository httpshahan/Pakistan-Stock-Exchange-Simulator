import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import apiService from "../services/apiService";
import CompanyData from "../components/Stock/CompanyData";
import CompanyDetails from "../components/Stock/CompanyDetails";
import Chart from "../components/Stock/Chart";

const StockDetails = () => {
  const { symbol } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiService.get(`/stocks/getStock/${symbol}`);
        setData(response.data.data);
        // console.log(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData(); // Call fetchData when the component mounts
  }, []); // Re-run the effect whenever the 'symbol' parameter changes

  return (
    <div className="p-10 overflow-auto">
      {/* <div className="bg-white p-6 rounded-md shadow-md">
        <CompanyData symbol={symbol} />
      </div> */}
      <div className="mt-4 bg-white shadow-md rounded-md">
        <Chart symbol={symbol} type="stock" stockData={data} />
      </div>
      <div className="mt-4 shadow-md rounded-md">
        <CompanyDetails symbol={symbol} type="symbolProfile" />
      </div>
      <div className="mt-4 shadow-md rounded-md">
        <CompanyDetails symbol={symbol} type="financials" />
      </div>
    </div>
  );
};

export default StockDetails;
