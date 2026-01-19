import React, { useState } from "react";
import SearchDialog from "./SearchDialog";
import { FaSearch, FaUserCircle, FaChevronDown } from "react-icons/fa";

function TopNavbar() {
  const userName = sessionStorage.getItem("username");
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const openSearch = () => {
    setIsSearchOpen(true);
  };

  const closeSearch = () => {
    setIsSearchOpen(false);
  };

  const openProfile = () => {
    window.location.href = "/profile";
  };

  return (
    <div className="flex items-center justify-between h-20 px-8 py-4 bg-white/50 backdrop-blur-md sticky top-0 z-30 transition-all duration-300">

      {/* Welcome Message */}
      <div className="flex flex-col">
        <h1 className="text-xl font-semibold text-gray-900 tracking-tight">
          Dashboard
        </h1>
        <p className="text-sm text-gray-500">
          Welcome back, <span className="font-medium text-gray-800">{userName}</span>
        </p>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-6">

        {/* Search Bar (Desktop) */}
        <div
          onClick={openSearch}
          className="hidden md:flex items-center w-64 h-10 px-4 bg-gray-100/50 hover:bg-gray-100 border border-transparent hover:border-gray-200 rounded-full cursor-pointer transition-all duration-200 group"
        >
          <FaSearch className="text-gray-400 group-hover:text-gray-500 mr-3" size={14} />
          <span className="text-sm text-gray-400 group-hover:text-gray-600 font-medium">Search stocks...</span>
          <div className="ml-auto px-1.5 py-0.5 rounded-md bg-white border border-gray-200 text-[10px] font-bold text-gray-400">
            ⌘K
          </div>
        </div>

        {/* Search Icon (Mobile) */}
        <button
          onClick={openSearch}
          className="md:hidden p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors"
        >
          <FaSearch size={18} />
        </button>

        {/* Profile Dropdown */}
        <div
          onClick={openProfile}
          className="flex items-center gap-3 pl-4 border-l border-gray-200 cursor-pointer group"
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-gray-700 to-black flex items-center justify-center text-white shadow-lg shadow-black/10 transition-transform group-hover:scale-105">
            <span className="text-xs font-bold">{userName?.charAt(0).toUpperCase()}</span>
          </div>
          <div className="hidden md:flex flex-col">
            <span className="text-sm font-medium text-gray-700 group-hover:text-black transition-colors">{userName}</span>
          </div>
          <FaChevronDown className="hidden md:block text-gray-400 text-xs ml-1 group-hover:text-gray-600 transition-colors" />
        </div>

      </div>

      {/* Search Dialog */}
      {isSearchOpen && <SearchDialog closeSearch={closeSearch} />}
    </div>
  );
}

export default TopNavbar;
