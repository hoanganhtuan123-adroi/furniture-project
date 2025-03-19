import { useState, useEffect } from "react";
import { FaImages } from "react-icons/fa6";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import "./ProductModal.css";
import {
    updateProductApi,
    getDiscountCodeApi,
    getSubCategoryApi,
} from "../../../../services/apiProduct";
function ProductEdit(props) {
    const [nameProduct, setNameProduct] = useState("");
    const [codeProduct, setCodeProduct] = useState("");
    const [titleProduct, setTitleProduct] = useState("");
    const [descriptionProduct, setDescriptionProduct] = useState("");
    const [priceProduct, setPriceProduct] = useState("");
    const [colorName, setColorName] = useState("");
    const [colorCode, setColorCode] = useState("");
    const [sizeProduct, setSizeProduct] = useState("");
    const [subCategory, setSubCategory] = useState(0);
    const [discountCode, setDiscountCode] = useState(0);
    const [listDiscountCode, setListDiscountCode] = useState([]);
    const [listSubCategories, setListSubCategories] = useState([]);
    const [previewImage, setPreviewImage] = useState([]);
    const [img, setImage] = useState([]);
    const { show, setShow, product } = props;
    console.log("Product >>> ", product);

    const handleClose = () => {
        setShow(false);
        setPreviewImage([]);
    };

    const handleUpload = async (e) => {
        if (e.target && e.target.files && e.target.files[0]) {
            const arrayURLPreview = [];
            const arrayURL = [];

            if (e.target.files.length > 3) {
                return toast.error("Chỉ được tải lên tối đa 3 ảnh");
            }
            for (let i = 0; i < e.target.files.length; i++) {
                const file = e.target.files[i];
                arrayURLPreview.push(URL.createObjectURL(file));
                try {
                    arrayURL.push(file); // Lưu chuỗi Base64
                } catch (error) {
                    console.error("Lỗi khi chuyển file sang Base64:", error);
                    return toast.error("Có lỗi khi xử lý ảnh");
                }
            }
            setPreviewImage(arrayURLPreview);

            setImage(arrayURL);
        }
    };

    const handleResetForm = () => {
        setNameProduct("");
        setCodeProduct("");
        setDescriptionProduct("");
        setPriceProduct("");
        setColorName("");
        setColorCode("");
        setSizeProduct("");
    };

    const handleUpdateProduct = async () => {
        /*
        const data = {
            id: product.id,
            ten_san_pham: nameProduct,
            tieu_de: titleProduct,
            ma_san_pham: codeProduct,
            mo_ta_san_pham: descriptionProduct,
            gia_ban: priceProduct,
            ten_mau: colorName,
            ma_mau: colorCode,
            kich_thuoc: sizeProduct,
            id_danh_muc_con: subCategory,
            id_giam_gia: discountCode,
            ten_anh: nameProduct,
            duong_dan: img,
        }; */

        const formData = new FormData();
        formData.append("id", product.id);
        formData.append("ten_san_pham", nameProduct);
        formData.append("tieu_de", titleProduct);
        formData.append("ma_san_pham", codeProduct);
        formData.append("mo_ta_san_pham", descriptionProduct);
        formData.append("gia_ban", priceProduct);
        formData.append("ten_mau", colorName);
        formData.append("ma_mau", colorCode);
        formData.append("kich_thuoc", sizeProduct);
        formData.append("id_danh_muc_con", subCategory);
        formData.append("id_giam_gia", discountCode);
        formData.append("ten_anh", nameProduct);
        console.log("CHECM IMG ", img);
        for (let i = 0; i < img.length; i++) {
            formData.append(`duong_dan[${i}]`, img[i]);
        }
        for (var pair of formData.entries()) {
            console.log(pair[0] + ", " + pair[1]);
        }
        try {
            const response = await updateProductApi(formData);
            if (response.ER === 0) {
                toast.success(response.message);
                handleResetForm();
                handleClose();
            } else {
                toast.error(response.message);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const callApiDiscountCode = async () => {
        try {
            const response = await getDiscountCodeApi();
            if (response.ER === 0) {
                setListDiscountCode(response.discountCodes);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const callApiSubCategories = async () => {
        try {
            const response = await getSubCategoryApi();
            if (response.ER === 0) {
                setListSubCategories(response.subCategories);
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (product) {
            setNameProduct(product.ten_san_pham || product.name || "");
            setCodeProduct(product.ma_san_pham || product.id || "");
            setTitleProduct(product.tieu_de || product.title || "");
            setDescriptionProduct(
                product.mo_ta_san_pham || product.description || ""
            );
            setPriceProduct(product.gia_ban || product.price || "");
            setColorName(product.ten_mau || product.colorName || "");
            setColorCode(product.ma_mau || product.colorCode || "");
            setSizeProduct(product.kich_thuoc || product.size || "");
            setSubCategory(product.id_danh_muc_con || product.subCategory || 0);
            setPreviewImage(product.previewImage || []);
            setImage(product.img || []);
        }
    }, [product]);

    useEffect(() => {
        callApiDiscountCode();
        callApiSubCategories();
    }, []);
    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{product.ten_san_pham}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Tên sản phẩm</Form.Label>
                            <Form.Control
                                type="text"
                                // placeholder={product.ten_san_pham}
                                value={nameProduct}
                                onChange={(e) => setNameProduct(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Tiêu đề</Form.Label>
                            <Form.Control
                                type="text"
                                // placeholder={product.tieu_de}
                                value={titleProduct}
                                onChange={(e) =>
                                    setTitleProduct(e.target.value)
                                }
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Mã sản phẩm</Form.Label>
                            <Form.Control
                                type="text"
                                // placeholder={product.ma_san_pham}
                                value={codeProduct}
                                onChange={(e) => setCodeProduct(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Mô tả sản phẩm</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                // placeholder={product.mo_ta_san_pham}
                                value={descriptionProduct}
                                onChange={(e) =>
                                    setDescriptionProduct(e.target.value)
                                }
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Giá bán</Form.Label>
                            <Form.Control
                                type="text"
                                // placeholder={product.gia_ban}
                                value={priceProduct}
                                onChange={(e) =>
                                    setPriceProduct(e.target.value)
                                }
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Tên màu</Form.Label>
                            <Form.Control
                                type="text"
                                // placeholder={product.ten_mau}
                                value={colorName}
                                onChange={(e) => setColorName(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Mã màu</Form.Label>
                            <Form.Control
                                type="text"
                                // placeholder={product.ma_mau}
                                value={colorCode}
                                onChange={(e) => setColorCode(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Kích thước</Form.Label>
                            <Form.Control
                                type="text"
                                // placeholder={product.kich_thuoc}
                                value={sizeProduct}
                                onChange={(e) => setSizeProduct(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Danh mục con</Form.Label>
                            <Form.Select
                                aria-label="Default select example"
                                onChange={(e) => setSubCategory(e.target.value)} // Xử lý sự kiện chọn
                            >
                                <option value="">Chọn danh mục con</option>{" "}
                                {listSubCategories.map((code, index) => {
                                    return (
                                        <option key={index} value={code.id}>
                                            {code.ten_danh_muc_con}
                                        </option>
                                    );
                                })}
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Mã giảm giá</Form.Label>
                            <Form.Select
                                aria-label="Default select example"
                                onChange={(e) =>
                                    setDiscountCode(e.target.value)
                                }
                            >
                                <option value="">Chọn mã giảm giá</option>
                                {listDiscountCode.map((code, index) => (
                                    <option key={index} value={code.id}>
                                        {code.ma_giam_gia}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                    </Form>
                    <div>
                        <Form.Group className="mb-3">
                            <Form.Label
                                htmlFor="labelUpload"
                                className="d-flex align-items-center gap-3 btn btn-success"
                            >
                                <FaImages />
                                Tải ảnh
                            </Form.Label>
                            <Form.Control
                                type="file"
                                id="labelUpload"
                                hidden
                                multiple
                                onChange={(e) => handleUpload(e)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3 img-preview">
                            {previewImage.length > 0 ? (
                                previewImage.map((url, index) => {
                                    return (
                                        <img src={url} key={index + "img"} />
                                    );
                                })
                            ) : (
                                <span>Img Preview</span>
                            )}
                        </Form.Group>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Đóng
                    </Button>
                    <Button variant="primary" onClick={handleUpdateProduct}>
                        Cập nhập
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ProductEdit;
