import React, { useState, useEffect } from "react";
import apiService from "../../services/apiService";
import { AreaChart } from "@tremor/react";
import Loader from "../loader/Loader";

const Chart = ({ symbol, type, stockData }) => {
  const [originalData, setOriginalData] = useState([]);
  const [dataByDay, setDataByDay] = useState([]);
  const [dataByMonth, setDataByMonth] = useState([]);
  const [dataByYear, setDataByYear] = useState([]);
  const [timeInterval, setTimeInterval] = useState("day");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (
        dataByDay.length > 0 &&
        dataByMonth.length > 0 &&
        dataByYear.length > 0
      ) {
        setLoading(false);
        return;
      }

      try {
        const response = await apiService.get(`/proxy/int/${symbol}`);
        const Ddata = response.data.data;
        const DsortedData = Ddata.sort((a, b) => a[0] - b[0]);
        const formattedData = DsortedData.map((item) => ({
          timestamp: new Date(item[0] * 1000).toLocaleString("en-US", { hour: "numeric", minute: "numeric", hour12: true }),
          price: item[1],
          volume: item[2],
          date: new Date(item[0] * 1000).toLocaleString("en-US", { weekday: "short", month: "short", day: "numeric", year: "numeric", hour: "numeric", minute: "numeric", hour12: true }),
        }));
        setDataByDay(formattedData);

        const res = await apiService.get(`/proxy/eod/${symbol}`);
        const data = res.data.data;
        const sortedData = data.sort((a, b) => a[0] - b[0]);

        const formatForInterval = (items, options) => items.map(item => ({
          timestamp: new Date(item[0] * 1000).toLocaleString("en-US", options),
          price: item[1],
          volume: item[2],
          date: new Date(item[0] * 1000).toLocaleString("en-US", { weekday: "short", month: "short", day: "numeric", year: "numeric" }),
        }));

        const monthData = formatForInterval(sortedData, { month: "short", day: "numeric" });
        setDataByMonth(monthData);

        const yearData = formatForInterval(sortedData, { month: "short", year: "numeric" });
        setDataByYear(yearData);

        const allData = formatForInterval(sortedData, { month: "short", year: "numeric" });
        setOriginalData(allData);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [symbol]);

  const customTooltip = ({ payload, active }) => {
    if (!active || !payload) return null;
    return (
      <div className="bg-white/90 backdrop-blur-md rounded-xl p-3 shadow-lg border border-gray-100">
        {payload.map((data, idx) => (
          <div key={idx} className="space-y-1">
            <p className="text-xs text-gray-400 font-medium">{data.payload.date}</p>
            <p className="text-lg font-bold text-gray-900">
              Rs. {parseFloat(data.payload.price.toFixed(2)).toLocaleString()}
            </p>
            <p className="text-xs text-gray-500">
              Vol: {parseFloat(data.payload.volume.toFixed(2)).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    );
  };

  const lastClosePrice = dataByMonth.length > 1 ? dataByMonth[dataByMonth.length - 2].price : 0;
  const currentPrice = dataByDay.length > 1 ? dataByDay[dataByDay.length - 1].price : lastClosePrice;
  const percentageChange = lastClosePrice > 0 ? ((currentPrice - lastClosePrice) / lastClosePrice) * 100 : 0;
  const isPositive = percentageChange >= 0;

  const lowPrice = dataByDay.length > 0 ? Math.min(...dataByDay.map(item => item.price)) : 0;
  const highPrice = dataByDay.length > 0 ? Math.max(...dataByDay.map(item => item.price)) : 0;
  const volume = dataByDay.reduce((acc, cur) => acc + cur.volume, 0);

  const StatItem = ({ label, value }) => (
    <div className="flex flex-col">
      <span className="text-xs text-gray-400 font-medium uppercase tracking-wide">{label}</span>
      <span className="text-sm font-semibold text-gray-900">{value}</span>
    </div>
  );

  return (
    <div className="bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl shadow-black/5 rounded-3xl p-6">
      {loading ? (
        <div className="flex justify-center items-center h-96">
          <Loader />
        </div>
      ) : (
        <>
          {/* Header Section */}
          <div className="flex justify-between items-start mb-8">
            <div>
              {type === "stock" && stockData && (
                <div className="mb-2">
                  <h1 className="text-2xl font-bold text-gray-900">{stockData[0].company_name}</h1>
                  <p className="text-sm text-gray-500 font-medium">{stockData[0].symbol} • {stockData[0].sector}</p>
                </div>
              )}
              <div className="flex items-baseline gap-3">
                <h2 className="text-4xl font-bold tracking-tight text-gray-900">
                  {parseFloat(currentPrice.toFixed(2)).toLocaleString()}
                  <span className="text-xl text-gray-400 font-normal ml-1">PKR</span>
                </h2>
                <div className={`px-2.5 py-1 rounded-full text-sm font-semibold ${isPositive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                  {isPositive ? "+" : ""}{percentageChange.toFixed(2)}%
                </div>
              </div>
            </div>

            {/* Time Intervals */}
            <div className="flex bg-gray-100 p-1 rounded-xl">
              {['day', 'month', 'year', 'all'].map((t) => (
                <button
                  key={t}
                  onClick={() => setTimeInterval(t)}
                  className={`px-4 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${timeInterval === t ? 'bg-white text-black shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
                >
                  {t === 'day' ? '1D' : t === 'month' ? '1M' : t === 'year' ? '1Y' : 'All'}
                </button>
              ))}
            </div>
          </div>

          {/* Chart */}
          <div className="mb-8">
            <AreaChart
              className="h-80"
              data={
                timeInterval === "day" ? dataByDay :
                  timeInterval === "month" ? dataByMonth.slice(-30) :
                    timeInterval === "year" ? dataByYear.slice(-261) :
                      originalData
              }
              index="timestamp"
              categories={["price"]}
              colors={[isPositive ? "emerald" : "rose"]}
              showAnimation={true}
              showGridLines={false}
              showYAxis={false}
              showXAxis={true}
              startEndOnly={true} // Simplify X-axis
              customTooltip={customTooltip}
              autoMinValue={true}
              showLegend={false}
              curveType="monotone"
            />
          </div>

          {/* Key Statistics */}
          <div className="pt-6 border-t border-gray-100">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Key Statistics</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <StatItem label="High" value={highPrice.toFixed(2)} />
              <StatItem label="Low" value={lowPrice.toFixed(2)} />
              <StatItem label="Volume" value={volume.toLocaleString()} />
              <StatItem label="Prev Close" value={lastClosePrice.toFixed(2)} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Chart;
