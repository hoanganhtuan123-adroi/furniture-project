import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRouteClient = () => {
    const { isAuthenticated, token } = useSelector((state) => state.auth);
    const isLoggedIn = isAuthenticated && !!token;
    // Nếu chưa đăng nhập, chuyển hướng về trang login
    return isLoggedIn ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRouteClient;
