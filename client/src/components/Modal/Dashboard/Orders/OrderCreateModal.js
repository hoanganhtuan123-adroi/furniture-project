import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { getProductApi } from "../../../../services/apiProduct";
import { getAllUsersApi, createOrderApi } from "../../../../services/apiOrder";
import { convertVND } from "../../../../config/convertVND";
import { toast } from "react-toastify";
function OrderCreateModal({ show, setShow }) {
    const [listUsers, setListUsers] = useState([]);
    const [idUser, setIdUser] = useState("");
    const [nameUser, setNameUser] = useState("");
    const [addressUser, setAddressUser] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");

    const [listProducts, setListProducts] = useState([]);
    const [idProduct, setIdProduct] = useState(0);
    const [nameProduct, setNameProduct] = useState("");
    const [codeProduct, setCodeProduct] = useState("");
    const [priceProduct, setPriceProduct] = useState("");
    const [discountProduct, setDiscountProduct] = useState("");
    const [quantityProduct, setQuantityProduct] = useState(1);
    const [totalPrice, setTotalPrice] = useState(0);
    const [dateOrder, setDateOrder] = useState("");
    const [statusOrder, setStatusOrder] = useState("Đang xử lý");

    const resetForm = () => {
        setIdUser("");
        setNameUser("");
        setAddressUser("");
        setPhoneNumber("");

        setIdProduct("");
        setNameProduct("");
        setCodeProduct("");
        setPriceProduct("");
        setDiscountProduct("");
        setQuantityProduct(1); // Số lượng mặc định là 1
        setTotalPrice(0);
        setDateOrder("");
        setStatusOrder("Đang xử lý"); // Trạng thái mặc định
    };

    const handleClose = () => {
        setShow(false);
        resetForm();
    };

    const fetchProducts = async () => {
        const res = await getProductApi();
        let products = [];
        let product = {};
        if (res) {
            res.forEach((item) => {
                product = {
                    id: item.id,
                    ten_san_pham: item.ten_san_pham,
                    ma_san_pham: item.ma_san_pham,
                    gia_ban: item.gia_ban,
                    giam_gia: item.phan_tram_giam,
                };
                products.push(product);
            });
            setListProducts(products);
        }
    };

    const fetchUsers = async () => {
        try {
            const res = await getAllUsersApi();
            if (res) {
                setListUsers(res.data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleProductChange = (e) => {
        console.log("check e >>> ", e.target.value);
        const selectedProductId = e.target.value;
        const selectedProduct = listProducts.find((product) => {
            return product.id === parseInt(selectedProductId);
        });

        if (selectedProduct) {
            setIdProduct(selectedProduct.id);
            setNameProduct(selectedProduct.ten_san_pham);
            setCodeProduct(selectedProduct.ma_san_pham);
            setPriceProduct(selectedProduct.gia_ban);
            setDiscountProduct(
                selectedProduct.giam_gia ? selectedProduct.giam_gia : 0
            );
            setQuantityProduct(1); // Reset số lượng về 1 khi chọn sản phẩm mới

            // Tính tổng giá trị với số lượng mặc định là 1
            const price = parseFloat(selectedProduct.gia_ban) || 0;
            const discount = parseFloat(selectedProduct.giam_gia) || 0;
            const discountedPrice = price * (1 - discount / 100);
            setTotalPrice(discountedPrice * 1); // Tổng giá trị với số lượng 1
        } else {
            // Reset nếu không tìm thấy (ví dụ khi chọn "Đang xử lý")
            resetForm();
        }
    };

    const handleQuantityChange = (e) => {
        const newQuantity = parseInt(e.target.value) || 1; // Đảm bảo số lượng là số nguyên, tối thiểu là 1
        setQuantityProduct(newQuantity);

        // Tính tổng giá trị: giá * số lượng * (1 - giảm giá/100)
        const price = parseFloat(priceProduct) || 0; // Giá sản phẩm
        const discount = parseFloat(discountProduct) || 0; // Phần trăm giảm giá
        const discountedPrice = price * (1 - discount / 100); // Giá sau giảm
        const newTotalPrice = discountedPrice * newQuantity; // Tổng giá trị
        setTotalPrice(newTotalPrice);
    };

    const handleUserChange = (e) => {
        const selectedUserId = e.target.value;
        const selectedUser = listUsers.find(
            (user) => user.id == selectedUserId
        );

        if (selectedUser) {
            setIdUser(selectedUser.id);
            setAddressUser(selectedUser.dia_chi);
            setPhoneNumber(selectedUser.so_dien_thoai);
            setNameUser(selectedUser.ho_va_ten);
        } else {
            // Reset nếu không tìm thấy (ví dụ khi chọn "Đang xử lý")
            setIdUser("");
            setAddressUser("");
            setPhoneNumber("");
            setNameUser("");
        }
    };

    const handleSubmit = async () => {
        try {
            const data = {
                id_nguoi_dung: idUser,
                ngay_dat: dateOrder,
                trang_thai_don_hang: statusOrder,
                tong_gia_tri: totalPrice,
                dia_chi_giao_hang: addressUser,
                id_san_pham: idProduct,
                so_luong: quantityProduct,
                gia_ban: priceProduct,
            };
            const res = await createOrderApi(data);
            if (res && res.ER === 0) {
                toast.success("Tạo đơn hàng thành công");
                handleClose();
            } else {
                toast.error("Không thể tạo đơn");
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchUsers();
        fetchProducts();
    }, []);

    return (
        <Modal show={show} onHide={handleClose} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Thêm đơn hàng mới</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    {/* Thông tin khách hàng */}
                    <Form.Group className="mb-3">
                        <Form.Label>Khách hàng</Form.Label>
                        <Form.Select onChange={handleUserChange}>
                            <option value="">Chọn khách hàng</option>
                            {listUsers.length > 0 &&
                                listUsers.map((user, index) => {
                                    return (
                                        <option
                                            key={`${user.ho_va_ten}-${index}`}
                                            value={user.id}
                                        >
                                            {user.ho_va_ten}
                                        </option>
                                    );
                                })}
                        </Form.Select>
                    </Form.Group>

                    {/* Mã đơn hàng */}
                    <Form.Group className="mb-3">
                        <Form.Label>
                            Mã sản phẩm
                            {discountProduct ? (
                                <span
                                    className="bg-primary p-2 rounded text-white mx-2"
                                    style={{ fontSize: "12px" }}
                                >
                                    Sản phẩm đang được giảm giá{" "}
                                    {discountProduct}%
                                </span>
                            ) : (
                                ""
                            )}
                        </Form.Label>
                        <Form.Control
                            value={codeProduct}
                            type="text"
                            placeholder="Nhập mã đơn hàng (tự động tạo nếu để trống)"
                            readOnly
                        />
                    </Form.Group>

                    {/* Ngày đặt */}
                    <Form.Group className="mb-3">
                        <Form.Label>Ngày đặt</Form.Label>
                        <Form.Control
                            type="datetime-local"
                            value={dateOrder}
                            onChange={(e) => setDateOrder(e.target.value)}
                        />
                    </Form.Group>

                    {/* Thêm sản phẩm khác */}
                    <Form.Group className="mb-3">
                        <Form.Label>Chọn sản phẩm</Form.Label>
                        <Form.Select onChange={handleProductChange}>
                            <option value="">Chọn sản phẩm</option>
                            {listProducts.length > 0 &&
                                listProducts.map((product, index) => {
                                    return (
                                        <option
                                            key={`${product.ten_san_pham}-${index}`}
                                            value={product.id}
                                        >
                                            {product.ten_san_pham}
                                        </option>
                                    );
                                })}
                        </Form.Select>
                    </Form.Group>

                    {/* Chi tiết sản phẩm */}
                    <Form.Group className="mb-3">
                        <Form.Label>Sản phẩm (Số lượng và giá)</Form.Label>
                        <Row>
                            <Col md={6}>
                                <Form.Control
                                    type="number"
                                    placeholder="Số lượng"
                                    min="1"
                                    value={quantityProduct}
                                    onChange={handleQuantityChange}
                                />
                            </Col>
                            <Col md={6}>
                                <Form.Control
                                    type="text"
                                    placeholder="Giá bán"
                                    readOnly
                                    value={convertVND(priceProduct)}
                                />
                            </Col>
                        </Row>
                    </Form.Group>

                    {/* Tổng giá trị */}
                    <Form.Group className="mb-3">
                        <Form.Label>Tổng giá trị</Form.Label>
                        <Form.Control
                            type="text"
                            value={convertVND(totalPrice)}
                            readOnly
                        />
                    </Form.Group>

                    {/* Địa chỉ giao hàng */}
                    <Form.Group className="mb-3">
                        <Form.Label>Địa chỉ giao hàng</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={2}
                            placeholder="Nhập địa chỉ giao hàng"
                            value={addressUser}
                            onChange={(e) => setAddressUser(e.target.value)}
                        />
                    </Form.Group>

                    {/* Trạng thái đơn hàng */}
                    <Form.Group className="mb-3">
                        <Form.Label>Trạng thái đơn hàng</Form.Label>
                        <Form.Select
                            // defaultValue={statusOrder}
                            onSelect={(e) => setStatusOrder(e.target.value)}
                        >
                            <option value="Đang xử lý">Đang xử lý</option>
                            <option value="Chưa giao hàng">
                                Chưa giao hàng
                            </option>
                            <option value="Đã giao hàng">Đã giao hàng</option>
                        </Form.Select>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Hủy
                </Button>
                <Button variant="primary" onClick={handleSubmit}>
                    Lưu đơn hàng
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default OrderCreateModal;
