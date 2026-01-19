import React, { useState, useEffect, useRef } from "react";
import { Dialog, DialogPanel, Title } from "@tremor/react";
import apiService from "../../services/apiService";
import { toast } from "react-toastify";
import { FaSearch, FaCheckCircle, FaExclamationCircle } from "react-icons/fa";

const Sell = () => {
  const [quantity, setQuantity] = useState("");
  const [maxQuantity, setMaxQuantity] = useState(0);
  const [price, setPrice] = useState("");
  const [symbol, setSymbol] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [options, setOptions] = useState([]);
  const [error, setError] = useState(null);

  const userId = sessionStorage.getItem("userId");
  const searchInputRef = useRef(null);

  const balence = parseFloat(sessionStorage.getItem("balance"));
  const brokerageFee = 0.5;
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalBrokerageFee, setTotalBrokerageFee] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const [newbalence, setNewBalence] = useState(balence);
  const [showDialog, setShowDialog] = useState(false);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const response = await apiService.get(`/stocks/userAssets/${userId}`);
        setOptions(response.data.data);
      } catch (error) {
        console.error("Error fetching options:", error);
      }
    };
    fetchOptions();
  }, [userId]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchInputRef.current &&
        !searchInputRef.current.contains(event.target)
      ) {
        setIsSearching(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
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
    setSearchTerm(option.company_name);
    setSymbol(option.stock_symbol);
    setPrice(option.current);
    setMaxQuantity(option.quantity);
    setIsSearching(false);
    setError(null);
  };

  const handleChange = (event) => {
    const inputQuantity = parseInt(event.target.value, 10);

    if (isNaN(inputQuantity) || inputQuantity < 0) {
      setQuantity("");
      setTotalCost(0);
      setTotalPrice(0);
      return;
    }

    if (inputQuantity > maxQuantity) {
      setError(`You only own ${maxQuantity} shares.`);
    } else {
      setError(null);
    }

    // Allow typing, but warn
    setQuantity(inputQuantity);

    // Calculate details regardless, but handle submit block later
    const cost = parseFloat(inputQuantity * price).toFixed(2);
    const fee = parseFloat(inputQuantity * 0.5).toFixed(2);
    const total = (parseFloat(cost) - parseFloat(fee)).toFixed(2);
    const newBal = (parseFloat(balence) + parseFloat(cost) - parseFloat(fee)).toFixed(2);

    setTotalCost(cost);
    setTotalBrokerageFee(fee);
    setTotalPrice(total);
    setNewBalence(newBal);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!symbol || !quantity || !price) {
      setError("Please select a stock and enter a valid quantity.");
      return;
    }
    if (quantity > maxQuantity) {
      setError(`Cannot sell more than ${maxQuantity} shares.`);
      return;
    }
    if (quantity <= 0) {
      setError(`Quantity must be greater than 0.`);
      return;
    }

    setShowDialog(true);
  };

  const handleDone = async () => {
    const perShare = parseFloat(price) - 0.5;
    try {
      const response = await apiService.post(`/trade/sell/${userId}`, {
        symbol,
        quantity,
        perShare,
        totalPrice,
      });
      console.log(response.data);

      sessionStorage.setItem("balance", newbalence);
      toast.success("Stock sold successfully");

      // Reset
      setSymbol("");
      setQuantity("");
      setPrice("");
      setMaxQuantity(0);
      setSearchTerm("");
      setError(null);
      setTotalCost(0);
      setTotalBrokerageFee(0);
      setTotalPrice(0);
      setShowDialog(false);

      // Refresh assets? ideally yes, but for now just clear

    } catch (error) {
      toast.error("Error selling stock");
      console.error("Error selling stock:", error);
    }
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} onReset={() => {
        setSymbol("");
        setQuantity("");
        setPrice("");
        setMaxQuantity(0);
        setTotalBrokerageFee(0);
        setTotalCost(0);
        setTotalPrice(0);
        setSearchTerm("");
        setError(null);
      }}>

        {/* Asset Search */}
        <div className="relative z-20">
          <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Select Asset to Sell</label>
          <div className="relative" ref={searchInputRef}>
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-black/5 focus:border-black transition-all duration-200"
              placeholder="Search your portfolio..."
              value={searchTerm}
              onChange={handleInputChange}
              autoComplete="off"
            />

            {isSearching && filteredOptions.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white/90 backdrop-blur-xl border border-gray-100 rounded-2xl shadow-xl overflow-hidden z-30 max-h-60 overflow-y-auto">
                {filteredOptions.map((option) => (
                  <div
                    key={option.stock_symbol}
                    className="p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-50 last:border-0 flex justify-between items-center"
                    onClick={() => handleOptionClick(option)}
                  >
                    <div>
                      <p className="font-bold text-gray-900">{option.stock_symbol}</p>
                      <p className="text-xs text-gray-500">{option.company_name}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-gray-900">Owned: {option.quantity}</p>
                      <p className="text-xs text-gray-500">Cur: {option.current}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Price & Fee */}
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Market Price</label>
            <div className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 font-medium">
              {price ? `Rs ${price}` : '-'}
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Sell Fee</label>
            <div className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-500">
              Rs {brokerageFee}
            </div>
          </div>
        </div>

        {/* Quantity Input */}
        <div className="mt-4">
          <div className="flex justify-between items-center mb-2">
            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider">Quantity to Sell</label>
            <div className="text-xs text-gray-500">
              Owned: <span className="font-semibold text-gray-900">{maxQuantity || 0}</span>
            </div>
          </div>
          <input
            type="number"
            className={`w-full px-4 py-3 bg-gray-50 border ${error ? 'border-red-400 focus:ring-red-200' : 'border-gray-200 focus:border-black focus:ring-black/5'} rounded-xl focus:outline-none focus:ring-4 transition-all duration-200`}
            placeholder="0"
            value={quantity}
            min="0"
            max={maxQuantity}
            onChange={handleChange}
          />
          {error && (
            <div className="flex items-center gap-1 mt-2 text-red-500 text-xs">
              <FaExclamationCircle />
              <span>{error}</span>
            </div>
          )}
        </div>

        {/* Summary */}
        <div className="bg-gray-50/50 rounded-2xl p-5 mt-6 border border-gray-100">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-500">Total Value</span>
            <span className="text-sm font-medium text-gray-900">{totalCost || 0}</span>
          </div>
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm text-gray-500">Deductions (Fee)</span>
            <span className="text-sm font-medium text-red-500">-{totalBrokerageFee || 0}</span>
          </div>
          <div className="h-px bg-gray-200 w-full mb-4" />
          <div className="flex justify-between items-center">
            <span className="text-base font-semibold text-gray-900">Net Proceeds</span>
            <span className="text-xl font-bold text-green-600">Rs {totalPrice || 0}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-4 mt-6">
          <button
            type="reset"
            className="flex-1 px-6 py-3 rounded-xl border border-gray-200 text-gray-600 font-semibold hover:bg-gray-50 transition-colors"
          >
            Clear
          </button>
          <button
            type="submit"
            disabled={!!error || !symbol}
            className={`flex-1 px-6 py-3 rounded-xl font-semibold shadow-lg shadow-black/20 transition-all transform active:scale-95 ${!!error || !symbol
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed shadow-none'
                : 'bg-black text-white hover:bg-gray-800'
              }`}
          >
            Sell Stock
          </button>
        </div>
      </form>

      {/* Confirmation Dialog */}
      <Dialog open={showDialog} onClose={() => setShowDialog(false)} className="z-50">
        <DialogPanel className="bg-white/90 backdrop-blur-xl border border-white/40 shadow-2xl rounded-3xl p-8 max-w-sm mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <FaCheckCircle className="text-green-500 text-2xl" />
            <Title className="text-xl font-bold text-gray-900">Confirm Sale</Title>
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
              <span className="font-semibold text-gray-900">Net Total</span>
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
              Confirm Sell
            </button>
          </div>
        </DialogPanel>
      </Dialog>
    </div>
  );
};

export default Sell;
