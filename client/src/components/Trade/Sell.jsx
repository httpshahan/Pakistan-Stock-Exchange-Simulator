import React, { useState, useEffect } from "react";
import apiService from "../../services/apiService";

const Sell = () => {
  const [quantity, setQuantity] = useState("");
  const [maxQuantity, setMaxQuantity] = useState(0);
  const [price, setPrice] = useState("");
  const [symbol, setSymbol] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [options, setOptions] = useState([]);

  const userId = sessionStorage.getItem("userId");

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const response = await apiService.get(`/stocks/userAssets/${userId}`);
        console.log(response.data.data);
        setOptions(response.data.data);
      } catch (error) {
        console.error("Error fetching options:", error);
      }
    };
    fetchOptions();
  }, []);

  const filteredOptions = options.filter(
    (option) =>
      option.company_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      option.stock_symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
    setIsSearching(true);
  };

  const handleOptionClick = (option) => {
    setSymbol(option.stock_symbol);
    setPrice(option.current);
    setMaxQuantity(option.quantity);

    setSearchTerm("");
    setIsSearching(false);
  };
  const handleChange = (event) => {
    if (event.target.value > maxQuantity) {
      setQuantity(maxQuantity);
    } else if (event.target.value < 1) {
      setQuantity(1);
    } else {
      setQuantity(event.target.value);
    }
  };

  const handleClick = () => {
    const transaction = parseFloat(quantity * price - 0.5 * quantity).toFixed(
      2
    );
    console.log({
      userId,
      symbol,
      quantity,
      price,
      transaction,
    });
  };

  return (
    <div className="max-w-md mx-auto p-6 ">
      <div className="flex flex-col mb-4">
        <label htmlFor="stock" className="text-sm font-semibold mb-2">
          Stock
        </label>
        <div className="relative">
          <input
            type="text"
            id="stock"
            className="p-2 w-full border rounded-md mb-4"
            placeholder="Enter stock symbol"
            value={symbol || searchTerm}
            onChange={handleInputChange}
            required
          />
          {isSearching && (
            <div className="absolute z-10 w-full bg-white rounded-md shadow-lg">
              {filteredOptions.map((option) => (
                <div
                  key={option.stock_symbol}
                  className="p-2 cursor-pointer hover:bg-gray-200"
                  onClick={() => handleOptionClick(option)}
                >
                  {`${option.company_name} (${option.company_name}) - Price: $${option.current} | Max Quantity: ${option.quantity}`}
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
            className="p-2 w-full border rounded-md bg-gray-100"
            value={price || 0}
            readOnly
          />
        </div>
        <div className="flex flex-col w-1/2 pl-2">
          <label htmlFor="brokerageFee" className="text-sm font-semibold mb-2">
            Brokerage Fee
          </label>
          <input
            type="text"
            id="brokerageFee"
            className="p-2 w-full border rounded-md bg-gray-100"
            value={0.5}
            readOnly
          />
        </div>
      </div>

      <label htmlFor="quantity" className="text-sm font-semibold mb-2">
        Quantity
      </label>
      <input
        type="number"
        id="quantity"
        className="p-2 w-full border rounded-md mb-4"
        placeholder="Enter quantity"
        value={quantity}
        min="0"
        max={maxQuantity || 0}
        onChange={handleChange}
        required
      />

      <div className="flex mb-4">
        <div className="flex flex-col w-1/2 pr-2">
          <label htmlFor="cashBalance" className="text-sm font-semibold mb-2">
            Cash Balance
          </label>
          <input
            type="text"
            id="cashBalance"
            className="p-2 w-full border rounded-md bg-gray-100"
            value={123}
            readOnly
          />
        </div>
        <div className="flex flex-col w-1/2 pl-2">
          <label htmlFor="totalPrice" className="text-sm font-semibold mb-2">
            Total Price
          </label>
          <input
            type="text"
            id="totalPrice"
            className="p-2 w-full border rounded-md bg-gray-100"
            value={parseFloat(quantity * price || 0).toFixed(2)}
            readOnly
          />
        </div>
      </div>

      <div className="flex flex-col border-y py-5 mb-4">
        <div className="flex justify-between">
          <span className="text-sm font-semibold">Cost</span>
          <span className="text-sm font-semibold">
            {parseFloat(quantity * price || 0).toFixed(2)}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm font-semibold">Brokerage Fee</span>
          <span className="text-sm font-semibold">{0.5 * quantity}</span>
        </div>
      </div>

      <div className="flex justify-between mb-5">
        <span className="text-md font-semibold">Total</span>
        <span className="text-md font-semibold">
          {parseFloat(quantity * price - 0.5 * quantity || 0).toFixed(2)}
        </span>
      </div>

      <div className="flex space-x-4">
        <button
          className="bg-green-500 hover:bg-green-600 text-white font-semibold p-2 w-full rounded-md"
          onClick={handleClick}
        >
          Sell
        </button>
        <button className="bg-red-500 hover:bg-red-600 text-white font-semibold p-2 w-full rounded-md">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default Sell;
