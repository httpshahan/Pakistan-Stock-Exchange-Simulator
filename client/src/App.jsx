import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AdminLogin from "./components/Auth/AdminLogin";
import Register from "./components/Auth/Register";
import Login from "./components/Auth/Login";
import MarketWatch from "./components/MarketWatch/MarketWatch";
import Dashboard from "./components/DashBoard";
import StockDetail from "./components/Stock/StockDetail";

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
      </Routes>
    </Router>
  );
}

export default App;
