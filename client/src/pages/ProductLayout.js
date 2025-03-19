import { React, useState } from "react";
import CategoryList from "../components/Sidebars/CategoryList";
import ProductTable from "../components/Tables/ProductTable";
import ProductAddNew from "../components/Modal/Dashboard/Products/ProductAddNew";
import Header from "../components/Dashboard/Header/Header";
import ProductImportExcel from "../components/Modal/Dashboard/Products/ProductImportExcel";
const ProductManagement = () => {
    const [show, setShow] = useState(false);
    const [showExcel, setShowExcel] = useState(false);
    const handleShow = () => {
        setShow(true);
    };

    const handleShowExcel = () => {
        setShowExcel(true);
    };

    const dropdownItems = [
        {
            label: "Thêm sản phẩm",
            onClick: handleShow,
        },
        {
            label: "Tải file excel",
            onClick: handleShowExcel,
        },
    ];
    return (
        <>
            <div className="mt-2">
                <Header
                    title="Hàng hóa"
                    handleShow={handleShow}
                    dropdownItems={dropdownItems}
                />

                <div className="container-fluid d-flex gap-2 ">
                    <div style={{ width: "30%" }}>
                        <CategoryList />
                    </div>
                    <ProductTable />
                </div>
            </div>
            <ProductAddNew show={show} setShow={setShow} />
            <ProductImportExcel show={showExcel} setShow={setShowExcel} />
        </>
    );
};

export default ProductManagement;
