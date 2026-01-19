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
  FaBars,
  FaTimes
} from "react-icons/fa";

const navItems = [
  { path: "/dashboard", label: "Dashboard", icon: <MdDashboard size={20} /> },
  { path: "/portfolio", label: "Portfolio", icon: <FaBriefcase size={20} /> },
  { path: "/transactions", label: "Transactions", icon: <FaMoneyCheckAlt size={20} /> },
  { path: "/trade", label: "Trade", icon: <FaExchangeAlt size={20} /> },
  { path: "/watchlist", label: "Watchlist", icon: <FaEye size={20} /> },
  { path: "/indices", label: "Indices", icon: <FaChartLine size={20} /> },
  { path: "/market-watch", label: "Market Watch", icon: <FaChartBar size={20} /> },
];

const NavLink = ({ to, label, icon, isActive }) => (
  <li className="mb-2">
    <Link
      to={to}
      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${isActive
          ? "bg-black text-white shadow-lg shadow-black/10 font-medium"
          : "text-gray-500 hover:bg-gray-100/80 hover:text-gray-900"
        }`}
    >
      <span className={`${isActive ? "text-white" : "text-gray-400 group-hover:text-gray-600"}`}>
        {icon}
      </span>
      <span className="text-sm tracking-wide">{label}</span>
      {isActive && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-white" />}
    </Link>
  </li>
);

const SideNavbar = () => {
  const location = useLocation();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const toggleNav = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("userId");
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("balance");
    sessionStorage.removeItem("email");
    window.location.href = "/";
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          onClick={toggleNav}
          className="p-3 bg-white/80 backdrop-blur-md shadow-lg rounded-full border border-gray-200/50 text-gray-700"
        >
          {isMobileOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Sidebar Container */}
      <nav
        className={`fixed md:sticky top-0 h-screen w-[280px] bg-white/70 backdrop-blur-xl border-r border-gray-200/50 flex flex-col z-40 transition-transform duration-300 ease-[cubic-bezier(0.2,0,0,1)] ${isMobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
          }`}
      >
        {/* Logo Section */}
        <div className="h-24 flex items-center px-8">
          <Link to="/dashboard" className="flex flex-col">
            <span className="text-2xl font-bold tracking-tight text-gray-900">PSX</span>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400 mt-1">
              Simulator
            </span>
          </Link>
        </div>

        {/* Navigation Items */}
        <div className="flex-1 overflow-y-auto px-4 py-4 scrollbar-hide">
          <div className="mb-2 px-4">
            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Menu</span>
          </div>
          <ul className="space-y-1">
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

        {/* Logout Section */}
        <div className="p-4 border-t border-gray-100">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-500 hover:bg-red-50 hover:text-red-600 transition-all duration-200 group"
          >
            <MdLogout className="text-xl text-gray-400 group-hover:text-red-500" />
            <span className="text-sm font-medium">Log Out</span>
          </button>
        </div>
      </nav>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 md:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}
    </>
  );
};

export default SideNavbar;
