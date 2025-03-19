import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { convertVND } from "../config/convertVND";
import { getOrderUser } from "../services/apiUser";
import "../assets/css/myorder.css";
const MyOrder = () => {
    const userID = useSelector((state) => state.auth.id);
    const [orders, setOrders] = useState([]);
    const fetchUserOrders = async () => {
        const id = userID;

        const res = await getOrderUser(id);
        if (res.ER === 0 && res.data) {
            setOrders(res.data ? res.data : []);
        } else {
            setOrders([]);
        }
    };
    useEffect(() => {
        fetchUserOrders();
    }, [userID]);
    return (
        <>
            <div className="orders-container">
                <h2>My Orders</h2>
                {orders.length === 0 ? (
                    <p className="text-center text-muted mt-4">
                        Bạn chưa có đơn hàng nào.
                    </p>
                ) : (
                    orders.map((order, index) => (
                        <div className="order-card" key={index}>
                            <div className="order-header">
                                <h5>Order #{order.ma_don_hang}</h5>
                                <span className="status">
                                    {order.trang_thai_don_hang}
                                </span>
                            </div>
                            <div className="order-body">
                                <div className="order-details">
                                    <p>
                                        <strong>Order Date:</strong>{" "}
                                        {new Date(
                                            order.ngay_dat
                                        ).toLocaleString("vi-VN", {
                                            day: "2-digit",
                                            month: "2-digit",
                                            year: "numeric",
                                            hour: "2-digit",
                                            minute: "2-digit",
                                        })}
                                    </p>
                                    <p>
                                        <strong>Estimated Delivery:</strong>{" "}
                                        {order.ngay_giao_hang
                                            ? new Date(
                                                  order.ngay_giao_hang
                                              ).toLocaleDateString("vi-VN", {
                                                  day: "2-digit",
                                                  month: "2-digit",
                                                  year: "numeric",
                                              })
                                            : "Chưa rõ ngày giao hàng do sự cố!"}
                                    </p>
                                    <p>
                                        <strong>Shipping Address:</strong>{" "}
                                        {order.dia_chi_giao_hang}
                                    </p>
                                </div>
                                {order.details.map((detail, index) => (
                                    <div className="product-item" key={index}>
                                        <img
                                            src={`http://localhost:8080/app${detail.duong_dan}`}
                                            alt={detail.ten_san_pham}
                                        />
                                        <div className="product-info">
                                            <h6>{detail.ten_san_pham}</h6>
                                            <p>
                                                Quantity: {detail.so_luong} |
                                                Price:{" "}
                                                {convertVND(detail.gia_ban)}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                                <div className="order-total">
                                    Total: {convertVND(order.tong_gia_tri)}
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </>
    );
};

export default MyOrder;
