import React, { useState, useEffect } from 'react';
import apiService from '../../services/apiService';
import { Card, LineChart, Title } from "@tremor/react";

const Chart = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const symbol = 'KSE100'
        const response = await apiService.get(`/proxy/${symbol}`);
        const data = response.data.data;
        console.log(data);
        
        // Assuming the API response has a structure similar to your previous example
        const formattedData = data.map(item => ({
          date: new Date(item[0] * 1000).toLocaleDateString("en-US", { month: 'short' }),
          timestamp: new Date(item[0] * 1000).toLocaleString(),
          price: item[1],
          volume: item[2],
        }));

        setChartData(formattedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const customTooltip = ({ payload, active }) => {
    if (!active || !payload) return null;
    return (
      <div className="w-56 rounded-tremor-default text-tremor-default bg-tremor-background p-2 shadow-tremor-dropdown border border-tremor-border">
        {payload.map((data, idx) => (
          <div key={idx} className="flex flex-1 space-x-2.5">
            <div className={`w-1 flex flex-col bg-${data.color}-500 rounded`} />
            <div className="space-y-1">
              <p className="text-tremor-content">Date: {data.payload.date}</p>
              <p className="text-tremor-content">Timestamp: {data.payload.timestamp}</p>
              <p className="text-tremor-content">Price: {data.payload.price}</p>
              <p className="text-tremor-content">Volume: {data.payload.volume}</p>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <Card>
      <Title>Average BPM</Title>
      <LineChart
        className="h-72 mt-4 p-6"
        data={chartData}
        index="date"
        categories={["price"]}
        colors={["blue"]}
        yAxisWidth={40}
        customTooltip={customTooltip}
      />
    </Card>
  );
};

export default Chart;
