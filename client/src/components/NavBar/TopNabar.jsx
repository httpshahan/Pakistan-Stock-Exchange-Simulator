import React, { useState } from "react";
import SearchDialog from "./SearchDialog";

function TopNavbar() {
  const userName = sessionStorage.getItem("username");
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const openSearch = () => {
    setIsSearchOpen(true);
  };

  const closeSearch = () => {
    setIsSearchOpen(false);
  };

  return (
    <div className="flex items-center bg-stock-primary h-20 p-8 shadow-md">
      <div className="w-full">
        <p className="text-stock-light pl-6 text-xl font-medium">
          Hello, {userName}
        </p>
      </div>
      <div className="flex items-center justify-between gap-5">
        {/* Conditionally render search input based on screen size */}
        <div className="relative">
          <div className="md:block hidden"
            onClick={openSearch}
          >
            <input
              type="text"
              className="w-64 h-10 px-4 pr-16 text-sm text-gray-900 placeholder-gray-500 bg-stock-light border border-stock-primary rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-stock-primary focus:border-transparent"
              placeholder="Stocks....."
            />
            <div
              className="absolute w-5 h-5 text-stock-primary top-3 right-3"
            >
              <svg
                className="w-4 h-4 text-stock-primary cursor-pointer"
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
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
          </div>
          <div className="md:hidden block">
            <div className="flex justify-between items-center gap-16 mr-4 bg-stock-light p-2 rounded  text-stock-primary cursor-text" onClick={openSearch}>
              <span>Search</span>
              <svg
                className="w-4 h-4 text-stock-primary cursor-pointer"
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
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
          </div>
        </div>
        <div className="flex items-center">
          <div className="relative w-auto text-stock-secondary hover:text-hover-secondary">
            Profile
          </div>
        </div>
      </div>

      {/* Conditionally render the SearchDialog component */}
      {isSearchOpen && <SearchDialog closeSearch={closeSearch} />}
    </div>
  );
}

export default TopNavbar;
