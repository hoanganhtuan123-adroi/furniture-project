import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import {
    getProductByCodeApi,
    exportStockApi,
} from "../../../../services/apiStock";
import { toast } from "react-toastify";
import Spinner from "react-bootstrap/Spinner";
import { normalizeProductCode } from "../../../../config/convertVND";
function StockExport(props) {
    const { show, setShow, listCodeProduct } = props;
    const [totalValue, setTotalValue] = useState(0);
    const [codeProduct, setCodeProduct] = useState("");
    const [productName, setProductName] = useState("");
    const [exportDate, setExportDate] = useState("");
    const [price, setPrice] = useState(0);
    const [exportQuantity, setExportQuantity] = useState(0);
    const [reason, setReason] = useState("");
    const [loading, setLoading] = useState(false);
    const [idProduct, setIdProduct] = useState("");
    const handleClose = () => setShow(false);

    const callApiProduct = async () => {
        if (codeProduct == "") return;
        try {
            const newCodeProduct = normalizeProductCode(codeProduct);
            const response = await getProductByCodeApi(newCodeProduct);
            if (response && response.ER === 0 && response.data) {
                setIdProduct(response.data.id_san_pham);
                setProductName(response.data.ten_san_pham);
                setPrice(response.data.gia_ban);
                setIdProduct(response.data.id_san_pham);
                setExportDate(
                    new Date(Date.now())
                        .toISOString()
                        .slice(0, 10)
                        .replace("T", " ")
                );
            } else {
                toast.error(response.message);
            }
        } catch (error) {
            console.error("Lỗi khi gọi API sản phẩm:", error);
            toast.error("Không thể lấy thông tin sản phẩm");
            setCodeProduct("");
        }
    };

    const handleQuantityChange = (e) => {
        const quantity = e.target.value;
        setExportQuantity(quantity);
        setTotalValue(quantity * price); // Update total value
    };

    const handlePriceChange = (e) => {
        const price = e.target.value;
        setPrice(price);
        setTotalValue(exportQuantity * price); // Update total value
    };

    const validateForm = () => {
        if (codeProduct === "") {
            toast.error("Chưa chọn mã sản phẩm");
            return false;
        }
        if (exportQuantity === 0) {
            toast.error("Số lượng xuất phải lớn hơn 0");
            return false;
        }
        if (reason === "") {
            toast.error("Chưa nhập lý do");
            return false;
        }
        return true;
    };

    const handleSubmitExport = async () => {
        try {
            if (!validateForm()) return;
            const data = {
                id_san_pham: idProduct,
                so_luong: exportQuantity,
                ngay_giao_dich: exportDate,
                gia_ban: price,
                ly_do: reason,
                tong_gia_tri: totalValue,
            };

            const response = await exportStockApi(data);
            if (response && response.ER === 0) {
                toast.success("Xuất kho thành công");
                handleClose();
            } else {
                toast.error(response.message);
            }
        } catch (error) {
            console.error("Lỗi khi gọi API xuất kho:", error);
            toast.error("Không thể xuất kho");
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
                    <Modal.Title>Xuất kho</Modal.Title>
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

                        <Form.Group className="mb-3">
                            <Form.Label>Giá Bán</Form.Label>
                            <Form.Control
                                onChange={handlePriceChange}
                                type="number"
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Ngày xuất</Form.Label>
                            <Form.Control value={exportDate} type="text" />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Số lượng xuất</Form.Label>
                            <Form.Control
                                onChange={handleQuantityChange}
                                type="number"
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Tổng giá trị</Form.Label>
                            <Form.Control value={totalValue} type="number" />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Lý do</Form.Label>
                            <Form.Control
                                as="textarea"
                                aria-label="With textarea"
                                onChange={(e) => setReason(e.target.value)}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleSubmitExport}>
                        Xuất kho
                    </Button>
                    <Button variant="danger" onClick={handleClose}>
                        Hủy
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default StockExport;
