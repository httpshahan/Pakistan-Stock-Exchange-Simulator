// SideNavbar.jsx
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { MdDashboard, MdLogout } from "react-icons/md";
import {FaBriefcase , FaExchangeAlt,FaMoneyCheckAlt, FaChartLine, FaChartBar, FaEye } from 'react-icons/fa';

const SideNavbar = () => {
  const location = useLocation();
  const [isMobileView, setIsMobileView] = useState(false);
  const [isOpen, setIsOpen] = useState(true);

  const toggleNav = () => {
    setIsOpen(!isOpen);
    setIsMobileView(!isMobileView);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  // useEffect(() => {
  //   const handleResize = () => {
  //     setIsMobileView(window.innerWidth <= 768); // Change breakpoint if needed
  //   };

  //   window.addEventListener("resize", handleResize);

  //   // Initial call to handleResize to set the initial state
  //   handleResize();

  //   // Cleanup
  //   return () => window.removeEventListener("resize", handleResize);
  // }, []);

  return (
    <>
      <nav
        className={`navbar md:flex md:flex-col md:min-h-screen md:w-56 md:sticky md:top-0 bg-stock-primary shadow-md transition-all duration-300 `}
      >
        <div className={`flex items-center p-8 h-20`}>
          <Link to="/dashboard">
            <span className={`text-2xl font-bold text-stock-secondary`}>
              PSX
            </span>
            <span className={`text-xl font-semibold text-stock-light`}>
              Trade
            </span>
          </Link>
          <button
            className="ml-6  md:hidden"
            onClick={toggleNav}
            aria-label="Toggle Nav"
          >
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
                d = "M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className={`p-5 mt-4 text-stock-light md:block`}>
          <span className="text-xs">User Pannel</span>
          <ul className="m-2 text-stock-light">
            <li className="mb-2">
              
              <Link
                to="/dashboard"
                className={`block p-2 rounded flex items-center gap-2 ${
                  isActive("/dashboard")
                    ? "bg-hover-primary text-stock-light font-semibold text-lg"
                    : "hover:bg-hover-secondary hover:text-hover-primary"
                }`}
              >
                <MdDashboard className="text-lg" />
                Dashboard
              </Link>
            </li>
            <li className="mb-2">
              <Link
                to="/portfolio"
                className={`block p-2 rounded flex items-center gap-2 ${
                  isActive("/portfolio")
                    ? "bg-hover-primary text-stock-light font-semibold text-lg"
                    : "hover:bg-hover-secondary hover:text-hover-primary"
                }`}
              >
                <FaBriefcase />
                <span>Portfolio</span>
              </Link>
            </li>
            <li className="mb-2">
              <Link
                to="/transactions"
                className={`block p-2 rounded flex items-center gap-2 ${
                  isActive("/transactions")
                    ? "bg-hover-primary text-stock-light font-semibold text-lg"
                    : "hover:bg-hover-secondary hover:text-hover-primary"
                }`}
              >
                <FaMoneyCheckAlt className="text-lg" />
                <span> Transactions </span>
              </Link>
            </li>
            <li className="mb-2">
              <Link
                to="/trade"
                className={`block p-2 rounded flex items-center gap-2 ${
                  isActive("/trade")
                    ? "bg-hover-primary text-stock-light font-semibold text-lg"
                    : "hover:bg-hover-secondary hover:text-hover-primary"
                }`}
              >
                <FaExchangeAlt />
                Trade
              </Link>
            </li>
            <li className="mb-2">
              <Link
                to="/watchlist"
                className={`block p-2 rounded flex items-center gap-2 ${
                  isActive("/watchlist")
                    ? "bg-hover-primary text-stock-light font-semibold text-lg"
                    : "hover:bg-hover-secondary hover:text-hover-primary"
                }`}
              >
                <FaEye />
                Watchlist
              </Link>
            </li>
            <li className="mb-2">
              <Link
                to="/indices"
                className={`block p-2 rounded flex items-center gap-2 ${
                  isActive("/indices")
                    ? "bg-hover-primary text-stock-light font-semibold text-lg"
                    : "hover:bg-hover-secondary hover:text-hover-primary"
                }`}
              >
                <FaChartLine />
                Indices
              </Link>
            </li>
            <li className="mb-2">
              <Link
                to="/market-watch"
                className={`block p-2 rounded flex items-center gap-2 ${
                  isActive("/market-watch")
                    ? "bg-hover-primary text-stock-light font-semibold text-lg"
                    : "hover:bg-hover-secondary hover:text-hover-primary"
                }`}
              >
                <FaChartBar />
                Market Watch
              </Link>
            </li>
          </ul>
        </div>

        <div className={`p-5  md:block`}>
          <button
            className="w-full p-2 flex items-center gap-2 rounded text-stock-light hover:bg-hover-secondary hover:text-hover-primary text-left"
            onClick={() => {
              sessionStorage.removeItem("token");
              sessionStorage.removeItem("userId");
              sessionStorage.removeItem("userName");
              window.location.href = "/";
            }}
          >
            <span><MdLogout className="text-lg" /></span>
            <span>Logout</span>
          </button>
        </div>
      </nav>
      <div className= {`md:hidden bg-stock-primary h-20 w-12 items-center justify-center  ${isOpen ? "flex" : "hidden" } `}>
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
              d={"M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </button>
      </div>
    </>
  );
};

export default SideNavbar;
