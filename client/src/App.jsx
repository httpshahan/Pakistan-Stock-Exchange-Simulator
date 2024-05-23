import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AdminLogin from "./components/Auth/AdminLogin";
import Register from "./components/Auth/Register";
import Login from "./components/Auth/Login";
import MarketWatch from "./pages/MarketWatch";
import Dashboard from "./components/Dashboard/DashBoardComp";
import StockDetail from "./pages/StockDetail";
import Portfolio from "./pages/Portfolio";
import Transaction from "./pages/Transaction";
import Trade from "./pages/Trade";
import HeatMap from "./pages/HeatMap";
import Watchlist from "./pages/Watchlist";
import NotFound from "./pages/NotFound";
import UserProfile from "./pages/UserProfile";
import AdminDash from "./pages/AdminDash";
import ForgotPassword from "./components/Auth/ForgotPassword";


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
