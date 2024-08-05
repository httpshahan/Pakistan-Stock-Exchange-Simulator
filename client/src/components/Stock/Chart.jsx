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
  console.log(stockData);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiService.get(`/proxy/int/${symbol}`);
        const Ddata = response.data.data;
        const DsortedData = Ddata.sort((a, b) => a[0] - b[0]);
        const formattedData = DsortedData.map((item) => ({
          timestamp: new Date(item[0] * 1000).toLocaleString("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
          }),
          price: item[1],
          volume: item[2],
          date: new Date(item[0] * 1000).toLocaleString("en-US", {
            weekday: "short",
            month: "short",
            day: "numeric",
            year: "numeric",
            hour: "numeric",
            minute: "numeric",
            hour12: true,
          }),
        }));
        setDataByDay(formattedData);

        const res = await apiService.get(`/proxy/eod/${symbol}`);
        const data = res.data.data;
        const sortedData = data.sort((a, b) => a[0] - b[0]);

        const monthData = sortedData.map((item) => ({
          timestamp: new Date(item[0] * 1000).toLocaleString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          }),
          price: item[1],
          volume: item[2],
          date: new Date(item[0] * 1000).toLocaleString("en-US", {
            weekday: "short",
            month: "short",
            day: "numeric",
            year: "numeric",
          }),
        }));
        setDataByMonth(monthData);

        const yearData = sortedData.map((item) => ({
          timestamp: new Date(item[0] * 1000).toLocaleString("en-US", {
            month: "short",
            year: "numeric",
          }),
          price: item[1],
          volume: item[2],
          date: new Date(item[0] * 1000).toLocaleString("en-US", {
            weekday: "short",
            month: "short",
            day: "numeric",
            year: "numeric",
          }),
        }));
        setDataByYear(yearData);

        const allData = sortedData.map((item) => ({
          timestamp: new Date(item[0] * 1000).toLocaleString("en-US", {
            month: "short",
            year: "numeric",
          }),
          price: item[1],
          volume: item[2],
          date: new Date(item[0] * 1000).toLocaleString("en-US", {
            weekday: "short",
            month: "short",
            day: "numeric",
            year: "numeric",
          }),
        }));
        setOriginalData(allData);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const customTooltip = ({ payload, active }) => {
    if (!active || !payload) return null;
    return (
      <div className="w-56 bg-white rounded p-2 shadow border">
        {payload.map((data, idx) => (
          <div key={idx} className="flex flex-1 space-x-2.5">
            <div className="space-y-1">
              <p className="text-sm font-semibold">{data.payload.date}</p>
              <p className="text-sm">
                Price: {""}
                {parseFloat(data.payload.price.toFixed(2)).toLocaleString()}
              </p>
              <p className="text-sm">
                Volume:{" "}
                {parseFloat(data.payload.volume.toFixed(2)).toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const lastClosePrice =
    dataByMonth.length > 1 ? dataByMonth[dataByMonth.length - 2].price : 0;
  const currentPrice =
    dataByDay.length > 1
      ? dataByDay[dataByDay.length - 1].price
      : lastClosePrice;
  const openPrice = dataByDay.length > 0 ? dataByDay[0].price : 0;
  const lowPrice = Math.min(...dataByDay.map((item) => item.price));
  // console.log(lowPrice);
  const highPrice = Math.max(...dataByDay.map((item) => item.price));
  const percentageChange =
    ((currentPrice - lastClosePrice) / lastClosePrice) * 100;

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center h-96">
          <Loader />
        </div>
      ) : (
        <>
          <div className="bg-white overflow-hidden py-4 text-center">
            {
              // Display the company name and symbol
              type === "stock" && (
                // company name, sector, symbol
                <div className="px-10 py-6">
                  <h1 className="text-4xl font-semibold text-gray-900 uppercase">
                    {stockData[0].company_name}
                  </h1>
                  <p className="text-gray-600">
                    {stockData[0].symbol} - <span>{stockData[0].sector}</span>
                  </p>
                </div>
              )
            }
            <div className="justify-center text-gray-900 flex items-end gap-4 px-10">
              <p className="text-4xl font-bold">
                Rs. {parseFloat(currentPrice.toFixed(2)).toLocaleString()}
              </p>
              <p
                className={`text-lg font-semibold ${
                  percentageChange >= 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                {percentageChange >= 0 ? "▲ " : "▼ "}
                {parseFloat(
                  (currentPrice - lastClosePrice).toFixed(2)
                ).toLocaleString()}{" "}
                ({percentageChange >= 0 ? "+" : "-"}
                {Math.abs(percentageChange).toFixed(2)}%)
              </p>
            </div>
            <p className="text-sm text-gray-600 px-10 py-2">
              As of{" "}
              {dataByDay.length > 0
                ? " " + dataByDay[dataByDay.length - 1].date
                : dataByMonth[dataByMonth.length - 1].date}
            </p>

            <div className="grid grid-cols-2 gap-0 justify-center">
              <div className="flex flex-col items-center space-y-2 bg-gray-100 p-4">
                <p className="text-gray-600">Low</p>
                <p className="text-gray-900 text-lg font-semibold">
                  {lowPrice.toFixed(2) !== "Infinity"
                    ? parseFloat(lowPrice.toFixed(2)).toLocaleString()
                    : "0"}
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 bg-gray-100 p-4">
                <p className="text-gray-600">High</p>
                <p className="text-gray-900 text-lg font-semibold">
                  {highPrice.toFixed(2) !== "-Infinity"
                    ? parseFloat(highPrice.toFixed(2)).toLocaleString()
                    : "0"}
                </p>
              </div>
            </div>

            <hr className="border-t border-gray-300" />

            <div className="grid grid-cols-2 gap-0 justify-center">
              <div className="flex flex-col items-center space-y-2 bg-gray-100 p-4">
                <p className="text-gray-600">Open</p>
                <p className="text-gray-900 text-lg font-semibold">
                  {openPrice.toFixed(2) > 0
                    ? parseFloat(openPrice.toFixed(2)).toLocaleString()
                    : "0"}
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 bg-gray-100 p-4">
                <p className="text-gray-600">Previous Close</p>
                <p className="text-gray-900 text-lg font-semibold">
                  {parseFloat(lastClosePrice.toFixed(2)).toLocaleString()}
                </p>
              </div>
            </div>

            <hr className="border-t border-gray-300" />
            <div className="grid grid-cols-2 gap-0 justify-center">
              <div className="flex flex-col items-center space-y-2 bg-gray-100 p-4">
                <p className="text-gray-600">Volume</p>
                <p className="text-gray-900 text-lg font-semibold">
                  {dataByDay
                    .reduce((acc, cur) => acc + cur.volume, 0)
                    .toLocaleString()}
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 bg-gray-100 p-4">
                <p className="text-gray-600">Day Range</p>
                <p className="text-gray-900 text-lg font-semibold">
                  {lowPrice.toFixed(2) !== "Infinity"
                    ? parseFloat(lowPrice.toFixed(2)).toLocaleString()
                    : "0"}{" "}
                  -{" "}
                  {highPrice.toFixed(2) !== "-Infinity"
                    ? parseFloat(highPrice.toFixed(2)).toLocaleString()
                    : "0"}
                </p>
              </div>
            </div>

            <div className="flex justify-center mt-6"></div>
          </div>

          <div className="flex justify-center space-x-4 p-4">
            <button
              className={`${
                timeInterval === "day"
                  ? "bg-gray-800 text-white"
                  : "bg-gray-200 text-gray-800"
              } px-4 py-2 rounded`}
              onClick={() => setTimeInterval("day")}
            >
              Day
            </button>
            <button
              className={`${
                timeInterval === "month"
                  ? "bg-gray-800 text-white"
                  : "bg-gray-200 text-gray-800"
              } px-4 py-2 rounded`}
              onClick={() => setTimeInterval("month")}
            >
              Month
            </button>
            <button
              className={`${
                timeInterval === "year"
                  ? "bg-gray-800 text-white"
                  : "bg-gray-200 text-gray-800"
              } px-4 py-2 rounded`}
              onClick={() => setTimeInterval("year")}
            >
              Year
            </button>
            <button
              className={`${
                timeInterval === "all"
                  ? "bg-gray-800 text-white"
                  : "bg-gray-200 text-gray-800"
              } px-4 py-2 rounded`}
              onClick={() => setTimeInterval("all")}
            >
              All
            </button>
          </div>

          <div className="border-t border-gray-200"></div>

          <div className="p-6">
            <AreaChart
              className="h-72"
              data={
                timeInterval === "day"
                  ? dataByDay
                  : timeInterval === "month"
                  ? dataByMonth.slice(-30)
                  : timeInterval === "year"
                  ? dataByYear.slice(-261)
                  : originalData
              }
              index="timestamp"
              categories={["price"]}
              colors={["yellow-500"]}
              showAnimation={true}
              yAxisWidth={50}
              customTooltip={customTooltip}
              autoMinValue={true}
              showLegend={false}
            />
          </div>
        </>
      )}
    </>
  );
};

export default Chart;
