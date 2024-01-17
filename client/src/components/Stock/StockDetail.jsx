import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const StockDetails = () => {
  const { symbol } = useParams();
  console.log(symbol);
  
  return (
    <div>
      <h1>Stock Details</h1>
      <p>Symbol: {symbol}</p>
    </div>
  );
};

export default StockDetails;
