import React, { useState, useEffect } from "react";
import apiService from "../../services/apiService";
import { Card, AreaChart, Title } from "@tremor/react";

const Chart = ({ symbol }) => {
  const [originalData, setOriginalData] = useState([]);
  const [dataByDay, setDataByDay] = useState([]);
  const [dataByMonth, setDataByMonth] = useState([]);
  const [dataByYear, setDataByYear] = useState([]);
  const [timeInterval, setTimeInterval] = useState("all"); // Default to all data

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiService.get(`/proxy/${symbol}`);
        const data = response.data.data;

        const formattedData = data.map((item) => ({
          timestamp: new Date(item[0] * 1000).toLocaleString("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
          }),
          price: item[1],
          volume: item[2],
          date: new Date(item[0] * 1000).toLocaleString("en-US", {
            weekday: "short", // Short weekday name (e.g., Fri)
            month: "short", // Short month name (e.g., Feb)
            day: "numeric", // Numeric day of the month (e.g., 2)
            year: "numeric", // Full year (e.g., 2024)
            hour: "numeric", // Hour in 12-hour clock (e.g., 5)
            minute: "numeric", // Minutes (e.g., 04)
            hour12: true,
          }),
        }));

        const sortedData = formattedData.sort((a, b) => {
          const timeA = new Date("1970-01-01 " + a.timestamp);
          const timeB = new Date("1970-01-01 " + b.timestamp);
          return timeA - timeB;
        });

        setOriginalData(sortedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [symbol]);

  const customTooltip = ({ payload, active }) => {
    if (!active || !payload) return null;
    return (
      <div className="w-56 bg-stock-light rounded p-2 shadow border">
        {payload.map((data, idx) => (
          <div key={idx} className="flex flex-1 space-x-2.5">
            <div className="space-y-1">
              <p className="text-sm font-semibold">
                Timestamp: {data.payload.timestamp}
              </p>
              <p className="text-sm">Price: {data.payload.price}</p>
              <p className="text-sm">
                Volume: {data.payload.volume.toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <Card className="rounded-lg overflow-hidden shadow-lg bg-white">
      <div className="p-6">
        <Title className="text-xl font-bold text-gray-800 mb-4">{symbol}</Title>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col space-y-2">
            <p className="text-gray-600">
              Low: {Math.min(...originalData.map((min) => min.price))}
            </p>
            <p className="text-gray-600">
              High: {Math.max(...originalData.map((max) => max.price))}
            </p>
          </div>
          <div className="flex flex-col space-y-2">
            <p className="text-gray-600">Open: {originalData[0]?.price}</p>
            <p className="text-gray-600">
              Close: {originalData[originalData.length - 1]?.price}
            </p>
          </div>
        </div>
        <p className="text-gray-600 mt-4">
          Volume:{" "}
          {originalData
            .reduce((acc, cur) => acc + cur.volume, 0)
            .toLocaleString()}
        </p>
      </div>
      <div className="flex justify-between p-6">
      <p className="text-gray-600 text-center">
        Current Price: {originalData[originalData.length - 1]?.price}
      </p>
      <h1 className="text-gray-600 text-center">
        As of {originalData[originalData.length - 1]?.date}
      </h1>
      </div>
      <div className="border-t border-gray-200"></div>
      <div className="flex justify-center space-x-4 p-4">
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
      </div>
      <div className="border-t border-gray-200"></div>
      <div className="p-6">
        <AreaChart
          className="h-72"
          data={
            timeInterval === "day"
              ? originalData.slice(-24)
              : timeInterval === "month"
              ? originalData.slice(-30)
              : timeInterval === "year"
              ? originalData.slice(-365)
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
    </Card>
  );
};

export default Chart;
