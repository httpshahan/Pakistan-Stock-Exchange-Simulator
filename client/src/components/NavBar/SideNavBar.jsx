// SideNavbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';


const SideNavbar = () => {
  return (
    <nav className="bg-gray-800 w-60 sticky flex-shrink-0">
      <div className="flex items-center justify-center h-16 bg-gray-900 text-white">
        <span className="text-2xl font-bold">Stock App</span>
      </div>
      <div className="p-4">
        <ul>
          <li>
            <Link to="/dashboard" className="text-white hover:bg-gray-700 block p-2 rounded ">Dashboard</Link>
          </li>
          <li>
            <Link to="/market-watch" className="text-white hover:bg-gray-700 block p-2 rounded">Market Watch</Link>
          </li>  
        </ul>
      </div>
    </nav>
  );
};

export default SideNavbar;
