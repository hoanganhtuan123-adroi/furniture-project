import React from "react";
import { Routes, Route } from "react-router-dom";
import App from "../App";

// Dashboard
import Dashboard from "../components/Dashboard/Dashboard";
import LoginDashboard from "../components/Dashboard/Login/Login";
function routes() {
    return (
        <>
            <Routes>
                <Route path="/" element={<App />}></Route>
                <Route path="/dashboard/login" element={<LoginDashboard />} />
                <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
        </>
    );
}

export default routes;
