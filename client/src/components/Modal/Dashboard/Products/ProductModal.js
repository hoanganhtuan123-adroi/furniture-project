import "./ProductModal.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Card, Col, Row, Table } from "react-bootstrap";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { useState } from "react";
import ProductEdit from "./ProductEdit";
import ProductModalDelete from "./ProductDeleteModal";
function ProductModal(props) {
    const { show, setShow, productDetail } = props;

    const handleClose = () => setShow(false);

    const [showEdit, setShowEdit] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const handleOpenConfirm = () => {
        setShowConfirm(true);
        setShow(false);
    };

    const handleShowEdit = () => {
        setShowEdit(true);
        setShow(false);
    };

    const convertDate = (dateString) => {
        const date = new Date(dateString); // Chuyển đổi chuỗi ngày thành đối tượng Date
        const day = String(date.getDate()).padStart(2, "0"); // Lấy ngày và thêm 0 nếu là số đơn
        const month = String(date.getMonth() + 1).padStart(2, "0"); // Lấy tháng (thêm 1 vì tháng bắt đầu từ 0)
        const year = date.getFullYear(); // Lấy năm

        return `${day}-${month}-${year}`; // Trả về định dạng dd-mm-yyyy
    };
    console.log();

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{productDetail.ten_san_pham}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="product-details">
                        <Row>
                            <Col md={5}>
                                <Card>
                                    <Card.Img
                                        variant="top"
                                        src={
                                            productDetail.duong_dan
                                                ? `http://localhost:8080/app${
                                                      productDetail.duong_dan.split(
                                                          ","
                                                      )[0]
                                                  }`
                                                : ""
                                        }
                                        alt={productDetail.ten_anh}
                                    />
                                </Card>
                            </Col>
                            <Col md={7}>
                                <Card>
                                    <Card.Body>
                                        <Table striped bordered hover>
                                            <tbody>
                                                <tr className="custom-tr">
                                                    <td>
                                                        <strong>
                                                            Mã sản phẩm
                                                        </strong>
                                                    </td>
                                                    <td>
                                                        {
                                                            productDetail.ma_san_pham
                                                        }
                                                    </td>
                                                </tr>

                                                <tr className="custom-tr">
                                                    <td>
                                                        <strong>
                                                            Loại hàng
                                                        </strong>
                                                    </td>
                                                    <td>
                                                        {
                                                            productDetail.ten_danh_muc_con
                                                        }
                                                    </td>
                                                </tr>

                                                <tr className="custom-tr">
                                                    <td>
                                                        <strong>Mô tả</strong>
                                                    </td>
                                                    <td>
                                                        {
                                                            productDetail.mo_ta_san_pham
                                                        }
                                                    </td>
                                                </tr>

                                                <tr className="custom-tr">
                                                    <td>
                                                        <strong>Giá bán</strong>
                                                    </td>
                                                    <td>
                                                        {productDetail.ma_giam_gia
                                                            ? (
                                                                  Number(
                                                                      productDetail.gia_ban
                                                                  ) -
                                                                  (Number(
                                                                      productDetail.gia_ban
                                                                  ) *
                                                                      Number(
                                                                          productDetail.phan_tram_giam
                                                                      )) /
                                                                      100
                                                              ).toLocaleString()
                                                            : Number(
                                                                  productDetail.gia_ban
                                                              ).toLocaleString()}
                                                    </td>
                                                </tr>

                                                {productDetail.ma_giam_gia ? (
                                                    <>
                                                        <tr className="custom-tr">
                                                            <td>
                                                                <strong>
                                                                    Ngày bắt đầu
                                                                </strong>
                                                            </td>
                                                            <td>
                                                                {convertDate(
                                                                    productDetail.ngay_bat_dau
                                                                )}
                                                            </td>
                                                        </tr>
                                                        <tr className="custom-tr">
                                                            <td>
                                                                <strong>
                                                                    Ngày kết
                                                                    thúc
                                                                </strong>
                                                            </td>
                                                            <td>
                                                                {convertDate(
                                                                    productDetail.ngay_ket_thuc
                                                                )}
                                                            </td>
                                                        </tr>
                                                    </>
                                                ) : (
                                                    <></>
                                                )}

                                                <tr className="custom-tr">
                                                    <td>
                                                        <strong>
                                                            Kích thước
                                                        </strong>
                                                    </td>
                                                    <td>
                                                        {
                                                            productDetail.kich_thuoc
                                                        }
                                                    </td>
                                                </tr>

                                                <tr className="custom-tr">
                                                    <td>
                                                        <strong>Màu sắc</strong>
                                                    </td>
                                                    <td>
                                                        {`${productDetail.ten_mau} -  ${productDetail.ma_mau}`}
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </Table>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        className="d-flex gap-2 align-items-center"
                        onClick={handleShowEdit}
                    >
                        <CiEdit />
                        Chỉnh sửa
                    </Button>
                    <Button
                        variant="secondary"
                        className="d-flex gap-2 align-items-center bg-danger"
                        onClick={handleOpenConfirm}
                    >
                        <MdDelete />
                        Xóa
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Đóng
                    </Button>
                </Modal.Footer>
            </Modal>
            <ProductEdit
                show={showEdit}
                setShow={setShowEdit}
                product={productDetail}
            />
            <ProductModalDelete
                show={showConfirm}
                setShow={setShowConfirm}
                nameProduct={productDetail.ten_san_pham}
                idProduct={productDetail.id}
            />
        </>
    );
}

export default ProductModal;
