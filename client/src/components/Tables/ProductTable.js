import { useEffect, useState } from "react";
import "./ProductTable.css";
import ProductModal from "../Modal/Dashboard/Products/ProductModal";
import { getProductApi } from "../../services/apiProduct";
const ProductTable = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);

    const handleShow = (product) => {
        setShow(true);
        setProductDetail(product);
    };
    const [productDetail, setProductDetail] = useState([]);
    const [listProducts, setListProducts] = useState([]);
    const callApiProducts = async () => {
        try {
            const response = await getProductApi();

            if (response.length > 0) {
                setListProducts(response);
            } else {
                return "Không có sản phẩm nào";
            }
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        callApiProducts();
    }, []);
    return (
        <>
            <div className="bg-light-subtle" style={{ width: "80%" }}>
                <table className="table table-hover">
                    <thead>
                        <tr className="">
                            <th scope="col">Mã Hàng</th>
                            <th scope="col">Tên Hàng</th>
                            <th scope="col">Loại Hàng</th>
                            <th scope="col">Giá Bán (VND)</th>
                            <th scope="col">Giảm giá (%)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listProducts.map((product, index) => (
                            <tr
                                key={product.ma_san_pham + index}
                                style={{ cursor: "pointer" }}
                                onClick={() => handleShow(product)}
                                className="product-row"
                            >
                                <td>
                                    {product.duong_dan &&
                                    product.duong_dan.length > 0 ? (
                                        <img
                                            // src={
                                            //     JSON.parse(product.duong_dan)[0]
                                            // } // Lấy ảnh đầu tiên
                                            src={`http://localhost:8080/app${
                                                product.duong_dan.split(",")[0]
                                            }`}
                                            alt={product.ten_anh}
                                            style={{
                                                width: "30px",
                                                height: "30px",
                                            }}
                                        />
                                    ) : (
                                        <span>Không có ảnh</span>
                                    )}
                                </td>
                                <td>{product.ten_san_pham}</td>
                                <td>{product.ten_danh_muc_con}</td>
                                <td>
                                    {product.ma_giam_gia
                                        ? (
                                              Number(product.gia_ban) -
                                              (Number(product.gia_ban) *
                                                  Number(
                                                      product.phan_tram_giam
                                                  )) /
                                                  100
                                          ).toLocaleString()
                                        : Number(
                                              product.gia_ban
                                          ).toLocaleString()}
                                </td>
                                <td>
                                    {product.ma_giam_gia
                                        ? product.phan_tram_giam
                                        : "0"}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <ProductModal
                show={show}
                setShow={setShow}
                productDetail={productDetail}
            />
        </>
    );
};

export default ProductTable;
