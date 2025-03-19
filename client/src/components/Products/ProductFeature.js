import React, { useState } from "react";
import { Carousel } from "react-bootstrap";
import "./ProductRelease.css";
import ImgDining from "../../assets/imgs/slide_dining_room.jpg";
import ImgLiving from "../../assets/imgs/slide_living_room.jpg";
import ImgBedroom from "../../assets/imgs/slide_bed_room.jpg";
import { Container, Row, Col } from "react-bootstrap";
const ProductFeature = () => {
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex);
    };

    const images = [
        "https://hips.hearstapps.com/hmg-prod/images/design-by-emily-henderson-design-photographer-by-tessa-neustadt-356-66d9f0e8dfc9b.jpg?crop=0.9586056644880173xw:1xh;center,top&resize=980:*", // Shelf with items
        "https://hips.hearstapps.com/hmg-prod/images/dana-schwartz-design-66f475d9d625e.jpg?crop=0.835xw:1.00xh;0.0918xw,0&resize=980:*", // Desk with laptop
        "https://hips.hearstapps.com/hmg-prod/images/seasons-4-design-66f336ca7d379.jpg?crop=1xw:1xh;center,top&resize=980:*", // Dining room
        "https://hips.hearstapps.com/hmg-prod/images/jefferson-street-design-66f338a692cb9.jpg?crop=0.9335511982570807xw:1xh;center,top&resize=980:*", // Bedroom
        "https://hips.hearstapps.com/hmg-prod/images/ig-photo-for-reel-1-1638x2048-66f33c3460f74.jpg?crop=0.835xw:1.00xh;0.165xw,0&resize=980:*", // Brick wall room
        "https://hips.hearstapps.com/hmg-prod/images/amyzeehaightinteriors-sonyasellersphoto01-66f337d6ddedc.jpg?crop=1xw:1xh;center,top&resize=980:*", // Flowers
        "https://hips.hearstapps.com/hmg-prod/images/emily-vaughan-dining-room-66f4764d41e6b.jpg?crop=1xw:1xh;center,top&resize=980:*", // Stools
        "https://hips.hearstapps.com/hmg-prod/images/ghk030124homeminifeature-004-4-66f337203c5dd.jpg?crop=0.765xw:1.00xh;0.114xw,0&resize=980:*",
    ];

    return (
        <>
            <div
                className="container p-5 product--feature align-items-center"
                style={{ backgroundColor: "#FCF8F3" }}
            >
                <div className="text-start mb-5">
                    <h3 className="fw-bold fs-3 text-dark">
                        50+ Beautiful rooms inspiration
                    </h3>
                    <p style={{ color: "#616161" }}>
                        Our design already made a lot of beautiful prototypes of
                        rooms that inspire you
                    </p>
                    <button
                        className="text-white px-4 py-3 border-0 fw-bold rounded-pill"
                        style={{
                            backgroundColor: "#B88E2F",
                            transition: "background-color 0.3s",
                        }}
                        onMouseEnter={(e) =>
                            (e.target.style.backgroundColor = "#9F7A26")
                        }
                        onMouseLeave={(e) =>
                            (e.target.style.backgroundColor = "#B88E2F")
                        }
                    >
                        Explore More
                    </button>
                </div>
                <div className="slider-container">
                    <Carousel
                        interval={3000} // Tự động chuyển slide sau 3 giây
                        indicators={true}
                        controls={true}
                        fade={true} // Hiệu ứng fade mượt mà
                    >
                        {/* Slide 1: Bedroom */}
                        <Carousel.Item>
                            <img
                                className="d-block w-100 rounded"
                                src={ImgBedroom}
                                alt="Dining Room"
                                style={{
                                    objectFit: "cover",
                                    height: "400px",
                                }}
                            />
                            <Carousel.Caption
                                className="bg-dark bg-opacity-50 rounded p-3"
                                style={{
                                    bottom: "20%",
                                    left: "10%",
                                    right: "10%",
                                }}
                            >
                                <h3 className="fw-bold text-white">Bed Room</h3>
                                <p className="text-white">Inner Peace</p>
                                <button
                                    className="btn btn-outline-light fw-bold rounded-pill"
                                    style={{
                                        borderColor: "#B88E2F",
                                        color: "#B88E2F",
                                    }}
                                >
                                    →
                                </button>
                            </Carousel.Caption>
                        </Carousel.Item>

                        {/* Slide 2: Dining Room */}
                        <Carousel.Item>
                            <img
                                className="d-block w-100 rounded"
                                src={ImgDining}
                                alt="Dining Room"
                                style={{
                                    objectFit: "cover",
                                    height: "400px",
                                }}
                            />
                            <Carousel.Caption
                                className="bg-dark bg-opacity-50 rounded p-3"
                                style={{
                                    bottom: "20%",
                                    left: "10%",
                                    right: "10%",
                                }}
                            >
                                <h3 className="fw-bold text-white">
                                    Dining Room
                                </h3>
                                <p className="text-white">Inner Peace</p>
                                <button
                                    className="btn btn-outline-light fw-bold rounded-pill"
                                    style={{
                                        borderColor: "#B88E2F",
                                        color: "#B88E2F",
                                    }}
                                >
                                    →
                                </button>
                            </Carousel.Caption>
                        </Carousel.Item>

                        {/* Slide 3: Living Room (Thêm ví dụ) */}
                        <Carousel.Item>
                            <img
                                className="d-block w-100 rounded"
                                src={ImgLiving}
                                alt="Living Room"
                                style={{
                                    objectFit: "cover",
                                    height: "400px",
                                }}
                            />
                            <Carousel.Caption
                                className="bg-dark bg-opacity-50 rounded p-3"
                                style={{
                                    bottom: "20%",
                                    left: "10%",
                                    right: "10%",
                                }}
                            >
                                <h3 className="fw-bold text-white">
                                    Living Room
                                </h3>
                                <p className="text-white">Inner Peace</p>
                                <button
                                    className="btn btn-outline-light fw-bold rounded-pill"
                                    style={{
                                        borderColor: "#B88E2F",
                                        color: "#B88E2F",
                                    }}
                                >
                                    →
                                </button>
                            </Carousel.Caption>
                        </Carousel.Item>
                    </Carousel>
                </div>
            </div>
            <div className="container p-5">
                <div className="text-center">
                    <span style={{ color: "#616161" }}>
                        Share your setup with
                    </span>
                    <h3 className="fw-bold mt-2">#FuniroFurniture</h3>
                </div>
                <Container className="image-grid-container py-5">
                    <Row className="g-3">
                        {/* Hàng 1 */}
                        <Col xs={12} className="d-flex justify-content-center">
                            <Row className="w-100">
                                <Col xs={2}>
                                    <img
                                        src={images[0]}
                                        alt="Shelf"
                                        className="img-fluid rounded"
                                        style={{
                                            height: "400px",
                                            objectFit: "cover",
                                        }}
                                    />
                                </Col>
                                <Col xs={4}>
                                    <img
                                        src={images[1]}
                                        alt="Desk"
                                        className="img-fluid rounded"
                                        style={{
                                            height: "300px",
                                            objectFit: "cover",
                                        }}
                                    />
                                </Col>
                                <Col xs={4}>
                                    <img
                                        src={images[2]}
                                        alt="Dining Room"
                                        className="img-fluid rounded"
                                        style={{
                                            height: "300px",
                                            objectFit: "cover",
                                        }}
                                    />
                                </Col>
                                <Col
                                    xs={2}
                                    className="d-flex flex-column justify-content-between"
                                >
                                    <img
                                        src={images[3]}
                                        alt="Bedroom"
                                        className="img-fluid rounded mb-2"
                                        style={{
                                            height: "190px",
                                            objectFit: "cover",
                                        }}
                                    />
                                    <img
                                        src={images[4]}
                                        alt="Brick Wall Room"
                                        className="img-fluid rounded"
                                        style={{
                                            height: "190px",
                                            objectFit: "cover",
                                        }}
                                    />
                                </Col>
                            </Row>
                        </Col>

                        {/* Hàng 2 */}
                        <Col xs={12} className="d-flex justify-content-center">
                            <Row className="w-100">
                                <Col xs={2}>
                                    <img
                                        src={images[5]}
                                        alt="Chair"
                                        className="img-fluid rounded"
                                        style={{
                                            height: "200px",
                                            objectFit: "cover",
                                        }}
                                    />
                                </Col>
                                <Col xs={2}>
                                    <img
                                        src={images[6]}
                                        alt="Flowers"
                                        className="img-fluid rounded"
                                        style={{
                                            height: "200px",
                                            objectFit: "cover",
                                        }}
                                    />
                                </Col>
                                <Col xs={4}>
                                    <img
                                        src={images[7]}
                                        alt="Dining Table"
                                        className="img-fluid rounded"
                                        style={{
                                            height: "200px",
                                            objectFit: "cover",
                                        }}
                                    />
                                </Col>
                                <Col xs={4}></Col> {/* Khoảng trống */}
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    );
};

export default ProductFeature;
