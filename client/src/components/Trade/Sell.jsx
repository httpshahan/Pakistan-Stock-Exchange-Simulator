import React, { useState, useEffect, useRef } from "react";
import {
  Button,
  Dialog,
  DialogPanel,
  Title,
  List,
  ListItem,
} from "@tremor/react";
import apiService from "../../services/apiService";
import {toast} from "react-toastify";

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

    // Attach the event listener
    document.addEventListener("click", handleClickOutside);

    // Clean up the event listener on component unmount
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
  };

  const handleChange = (event) => {
    const inputQuantity = parseInt(event.target.value, 10);

    if (
      isNaN(inputQuantity) ||
      inputQuantity < 1 ||
      inputQuantity > maxQuantity
    ) {
      setError("Invalid quantity. Please enter a valid quantity.");
    } else {
      // Calculate intermediate values
      const cost = parseFloat(inputQuantity * price).toFixed(2);
      const brokerageFee = parseFloat(inputQuantity * 0.5).toFixed(2);
      const totalPrice = (parseFloat(cost) - parseFloat(brokerageFee)).toFixed(
        2
      );
      const newBalance = (
        parseFloat(balence) +
        parseFloat(cost) -
        parseFloat(brokerageFee)
      ).toFixed(2);

      // Update state values
      setQuantity(inputQuantity);
      setTotalCost(cost);
      setTotalBrokerageFee(brokerageFee);
      setTotalPrice(totalPrice);
      setNewBalence(newBalance);

      console.log("inputQuantity", inputQuantity);
      console.log("cost", cost);
      console.log("brokerageFee", brokerageFee);
      console.log("totalPrice", totalPrice);
      console.log("newBalance", newBalance);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!symbol || !quantity || !price) {
      setError("Please select a stock and enter a valid quantity.");
      return;
    }

    setShowDialog(true);

    // const perShare = parseFloat(price) - 0.5;

    // try {
    //   const response = await apiService.post(`/trade/sell/${userId}`, {
    //     symbol,
    //     quantity,
    //     perShare,
    //     totalPrice,
    //   });
    //   console.log(response.data);

    //   sessionStorage.setItem("balance", newbalence);

    //   // Reset form values on successful transaction
    //   setSymbol("");
    //   setQuantity("");
    //   setPrice("");
    //   setMaxQuantity(0);
    //   setSearchTerm("");
    //   setError(null);
    // } catch (error) {
    //   console.error("Error selling stock:", error);
    // }
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

      // Reset form values on successful transaction
      setSymbol("");
      setQuantity("");
      setPrice("");
      setMaxQuantity(0);
      setSearchTerm("");
      setError(null);
      setShowDialog(false);
    } catch (error) {
      toast.error("Error selling stock");
      console.error("Error selling stock:", error);
    }
  };
  return (
    <div className="max-w-md mx-auto p-6 ">
      <form
        onSubmit={handleSubmit}
        onReset={() => {
          setSymbol("");
          setQuantity("");
          setPrice("");
          setMaxQuantity(0);
          setTotalBrokerageFee(0);
          setTotalCost(0);
          setTotalPrice(0);
          setSearchTerm("");
          setError(null);
        }}
      >
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
              value={searchTerm}
              onChange={handleInputChange}
              required
              ref={searchInputRef}
            />
            {isSearching && (
              <div className="absolute z-10 w-full bg-white rounded-md shadow-lg">
                {filteredOptions.map((option) => (
                  <div
                    key={option.stock_symbol}
                    className="p-2 cursor-pointer hover:bg-gray-200"
                    onClick={() => handleOptionClick(option)}
                  >
                    <p className="text-gray-900 font-medium">
                      {option.stock_symbol}
                    </p>
                    <p className="text-gray-600">{option.company_name}</p>
                    <p className="text-gray-600 text-xs">
                      Price: {option.current} - Max Quantity:{option.quantity}{" "}
                    </p>
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
              value={brokerageFee}
              readOnly
            />
          </div>
        </div>

        <label htmlFor="quantity" className="text-sm font-semibold mb-2">
          Quantity{" "}
          <span className="text-xs text-gray-600">
            {maxQuantity ? "Max: " + maxQuantity : ""}
          </span>
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
              value={newbalence || 0}
              readOnly
            />
          </div>
          <div className="flex flex-col w-1/2 pl-2">
            <label htmlFor="totalPrice" className="text-sm font-semibold mb-2">
              Total Cost
            </label>
            <input
              type="text"
              id="totalPrice"
              className="p-2 w-full border rounded-md bg-gray-100"
              value={totalCost}
              readOnly
            />
          </div>
        </div>

        <div className="flex flex-col border-y py-5 mb-4">
          <div className="flex justify-between">
            <span className="text-sm font-semibold">Total Cost</span>
            <span className="text-sm font-semibold">{totalCost || 0}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm font-semibold">Brokerage Fee</span>
            <span className="text-sm font-semibold">{totalBrokerageFee}</span>
          </div>
        </div>

        <div className="flex justify-between mb-5">
          <span className="text-md font-semibold">Total</span>
          <span className="text-md font-semibold">{totalPrice || 0}</span>
        </div>

        <div className="text-red-500 text-sm mb-4">{error}</div>

        <div className="flex space-x-4">
          <button
            className="bg-green-500 hover:bg-green-600 text-white font-semibold p-2 w-full rounded-md"
            type="submit"
            disabled={!!error} // Disable the button if there's an error
          >
            Sell
          </button>
          <button
            className="bg-red-500 hover:bg-red-600 text-white font-semibold p-2 w-full rounded-md"
            type="reset"
          >
            Cancel
          </button>
        </div>
      </form>
      <Dialog
        open={showDialog}
        onClose={() => setShowDialog(false)}
        className="max-w-md"
      >
        <DialogPanel>
          <Title>Transaction Recipt</Title>
          <List className="p-6">
            <ListItem>
              <span className="font-semibold">Symbol:</span>
              <span> {symbol} </span>
            </ListItem>
            <ListItem>
              <span className="font-semibold">Quantity:</span>
              <span> {quantity}</span>
            </ListItem>
            <ListItem>
              <span className="font-semibold">Price:</span>
              <span>{price}</span>
            </ListItem>
            <ListItem>
              <span className="font-semibold">Total Price:</span>
              <span>{totalPrice}</span>
            </ListItem>
          </List>
          <p className="text-sm text-gray-500 mt-2">
            Click ok for succesful transaction.
          </p>
          <div className="flex justify-end mt-4">
            <Button
              className="bg-green-500 hover:bg-green-600 text-white font-semibold p-2 w-full rounded-md"
              onClick={handleDone}
            >
              OK
            </Button>
          </div>
        </DialogPanel>
      </Dialog>
    </div>
  );
};

export default Sell;
