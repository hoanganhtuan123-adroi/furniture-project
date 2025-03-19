import React from "react";
import { NavLink } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import logo from "../../../assets/imgs/logo-funiro.png";
import flagEnglish from "../../../assets/imgs/flagEnglish.png";
import flagVietnam from "../../../assets/imgs/flagVietnam.png";
import { RiSearchEyeLine } from "react-icons/ri";
import { FaBox, FaDropbox } from "react-icons/fa";
import { FcKindle } from "react-icons/fc";
import { FaMoneyBillWheat } from "react-icons/fa6";
import { LiaFileInvoiceSolid } from "react-icons/lia";
import { BsPeople } from "react-icons/bs";
import { FaPeopleCarry } from "react-icons/fa";
const Navigation = () => {
    const [language, setLanguage] = React.useState("");
    const handleLanguague = (e) => {
        setLanguage(e.target.value);
    };
    return (
        <>
            <div className="d-flex p-3 align-items-center justify-content-between">
                <div className="d-flex align-items-center">
                    <img className="nav__img" src={logo} />
                    <span className="ms-2 fw-bold fs-4 ">Funiro</span>
                </div>
                <div className="d-flex align-items-center gap-2">
                    <div className="d-flex gap-2 align-items-center">
                        <div
                            className=""
                            style={{ width: "25px", height: "25px" }}
                        >
                            <img
                                src={
                                    language == "vi" ? flagVietnam : flagEnglish
                                }
                                alt="flag"
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                }}
                            />
                        </div>
                        <select
                            className="form-select"
                            onChange={(e) => handleLanguague(e)}
                        >
                            <option value="en">English</option>
                            <option value="vi">Tiếng Việt</option>
                        </select>
                    </div>

                    <div>
                        <button
                            className="btn btn-primary"
                            onClick={() => console.log("Logout")}
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </div>

            <Nav
                className="align-items-center p-2"
                variant="pills"
                activeKey="1"
                style={{ backgroundColor: "#0070f4" }}
            >
                <Nav.Item>
                    <NavLink
                        to="/dashboard"
                        className="d-flex align-items-center gap-2 text-white text-decoration-none"
                    >
                        <RiSearchEyeLine />
                        Tổng quan
                    </NavLink>
                </Nav.Item>

                <NavDropdown
                    className="text-white"
                    title={
                        <span className="d-inline-flex align-items-center gap-2 text-white">
                            <FaBox />
                            Hàng hóa
                        </span>
                    }
                    id="nav-dropdown"
                >
                    <NavDropdown.Item>
                        <NavLink
                            className="d-inline-flex align-items-center text-black gap-2 text-decoration-none"
                            to={"/dashboard/products"}
                        >
                            <FcKindle /> Sản phẩm
                        </NavLink>
                    </NavDropdown.Item>

                    <NavDropdown.Item>
                        <NavLink
                            className="d-inline-flex align-items-center justify-content-between text-black gap-2 text-decoration-none"
                            to={"/dashboard/stocks"}
                        >
                            <FaDropbox />
                            Kho hàng
                        </NavLink>
                    </NavDropdown.Item>

                    <NavDropdown.Item>
                        <NavLink
                            className="d-inline-flex align-items-center justify-content-between text-black gap-2 text-decoration-none"
                            to={"/dashboard/orders"}
                        >
                            <FaPeopleCarry />
                            Đơn hàng
                        </NavLink>
                    </NavDropdown.Item>
                </NavDropdown>

                <NavDropdown
                    title={
                        <span className="d-inline-flex align-items-center gap-2 text-white">
                            <FaMoneyBillWheat />
                            Giao dịch
                        </span>
                    }
                    id="nav-dropdown"
                >
                    <NavDropdown.Item className="d-inline-flex align-items-center gap-2">
                        <NavLink
                            to="/dashboard/invoices"
                            className="d-inline-flex align-items-center justify-content-between text-black gap-2 text-decoration-none"
                        >
                            <LiaFileInvoiceSolid />
                            Hóa đơn
                        </NavLink>
                    </NavDropdown.Item>
                </NavDropdown>

                <NavDropdown
                    title={
                        <span className="d-inline-flex align-items-center gap-2 text-white">
                            Đối tác
                        </span>
                    }
                    id="nav-dropdown"
                >
                    <NavDropdown.Item>
                        <NavLink
                            to="/dashboard/customers"
                            className="d-inline-flex align-items-center gap-2 text-black text-decoration-none"
                        >
                            <BsPeople />
                            Khách hàng
                        </NavLink>
                    </NavDropdown.Item>
                </NavDropdown>
            </Nav>
        </>
    );
};

export default Navigation;
