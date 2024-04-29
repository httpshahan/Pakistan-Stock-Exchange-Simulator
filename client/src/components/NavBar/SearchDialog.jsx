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
    <div className="fixed inset-0 flex items-center shadow-md justify-center z-50 backdrop-filter backdrop-blur-sm">
      {/* Main Content */}
      <div className="bg-stock-light border border-stock-primary p-8 rounded-md w-3/5 relative">
        <input
          ref={inputRef}
          type="text"
          value={searchTerm}
          onChange={handleChange}
          className="w-full h-10 px-4 text-sm text-gray-900 placeholder-gray-500 bg-stock-light border border-stock-primary rounded-md mb-4"
          placeholder="Search for stocks..."
        />

        {suggestions.length > 0 && (
          <ul className="mb-4 max-h-40 overflow-y-auto w-full">
            {suggestions.map((suggestion, index) => (
              <li
                // ref={inputRef}
                key={index}
                className="cursor-pointer py-2 px-4 text-stock-tertiary hover:bg-hover-primary hover:text-hover-tertiary transition-all duration-300 rounded-md"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">{suggestion.company_name}</p>
                    <p className="text-xs text-hover-primary">
                      {suggestion.stock_symbol}
                    </p>
                  </div>
                  <div className="flex flex-col items-end">
                    <p className="font-medium">{suggestion.current}</p>
                    <p
                      className={`${
                        suggestion.change.startsWith("-")
                          ? "text-red-500"
                          : "text-green-500"
                      } text-xs`}
                    >
                      {`${suggestion.change} (${suggestion.change_percent})`}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}

        <button
          onClick={closeSearch}
          className="text-stock-tertiary p-2 border rounded-md hover:text-hover-tertiary hover:bg-hover-primary cursor-pointer"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default SearchDialog;
