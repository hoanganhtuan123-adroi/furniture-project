import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Form from "react-bootstrap/Form";
import { FaImages } from "react-icons/fa6";
import "./FormAddNew.css";
import {
    getDiscountCodeApi,
    getSubCategoryApi,
} from "../../../../services/apiProduct";
import { updateInforData } from "../../../../redux/actions/actionProductDS";

function FormAddNew() {
    const dispatch = useDispatch();
    const inforData = useSelector((state) => state.product.inforData);
    const [nameProduct, setNameProduct] = useState(
        inforData.ten_san_pham || ""
    );
    const [titleProduct, setTitleProduct] = useState(inforData.tieu_de || "");
    const [codeProduct, setCodeProduct] = useState(inforData.ma_san_pham || "");
    const [subCategory, setSubCategory] = useState(
        inforData.id_danh_muc_con || ""
    );
    const [codeColor, setCodeColor] = useState(inforData.ma_mau || "");
    const [nameColor, setNameColor] = useState(inforData.ten_mau || "");
    const [discountCode, setDiscountCode] = useState(
        inforData.id_giam_gia || ""
    );
    const [sizeProduct, setSizeProduct] = useState(inforData.kich_thuoc || "");
    const [priceProduct, setPriceProduct] = useState(inforData.gia_ban || "");
    const [img, setImage] = useState(inforData.duong_dan || []);
    const [previewImage, setPreviewImage] = useState([]);
    const [listDiscountCode, setListDiscountCode] = useState([]);
    const [listSubCategories, setListSubCategories] = useState([]);

    // Hàm chuyển file sang Base64 dùng Promise
    const convertImageToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            if (!(file instanceof Blob)) {
                reject("Tham số truyền vào phải là file!");
                return;
            }
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = () => reject("Lỗi khi đọc file");
            reader.readAsDataURL(file);
        });
    };

    const handleUpload = async (e) => {
        if (e.target && e.target.files && e.target.files[0]) {
            const arrayURLPreview = [];
            const arrayURL = [];
            console.log("Check file : ", e.target.files);
            if (e.target.files.length > 3) {
                return toast.error("Chỉ được tải lên tối đa 3 ảnh");
            }
            for (let i = 0; i < e.target.files.length; i++) {
                const file = e.target.files[i];
                arrayURLPreview.push(URL.createObjectURL(file));
                try {
                    // arrayURL.push(
                    //     URL.createObjectURL(await convertImageToBase64(file))
                    // ); // Lưu chuỗi Base64
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

    const data = {
        ma_san_pham: codeProduct,
        ten_san_pham: nameProduct,
        tieu_de: titleProduct,
        id_danh_muc_con: subCategory,
        ten_mau: codeColor,
        ma_mau: nameColor,
        id_giam_gia: discountCode,
        kich_thuoc: sizeProduct,
        gia_ban: priceProduct,
        ten_anh: nameProduct,
        duong_dan: img,
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
        callApiDiscountCode();
        callApiSubCategories();
    }, []);

    useEffect(() => {
        dispatch(updateInforData(data));
    }, [
        nameProduct,
        titleProduct,
        codeProduct,
        subCategory,
        codeColor,
        nameColor,
        discountCode,
        sizeProduct,
        priceProduct,
        img,
    ]);

    return (
        <>
            <Form className="form-container">
                <div>
                    <Form.Group className="mb-3 form-container--child">
                        <Form.Label>Tên sản phẩm</Form.Label>
                        <Form.Control
                            value={nameProduct}
                            onChange={(e) => setNameProduct(e.target.value)}
                            type="text"
                        />
                    </Form.Group>
                    <Form.Group className="mb-3 form-container--child">
                        <Form.Label>Tiêu đề</Form.Label>
                        <Form.Control
                            value={titleProduct}
                            onChange={(e) => setTitleProduct(e.target.value)}
                            type="text"
                        />
                    </Form.Group>
                    <Form.Group className="mb-3 form-container--child">
                        <Form.Label>Mã sản phẩm</Form.Label>
                        <Form.Control
                            onChange={(e) => setCodeProduct(e.target.value)}
                            type="text"
                            value={codeProduct}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3 form-container--child">
                        <Form.Label>Danh mục con</Form.Label>
                        <Form.Select
                            aria-label="Default select example"
                            onChange={(e) => setSubCategory(e.target.value)} // Xử lý sự kiện chọn
                            value={subCategory}
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
                </div>
                <div>
                    <Form.Group className=" mb-3 form-container--child">
                        <Form.Label>Tên màu </Form.Label>
                        <Form.Control
                            onChange={(e) => setNameColor(e.target.value)}
                            type="text"
                            value={nameColor}
                        />
                    </Form.Group>
                    <Form.Group className=" mb-3 form-container--child">
                        <Form.Label>Mã màu</Form.Label>
                        <Form.Control
                            onChange={(e) => setCodeColor(e.target.value)}
                            type="text"
                            value={codeColor}
                        />
                    </Form.Group>
                    <Form.Group className=" mb-3 form-container--child">
                        <Form.Label>Giảm giá</Form.Label>
                        <Form.Select
                            aria-label="Default select example"
                            onChange={(e) => setDiscountCode(e.target.value)}
                            value={discountCode}
                        >
                            <option value="">Chọn mã giảm giá</option>
                            {listDiscountCode.map((code, index) => (
                                <option key={index} value={code.id}>
                                    {code.ma_giam_gia}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className=" mb-3 form-container--child">
                        <Form.Label>Kích thước</Form.Label>
                        <Form.Control
                            onChange={(e) => setSizeProduct(e.target.value)}
                            type="text"
                            value={sizeProduct}
                        />
                    </Form.Group>
                    <Form.Group className=" mb-3 form-container--child">
                        <Form.Label>Giá bán (VND)</Form.Label>
                        <Form.Control
                            onChange={(e) => setPriceProduct(e.target.value)}
                            type="text"
                            value={priceProduct}
                        />
                    </Form.Group>
                </div>
            </Form>
            <div>
                <Form.Group className="mb-3">
                    <Form.Label
                        htmlFor="labelUpload"
                        className="d-flex align-items-center gap-3 btn btn-success"
                    >
                        <FaImages />
                        Tải ảnh (Tối đa 3 ảnh)
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
                            return <img src={url} key={index + "img"} />;
                        })
                    ) : (
                        <span>Img Preview</span>
                    )}
                </Form.Group>
            </div>
        </>
    );
}

export default FormAddNew;
