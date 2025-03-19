import React from "react";

import { Outlet } from "react-router-dom";
import Navigation from "../components/Dashboard/Navigation/Navigation";
const Dashboard = () => {
    return (
        <div className="flex h-screen">
            <Navigation />
            <div className="p-2 w-full bg-secondary-subtle ">
                <Outlet />
            </div>
        </div>
    );
};

export default Dashboard;
