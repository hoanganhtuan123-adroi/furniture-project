import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { CiEdit } from "react-icons/ci";
import { FaSave } from "react-icons/fa";
import {
    getDetailOrderApi,
    updateOrderStatusApi,
    deleteOrderApi,
} from "../../../../services/apiOrder";
import { convertVND } from "../../../../config/convertVND";
import { toast } from "react-toastify";
function OrderDetailModal(props) {
    const { show, setShow, idOrder, fetchOrders } = props;
    const [isEdit, setIsEdit] = useState(false);
    const [id, setId] = useState("");
    const [orderDetail, setOrderDetail] = useState({});

    const [statusOrder, setStatusOrder] = useState("");
    const [addressOrder, setAddressOrder] = useState("");
    const [quantityOrder, setQuantityOrder] = useState("");
    const [totalPriceOrder, setTotalPriceOrder] = useState("");

    const handleClose = () => {
        setOrderDetail({});
        setStatusOrder("");
        setAddressOrder("");
        setQuantityOrder("");
        setTotalPriceOrder("");
        setShow(false);
    };

    const fetchOrderDetail = async () => {
        if (id) {
            const res = await getDetailOrderApi(id);
            console.log("check order detail res >>> ", res.data[0]);
            if (res && res.ER === 0) {
                const detail = res.data[0] || {};
                setOrderDetail(detail);
                // Cập nhật các state khác sau khi có dữ liệu
                setStatusOrder(detail.trang_thai_don_hang || "");
                setAddressOrder(detail.dia_chi_giao_hang || "");
                setQuantityOrder(detail.so_luong || "");
                setTotalPriceOrder(detail.so_luong * detail.gia_ban || 0);
                setIsEdit(false);
            }
        }
    };

    const handleUpdate = async () => {
        try {
            const data = {
                id: parseInt(id),
                trang_thai_don_hang: statusOrder,
                dia_chi_giao_hang: addressOrder,
                so_luong: parseInt(quantityOrder),
                tong_gia_tri: totalPriceOrder,
            };
            const response = await updateOrderStatusApi(data);
            if (response && response.ER === 0) {
                setIsEdit(false); // Thoát chế độ chỉnh sửa sau khi lưu thành công
                fetchOrderDetail(); // Tải lại dữ liệu để cập nhật giao diện
                fetchOrders(); // Tải lại dữ liệu để cập nhật giao diện
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await deleteOrderApi(id);
            if (response && response.ER === 0) {
                toast.success(response.message);
                handleClose();
                fetchOrders();
            } else {
                toast.error(response.message);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        setId(idOrder);
    }, [idOrder]);

    useEffect(() => {
        if (id) {
            fetchOrderDetail();
        }
    }, [id]);

    useEffect(() => {
        if (show && id) {
            fetchOrderDetail();
        }
    }, [show, id]);

    useEffect(() => {
        const price = orderDetail.gia_ban || 0; // Giá bán từ orderDetail
        const quantity = parseFloat(quantityOrder) || 0; // Chuyển quantityOrder thành số
        setTotalPriceOrder(quantity * price);
    }, [quantityOrder, orderDetail.gia_ban]);

    // Xử lý khi người dùng thay đổi số lượng trong input
    const handleQuantityChange = (e) => {
        setQuantityOrder(e.target.value);
    };
    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Chi tiết đơn hàng</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Mã đơn hàng</Form.Label>
                            <Form.Control
                                value={orderDetail.ma_don_hang}
                                type="text"
                                readOnly
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Mã sản phẩm</Form.Label>
                            <Form.Control
                                value={orderDetail.ma_san_pham}
                                type="text"
                                readOnly
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Tên sản phẩm</Form.Label>
                            <Form.Control
                                value={orderDetail.ten_san_pham}
                                type="text"
                                readOnly
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Khách hàng</Form.Label>
                            <Form.Control
                                value={orderDetail.ho_va_ten}
                                type="text"
                                readOnly
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Ngày đặt</Form.Label>
                            <Form.Control
                                value={orderDetail.ngay_dat}
                                type="text"
                                readOnly
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Tổng giá trị</Form.Label>
                            <Form.Control
                                value={totalPriceOrder}
                                type="text"
                                readOnly
                                className={
                                    isEdit
                                        ? "border border-2 border-success"
                                        : ""
                                }
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Trạng thái đơn</Form.Label>

                            <Form.Select
                                defaultValue={orderDetail.trang_thai_don_hang}
                                onChange={(e) => setStatusOrder(e.target.value)}
                                readOnly={!isEdit}
                                className={
                                    isEdit
                                        ? "border border-2 border-success"
                                        : ""
                                }
                            >
                                <option value="Đang xử lý">Đang xử lý</option>
                                <option value="Chưa giao hàng">
                                    Chưa giao hàng
                                </option>
                                <option value="Đã giao hàng">
                                    Đã giao hàng
                                </option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Trạng thái thanh toán</Form.Label>
                            <Form.Control
                                value={statusOrder}
                                type="text"
                                readOnly
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Số lượng</Form.Label>
                            <Form.Control
                                className={
                                    isEdit
                                        ? "border border-2 border-success"
                                        : ""
                                }
                                value={quantityOrder}
                                type="number"
                                onChange={handleQuantityChange}
                                readOnly={!isEdit}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Giá bán sản phẩm</Form.Label>
                            <Form.Control
                                value={convertVND(orderDetail.gia_ban)}
                                type="text"
                                readOnly
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Địa chỉ giao hàng</Form.Label>
                            <Form.Control
                                className={
                                    isEdit
                                        ? "border border-2 border-success"
                                        : ""
                                }
                                value={addressOrder}
                                type="text"
                                onChange={(e) =>
                                    setAddressOrder(e.target.value)
                                }
                                readOnly={!isEdit}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Khách trả</Form.Label>
                            <Form.Control
                                value={
                                    orderDetail.so_tien_thanh_toan
                                        ? convertVND(
                                              orderDetail.so_tien_thanh_toan
                                          )
                                        : "Chưa thanh toán"
                                }
                                type="text"
                                readOnly
                            />
                        </Form.Group>
                    </Form>
                    {orderDetail.so_tien_thanh_toan > totalPriceOrder ? (
                        <p className="bg-danger text-white">
                            *Khách thừa{" "}
                            {convertVND(
                                orderDetail.so_tien_thanh_toan - totalPriceOrder
                            )}
                        </p>
                    ) : (
                        ""
                    )}
                </Modal.Body>
                <Modal.Footer>
                    {isEdit ? (
                        <Button
                            variant="success"
                            className=" d-flex align-items-center gap-2"
                            onClick={handleUpdate}
                        >
                            <FaSave /> Lưu
                        </Button>
                    ) : (
                        <Button
                            variant="primary"
                            className=" d-flex align-items-center gap-2"
                            onClick={() => setIsEdit(!isEdit)}
                        >
                            <CiEdit />
                            Chỉnh sửa
                        </Button>
                    )}
                    <Button
                        variant="secondary"
                        onClick={() => {
                            handleDelete(id);
                        }}
                    >
                        Delete
                    </Button>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default OrderDetailModal;
