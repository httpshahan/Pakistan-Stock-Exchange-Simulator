// SideNavbar.jsx
import React, {useState} from "react";
import { Link, useLocation } from "react-router-dom";

const SideNavbar = () => {
  const location = useLocation();
  const [isSmall, setIsSmall] = useState(false);

  const toggleNavbarSize = () => {
    setIsSmall(!isSmall);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };
  

  return (
    <nav className={`w-${isSmall ? "16" : "60"} sticky flex-shrink-0 bg-stock-primary shadow-md transition-all duration-300`}>

      <div className={`flex items-center p-8 h-16 ${isSmall && "justify-center"}`}>
        <Link to="/dashboard">
          <span className={`text-2xl font-bold text-stock-secondary ${isSmall && "hidden"}`}>PSX</span>
          <span className={`text-xl font-semibold text-stock-light ${isSmall && "hidden"}`}>Trade</span>
        </Link>
        <button className="ml-auto"
        onClick={toggleNavbarSize}
        >
          <svg
            className="w-6 h-6 text-stock-light hover:text-hover-light"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="m4 8h12m-12 4h12"
            />
          </svg>
        </button>
      </div>
      <div className={`p-5 mt-8 text-stock-light ${isSmall && "hidden"}`}>
        <span className="text-xs">User Pannel</span>
        <ul className="m-2 text-stock-light">
          <li className="mb-2">
            <Link
              to="/dashboard"
              className={`block p-2 rounded ${
                isActive("/dashboard")
                ? "bg-hover-primary text-stock-light font-semibold text-lg"
                : "hover:bg-hover-secondary hover:text-hover-primary"
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
              to="/indices"
              className={`block p-2 rounded ${
                isActive("/indices")
                ? "bg-hover-primary text-stock-light font-semibold text-lg"
                : "hover:bg-hover-secondary hover:text-hover-primary"
              }`}
            >
              Indices
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

      <div className={`p-5 ${isSmall ? "hidden" : ""}`}>
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
