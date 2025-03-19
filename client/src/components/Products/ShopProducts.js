import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import Card from "react-bootstrap/Card";
import { CiShare2 } from "react-icons/ci";
import { CiHeart } from "react-icons/ci";
import { BiDetail } from "react-icons/bi";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import "./ProductRelease.css";
import { getProductApi } from "../../services/apiProduct";
import { addToCartApi } from "../../services/apiUser.js";
import {
    convertVND,
    calculateDiscountedPrice,
} from "../../config/convertVND.js";
import { toast } from "react-toastify";
const ShopProducts = (props) => {
    const userID = useSelector((state) => state.auth.id);

    const { setQuantityProduct } = props;
    const [isHovered, setIsHovered] = useState(null);
    const [listProducts, setListProducts] = useState([]);

    const fetchListProducts = async () => {
        const response = await getProductApi();
        if (response) {
            setListProducts(response);
            setQuantityProduct(response.length);
        }
    };

    const handleAddToCart = async (id_san_pham) => {
        const data = {
            id_nguoi_dung: userID,
            id_san_pham: id_san_pham,
            so_luong: 1,
        };
        const response = await addToCartApi(data);
        if (response && response.ER === 0) {
            toast.success(response.message);
        } else {
            toast.error(response.message);
        }
    };

    useEffect(() => {
        fetchListProducts();
    }, []);
    return (
        <div className="container">
            <div>
                <Row xs={1} md={4} className="g-4 mt-4 mb-4">
                    {listProducts.map((product, index) => {
                        return (
                            <Col key={index}>
                                <Card
                                    className="border-1 bg-white position-relative card--product"
                                    onMouseEnter={() => setIsHovered(index)}
                                    onMouseLeave={() => setIsHovered(null)}
                                >
                                    <Card.Img
                                        loading="lazy"
                                        variant="top"
                                        src={
                                            product.duong_dan
                                                ? `http://localhost:8080/app${
                                                      product.duong_dan.split(
                                                          ","
                                                      )[0]
                                                  }`
                                                : ""
                                        }
                                        style={{
                                            width: "100%",
                                            height: "254px",
                                        }}
                                    />
                                    {product.phan_tram_giam !== 0 ? (
                                        <span
                                            style={{
                                                width: "35px",
                                                height: "35px",
                                                fontSize: "12px",
                                                top: "15px",
                                                right: "15px",
                                            }}
                                            className="position-absolute d-flex align-items-center justify-content-center text-white bg-danger rounded-circle"
                                        >
                                            -{product.phan_tram_giam}%
                                        </span>
                                    ) : (
                                        ""
                                    )}
                                    {isHovered === index && (
                                        <div className="hover-overlay">
                                            <button
                                                className="add-to-cart-btn"
                                                onClick={() =>
                                                    handleAddToCart(product.id)
                                                }
                                            >
                                                Add to cart
                                            </button>
                                            <div className="action-icons ">
                                                <span className="d-flex align-items-center gap-1 action-icon">
                                                    <CiShare2 />
                                                    Share
                                                </span>
                                                <NavLink
                                                    to={`/shop/${product.id}/detail`}
                                                    className="d-flex align-items-center gap-1 action-icon text-decoration-none"
                                                >
                                                    <BiDetail />
                                                    Detail
                                                </NavLink>
                                                <span className="d-flex align-items-center gap-1 action-icon">
                                                    <CiHeart />
                                                    Like
                                                </span>
                                            </div>
                                        </div>
                                    )}
                                    <Card.Body style={{ height: "200px" }}>
                                        <Card.Title
                                            style={{
                                                height: "70px",
                                                padding: "10px 0",
                                            }}
                                        >
                                            {product.ten_san_pham}
                                        </Card.Title>
                                        <Card.Text style={{ height: "30px" }}>
                                            {product.tieu_de}
                                        </Card.Text>
                                        {product.phan_tram_giam !== 0 ? (
                                            <Row md={2}>
                                                <Card.Text
                                                    style={{
                                                        fontSize: "14px",
                                                        fontWeight: "500",
                                                    }}
                                                >
                                                    {convertVND(
                                                        calculateDiscountedPrice(
                                                            product.gia_ban,
                                                            product.phan_tram_giam
                                                        )
                                                    )}
                                                </Card.Text>
                                                <Card.Text
                                                    style={{
                                                        fontSize: "12px",
                                                        height: "30px",
                                                        textDecoration:
                                                            "line-through",
                                                    }}
                                                >
                                                    {convertVND(
                                                        product.gia_ban
                                                    )}
                                                </Card.Text>
                                            </Row>
                                        ) : (
                                            <Row md={2}>
                                                <Card.Text
                                                    style={{
                                                        fontSize: "12px",
                                                        height: "30px",
                                                        textDecoration:
                                                            "line-through",
                                                    }}
                                                >
                                                    {convertVND(
                                                        product.gia_ban
                                                    )}
                                                </Card.Text>
                                            </Row>
                                        )}
                                    </Card.Body>
                                </Card>
                            </Col>
                        );
                    })}
                </Row>
            </div>
        </div>
    );
};

export default ShopProducts;
