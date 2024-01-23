// SideNavbar.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";

const SideNavbar = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="w-60 sticky flex-shrink-0  bg-white">
      <div className="flex items-center p-8 h-16">
        <span className="text-2xl font-bold">PSX</span>
      </div>
      <div className="p-5 mt-8">
        <span className="text-[#7E7D82] text-xs">User Pannel</span>
        <ul className="m-2">
          <li className="mb-2">
            <Link
              to="/dashboard"
              className={`block p-2 rounded ${
                isActive("/dashboard")
                  ? "bg-[#EFE9FF] text-[#6425FE]"
                  : "text-[#84828A] hover:bg-gray-200"
              }`}
            >
              Dashboard
            </Link>
          </li>
          <li className="mb-2">
            <Link
              to="/portfolio"
              className={`block p-2 rounded ${
                isActive("/portfolio")
                  ? "bg-[#EFE9FF] text-[#6425FE]"
                  : "text-[#84828A] hover:bg-gray-200"
              }`}
            >
              Portfolio
            </Link>
          </li>
          <li className="mb-2">
            <Link
              to="/transactions"
              className={`block p-2 rounded ${
                isActive("/transactions")
                  ? "bg-[#EFE9FF] text-[#6425FE]"
                  : "text-[#84828A] hover:bg-gray-200"
              }`}
            >
              Transactions
            </Link>
          </li>
          <li className="mb-2">
            <Link
              to="/trade"
              className={`block p-2 rounded ${
                isActive("/trade")
                  ? "bg-[#EFE9FF] text-[#6425FE]"
                  : "text-[#84828A] hover:bg-gray-200"
              }`}
            >
              Trade
            </Link>
          </li>
          <li className="mb-2">
            <Link
              to="/watchlist"
              className={`block p-2 rounded ${
                isActive("/watchlist")
                  ? "bg-[#EFE9FF] text-[#6425FE]"
                  : "text-[#84828A] hover:bg-gray-200"
              }`}
            >
              Watchlist
            </Link>
          </li>
          <li className="mb-2">
            <Link
              to="/market-watch"
              className={`block p-2 rounded ${
                isActive("/market-watch")
                  ? "bg-[#EFE9FF] text-[#6425FE]"
                  : "text-[#84828A] hover:bg-gray-200"
              }`}
            >
              Market Watch
            </Link>
          </li>
        </ul>
      </div>

      <div className="p-5">
        <button
          className="w-full p-2 rounded text-[#84828A] hover:bg-gray-200 text-left"
          onClick={() => {
            sessionStorage.removeItem("token");
            sessionStorage.removeItem("userId");
            sessionStorage.removeItem("userName");
            window.location.href = "/";
          }}
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default SideNavbar;
