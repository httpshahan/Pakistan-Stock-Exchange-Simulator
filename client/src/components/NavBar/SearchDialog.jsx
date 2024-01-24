// SearchDialog.js
import React from "react";

const SearchDialog = ({ closeSearch }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50 backdrop-filter backdrop-blur-sm">
      <div className="bg-white p-8 rounded-md">
        {/* Your search input and suggestions go here */}
        <input
          type="text"
          className="w-full h-10 px-4 text-sm text-gray-900 placeholder-gray-500 bg-[#F7F6F9] border border-transparent rounded-md mb-4"
          placeholder="Search for stocks..."
        />
        {/* Add more components for search suggestions or results */}
        <button
          onClick={closeSearch}
          className="text-blue-500 hover:text-blue-700 cursor-pointer"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default SearchDialog;
