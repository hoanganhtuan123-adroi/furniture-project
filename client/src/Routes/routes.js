import React, { useEffect } from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import App from "../App";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// Dashboard Components
import Dashboard from "../pages/Dashboard";
import LoginDashboard from "../components/Dashboard/Login/Login";
import ProductLayout from "../pages/ProductLayout";
import StocksProduct from "../pages/StocksAdmin";
import PrivateRoute from "./PrivateRoute/PrivateRoute";
import PrivateRouteClient from "./PrivateRoute/PrivateRouteClient";
import PublicRoute from "./PublicRoute/PublicRoute";
import InvocesAdmin from "../pages/InvocesAdmin";
import CustomerAdmin from "../pages/CustomerAdmin";
import OrdersAdmin from "../pages/OrdersAdmin";
import MainDashboard from "../components/Modal/Dashboard/MainDashboard";
import Home from "../pages/Home";
import LoginClient from "../pages/LoginClient";
import ShopPage from "../pages/ShopPage";
import SingleProduct from "../pages/SingleProduct";
import CartPage from "../pages/CartPage";
import Checkout from "../pages/Checkout";
import ContactPage from "../pages/ContactPage";
import MyOrder from "../pages/MyOrder";

// Routes Component
function RoutesComponent() {
    return (
        <>
            <Routes>
                {/* Public Routes */}
                <Route path="/" element={<App />}>
                    <Route path="" index element={<Home />} />
                    <Route path="/shop" element={<ShopPage />} />
                    <Route
                        path="/shop/:id/detail"
                        element={<SingleProduct />}
                    />
                    <Route path="/contact" element={<ContactPage />} />

                    <Route element={<PrivateRouteClient />}>
                        <Route path="/cart/:id/detail" element={<CartPage />} />
                        <Route path="/checkout" element={<Checkout />} />
                        <Route path="/myorders" element={<MyOrder />} />
                    </Route>
                </Route>
                <Route path="/login" element={<LoginClient />} />

                {/* Auth Routes */}
                <Route element={<PublicRoute />}>
                    <Route
                        path="/dashboard/login"
                        element={<LoginDashboard />}
                    />
                </Route>

                {/* Protected Dashboard Routes */}
                <Route element={<PrivateRoute />}>
                    <Route path="/dashboard" element={<Dashboard />}>
                        <Route path="" index element={<MainDashboard />} />
                        <Route path="products" element={<ProductLayout />} />
                        <Route path="orders" element={<OrdersAdmin />} />
                        <Route path="stocks" element={<StocksProduct />} />
                        <Route path="invoices" element={<InvocesAdmin />} />
                        <Route path="customers" element={<CustomerAdmin />} />
                        {/* Add more dashboard routes here */}
                    </Route>
                </Route>

                {/* Fallback Route */}
                <Route
                    path="*"
                    element={<Navigate to="/dashboard/login" replace />}
                />
            </Routes>
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover={false}
                theme="light"
            />
        </>
    );
}

export default RoutesComponent;
