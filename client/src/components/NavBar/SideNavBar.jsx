// SideNavbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';


const SideNavbar = () => {
  return (
    <nav className="w-60 sticky flex-shrink-0 bg-white">
      <div className="flex items-center p-8 h-16">
        <span className="text-2xl font-bold">PSX</span>
      </div>
      <div className="p-5 mt-8">
        <ul>
          <li>
            <Link to="/dashboard" className="hover:bg-gray-700 block p-2 rounded ">Dashboard</Link>
          </li>
          <li>
            <Link to="/portfolio" className="hover:bg-gray-700 block p-2 rounded">Portfolio</Link>
          </li>
          <li>
            <Link to="/transactions" className="hover:bg-gray-700 block p-2 rounded">Transactions</Link>
          </li>
          <li>
            <Link to="/trade" className=" hover:bg-gray-700 block p-2 rounded">Trade</Link>
          </li>
          <li>
            <Link to="/watchlist" className=" hover:bg-gray-700 block p-2 rounded">Watchlist</Link>
          </li>
          <li>
            <Link to="/market-watch" className=" hover:bg-gray-700 block p-2 rounded">Market Watch</Link>
          </li>  
        </ul>
      </div>
    </nav>
  );
};

export default SideNavbar;
