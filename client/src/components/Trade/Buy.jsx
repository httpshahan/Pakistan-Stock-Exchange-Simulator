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
  const userId = sessionStorage.getItem("userId");
  const balence = sessionStorage.getItem("balance");

  const brokerageFee = 0.5;
  const [perShare, setPerShare] = useState();
  const [totalCost, setTotalCost] = useState();
  const [totalPrice, setTotalPrice] = useState();
  const [totalBrokerageFee, setTotalBrokerageFee] = useState();
  const maxQuantity = Math.floor(balence / perShare);

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
    setPerShare(brokerageFee + parseFloat(suggestion.current));
    setShowSuggestions(false);
  };

  const handleChange = (event) => {
    setSymbol(event.target.value);
    setShowSuggestions(true);
  };

  const handleQuantityChange = (event) => {
    const newQuantity = event.target.value;
    if (newQuantity < 1){
        setQuantity(1);
    }
    else if (newQuantity > maxQuantity){
        setQuantity(maxQuantity);
        setTotalCost(parseFloat(maxQuantity * price).toFixed(2));
        setTotalBrokerageFee(parseFloat(maxQuantity * brokerageFee).toFixed(2));
        setTotalPrice(parseFloat(maxQuantity * perShare).toFixed(2));
    }
    else{
        setQuantity(newQuantity);
        setTotalCost(parseFloat(newQuantity * price).toFixed(2));
        setTotalBrokerageFee(parseFloat(newQuantity * brokerageFee).toFixed(2));
        setTotalPrice(parseFloat(newQuantity * perShare).toFixed(2));
    }

    // Calculate total price based on quantity and stock price
    if (!isNaN(totalCost)) {
      setErrors((prevErrors) => ({ ...prevErrors, totalCost: "" }));
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
    if (isNaN(totalCost)) {
      errors.totalCost = "Please enter a valid quantity";
    }

    setErrors(errors);

    if (Object.keys(errors).length === 0) {
        
      const formData = {
        stockSymbol: symbol,
        quantity: quantity,
        totalPrice: perShare,
        transaction: totalPrice,
      }; 
      try {
        const response = await apiService.post(
          `/trade/buy/${userId}`,
          formData
        );
        console.log(response);
        setPrice("");
        setQuantity("");
        setSymbol("");

      } catch (error) {
        console.error("Error fetching suggestions:", error);
      }
    }
  };
  return (
    <div className="max-w-md mx-auto p-6">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col mb-4">
          <label htmlFor="symbol" className="text-sm font-semibold mb-2">
            Symbol
          </label>
          <div className="relative">
            <input
              type="text"
              id="symbol"
              className={`p-2 w-full border rounded-md mb-4 ${
                errors.symbol ? "border-red-500" : ""
              }`}
              placeholder="Enter stock symbol"
              value={symbol}
              onChange={handleChange}
              required
            />
            {errors.symbol && (
              <p className="text-red-500 text-xs mt-1">{errors.symbol}</p>
            )}

            {showSuggestions && (
              <div className="absolute z-10 w-full bg-white rounded-md shadow-lg">
                {suggestions.map((suggestion) => (
                  <div
                    key={suggestion.stock_symbol}
                    className="p-2 cursor-pointer hover:bg-gray-200"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    <p className="text-gray-900 font-medium">
                      {suggestion.stock_symbol}
                    </p>
                    <p className="text-gray-600">{suggestion.company_name}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex mb-4">
          <div className="flex flex-col w-1/2 pr-2">
            <label htmlFor="price" className="text-sm font-semibold mb-2">
              Price
            </label>
            <input
              type="text"
              id="price"
              className={`p-2 w-full border rounded-md bg-gray-100`}
              value={price || 0}
              readOnly
            />
            {errors.price && (
              <p className="text-red-500 text-xs mt-1">{errors.price}</p>
            )}
          </div>
          <div className="flex flex-col w-1/2 pl-2">
            <label
              htmlFor="brokerageFee"
              className="text-sm font-semibold mb-2"
            >
              Brokerage Fee
            </label>
            <input
              type="text"
              id="brokerageFee"
              className="p-2 w-full border rounded-md bg-gray-100"
              value={brokerageFee || 0}
              readOnly
            />
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="quantity" className="text-sm font-semibold mb-2">
            Quantity <span className="text-xs text-gray-500">{maxQuantity ? "Max: " + maxQuantity : ""}</span>
          </label>
          <input
            type="number"
            id="quantity"
            className={`p-2 w-full border rounded-md mb-4 ${
              errors.quantity ? "border-red-500" : ""
            }`}
            placeholder = {`${maxQuantity ? "Max: " + maxQuantity : "Select a Stock"}`}
            value={quantity}
            min="1"
            onChange={handleQuantityChange}
            required
          />
          {errors.quantity && (
            <p className="text-red-500 text-xs mt-1">{errors.quantity}</p>
          )}
        </div>

        <div className="flex mb-4">
          <div className="flex flex-col w-1/2 pr-2">
            <label htmlFor="cashBalance" className="text-sm font-semibold mb-2">
              Cash Balance
            </label>
            <input
              type="text"
              id="cashBalance"
              className="p-2 w-full border rounded-md bg-gray-100"
              value={balence}
              readOnly
            />
          </div>
          <div className="flex flex-col w-1/2 pl-2">
            <label
              htmlFor="totalPrice"
              className="text-sm font-semibold mb-2"
            >
              Total Cost
            </label>
            <input
              type="text"
              id="totalPrice"
              className="p-2 w-full border rounded-md bg-gray-100"
              value={totalCost || 0}
              readOnly
            />
            {errors.totalCost && (
              <p className="text-red-500 text-xs mt-1">{errors.totalPrice}</p>
            )}
          </div>
        </div>

        <div className="flex flex-col border-y py-5 mb-4">
        <div className="flex justify-between">
          <span className="text-sm font-semibold">Cost</span>
          <span className="text-sm font-semibold">
            {totalCost || 0}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm font-semibold">Brokerage Fee</span>
          <span className="text-sm font-semibold">{totalBrokerageFee || 0}</span>
        </div>
      </div>

      <div className="flex justify-between mb-5">
        <span className="text-md font-semibold">Total Price</span>
        <span className="text-md font-semibold">
          {totalPrice || 0}
        </span>
      </div>

      <div className="flex space-x-4">
        <button
          className="bg-green-500 hover:bg-green-600 text-white font-semibold p-2 w-full rounded-md"
          type="submit"
        >
          Buy
        </button>
        <button className="bg-red-500 hover:bg-red-600 text-white font-semibold p-2 w-full rounded-md">
          Cancel
        </button>
      </div>
      </form>
    </div>
  );
};

export default BuyForm;
