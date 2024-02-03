import React, { useState, useEffect } from 'react';
import apiService from '../../services/apiService';
import { Card, LineChart, Title } from "@tremor/react";

const Chart = ({ symbol }) => {
  const [originalData, setOriginalData] = useState([]);
  const [dataByDay, setDataByDay] = useState([]);
  const [dataByMonth, setDataByMonth] = useState([]);
  const [dataByYear, setDataByYear] = useState([]);
  const [timeInterval, setTimeInterval] = useState('all'); // Default to all data

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiService.get(`/proxy/${symbol}`);
        const data = response.data.data;

        const formattedData = data.map(item => ({
          date: new Date(item[0] * 1000),
          timestamp: new Date(item[0] * 1000).toLocaleString(),
          price: item[1],
          volume: item[2],
        }));

        setOriginalData(formattedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [symbol]);

  useEffect(() => {
    // Filter data for each time interval
    const dataByDay = filterDataByTimeInterval(originalData, '1D');
    const dataByMonth = filterDataByTimeInterval(originalData, '1M');
    const dataByYear = filterDataByTimeInterval(originalData, '1Y');

    setDataByDay(dataByDay);
    setDataByMonth(dataByMonth);
    setDataByYear(dataByYear);
  }, [originalData]);

  const filterDataByTimeInterval = (data, interval) => {
    const currentDate = new Date();
  
    switch (interval) {
      case '1D':
        // Find the latest date in the dataset
        const latestDate = new Date(Math.max.apply(null, data.map(item => item.date.getTime())));
        const startOfDay = new Date(latestDate.getFullYear(), latestDate.getMonth(), latestDate.getDate());
        return data.filter(item => item.date >= startOfDay);

      case '1M':
        const oneMonthAgo = currentDate.setMonth(currentDate.getMonth() - 1);
        return data.filter(item => item.date > oneMonthAgo);

      case '1Y':
        const oneYearAgo = currentDate.setFullYear(currentDate.getFullYear() - 1);
        return data.filter(item => item.date > oneYearAgo);

      case 'all':
      default:
        return data;
    }
  };

  const preprocessDataForXAxis = (data, interval) => {
    switch (interval) {
      case '1D':
        return data.map(item => ({ ...item, xAxisLabel: item.date.toLocaleTimeString() }));
      case '1M':
        return data.map(item => ({ ...item, xAxisLabel: item.date.toLocaleDateString("en-US", { month:'short', day: 'numeric' }) }));
      case '1Y':
        return data.map(item => ({ ...item, xAxisLabel: item.date.toLocaleDateString("en-US", { month: 'short', year: 'numeric' }) }));
      default:
        return data.map(item => ({ ...item, xAxisLabel: item.date.toLocaleDateString("en-US", { month: 'short', year: 'numeric' }) }));
    }
  };

  const formatXAxisLabel = (value) => {
    return value.xAxisLabel;
  };

  const intervalOptions = ['1D', '1M', '1Y', 'all'];

  const renderIntervalButtons = () => {
    return intervalOptions.map(option => (
      <button key={option} onClick={() => setTimeInterval(option)} className={timeInterval === option ? 'active' : ''}>
        {option}
      </button>
    ));
  };

  const customTooltip = ({ payload, active }) => {
    if (!active || !payload) return null;
    return (
      <div className="w-56 rounded-tremor-default text-tremor-default bg-tremor-background p-2 shadow-tremor-dropdown border border-tremor-border">
        {payload.map((data, idx) => (
          <div key={idx} className="flex flex-1 space-x-2.5">
            <div className={`w-1 flex flex-col bg-${data.color}-500 rounded`} />
            <div className="space-y-1">
              <p className="text-tremor-content">Date: {data.payload.date.toLocaleString()}</p>
              <p className="text-tremor-content">Timestamp: {data.payload.timestamp}</p>
              <p className="text-tremor-content">Price: {data.payload.price}</p>
              <p className="text-tremor-content">Volume: {data.payload.volume}</p>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderChart = () => {
    switch (timeInterval) {
      case '1D':
        return (
          <LineChart
            className="h-72 mt-4 p-6"
            data={preprocessDataForXAxis(dataByDay, '1D')}
            index="xAxisLabel"
            categories={["price"]}
            colors={["blue"]}
            yAxisWidth={40}
            showLegend={false}
            showXAxis={true}
            customTooltip={customTooltip}
          />
        );
      case '1M':
        return (
          <LineChart
            className="h-72 mt-4 p-6"
            data={preprocessDataForXAxis(dataByMonth, '1M')}
            index="xAxisLabel"
            categories={["price"]}
            colors={["blue"]}
            yAxisWidth={40}
            showLegend={false}
            showXAxis={true}
            customTooltip={customTooltip}
          />
        );
      case '1Y':
        return (
          <LineChart
            className="h-72 mt-4 p-6"
            data={preprocessDataForXAxis(dataByYear, '1Y')}
            index="xAxisLabel"
            categories={["price"]}
            colors={["blue"]}
            yAxisWidth={40}
            customTooltip={customTooltip}
          />
        );
      case 'all':
      default:
        return (
          <LineChart
            className="h-72 mt-4 p-6"
            data={preprocessDataForXAxis(originalData, 'all')}
            index="xAxisLabel"
            categories={["price"]}
            colors={["blue"]}
            yAxisWidth={40}
            customTooltip={customTooltip}
          />
        );
    }
  };

  return (
    <Card>
      <Title>{symbol}</Title>
      <div className="flex space-x-4 mt-4">
        {renderIntervalButtons()}
      </div>
      {renderChart()}
    </Card>
  );
};

export default Chart;
