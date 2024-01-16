// StockDetails.js

import React from 'react';
import { useParams } from 'react-router-dom';

const StockDetails = () => {
  const { symbol } = useParams();
  console.log(symbol);

  // Fetch additional details based on the stock symbol
  // ...

  return (
    <div>
      <h1>Stock Details</h1>
      <p>Symbol: {symbol}</p>
    </div>
  );
};

export default StockDetails;
