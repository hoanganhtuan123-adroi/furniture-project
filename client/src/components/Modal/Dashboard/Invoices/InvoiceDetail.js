import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FaEdit } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";
import Form from "react-bootstrap/Form";
import { updateInvoiceApi } from "../../../../services/apiInvoice";
import { toast } from "react-toastify";
import InvoiceConfirmDel from "./InvoiceConfirmDel";
import "./InvoiceDetail.css";
function InvoiceDetail(props) {
    const { show, setShow, invoiceDetail } = props;
    const [showConfirm, setShowConfirm] = useState(false);

    const [time, setTime] = useState("");
    const [methodPayment, setMethodPayment] = useState("");
    const [statusPayment, setStatusPayment] = useState("");

    const [isEdit, setIsEdit] = useState(false);

    const handleClose = () => {
        setShow(false);
        setIsEdit(false);
        setTime("");
        setMethodPayment("");
        setStatusPayment("");
    };
    const handleEdit = () => {
        setIsEdit(true);
    };

    const handleShowConfirm = () => {
        setShowConfirm(true);
        handleClose();
    };

    const handleSubmit = async () => {
        try {
            const data = {
                id: invoiceDetail.id,
                trang_thai_thanh_toan: statusPayment,
                phuong_thuc_thanh_toan: methodPayment,
                ngay_thanh_toan: time,
            };
            const response = await updateInvoiceApi(data);
            if (response && response.ER === 0) {
                toast.success(response.message);
                handleClose();
            } else {
                toast.warning(response.message);
            }
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header
                    style={{
                        backgroundColor: "#0070f4",
                        color: "#fff",
                        borderRadius: "0 0 10px 10px",
                    }}
                >
                    <Modal.Title>Thông tin hóa đơn</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <div>
                            <Form.Group className="mb-3">
                                <Form.Label>Mã hóa đơn</Form.Label>
                                <Form.Control
                                    readOnly
                                    type="text"
                                    value={invoiceDetail.ma_hoa_don || ""}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Thời gian</Form.Label>
                                <Form.Control
                                    className={
                                        isEdit
                                            ? "border border-2 border-success"
                                            : ""
                                    }
                                    value={
                                        isEdit
                                            ? time
                                            : invoiceDetail.ngay_thanh_toan
                                    }
                                    type="text"
                                    readOnly={!isEdit}
                                    onChange={(e) => setTime(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Mã đơn hàng</Form.Label>
                                <Form.Control
                                    value={
                                        invoiceDetail.ma_don_hang !== null
                                            ? invoiceDetail.ma_don_hang
                                            : ""
                                    }
                                    type="text"
                                    readOnly
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Khách hàng</Form.Label>
                                <Form.Control
                                    value={
                                        invoiceDetail.ho_va_ten !== null
                                            ? invoiceDetail.ho_va_ten
                                            : ""
                                    }
                                    type="text"
                                    readOnly
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Tên sản phẩm</Form.Label>
                                <Form.Control
                                    value={
                                        invoiceDetail.ten_san_pham !== null
                                            ? invoiceDetail.ten_san_pham
                                            : ""
                                    }
                                    type="text"
                                    readOnly
                                />
                            </Form.Group>
                        </div>

                        <div>
                            <Form.Group className="mb-3">
                                <Form.Label>Số lượng</Form.Label>
                                <Form.Control
                                    value={
                                        invoiceDetail.so_luong !== null
                                            ? invoiceDetail.so_luong
                                            : ""
                                    }
                                    type="number"
                                    readOnly
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Tổng giá trị</Form.Label>
                                <Form.Control
                                    value={
                                        invoiceDetail.tong_gia_tri !== null
                                            ? invoiceDetail.tong_gia_tri
                                            : ""
                                    }
                                    type="number"
                                    readOnly
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Khách đã trả</Form.Label>
                                <Form.Control
                                    value={
                                        invoiceDetail.khach_da_tra !== null
                                            ? invoiceDetail.khach_da_tra
                                            : ""
                                    }
                                    type="text"
                                    readOnly
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Phương thức thanh toán</Form.Label>
                                <Form.Control
                                    value={
                                        isEdit
                                            ? methodPayment
                                            : invoiceDetail.phuong_thuc_thanh_toan
                                    }
                                    type="text"
                                    readOnly={!isEdit}
                                    onChange={(e) =>
                                        setMethodPayment(e.target.value)
                                    }
                                    className={
                                        isEdit
                                            ? "border border-2 border-success"
                                            : ""
                                    }
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Trạng thái thanh toán</Form.Label>
                                {isEdit ? (
                                    <Form.Select
                                        className="border border-2 border-success"
                                        aria-label="Default select example"
                                        onChange={(e) => {
                                            setStatusPayment(e.target.value);
                                        }}
                                    >
                                        <option>
                                            Chọn trạng thái thanh toán
                                        </option>
                                        <option value="Chưa thanh toán">
                                            Chưa thanh toán
                                        </option>
                                        <option value="Đã thanh toán">
                                            Đã thanh toán
                                        </option>
                                    </Form.Select>
                                ) : (
                                    <Form.Control
                                        value={
                                            invoiceDetail.trang_thai_thanh_toan
                                        }
                                        type="text"
                                        readOnly={!isEdit}
                                        onChange={(e) =>
                                            setStatusPayment(e.target.value)
                                        }
                                    />
                                )}
                            </Form.Group>
                        </div>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    {isEdit ? (
                        <Button
                            variant="success"
                            className="d-flex align-items-center gap-1"
                            onClick={handleSubmit}
                        >
                            <FaEdit />
                            Cập Nhập
                        </Button>
                    ) : (
                        <Button
                            variant="success"
                            className="d-flex align-items-center gap-1"
                            onClick={handleEdit}
                        >
                            <FaEdit />
                            Sửa
                        </Button>
                    )}
                    <Button
                        variant="danger"
                        className="d-flex align-items-center gap-1"
                        onClick={handleShowConfirm}
                    >
                        <MdOutlineDelete />
                        Xóa
                    </Button>
                    <Button variant="secondary" onClick={handleClose}>
                        Đóng
                    </Button>
                </Modal.Footer>
            </Modal>
            <InvoiceConfirmDel
                show={showConfirm}
                setShow={setShowConfirm}
                codeInvoice={invoiceDetail.ma_hoa_don}
                nameCustomer={invoiceDetail.ho_va_ten}
                idInvoice={invoiceDetail.id}
            />
        </>
    );
}

export default InvoiceDetail;
