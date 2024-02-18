import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AdminLogin from "./components/Auth/AdminLogin";
import Register from "./components/Auth/Register";
import Login from "./components/Auth/Login";
import MarketWatch from "./components/MarketWatch/MarketWatch";
import Dashboard from "./components/Dashboard/DashBoard";
import StockDetail from "./components/Stock/StockDetail";
import Portfolio from "./components/Portfolio/Portfolio";
import Transaction from "./components/Transaction/Transaction";
import Trade from "./components/Trade/Trade";
import HeatMap from "./components/Indices/HeatMap";
import Watchlist from "./components/Watchlist/Watchlist";
import NotFound from "./components/NotFound/NotFound";
import UserProfile from "./components/userProfile/userProfile";
import AdminDash from "./components/Admin/AdminDash";
import ForgotPassword from "./components/Auth/reset/ForgotPassword";


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
        <Route path="/indices" element={<HeatMap />} />
        <Route path="/watchlist" element={<Watchlist />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/admin-dashboard" element={<AdminDash />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
