import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { VscGitCompare } from "react-icons/vsc";
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa6";
import { FaStar } from "react-icons/fa6";
import { convertVND, calculateDiscountedPrice } from "../../config/convertVND";
import { addToCartApi } from "../../services/apiUser";
import { toast } from "react-toastify";
const ProductDetail = (props) => {
    const { detailProduct } = props;
    const userID = useSelector((state) => state.auth.id);

    const [duongDan, setDuongDan] = useState([]);
    const [giaBan, setGiaBan] = useState("");
    const [id, setId] = useState(null);
    const [kichThuoc, setKichThuoc] = useState("");
    const [maGiamGia, setMaGiamGia] = useState("");
    const [maMau, setMaMau] = useState("");
    const [maSanPham, setMaSanPham] = useState("");
    const [phanTramGiam, setPhanTramGiam] = useState(null);
    const [soSao, setSoSao] = useState(null);
    const [tenAnh, setTenAnh] = useState("");
    const [tenDanhMucCon, setTenDanhMucCon] = useState("");
    const [tenMau, setTenMau] = useState("");
    const [tenSanPham, setTenSanPham] = useState("");
    const [tieuDe, setTieuDe] = useState("");

    const [isSelectedSize, setIsSelectedSize] = useState(false);
    const [selectedCodeColor, setSelectedCodeColor] = useState(null);
    const [isSelectedColor, setIsSelectedColor] = useState(false);

    const [quantityProduct, setQuantityProduct] = useState(1);

    const handleIncreaseQuantity = () => {
        setQuantityProduct((preQuantity) => preQuantity + 1);
    };
    const handleDecreaseQuantity = () => {
        setQuantityProduct((preQuantity) => preQuantity - 1);
    };

    const handleChooseSize = (size) => {
        setKichThuoc(size); // Cập nhật kích thước được chọn
        setIsSelectedSize(true);
    };
    const handleChooseColor = (color) => {
        setSelectedCodeColor(color);
        setIsSelectedColor(true);
    };

    const StarRating = (star) => {
        const starReview = parseInt(star);
        return (
            <div className="d-flex gap-2 align-items-center">
                {Array(starReview)
                    .fill(0)
                    .map((_, index) => (
                        <FaStar
                            key={index} // Thêm key để React quản lý danh sách
                            style={{ color: "yellow", fontSize: "25px" }}
                        />
                    ))}
            </div>
        );
    };

    const handleAddToCart = async () => {
        const data = {
            id_nguoi_dung: userID,
            id_san_pham: id,
            so_luong: quantityProduct,
        };
        const response = await addToCartApi(data);
        if (response && response.ER === 0) {
            toast.success(response.message);
        } else {
            toast.error(response.message);
        }
    };
    console.log("detail >>>", detailProduct);

    useEffect(() => {
        // Nếu detailProduct có dữ liệu, cập nhật các state
        if (detailProduct) {
            // const duong_dan_anh = JSON.parse(detailProduct.duong_dan);

            // setDuongDan(duong_dan_anh || []);
            setDuongDan(detailProduct.duong_dan.split(",") || []);

            setGiaBan(detailProduct.gia_ban || "");
            setId(detailProduct.id || null);
            setKichThuoc(detailProduct.kich_thuoc || "");
            setMaGiamGia(detailProduct.ma_giam_gia || "");
            setMaMau(detailProduct.ma_mau || "");
            setMaSanPham(detailProduct.ma_san_pham || "");
            setPhanTramGiam(detailProduct.phan_tram_giam || null);
            setSoSao(detailProduct.so_sao || null);
            setTenAnh(detailProduct.ten_anh || "");
            setTenDanhMucCon(detailProduct.ten_danh_muc_con || "");
            setTenMau(detailProduct.ten_mau || "");
            setTenSanPham(detailProduct.ten_san_pham || "");
            setTieuDe(detailProduct.tieu_de || "");
        }
    }, [detailProduct]); // Chạy lại mỗi khi detailProduct thay đổi

    return (
        <>
            <div className="d-flex align-items-start justify-content-between container py-5">
                {detailProduct ? (
                    <>
                        <div
                            className="d-flex align-items-start gap-4"
                            style={{ width: "50%" }}
                        >
                            <div
                                className="d-flex flex-column gap-3"
                                style={{ width: "20%" }}
                            >
                                {/* {console.log(
                                    "Duong dan >>>",
                                    duongDan.split(",")
                                )} */}
                                {duongDan.map((item, index) => {
                                    return (
                                        <div
                                            key={`anh - ${index}`}
                                            className="d-flex justify-content-center"
                                            style={{
                                                position: "relative",
                                                width: "100%",
                                                maxWidth: "500px",
                                                margin: "0 auto",
                                                borderRadius: "10px",
                                                overflow: "hidden",
                                            }}
                                        >
                                            <img
                                                style={{
                                                    width: "80%",
                                                    objectFit: "cover",
                                                    display: "block",
                                                }}
                                                src={`http://localhost:8080/app${item}`}
                                                alt="Sofa"
                                            />
                                            <div
                                                style={{
                                                    position: "absolute",
                                                    top: 0,
                                                    left: 0,
                                                    width: "100%",
                                                    height: "100%",
                                                    backgroundColor: "#F9F1E7", // Màu nền mới (vàng)
                                                    mixBlendMode: "multiply", // Kết hợp màu với hình ảnh
                                                    opacity: 0.8, // Độ trong suốt để điều chỉnh hiệu ứng
                                                }}
                                            />
                                        </div>
                                    );
                                })}
                            </div>
                            <div style={{ width: "60%" }}>
                                <div
                                    className="d-flex justify-content-center"
                                    style={{
                                        position: "relative",
                                        width: "100%",
                                        maxWidth: "500px",
                                        margin: "0 auto",
                                        borderRadius: "10px",
                                        overflow: "hidden",
                                        height: "358px",
                                    }}
                                >
                                    <img
                                        style={{
                                            width: "80%",
                                            height: "80%",
                                            objectFit: "cover",
                                            display: "block",
                                        }}
                                        src={`http://localhost:8080/app${duongDan[0]}`}
                                        alt="Sofa"
                                    />
                                    <div
                                        style={{
                                            position: "absolute",
                                            top: 0,
                                            left: 0,
                                            width: "100%",
                                            height: "100%",
                                            backgroundColor: "#F9F1E7", // Màu nền mới (vàng)
                                            mixBlendMode: "multiply", // Kết hợp màu với hình ảnh
                                            opacity: 0.8, // Độ trong suốt để điều chỉnh hiệu ứng
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                        <div style={{ width: "50%" }}>
                            <h3 style={{ fontSize: "42px" }}>{tenSanPham}</h3>

                            {phanTramGiam ? (
                                <div className="d-flex align-items-center gap-3">
                                    <p
                                        style={{
                                            fontSize: "20px",
                                            color: "#9F9F9F",
                                            fontWeight: 600,
                                        }}
                                    >
                                        {convertVND(
                                            calculateDiscountedPrice(
                                                giaBan,
                                                phanTramGiam
                                            )
                                        )}
                                    </p>
                                    <p
                                        style={{
                                            fontSize: "20px",
                                            color: "#9F9F9F",
                                            fontWeight: 600,
                                            textDecoration: "line-through",
                                        }}
                                    >
                                        {convertVND(giaBan)}
                                    </p>
                                </div>
                            ) : (
                                <p
                                    style={{
                                        fontSize: "20px",
                                        color: "#9F9F9F",
                                        fontWeight: 600,
                                        textDecoration: "line-through",
                                    }}
                                >
                                    {convertVND(giaBan)}
                                </p>
                            )}

                            <div className="d-flex align-items-center gap-3">
                                {soSao ? StarRating(soSao) : ""}
                                <span
                                    className="border-start border-2 px-3"
                                    style={{ color: "#9F9F9F" }}
                                >
                                    {soSao ? soSao : "No "} Customer Reviews
                                </span>
                            </div>

                            <p
                                style={{
                                    marginTop: "10px",
                                    width: "450px",
                                    textAlign: "justify",
                                    lineHeight: 1.4,
                                }}
                            >
                                {tieuDe}
                            </p>

                            <div>
                                <p
                                    style={{
                                        fontSize: "18px ",
                                        color: "#9F9F9F",
                                    }}
                                >
                                    Size
                                </p>
                                <div className="d-flex align-items-center gap-4">
                                    <span
                                        key={kichThuoc}
                                        className="d-flex align-items-center justify-content-center rounded fw-4"
                                        style={{
                                            padding: "8px 10px",
                                            backgroundColor: isSelectedSize
                                                ? "#B88E2F"
                                                : "#F9F1E7",
                                            color: isSelectedSize
                                                ? "#FFF"
                                                : "#000",
                                            cursor: "pointer",
                                        }}
                                        onClick={(e) =>
                                            handleChooseSize(
                                                e.target.textContent
                                            )
                                        }
                                    >
                                        {kichThuoc}
                                    </span>
                                </div>
                            </div>

                            <div className="mt-3">
                                <p
                                    style={{
                                        color: "#9F9F9F",
                                    }}
                                >
                                    Color
                                </p>
                                <div className="d-inline-flex align-items-center gap-3 border rounded p-2">
                                    <span
                                        style={{
                                            display: "block",
                                            width: "30px",
                                            height: "30px",
                                            borderRadius: "50%",
                                            backgroundColor: maMau,
                                            scale: isSelectedColor
                                                ? "0.8"
                                                : "1.0",
                                            border: "1px solid #000",
                                            cursor: "pointer",
                                        }}
                                        onClick={(e) =>
                                            handleChooseColor(
                                                e.target.textContent
                                            )
                                        }
                                    ></span>
                                </div>
                            </div>

                            <div className="d-flex align-items-center gap-4 mt-4">
                                <div className="px-4 py-3 border border-black rounded d-flex align-items-center gap-4">
                                    <FaMinus
                                        onClick={handleDecreaseQuantity}
                                        style={{ cursor: "pointer" }}
                                    />
                                    <span> {quantityProduct}</span>
                                    <FaPlus
                                        onClick={handleIncreaseQuantity}
                                        style={{ cursor: "pointer" }}
                                    />
                                </div>
                                <button
                                    className="btn px-4 py-3 border border-black rounded"
                                    onClick={handleAddToCart}
                                >
                                    Add To Cart
                                </button>
                                <button className="d-none align-items-center gap-3 btn px-4 py-3 border border-black rounded">
                                    <VscGitCompare />
                                    Compare
                                </button>
                            </div>

                            <div className="border-1 border-top mt-4 py-3">
                                <div
                                    className="d-flex align-items-center gap-4"
                                    style={{ color: "#9F9F9F" }}
                                >
                                    <p>SKU : </p>
                                    <p>{maSanPham}</p>
                                </div>
                                <div
                                    className="d-flex align-items-center gap-4"
                                    style={{ color: "#9F9F9F" }}
                                >
                                    <p>Category : </p>
                                    <p>{tenDanhMucCon}</p>
                                </div>
                                <div
                                    className="d-flex align-items-center gap-4"
                                    style={{ color: "#9F9F9F" }}
                                >
                                    <p>Tags : </p>
                                    <p>Sofa, Chair, Home, Shop</p>
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    "Chua co gia tri"
                )}
            </div>
        </>
    );
};

export default ProductDetail;
