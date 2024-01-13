import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminLogin from './components/Auth/AdminLogin';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import MarketWatch from './components/MarketWatch/MarketWatch';
import SideNavbar from './components/NavBar/SideNavBar';
import Dashboard from './components/DashBoard';

function App() {

    return (
      <Router>
        <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/market-watch" element={<MarketWatch />} />
        </Routes>
      </Router>
    );
  
}

export default App
