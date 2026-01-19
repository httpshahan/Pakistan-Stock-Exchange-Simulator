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
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData(); // Call fetchData when the component mounts
  }, [symbol]); // Re-run the effect whenever the 'symbol' parameter changes

  return (
    <div className="bg-[#F5F5F7] min-h-screen overflow-auto p-8">
      <div className="max-w-7xl mx-auto space-y-8 pb-10">
        <div>
          <Chart symbol={symbol} type="stock" stockData={data} />
        </div>

        <div className="bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl shadow-black/5 rounded-3xl p-4">
          <CompanyDetails symbol={symbol} type="symbolProfile" />
        </div>

        <div className="bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl shadow-black/5 rounded-3xl p-4">
          <CompanyDetails symbol={symbol} type="financials" />
        </div>
      </div>
    </div>
  );
};

export default StockDetails;
