import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { deleteInvoiceApi } from "../../../../services/apiInvoice";
import { toast } from "react-toastify";
function InvoiceConfirmDel(props) {
    const { show, setShow, codeInvoice, nameCustomer, idInvoice } = props;

    const handleClose = () => setShow(false);
    const handleDelete = async () => {
        const response = await deleteInvoiceApi(idInvoice);
        if (response && response.ER === 0) {
            toast.success(response.message);
            setShow(false);
        } else {
            toast.error(response.message);
        }
    };
    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Xác nhận xóa {idInvoice}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>
                        {" "}
                        Xác nhận xóa hóa đơn <b>{codeInvoice}</b> của khách hàng
                        : <b>{nameCustomer}</b>.
                    </p>
                    *Lưu ý : Hóa đơn đã xóa không thể khôi phục.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="success" onClick={handleDelete}>
                        Xác nhận xóa
                    </Button>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default InvoiceConfirmDel;
