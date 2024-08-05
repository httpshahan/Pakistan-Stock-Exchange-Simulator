// SideNavbar.jsx
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { MdDashboard, MdLogout } from "react-icons/md";
import {
  FaBriefcase,
  FaExchangeAlt,
  FaMoneyCheckAlt,
  FaChartLine,
  FaChartBar,
  FaEye,
} from "react-icons/fa";

const navItems = [
  { path: "/dashboard", label: "Dashboard", icon: <MdDashboard /> },
  { path: "/portfolio", label: "Portfolio", icon: <FaBriefcase /> },
  { path: "/transactions", label: "Transactions", icon: <FaMoneyCheckAlt /> },
  { path: "/trade", label: "Trade", icon: <FaExchangeAlt /> },
  { path: "/watchlist", label: "Watchlist", icon: <FaEye /> },
  { path: "/indices", label: "Indices", icon: <FaChartLine /> },
  { path: "/market-watch", label: "Market Watch", icon: <FaChartBar /> },
];

const NavLink = ({ to, label, icon, isActive }) => (
  <li className="mb-2">
    <Link
      to={to}
      className={`block p-2 rounded flex items-center gap-2 ${
        isActive
          ? "bg-hover-primary text-stock-light font-semibold text-lg"
          : "hover:bg-hover-secondary hover:text-hover-primary"
      }`}
    >
      {icon}
      <span>{label}</span>
    </Link>
  </li>
);

const SideNavbar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(true);

  const toggleNav = () => {
    setIsOpen(!isOpen);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <nav
        className={`mbView flex flex-col min-h-screen w-56 sticky md:top-0 bg-stock-primary shadow-md transition-all duration-300 ease-in-out ${
          isOpen ? "hide" : "flex"
        }`}
      >
        <div className="flex items-center p-8 h-20">
          <Link to="/dashboard">
            <span className="text-2xl font-bold text-stock-secondary">PSX</span>
            <span className="text-xl font-semibold text-stock-light">
              Trade
            </span>
          </Link>
        </div>
        <div className="p-5 mt-4 text-stock-light md:block">
          <span className="text-xs">User Panel</span>
          <ul className="m-2 text-stock-light">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                label={item.label}
                icon={item.icon}
                isActive={isActive(item.path)}
              />
            ))}
          </ul>
        </div>
        <div className="p-5 md:block">
          <button
            className="w-full p-2 flex items-center gap-2 rounded text-stock-light hover:bg-hover-secondary hover:text-hover-primary text-left"
            onClick={() => {
              sessionStorage.removeItem("token");
              sessionStorage.removeItem("userId");
              sessionStorage.removeItem("userName");
              window.location.href = "/";
            }}
          >
            <MdLogout className="text-lg" />
            <span>Logout</span>
          </button>
        </div>
      </nav>
      <div
        className={`md:hidden bg-stock-primary h-20 w-12 btn ${
          !isOpen ? "open" : ""
        }`}
      >
        <button onClick={toggleNav} aria-label="Toggle Nav">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-stock-light"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={isOpen ? "M4 6h16M4 12h16M4 18h16" : "M6 18L18 6M6 6l12 12"}
            />
          </svg>
        </button>
      </div>
    </>
  );
};

export default SideNavbar;
