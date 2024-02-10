// TopNavBar.js
import React from 'react';

const TopNavBar = () => {
  return (
    <nav className="bg-stock-primary p-5">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-text-stock-light font-bold text-xl">Stock Exchange Simulator</div>
        <div className="flex">
          <a href="#" className="text-text-stock-light mr-4">Dashboard</a>
          <a href="#" className="text-text-stock-light mr-4">Users</a>
          <a href="#" className="text-text-stock-light">Transactions</a>
        </div>
        <button>Logout</button>
      </div>
    </nav>
  );
};

export default TopNavBar;
