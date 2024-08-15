import { createBrowserRouter } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Register from "./pages/RegisterPage";
import AdminLogin from "./pages/AdminLogin";
import Home from "./pages/Dashboard";
import MarketWatch from "./pages/MarketWatch";
import StockDetails from "./pages/StockDetail";
import Trade from "./pages/Trade";
import Portfolio from "./pages/Portfolio";
import Transaction from "./pages/Transaction";
import Watchlist from "./pages/Watchlist";
import Indices from "./pages/HeatMap";
import UserProfile from "./pages/UserProfile";
import AdminDashboard from "./pages/AdminDash";
import ForgotPassword from "./pages/ForgotPage";
import AdminRegister from "./components/Auth/AdminRegister";
import NotFound	 from "./pages/NotFound";

import NavigationLayout from "./Layout/NavigationLayout";
import AuthLayout from "./Layout/AuthLayout";

const Router = createBrowserRouter([
    {
        path: "/",
        element: <NavigationLayout />,
        children : [
            { path : 'dashboard', element: <Home /> },
            { path : 'market-watch', element: <MarketWatch /> },
            { path : 'stock/:symbol', element: <StockDetails /> },
            { path : 'trade', element: <Trade /> },
            { path : 'portfolio', element: <Portfolio /> },
            { path : 'transactions', element: <Transaction /> },
            { path : 'watchlist', element: <Watchlist /> },
            { path : 'indices', element: <Indices /> },
            { path : 'profile', element: <UserProfile /> }
        ]
    },

    {
        path: "/",
        element: <AuthLayout />,
        children: [
            { index: true, element: <LoginPage /> },
            { path: "signup", element: <Register /> },
            { path: "admin-signup", element: <AdminRegister />},
            { path: "admin", element: <AdminLogin /> },
            { path: "admin-dashboard", element: <AdminDashboard /> },
            { path: "forgot-password", element: <ForgotPassword /> },
            { path: "*", element: <NotFound />}
        ]
    }
    
]);

export default Router;