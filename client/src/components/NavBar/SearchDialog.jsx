import React, { useState, useEffect, useRef } from "react";
import apiService from "../../services/apiService";
import { useNavigate } from "react-router-dom";

const SearchDialog = ({ closeSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  // const handleClickOutside = (event) => {
  //   if (inputRef.current && !inputRef.current.contains(event.target)) {
  //     closeSearch();
  //   }
  // };

  // document.addEventListener("mousedown", handleClickOutside);

  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        const response = await apiService.get(
          `/stocks/searchStocks?q=${searchTerm}`
        );
        setSuggestions(response.data);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      }
    };

    if (searchTerm.trim() !== "") {
      fetchSuggestions();
    } else {
      setSuggestions([]);
    }
  }, [searchTerm]);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSuggestionClick = (suggestion) => {
    navigate(`/stock/${suggestion.stock_symbol}`);
    closeSearch();
  };

  return (
    <div className="fixed inset-0 flex items-start pt-24 justify-center z-50 bg-gray-900/20 backdrop-filter backdrop-blur-sm transition-opacity" onClick={closeSearch}>
      {/* Main Content */}
      <div
        className="bg-white/80 backdrop-blur-xl border border-white/40 shadow-2xl shadow-black/10 rounded-2xl w-full max-w-2xl transform transition-all scale-100 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 border-b border-gray-100">
          <div className="relative">
            <input
              ref={inputRef}
              type="text"
              value={searchTerm}
              onChange={handleChange}
              className="w-full pl-4 pr-10 py-3 text-lg text-gray-900 placeholder-gray-400 bg-transparent border-none focus:ring-0 focus:outline-none"
              placeholder="Search stocks by symbol or name..."
            />
            <button
              onClick={closeSearch}
              className="absolute right-0 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-gray-600 bg-gray-100 rounded-lg text-xs font-semibold tracking-wide uppercase"
            >
              ESC
            </button>
          </div>
        </div>

        {suggestions.length > 0 && (
          <div className="max-h-96 overflow-y-auto p-2">
            <ul className="space-y-1">
              {suggestions.map((suggestion, index) => (
                <li
                  key={index}
                  className="cursor-pointer group flex items-center justify-between p-3 hover:bg-white/50 rounded-xl transition-all duration-200"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-600 group-hover:bg-blue-100 group-hover:text-blue-600 transition-colors">
                      {suggestion.stock_symbol.substring(0, 2)}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{suggestion.stock_symbol}</p>
                      <p className="text-sm text-gray-500 group-hover:text-gray-700">{suggestion.company_name}</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="font-medium text-gray-900">Rs {parseFloat(suggestion.current).toLocaleString()}</p>
                    <p
                      className={`text-xs font-medium flex items-center justify-end gap-1 ${suggestion.change.startsWith("-")
                          ? "text-red-500"
                          : "text-green-500"
                        }`}
                    >
                      {suggestion.change} ({suggestion.change_percent}%)
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {searchTerm && suggestions.length === 0 && (
          <div className="p-8 text-center text-gray-500 text-sm">
            No stocks found for "{searchTerm}"
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchDialog;
