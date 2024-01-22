import React, { useState } from "react";
import SearchBar from "./SearchBar";

function TopNavbar() {
  const userName = localStorage.getItem("userName");

  // State to manage dropdown visibility
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div className="flex items-center bg-white h-20 p-8 shadow-md">
      <div className="w-full">
        <p className="text-[#2C2C2C] text-xl font-medium">Hello, {userName}</p>
      </div>
      <div className="flex items-center justify-between gap-5">
        <div className="w-full">
          <SearchBar />
        </div>
        <div className="flex items-center">
          {/* Dropdown Trigger */}
          <div className="relative w-auto">
            <button
              onClick={() => setDropdownOpen(!isDropdownOpen)}
              className="flex items-center w-max"
            >
              {userName}
              <span className="">&#9662;</span> {/* Dropdown symbol */}
            </button>

            {/* Dropdown Content */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 bg-white rounded-md shadow-md min-w-max">
                <button className="block px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left">
                  Profile
                </button>
                <button
                  className="block px-4 py-2 mt-4 text-gray-800 hover:bg-gray-200 w-full text-left"
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
    </div>
  );
}

export default TopNavbar;
