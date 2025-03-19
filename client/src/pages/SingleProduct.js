import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MdNavigateNext } from "react-icons/md";
import { PiLineVerticalLight } from "react-icons/pi";
import { getDetailProductApi } from "../services/apiProduct";
import { toast } from "react-toastify";
import ProductDetail from "../components/Products/ProductDetail";
const SingleProduct = () => {
    const { id } = useParams();
    console.log("CHECK ID ", id);
    const [detailProduct, setDetailProduct] = useState(null);

    const [description, setDescription] = useState("");
    const [nameProduct, setNameProduct] = useState("");
    const [img, setImg] = useState([]);
    const fetchDetailProduct = async (idInput) => {
        const response = await getDetailProductApi(idInput);

        if (response.ER === 0) {
            if (response.products && response.products.length > 0) {
                const product = response.products[0];
                setImg(product.duong_dan.split(","));
                setDetailProduct(product);
                setDescription(product.mo_ta_san_pham || "Không có mô tả");
                setNameProduct(product.ten_san_pham || "Tên sản phẩm chưa có");
            } else {
                console.log("No product data available");
            }
        } else {
            toast.error(response.message);
        }
    };

    useEffect(() => {
        console.log("Fetching data for id: ", id);
        fetchDetailProduct(id);
    }, [id]);

    return (
        <div>
            <div
                className="d-flex align-items-center gap-4 py-4 px-5"
                style={{ backgroundColor: "#F9F1E7" }}
            >
                <span style={{ color: "#9F9F9F" }}>Home</span>
                <MdNavigateNext />
                <span style={{ color: "#9F9F9F" }}>Shop</span>
                <MdNavigateNext />
                <PiLineVerticalLight />
                <span>{nameProduct}</span>
            </div>
            <ProductDetail detailProduct={detailProduct} />
            <div className="container border-1 border-top px-4">
                <p className="fw-bold fs-3 text-center">Description</p>
                <p style={{ textAlign: "justify", lineHeight: 1.4 }}>
                    {description}
                </p>
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr 1fr",
                        gap: "20px",
                    }}
                >
                    {img.map((item, index) => {
                        return (
                            <div>
                                <img
                                    style={{ width: "80%" }}
                                    key={index}
                                    src={
                                        item
                                            ? `http://localhost:8080/app${item}`
                                            : ""
                                    }
                                />
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default SingleProduct;
