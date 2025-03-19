import React from "react";
import Card from "react-bootstrap/Card";
import ImgBG from "../../assets/imgs/img_background.svg";
import ImgDinning from "../../assets/imgs/img-dinning.svg";
import ImgLiving from "../../assets/imgs/img-living.svg";
import ImgBed from "../../assets/imgs/ing-bedroom.svg";
const Hero = () => {
    return (
        <div>
            <div style={{ width: "100%" }}>
                <img
                    loading="lazy"
                    style={{ maxWidth: "100%" }}
                    src={ImgBG}
                    alt="Anh nen"
                />
            </div>
            <div
                className="position-absolute rounded"
                style={{
                    width: "643px",
                    backgroundColor: "#FFF3E3",
                    padding: "16px",
                    zIndex: 10,
                    right: "58px",
                    top: "50%",
                }}
            >
                <p
                    style={{
                        color: "#333333",
                        fontWeight: "500",
                        marginBottom: 0,
                        letterSpacing: "2px",
                    }}
                >
                    New Arrival
                </p>
                <h2
                    style={{
                        fontSize: "52px",
                        lineHeight: "1.4",
                        color: "#B88E2F",
                    }}
                >
                    Discover Our New Collection
                </h2>
                <p
                    style={{
                        color: "#333333",
                        fontWeight: "500",
                        marginBottom: 0,
                        marginBottom: "16px",
                    }}
                >
                    Unveil the Beauty of Our New Collection
                </p>
                <button
                    className="button px-4 py-3 border-0 outline-none text-white fs-4 fw-4"
                    style={{ backgroundColor: "#B88E2F" }}
                >
                    Buy Now
                </button>
            </div>
            <div className="container pt-5 pe-5 ps-5">
                <div className="d-flex flex-column align-items-center justify-content-center ">
                    <h3 className="fw-4 ">Browse The Range</h3>
                    <p className="fs-5 fw-5">
                        Explore a variety of amazing options, perfect for all
                        your needs.
                    </p>
                </div>
                <div className="d-flex align-items-center justify-content-around mt-4">
                    <Card className="border-0" style={{ width: "18rem" }}>
                        <Card.Img
                            loading="lazy"
                            variant="top"
                            src={ImgDinning}
                            className="object-fit-cover"
                        />
                        <Card.Body className="text-center">
                            <Card.Title>Dinning</Card.Title>
                        </Card.Body>
                    </Card>
                    <Card className="border-0" style={{ width: "18rem" }}>
                        <Card.Img
                            loading="lazy"
                            variant="top"
                            src={ImgLiving}
                            className="object-fit-cover"
                        />
                        <Card.Body className="text-center">
                            <Card.Title>Living</Card.Title>
                        </Card.Body>
                    </Card>
                    <Card className="border-0" style={{ width: "18rem" }}>
                        <Card.Img
                            loading="lazy"
                            variant="top"
                            src={ImgBed}
                            className="object-fit-cover"
                        />
                        <Card.Body className="text-center">
                            <Card.Title>Bedroom</Card.Title>
                        </Card.Body>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default Hero;
