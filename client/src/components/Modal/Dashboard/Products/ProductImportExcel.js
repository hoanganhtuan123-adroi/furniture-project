import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import instance from "../../../../config/axios.config";
function ProductImportExcel(props) {
    const { show, setShow } = props;

    const handleClose = () => setShow(false);

    const [excelFile, setExcelFile] = useState(null);
    const [imageFiles, setImageFiles] = useState([]);

    const handleExcelFileUpload = (e) => setExcelFile(e.target.files[0]);
    const handleImageFilesUpload = (e) =>
        setImageFiles(Array.from(e.target.files));

    const handleImport = async () => {
        if (!excelFile || imageFiles.length === 0) {
            alert("Vui lòng chọn file Excel và ít nhất một ảnh!");
            return;
        }

        const formData = new FormData();
        formData.append("excelFile", excelFile);
        imageFiles.forEach((file, index) =>
            formData.append(`images[${index}]`, file)
        );

        try {
            const response = await instance.post(
                "/api/dashboard/products/import",
                formData,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                }
            );
            alert("Nhập sản phẩm thành công!");
            console.log("Kết quả:", response.data);
        } catch (error) {
            console.error("Lỗi nhập sản phẩm:", error);
            alert("Lỗi khi nhập sản phẩm!");
        }
    };

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        Nhập sản phẩm từ file Excel kèm ảnh
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <input
                        type="file"
                        accept=".xlsx, .xls"
                        onChange={handleExcelFileUpload}
                    />
                    <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleImageFilesUpload}
                    />
                    <button onClick={handleImport}>Nhập sản phẩm</button>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ProductImportExcel;
