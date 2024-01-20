import React, { useState } from "react";
import SearchBar from "./SearchBar";

function TopNavbar() {
  const userName = localStorage.getItem("userName");

  // State to manage dropdown visibility
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div className="flex items-center justify-between h-16 bg-gray-800 p-8">
      <div className="top-navbar-left"></div>
      <div className="w-full m-10">
        <SearchBar />
      </div>
      <div className="top-navbar-right flex items-center justify-between">
        {/* Dropdown Trigger */}
        <div className="relative ml-10">
          <button
            onClick={() => setDropdownOpen(!isDropdownOpen)}
            className="flex items-center text-white"
          >
            {userName}
            <span className="ml-2">&#9662;</span> {/* Dropdown symbol */}
          </button>

          {/* Dropdown Content */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 bg-white rounded-md shadow-md min-w-max">
              <button
                className="block px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left"
                onClick={() => {
                  localStorage.removeItem("token");
                  localStorage.removeItem("userId");
                  localStorage.removeItem("userName");
                  window.location.href = "/";
                }}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TopNavbar;
