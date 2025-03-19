import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const PublicRoute = () => {
    const { isAuthenticated, token } = useSelector((state) => state.auth);

    // const toet = localStorage.getItem("token");
    const isLoggedIn = isAuthenticated && !!token;
    // const isLoggedIn = toet;

    // Nếu đã đăng nhập và cố truy cập trang login, chuyển hướng về dashboard
    return isLoggedIn ? <Navigate to="/dashboard" replace /> : <Outlet />;
};

export default PublicRoute;
