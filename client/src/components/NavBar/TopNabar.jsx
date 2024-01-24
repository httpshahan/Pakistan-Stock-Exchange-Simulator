// TopNavbar.js
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
    <div className="flex items-center bg-white h-20 p-8 shadow-md">
      <div className="w-full">
        <p className="text-[#2C2C2C] text-xl font-medium">Hello, {userName}</p>
      </div>
      <div className="flex items-center justify-between gap-5">
        <div
          className="cursor-pointer"
          onClick={openSearch}
        >
          {/* Your existing search bar */}
          <div className="relative">
            <input
              type="text"
              className="w-64 h-10 px-4 pr-16 text-sm text-gray-900 placeholder-gray-500 bg-[#F7F6F9] border border-transparent rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              placeholder="Stocks....."
            />
            <div className="absolute w-5 h-5 text-gray-400 top-3 right-3 dark:text-gray-300">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
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
          <div className="relative w-auto">Profile</div>
        </div>
      </div>

      {/* Conditionally render the SearchDialog component */}
      {isSearchOpen && <SearchDialog closeSearch={closeSearch} />}
    </div>
  );
}

export default TopNavbar;
