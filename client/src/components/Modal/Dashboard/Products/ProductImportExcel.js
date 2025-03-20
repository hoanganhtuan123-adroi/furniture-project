import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import instance from "../../../../config/axios.config";
// import { importExcelProductApi } from "../../../../services/apiProduct";

const ProductImportExcel = (props) => {
    const { show, setShow } = props;

    const handleClose = () => setShow(false);

    const [excelFile, setExcelFile] = useState(null);

    const handleExcelFileUpload = (e) => setExcelFile(e.target.files[0]);

    // const handleImport = async () => {
    //     // if (!excelFile) {
    //     //     alert("Vui lòng chọn file Excel!");
    //     //     return;
    //     // }
    //     // const formData = new FormData();
    //     // formData.append("excelFile", excelFile);
    //     // try {
    //     //     const response = await importExcelProductApi(formData);
    //     //     console.log("Kết quả:", response);
    //     //     handleClose();
    //     // } catch (error) {
    //     //     console.error("Lỗi nhập sản phẩm:", error);
    //     //     alert("Lỗi khi nhập sản phẩm!");
    //     // }
    // };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Nhập sản phẩm từ file Excel</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>
                    <label>Chọn file Excel:</label>
                    <input
                        type="file"
                        accept=".xlsx, .xls"
                        onChange={handleExcelFileUpload}
                    />
                </div>
                {/* <Button
                    variant="primary"
                    onClick={handleImport}
                    className="mt-3"
                >
                    Nhập sản phẩm
                </Button> */}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Đóng
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ProductImportExcel;
