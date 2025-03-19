import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import {
    getProductByCodeApi,
    importStockApi,
} from "../../../../services/apiStock";
import { normalizeProductCode } from "../../../../config/convertVND";
import { toast } from "react-toastify";
import Spinner from "react-bootstrap/Spinner";
function StockImport(props) {
    const { show, setShow, listCodeProduct } = props;
    const [totalValue, setTotalValue] = useState(0);
    const [codeProduct, setCodeProduct] = useState("");
    const [productName, setProductName] = useState("");
    const [batch, setBatch] = useState("");
    const [importDate, setImportDate] = useState("");
    const [importPrice, setImportPrice] = useState(0);
    const [importPriceOld, setImportPriceOld] = useState("");
    const [importQuantity, setImportQuantity] = useState(0);
    const [reason, setReason] = useState("");
    const [loading, setLoading] = useState(false);
    const [idProduct, setIdProduct] = useState("");
    const handleClose = () => {
        setShow(false);
        setCodeProduct("");
        setProductName("");
        setBatch("");
        setImportDate("");
        setImportPrice(0);
        setImportQuantity(0);
        setImportPriceOld("");
        setImportPrice(0);
        setReason("");
        setTotalValue(0);
    };

    const handleQuantityChange = (e) => {
        const quantity = e.target.value;
        setImportQuantity(quantity);
        setTotalValue(quantity * importPrice); // Update total value
    };

    const handlePriceChange = (e) => {
        const price = e.target.value;
        setImportPrice(price);
        setTotalValue(importQuantity * price); // Update total value
    };

    const handleSubmit = async () => {
        const data = {
            id_san_pham: idProduct,
            ngay_nhap: importDate,
            gia_nhap: importPrice,
            so_luong_nhap: importQuantity,
            ly_do: reason,
            tong_gia_tri: totalValue,
        };

        try {
            const response = await importStockApi(data);
            if (response && response.ER === 0) {
                toast.success(response.message);
                handleClose();
            } else {
                toast.error(response.message);
            }
        } catch (error) {
            console.error("Lỗi khi gọi API nhập kho:", error);
            toast.error("Không thể nhập kho");
        }
    };

    const callApiProduct = async () => {
        if (codeProduct == "") return;
        try {
            const codeProductNew = normalizeProductCode(codeProduct);
            const response = await getProductByCodeApi(codeProductNew);
            if (response && response.ER === 0 && response.data) {
                console.log(response);
                setIdProduct(response.data.id_san_pham);
                setProductName(response.data.ten_san_pham);
                setBatch(response.data.lo_hang);
                setImportDate(response.data.ngay_nhap);
                setImportPriceOld(response.data.gia_nhap);
            } else {
                toast.error(response.message);
            }
        } catch (error) {
            console.error("Lỗi khi gọi API sản phẩm:", error);
            toast.error("Không thể lấy thông tin sản phẩm");
            setCodeProduct("");
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            callApiProduct();
        }, 1000);
        return () => clearTimeout(timer);
    }, [codeProduct]);
    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header
                    style={{ backgroundColor: "#0070f4", color: "#fff" }}
                >
                    <Modal.Title>Nhập hàng</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Mã sản phẩm</Form.Label>

                            <div className="d-flex align-items-center">
                                <Form.Select
                                    aria-label="Default select example"
                                    value={codeProduct}
                                    onChange={(e) =>
                                        setCodeProduct(e.target.value)
                                    }
                                    disabled={loading}
                                >
                                    <option value="">Chọn mã sản phẩm</option>
                                    {listCodeProduct.map((code, index) => (
                                        <option key={index} value={code}>
                                            {code}
                                        </option>
                                    ))}
                                </Form.Select>
                                {loading && (
                                    <Spinner
                                        animation="border"
                                        size="sm"
                                        className="ms-2"
                                        style={{ color: "#0070f4" }}
                                    />
                                )}
                            </div>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Tên sản phẩm</Form.Label>
                            <Form.Control value={productName} type="text" />
                        </Form.Group>

                        <Form.Group className=" mb-3 form-container--child">
                            <Form.Label>Lô hàng</Form.Label>
                            <Form.Control value={batch} type="type" />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Ngày nhập</Form.Label>
                            <Form.Control value={importDate} type="text" />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Giá Nhập Cũ</Form.Label>
                            <Form.Control value={importPriceOld} type="text" />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Giá Nhập Mới</Form.Label>
                            <Form.Control
                                onChange={handlePriceChange}
                                type="number"
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Số lượng nhập</Form.Label>
                            <Form.Control
                                onChange={handleQuantityChange}
                                type="text"
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Tổng giá trị</Form.Label>
                            <Form.Control value={totalValue} type="text" />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Lý do</Form.Label>
                            <Form.Control
                                as="textarea"
                                aria-label="With textarea"
                                value={reason}
                                onChange={(e) => setReason(e.target.value)}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleSubmit}>
                        Nhập kho
                    </Button>
                    <Button variant="secondary" onClick={handleClose}>
                        Hủy
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default StockImport;
