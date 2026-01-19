import React, { useState, useEffect } from "react";
import apiService from "../../services/apiService";
import { Button, Dialog, DialogPanel, Title, List, ListItem } from "@tremor/react";
import { toast } from 'react-toastify';
import { FaSearch, FaCalculator, FaCheckCircle } from "react-icons/fa";

const BuyForm = () => {
  const [symbol, setSymbol] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [change, setChange] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [errors, setErrors] = useState({});
  const [showSuggestions, setShowSuggestions] = useState(true);
  const userId = sessionStorage.getItem("userId");
  const balence = parseFloat(sessionStorage.getItem("balance")).toFixed(2);
  const [showDialog, setShowDialog] = useState(false);

  const brokerageFee = 0.5;
  const [perShare, setPerShare] = useState();
  const [totalCost, setTotalCost] = useState();
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalBrokerageFee, setTotalBrokerageFee] = useState();
  const [newBalance, setNewBalence] = useState(balence);
  const maxQuantity = price > 0 ? Math.floor(balence / (parseFloat(price) + brokerageFee)) : 0;

  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        const response = await apiService.get(`/stocks/searchStocks?q=${symbol}`);
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
    // We'll let the user type, but validate for calculations

    // Recalculate maxQuantity based on current price to be safe
    const currentMax = price > 0 ? Math.floor(balence / (parseFloat(price) + brokerageFee)) : 0;

    if (newQuantity < 0) {
      setQuantity(0);
    } else if (newQuantity > currentMax && currentMax > 0) {
      // Optional: Cap it or just show error. Let's cap it for better UX if they try to exceed
      setQuantity(newQuantity); // Let input stay, we will validate on submit or show visual error
    } else {
      setQuantity(newQuantity);
    }

    // Logic for calculations
    const qty = parseFloat(newQuantity);
    if (!isNaN(qty) && qty > 0) {
      setTotalCost(parseFloat(qty * price).toFixed(2));
      setTotalBrokerageFee(parseFloat(qty * brokerageFee).toFixed(2));
      setTotalPrice(parseFloat(qty * (parseFloat(price) + brokerageFee)).toFixed(2));
      setNewBalence(parseFloat(balence - (qty * (parseFloat(price) + brokerageFee))).toFixed(2));
    } else {
      setTotalCost(0);
      setTotalBrokerageFee(0);
      setTotalPrice(0);
      setNewBalence(balence);
    }

    if (!isNaN(totalCost)) {
      setErrors((prevErrors) => ({ ...prevErrors, totalCost: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = {};

    if (!symbol.trim()) { errors.symbol = "Symbol is required"; }

    // Re-calculate max to be sure
    const currentMax = price > 0 ? Math.floor(balence / (parseFloat(price) + brokerageFee)) : 0;

    if (quantity.trim() === "" || isNaN(quantity) || parseFloat(quantity) <= 0) {
      errors.quantity = "Enter a valid quantity";
    } else if (parseFloat(quantity) > currentMax) {
      errors.quantity = `Max quantity allowed is ${currentMax}`;
    }

    if (!price || isNaN(price) || parseFloat(price) <= 0) {
      errors.price = "Select a valid stock first";
    }

    setErrors(errors);

    if (Object.keys(errors).length === 0) {
      setShowDialog(true);
    }
  };

  const handleDone = async () => {
    // Re-validate just in case
    if (Object.keys(errors).length === 0) {
      const formData = {
        stockSymbol: symbol,
        quantity: quantity,
        totalPrice: perShare, // NOTE: Backend expects perShare cost here apparently based on variable naming in original code? Or maybe totalPrice?
        // Checking original code: totalPrice: perShare. It seems 'totalPrice' in body is actually unit price + fee? 
        // And 'transaction' is the total amount? 
        // Original: totalPrice: perShare, transaction: totalPrice
        transaction: totalPrice,
      };

      try {
        const response = await apiService.post(`/trade/buy/${userId}`, formData);
        console.log(response);
        sessionStorage.setItem("balance", newBalance);
        setShowDialog(false);
        toast.success("Transaction Successful");

        // Reset
        setSymbol("");
        setQuantity("");
        setPrice("");
        setTotalCost(0);
        setTotalPrice(0);
        setTotalBrokerageFee(0);

      } catch (error) {
        toast.error("Transaction Failed");
        console.error("Error:", error);
      }
    }
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} onReset={() => { setSymbol(""); setQuantity(""); setPrice(""); setTotalPrice(0); }} >

        {/* Symbol Input */}
        <div className="relative z-20">
          <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Stock Symbol</label>
          <div className="relative">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              className={`w-full pl-10 pr-4 py-3 bg-gray-50 border ${errors.symbol ? 'border-red-400 focus:ring-red-200' : 'border-gray-200 focus:border-black focus:ring-black/5'} rounded-xl focus:outline-none focus:ring-4 transition-all duration-200`}
              placeholder="Search e.g. APPLE"
              value={symbol}
              onChange={handleChange}
              autoComplete="off"
            />
          </div>
          {errors.symbol && <p className="text-red-500 text-xs mt-1 ml-1">{errors.symbol}</p>}

          {/* Suggestions Dropdown */}
          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white/90 backdrop-blur-xl border border-gray-100 rounded-2xl shadow-xl overflow-hidden z-30 max-h-60 overflow-y-auto">
              {suggestions.map((suggestion) => (
                <div
                  key={suggestion.stock_symbol}
                  className="p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-50 last:border-0 flex justify-between items-center"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  <div>
                    <p className="font-bold text-gray-900">{suggestion.stock_symbol}</p>
                    <p className="text-xs text-gray-500 truncate">{suggestion.company_name}</p>
                  </div>
                  <span className="text-sm font-semibold text-gray-900">Rs {suggestion.current}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Price & Fee Details */}
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Price</label>
            <div className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 font-medium">
              {price ? `Rs ${price}` : '-'}
            </div>
            {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price}</p>}
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Fee</label>
            <div className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-500">
              Rs {brokerageFee}
            </div>
          </div>
        </div>

        {/* Quantity Input */}
        <div className="mt-4">
          <div className="flex justify-between items-center mb-2">
            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider">Quantity</label>
            <div className="text-xs text-gray-500">
              Max Buy: <span className="font-semibold text-gray-900">{maxQuantity || 0}</span>
            </div>
          </div>
          <input
            type="number"
            className={`w-full px-4 py-3 bg-gray-50 border ${errors.quantity ? 'border-red-400 focus:ring-red-200' : 'border-gray-200 focus:border-black focus:ring-black/5'} rounded-xl focus:outline-none focus:ring-4 transition-all duration-200`}
            placeholder="0"
            value={quantity}
            onChange={handleQuantityChange}
            min="0"
          />
          {errors.quantity && <p className="text-red-500 text-xs mt-1 ml-1">{errors.quantity}</p>}
        </div>

        {/* Cost Summary */}
        <div className="bg-gray-50/50 rounded-2xl p-5 mt-6 border border-gray-100">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-500">Subtotal</span>
            <span className="text-sm font-medium text-gray-900">{totalCost || 0}</span>
          </div>
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm text-gray-500">Total Fees</span>
            <span className="text-sm font-medium text-gray-900">{totalBrokerageFee || 0}</span>
          </div>
          <div className="h-px bg-gray-200 w-full mb-4" />
          <div className="flex justify-between items-center">
            <span className="text-base font-semibold text-gray-900">Total Cost</span>
            <span className="text-xl font-bold text-gray-900">Rs {totalPrice || 0}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mt-6">
          <button
            type="reset"
            className="flex-1 px-6 py-3 rounded-xl border border-gray-200 text-gray-600 font-semibold hover:bg-gray-50 transition-colors"
            onClick={() => {
              setErrors({});
            }}
          >
            Clear
          </button>
          <button
            type="submit"
            className="flex-1 px-6 py-3 rounded-xl bg-black text-white font-semibold shadow-lg shadow-black/20 hover:bg-gray-800 transition-all transform active:scale-95"
          >
            Buy Stock
          </button>
        </div>
      </form>

      {/* Confirmation Dialog */}
      <Dialog open={showDialog} onClose={() => setShowDialog(false)} className="z-50">
        <DialogPanel className="bg-white/90 backdrop-blur-xl border border-white/40 shadow-2xl rounded-3xl p-8 max-w-sm mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <FaCheckCircle className="text-green-500 text-2xl" />
            <Title className="text-xl font-bold text-gray-900">Confirm Order</Title>
          </div>

          <div className="space-y-4 mb-8">
            <div className="flex justify-between">
              <span className="text-gray-500">Symbol</span>
              <span className="font-semibold text-gray-900">{symbol}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Quantity</span>
              <span className="font-semibold text-gray-900">{quantity}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Price/Share</span>
              <span className="font-semibold text-gray-900">Rs {price}</span>
            </div>
            <div className="h-px bg-gray-100" />
            <div className="flex justify-between">
              <span className="font-semibold text-gray-900">Total</span>
              <span className="font-bold text-green-600 text-lg">Rs {totalPrice}</span>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setShowDialog(false)}
              className="flex-1 py-3 bg-gray-100 text-gray-600 font-semibold rounded-xl hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleDone}
              className="flex-1 py-3 bg-black text-white font-semibold rounded-xl shadow-lg shadow-black/20 hover:bg-gray-800 transition-colors"
            >
              Confirm
            </button>
          </div>
        </DialogPanel>
      </Dialog>
    </div>
  );
};

export default BuyForm;
