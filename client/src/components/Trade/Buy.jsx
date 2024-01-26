import React, { useState, useEffect } from "react";
import apiService from "../../services/apiService";

const BuyForm = () => {
  const [symbol, setSymbol] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [change, setChange] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [errors, setErrors] = useState({});
  const [showSuggestions, setShowSuggestions] = useState(true);
  const userId = sessionStorage.getItem('userId');
  

  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        const response = await apiService.get(
          `/stocks/searchStocks?q=${symbol}`
        );
        setSuggestions(response.data);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      }
    };

    if (symbol.trim() !== "") {
      fetchSuggestions();
    } else {
      setSuggestions([]);
    }
  }, [symbol]);

  const handleSuggestionClick = (suggestion) => {
    setSymbol(suggestion.stock_symbol);
    setPrice(suggestion.current);
    setChange(suggestion.change);
    setShowSuggestions(false);
  };

  const handleChange = (event) => {
    setSymbol(event.target.value);
    setShowSuggestions(true);
  };

  const handleQuantityChange = (event) => {
    const newQuantity = event.target.value;
    setQuantity(newQuantity);

    // Calculate total price based on quantity and stock price
    const totalPrice = parseFloat(newQuantity) * parseFloat(price);
    if (!isNaN(totalPrice)) {
      setErrors((prevErrors) => ({ ...prevErrors, totalPrice: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = {};

    if (!symbol.trim()) {
      errors.symbol = "Symbol is required";
    }

    if (quantity.trim() === "" || isNaN(quantity) || parseFloat(quantity) < 0) {
      errors.quantity = "Please enter a non-negative quantity";
    }

    if (!price.trim() || isNaN(price) || parseFloat(price) <= 0) {
      errors.price = "Please enter a valid price";
    }

    // Calculate total price based on quantity and stock price
    const totalPrice = parseFloat(quantity) * parseFloat(price);
    if (isNaN(totalPrice)) {
      errors.totalPrice = "Please enter a valid quantity";
    }

    setErrors(errors);

    if (Object.keys(errors).length === 0) {
        const formData = {
            stockSymbol: symbol,
            quantity: quantity,
            transactionPrice: price
        }
        try {
            console.log(formData);
            const response = await apiService.post(`/trade/buy/${userId}`, formData);
            console.log(response);
        }
        catch (error) {
            console.error("Error fetching suggestions:", error);
        }
    }
    
    

  };


  return (
    <div>
      {/* Buy form content */}
      {/* ... */}
      <form onSubmit={handleSubmit}>
        {/* ... other form elements ... */}
        <div className="mb-4">
          <label htmlFor="symbol" className="block text-sm font-medium text-gray-600">
            Symbol
          </label>
          <input
            type="text"
            id="symbol"
            className={`p-2 w-full border rounded-md ${errors.symbol ? "border-red-500" : ""}`}
            placeholder="Enter symbol"
            value={symbol}
            onChange={handleChange}
            required
          />
          {errors.symbol && <p className="text-red-500 text-xs mt-1">{errors.symbol}</p>}

          {showSuggestions && (
            <div className="absolute z-10 w-full bg-white rounded-md shadow-lg mt-1">
              {suggestions.map((suggestion) => (
                <div
                  key={suggestion.stock_symbol}
                  className="p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  <p className="text-gray-900 font-medium">{suggestion.stock_symbol}</p>
                  <p className="text-gray-600">{suggestion.stock_name}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mb-4">
            <label htmlFor="price" className="block text-sm font-medium text-gray-600">
                Price
            </label>
            <input
                type="text"
                id="price"
                className={`p-2 w-full border rounded-md bg-gray-100`}
                value={price}
                readOnly
            />
            {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price}</p>}
        </div>

        <div className="mb-4">
            <label htmlFor="change" className="block text-sm font-medium text-gray-600">
                Change
            </label>
            <input
                type="text"
                id="change"
                className={`p-2 w-full border rounded-md bg-gray-100`}
                value={change}
                readOnly
            />
            {errors.change && <p className="text-red-500 text-xs mt-1">{errors.change}</p>}
        </div>


        <div className="mb-4">
          <label htmlFor="quantity" className="block text-sm font-medium text-gray-600">
            Quantity
          </label>
          <input
            type="number"
            id="quantity"
            className={`p-2 w-full border rounded-md ${errors.quantity ? "border-red-500" : ""}`}
            placeholder="Enter quantity"
            value={quantity}
            onChange={handleQuantityChange}
            required
          />
          {errors.quantity && <p className="text-red-500 text-xs mt-1">{errors.quantity}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="totalPrice" className="block text-sm font-medium text-gray-600">
            Total Price
          </label>
          <input
            type="text"
            id="totalPrice"
            className="p-2 w-full border rounded-md bg-gray-100"
            value={isNaN(parseFloat(quantity) * parseFloat(price)) ? "" : (parseFloat(quantity) * parseFloat(price)).toFixed(2)}
            readOnly
          />
          {errors.totalPrice && <p className="text-red-500 text-xs mt-1">{errors.totalPrice}</p>}
        </div>

        <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold p-3 rounded-md"
            >
            Buy
        </button>
      </form>
    </div>
  );
};

export default BuyForm;
