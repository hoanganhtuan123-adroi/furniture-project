import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { deleteProductApi } from "../../../../services/apiProduct";
import { toast } from "react-toastify";
function ProductModalDelete(props) {
    const { show, setShow, nameProduct, idProduct } = props;

    const handleClose = () => setShow(false);

    const handleDeleteProduct = async () => {
        const data = { id: idProduct };
        const response = await deleteProductApi(data);
        if (response && response.ER === 0) {
            toast.success(response.message);
        } else {
            toast.error(response.message);
        }
    };

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Xóa sản phẩm</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Hệ thống sẽ xóa hoàn toàn sản phẩm
                    <span style={{ fontWeight: "700" }}>
                        {" " + nameProduct + " "}
                    </span>
                    trên toàn bộ chi nhánh nhưng vẫn giữ thông tin hàng hóa
                    trong các giao dịch lịch sử nếu có. Bạn có chắc chắn muốn
                    xóa?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Bỏ qua
                    </Button>
                    <Button variant="primary" onClick={handleDeleteProduct}>
                        Đồng ý
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ProductModalDelete;
