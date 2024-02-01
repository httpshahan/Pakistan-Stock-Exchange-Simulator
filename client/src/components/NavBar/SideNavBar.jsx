// SideNavbar.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";

const SideNavbar = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="w-60 sticky flex-shrink-0  bg-stock-primary">

      <div className="flex items-center p-8 h-16">
        <Link to="/dashboard">
          <span className="text-2xl font-bold text-stock-secondary">PSX</span>
          <span className="text-xl font-semibold text-stock-light">Trade</span>
        </Link>
      </div>

      <div className="p-5 mt-8 text-stock-light">
        <span className="text-xs">User Pannel</span>
        <ul className="m-2 text-stock-light">
          <li className="mb-2">
            <Link
              to="/dashboard"
              className={`block p-2 rounded ${
                isActive("/dashboard")
                ? "bg-hover-primary text-stock-light font-semibold text-lg"
                : "hover:bg-hover-primary hover:text-hover-primary"
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
                ? "bg-hover-primary text-stock-light font-semibold text-lg"
                : "hover:bg-hover-secondary hover:text-hover-primary"
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
                ? "bg-hover-primary text-stock-light font-semibold text-lg"
                : "hover:bg-hover-secondary hover:text-hover-primary"
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
                ? "bg-hover-primary text-stock-light font-semibold text-lg"
                : "hover:bg-hover-secondary hover:text-hover-primary"
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
                ? "bg-hover-primary text-stock-light font-semibold text-lg"
                : "hover:bg-hover-secondary hover:text-hover-primary"
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
                ? "bg-hover-primary text-stock-light font-semibold text-lg"
                : "hover:bg-hover-secondary hover:text-hover-primary"
              }`}
            >
              Market Watch
            </Link>
          </li>
        </ul>
      </div>

      <div className="p-5">
        <button
          className="w-full p-2 rounded text-stock-light hover:bg-hover-secondary hover:text-hover-primary text-left"
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
