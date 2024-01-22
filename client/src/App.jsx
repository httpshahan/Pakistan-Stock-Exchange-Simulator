import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AdminLogin from "./components/Auth/AdminLogin";
import Register from "./components/Auth/Register";
import Login from "./components/Auth/Login";
import MarketWatch from "./components/MarketWatch/MarketWatch";
import Dashboard from "./components/DashBoard";
import StockDetail from "./components/Stock/StockDetail";
import Portfolio from "./components/Portfolio/Portfolio";
import Transaction from "./components/Transaction/Transaction";
import Trade from "./components/Trade/Trade";
import Watchlist from "./components/Watchlist/Watchlist";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/market-watch" element={<MarketWatch />} />
        <Route path="/stock/:symbol" element={<StockDetail />} />
        <Route path="/trade" element={<Trade />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/transactions" element={<Transaction />} />
        <Route path="/watchlist" element={<Watchlist />} />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
