import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Nav from "react-bootstrap/Nav";

import FormAddDetail from "../../../Form/Dashboard/Products/FormAddDetail";
import FormAddInfor from "../../../Form/Dashboard/Products/FormAddInfor";

import { LuSave } from "react-icons/lu";
import { TbCancel } from "react-icons/tb";

import { createProductApi } from "../../../../services/apiProduct";
import { resetFormData } from "../../../../redux/actions/actionProductDS";
function ProductAddNew(props) {
    const dispatch = useDispatch();
    const { show, setShow } = props;
    const [activeKey, setActiveKey] = useState("1");
    const { detailData, inforData } = useSelector((state) => {
        return state.product;
    });
    const handleSelect = (eventKey) => {
        setActiveKey(eventKey);
    };
    const handleClose = () => {
        setShow(false);
        setActiveKey("1");
        dispatch(resetFormData());
    };

    const handleCreateProduct = async () => {
        const data = { ...inforData, ...detailData };
        const formData = new FormData();
        formData.append("ma_san_pham", data.ma_san_pham);
        formData.append("ten_san_pham", data.ten_san_pham);
        formData.append("tieu_de", data.tieu_de);
        formData.append("mo_ta_san_pham", data.mo_ta_san_pham);
        formData.append("gia_ban", data.gia_ban);
        formData.append("ten_mau", data.ten_mau);
        formData.append("ma_mau", data.ma_mau);
        formData.append("kich_thuoc", data.kich_thuoc);
        formData.append("id_danh_muc_con", data.id_danh_muc_con);
        formData.append("id_giam_gia", data.id_giam_gia);
        formData.append("so_luong_nhap", data.so_luong_nhap);
        formData.append("so_luong_ton_kho", data.so_luong_ton_kho);
        formData.append("so_luong_ban_ra", data.so_luong_ban_ra);
        formData.append("gia_nhap", data.gia_nhap);
        formData.append("ngay_nhap", data.ngay_nhap);
        formData.append("lo_hang", data.lo_hang);

        // Display the key/value pairs
        if (data.duong_dan && data.duong_dan.length > 0) {
            for (let i = 0; i < data.duong_dan.length; i++) {
                formData.append(`duong_dan[${i}]`, data.duong_dan[i]); // Gửi từng file
            }
        }

        for (var pair of formData.entries()) {
            console.log(pair[0] + ", " + pair[1]);
        }

        const response = await createProductApi(data);
        if (response && response.ER === 0) {
            toast.success(response.message);
            handleClose();
        } else {
            toast.error(response.message);
        }
    };

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header
                    className="align-items-start flex-column"
                    style={{ backgroundColor: "#0070f4", color: "#fff" }}
                >
                    <Modal.Title>Thông tin sản phẩm</Modal.Title>
                    <Nav
                        variant="underline"
                        defaultActiveKey={activeKey}
                        onSelect={handleSelect}
                        className="mt-3"
                    >
                        <Nav.Item>
                            <Nav.Link
                                className="text-decoration-none text-white"
                                eventKey="1"
                            >
                                Thông tin
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link
                                className="text-decoration-none text-white"
                                eventKey="2"
                            >
                                Mô tả chi tiết
                            </Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Modal.Header>
                <Modal.Body>
                    {activeKey === "1" ? <FormAddInfor /> : <FormAddDetail />}
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="success"
                        className="d-flex align-items-center gap-2"
                        onClick={handleCreateProduct}
                    >
                        <LuSave className="fs-4" />
                        Lưu và thêm mới
                    </Button>
                    <Button
                        variant="secondary"
                        className="d-flex align-items-center gap-2"
                        onClick={handleClose}
                    >
                        <TbCancel className="fs-4" />
                        Bỏ qua
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ProductAddNew;
