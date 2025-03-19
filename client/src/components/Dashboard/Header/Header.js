import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { IoMdAdd } from "react-icons/io";

const Header = (props) => {
    const { title, dropdownItems } = props;
    return (
        <div className="d-flex container-fluid p-2 align-items-center  justify-content-between gap-5">
            <p className="d-block fw-bold fs-3">{title}</p>

            <form className="d-flex flex-grow-1" role="search">
                <input
                    className="form-control me-2"
                    type="search"
                    placeholder="Theo mã, tên hàng"
                    aria-label="Search"
                />
                <button
                    className="btn btn-success text-white"
                    type="submit"
                    style={{ width: "140px", height: "50px" }}
                >
                    Tìm kiếm
                </button>
            </form>

            <div className="d-flex gap-2">
                <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        <IoMdAdd size={25} />
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        {dropdownItems.map((item, index) => (
                            <Dropdown.Item key={index} onClick={item.onClick}>
                                {item.label}
                            </Dropdown.Item>
                        ))}
                    </Dropdown.Menu>
                </Dropdown>
                {/* <button type="button" name="" id="" className="btn btn-success">
                    <FaFileImport />
                </button>
                <button type="button" name="" id="" className="btn btn-success">
                    <FaFileExport />
                </button> */}
            </div>
        </div>
    );
};

export default Header;
