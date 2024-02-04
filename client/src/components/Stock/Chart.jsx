import React, { useState, useEffect } from "react";
import apiService from "../../services/apiService";
import { Card, AreaChart, Title } from "@tremor/react";

const Chart = ({ symbol }) => {
  const [originalData, setOriginalData] = useState([]);
  const [dataByDay, setDataByDay] = useState([]);
  const [dataByMonth, setDataByMonth] = useState([]);
  const [dataByYear, setDataByYear] = useState([]);
  const [timeInterval, setTimeInterval] = useState("day"); // Default to all data

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (timeInterval === "day") {
          const response = await apiService.get(`/proxy/int/${symbol}`);
          const data = response.data.data;
          const sortedData = data.sort((a, b) => a[0] - b[0]);
          const formattedData = sortedData.map((item) => ({
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
        } else {
          const response = await apiService.get(`/proxy/eod/${symbol}`);
          const data = response.data.data;

          // Sort the data by the timestamp in ascending order
          const sortedData = data.sort((a, b) => a[0] - b[0]);

          if (timeInterval === "month") {
            const formattedData = sortedData.map((item) => ({
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
            setDataByMonth(formattedData);
          } else if (timeInterval === "year") {
            const formattedData = sortedData.map((item) => ({
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
            setDataByYear(formattedData);
          } else {
            // For "all" interval, set the original data
            const formattedData = sortedData.map((item) => ({
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
            setOriginalData(formattedData);
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [symbol, timeInterval]);

  const customTooltip = ({ payload, active }) => {
    if (!active || !payload) return null;
    return (
      <div className="w-56 bg-stock-light rounded p-2 shadow border">
        {payload.map((data, idx) => (
          <div key={idx} className="flex flex-1 space-x-2.5">
            <div className="space-y-1">
              <p className="text-sm font-semibold">{data.payload.date}</p>
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
              Low: {Math.min(...dataByDay.map((min) => min.price))?.toFixed(2)}
            </p>
            <p className="text-gray-600">
              High: {Math.max(...dataByDay.map((max) => max.price))?.toFixed(2)}
            </p>
          </div>
          <div className="flex flex-col space-y-2">
            <p className="text-gray-600">
              Open: {dataByDay[0]?.price?.toFixed(2)}
            </p>
            <p className="text-gray-600">
              Close: {dataByDay[dataByDay.length - 1]?.price?.toFixed(2)}
            </p>
          </div>
        </div>
        <p className="text-gray-600 mt-4">
          Volume:{" "}
          {dataByDay
            .reduce((acc, cur) => acc + cur.volume, 0)
            .toLocaleString()}
        </p>
      </div>
      <div className="flex justify-between p-6">
        <p className="text-gray-600 text-center">
          Current Price: {dataByDay[dataByDay.length - 1]?.price}
        </p>
        <h1 className="text-gray-600 text-center">
          As of {dataByDay[dataByDay.length - 1]?.date}
        </h1>
      </div>
      <div className="border-t border-gray-200"></div>
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
    </Card>
  );
};

export default Chart;
