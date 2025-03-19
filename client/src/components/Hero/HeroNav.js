import React from "react";
import ImgHeroNav from "../../assets/imgs/HeroNav.png";
import { MdFilterList } from "react-icons/md";
const HeroNav = (props) => {
    const { header, quantityProduct } = props;
    return (
        <div>
            <div className="position-relative">
                <img
                    src={ImgHeroNav}
                    alt="Hero Nav"
                    style={{ width: "100%", objectFit: "cover" }}
                />
                <div
                    className="position-absolute text-center"
                    style={{
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                    }}
                >
                    <h3 className="fw-bold" style={{ fontSize: "40px" }}>
                        {header}
                    </h3>
                    <span className="fw-bold">Home // </span>{" "}
                    <span>{header}</span>
                </div>
            </div>

            {header === "Shop" && (
                <div
                    className="d-flex align-items-center justify-content-around p-4"
                    style={{ backgroundColor: "#F9F1E7" }}
                >
                    <div className="d-flex align-items-center gap-4">
                        <div className="d-flex align-items-center gap-2">
                            <MdFilterList />
                            Filter
                        </div>
                        <span>|</span>
                        <p style={{ margin: 0 }}>
                            Showing 1-16 of {quantityProduct} results
                        </p>
                    </div>
                    <div className="d-flex align-items-center gap-4">
                        <div className="d-flex align-items-center gap-2">
                            Show
                            <input
                                type="text"
                                className="bg-white p-2 border-0  d-block d-flex align-items-center justify-content-center"
                                style={{
                                    width: "40px",
                                    height: "40px",
                                    outline: 0,
                                }}
                            />
                        </div>
                        <div className="d-flex align-items-center gap-2">
                            Short by
                            <input
                                type="text"
                                className="bg-white p-2 border-0  d-block d-flex align-items-center justify-content-center"
                                style={{
                                    width: "200px",
                                    height: "40px",
                                    outline: 0,
                                }}
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default HeroNav;
