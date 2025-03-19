import { useState } from "react";
import Form from "react-bootstrap/Form";
import { useSelector } from "react-redux";
import { convertVND, calculateDiscountedPrice } from "../../config/convertVND";
import { payOrderApi, payOrderATMApi } from "../../services/apiUser";
import { toast } from "react-toastify";
const CheckoutDetail = () => {
    const idUser = useSelector((state) => state.auth.id);
    const listOrders = useSelector((state) => state.auth.cartItems);
    const [selectedOption, setSelectedOption] = useState("");
    const [address, setAddress] = useState("");
    const idProduct = listOrders.map((item) => item.id_san_pham);
    const quantity = listOrders.map((item) => item.so_luong);
    const price = listOrders.map((item) => item.gia_ban);
    const calculateTotal = () => {
        return listOrders.reduce((total, item) => {
            const itemPrice = item.phan_tram_giam
                ? calculateDiscountedPrice(item.gia_ban, item.phan_tram_giam)
                : item.gia_ban;
            return total + itemPrice * item.so_luong;
        }, 0);
    };

    let totalAmount = calculateTotal();

    const handleChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const data = {
        id_nguoi_dung: idUser,
        dia_chi_giao_hang: address,
        tong_gia_tri: totalAmount,
        id_san_pham: idProduct,
        so_luong: quantity,
        gia_ban: price,
        phuong_thuc_thanh_toan: selectedOption,
        so_tien_thanh_toan: totalAmount,
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const response = await payOrderApi(data);
        console.log(response);
        if (response.ER === 0) {
            toast.success(response.message);
        } else {
            toast.error(response.message);
        }
    };

    const handlePaytATM = async (event) => {
        event.preventDefault();
        const response = await payOrderATMApi(data);
        console.log(response);
        if (response.ER === 0) {
            window.location.href = response.payUrl;
        } else {
            toast.error(response.message);
        }
    };

    return (
        <div
            className="container p-4"
            style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "30px",
            }}
        >
            <div>
                <h3>Billing details</h3>
                <Form className="mt-5">
                    <Form.Group className="mb-3">
                        <Form.Label>Full Name</Form.Label>
                        <Form.Control required type="text" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control required type="text" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Address</Form.Label>
                        <Form.Control
                            onChange={(e) => setAddress(e.target.value)}
                            required
                            as="textarea"
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control required type="email" />
                    </Form.Group>
                </Form>
            </div>
            <div className="d-flex flex-column">
                <div className="d-flex align-items-center justify-content-between">
                    <p className="fs-3 fw-medium">Product</p>
                    <p className="fs-3 fw-medium">Subtotal</p>
                </div>
                {listOrders.map((item, index) => {
                    return (
                        <div
                            key={index}
                            className="d-flex align-items-center justify-content-between"
                        >
                            <p className="fs-5" style={{ color: "#9F9F9F" }}>
                                {item.ten_san_pham} x {item.so_luong}
                            </p>
                            <p className="fs-5">
                                {item.phan_tram_giam
                                    ? convertVND(
                                          calculateDiscountedPrice(
                                              item.gia_ban,
                                              item.phan_tram_giam
                                          )
                                      )
                                    : convertVND(item.gia_ban)}
                            </p>
                        </div>
                    );
                })}

                <div className="d-flex align-items-center justify-content-between">
                    <p className="fs-5">Subtotal</p>
                    <p className="fs-5">{convertVND(totalAmount)}</p>
                </div>
                <div className="d-flex align-items-center justify-content-between">
                    <p className="fs-5">Total</p>
                    <p className="fs-3 fw-bold" style={{ color: "#B88E2F" }}>
                        {convertVND(totalAmount)}
                    </p>
                </div>
                <hr />
                <Form>
                    <Form.Check
                        type="radio"
                        name="flexRadioDefault"
                        id="Direct Bank Transfer"
                        label="Direct Bank Transfer"
                        value="Chuyển khoản"
                        onChange={handleChange}
                    />
                    <Form.Check
                        type="radio"
                        name="flexRadioDefault"
                        label="Cash On Delivery"
                        id="Cash On Delivery"
                        value="Thanh toán khi nhận hàng"
                        onChange={handleChange}
                    />
                </Form>
                <p className="mt-4" style={{ textAlign: "justify" }}>
                    Your personal data will be used to support your experience
                    throughout this website, to manage access to your account,
                    and for other purposes described in our privacy policy.
                </p>
                <div className="d-flex flex-column gap-5 align-items-start mt-5">
                    <button
                        className="btn border rounded border-1 border-black"
                        style={{ padding: "15px 40px" }}
                        onClick={handleSubmit}
                    >
                        Place order
                    </button>
                    <button
                        className="btn border rounded border-1 border-black"
                        style={{ padding: "15px 40px" }}
                        onClick={handlePaytATM}
                    >
                        Pay With ATM CARD
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CheckoutDetail;
