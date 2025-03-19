import { useState, useEffect } from "react";
import { DiDropbox } from "react-icons/di";
import { getAllOrdersApi } from "../../services/apiOrder";
import OrderDetailModal from "../Modal/Dashboard/Orders/OrderDetailModal";
import { convertVND } from "../../config/convertVND";
import "./ProductTable.css";
const OrderTable = () => {
    const [listOrders, setListOrders] = useState([]);
    const [show, setShow] = useState(false);
    const [idOrder, setIdOrder] = useState(null);
    const handleShow = (id) => {
        console.log(id);
        setShow(true);
        setIdOrder(id);
    };

    const fetchOrders = async () => {
        const res = await getAllOrdersApi();
        if (res && res.ER === 0) {
            setListOrders(res.data);
        }
    };
    useEffect(() => {
        fetchOrders();
    }, []);
    return (
        <>
            <div className="bg-light-subtle" style={{ width: "80%" }}>
                <table className="table table-hover">
                    <thead>
                        <tr className="">
                            <th scope="col">Mã Đơn Hàng</th>
                            <th scope="col">Khách Hàng</th>
                            <th scope="col">Ngày Đặt</th>
                            <th scope="col">Trạng Thái Đơn Hàng</th>
                            <th scope="col">Trạng Thái Thanh Toán</th>
                            <th scope="col">Tổng Giá trị</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listOrders.length > 0 ? (
                            listOrders.map((order, index) => (
                                <tr
                                    key={order.ma_don_hang + index}
                                    style={{ cursor: "pointer" }}
                                    className="product-row"
                                    onClick={() => handleShow(order.id)}
                                >
                                    <td>{order.ma_don_hang}</td>
                                    <td>{order.ho_va_ten}</td>
                                    <td>{order.ngay_dat}</td>
                                    <td>
                                        <span
                                            className={
                                                order.trang_thai_don_hang ===
                                                "Đã giao hàng"
                                                    ? "bg-success text-white rounded p-1"
                                                    : "bg-warning text-white rounded p-1"
                                            }
                                        >
                                            {order.trang_thai_don_hang}
                                        </span>
                                    </td>
                                    <td>
                                        <span
                                            className={
                                                order.trang_thai_thanh_toan ===
                                                "Đã Thanh Toán"
                                                    ? "bg-success text-white rounded p-1"
                                                    : "bg-warning text-white rounded p-1"
                                            }
                                        >
                                            {order.trang_thai_thanh_toan
                                                ? order.trang_thai_thanh_toan
                                                : "Chưa Thanh Toán"}
                                        </span>
                                    </td>
                                    <td>{convertVND(order.tong_gia_tri)}</td>
                                </tr>
                            ))
                        ) : (
                            <div className="p-5 mx-auto">
                                <DiDropbox size={50} />
                                Chưa có sản phẩm
                            </div>
                        )}
                    </tbody>
                </table>
            </div>
            <OrderDetailModal
                show={show}
                setShow={setShow}
                idOrder={idOrder}
                fetchOrders={fetchOrders}
            />
        </>
    );
};

export default OrderTable;
