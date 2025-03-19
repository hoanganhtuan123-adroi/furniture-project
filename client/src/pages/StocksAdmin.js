import { useState } from "react";
import Header from "../components/Dashboard/Header/Header";
import StocksTable from "../components/Tables/StocksTable";
import StockImport from "../components/Modal/Dashboard/Stocks/StockImport";
import StockExport from "../components/Modal/Dashboard/Stocks/StockExport";
import StockTaking from "../components/Tables/StockTaking";
import FilterSideBar from "../components/Sidebars/filterKhoHang";
const StocksProduct = () => {
    const [isShowingStockTaking, setIsShowingStockTaking] = useState(false);
    const [showImport, setShowImport] = useState(false);
    const [showExport, setShowExport] = useState(false);
    const [listCodeProduct, setListCodeProduct] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const handleShowImport = () => {
        setShowImport(true);
    };

    const handleShowExport = () => {
        setShowExport(true);
    };

    const handleShowStockTaking = () => {
        setIsShowingStockTaking(true);
    };

    const dropdownItems = [
        {
            label: "Nhập Hàng",
            onClick: handleShowImport,
        },
        {
            label: "Xuất Hàng",
            onClick: handleShowExport,
        },
        {
            label: "Kiểm Kho",
            onClick: handleShowStockTaking,
        },
    ];

    const [inventoryRange, setInventoryRange] = useState(0); // Số lượng tồn kho
    const [soldRange, setSoldRange] = useState(0); // Số lượng bán
    const [importedRange, setImportedRange] = useState(0); // Số lượng nhập

    return (
        <>
            <div>
                <Header
                    title={isShowingStockTaking ? "Kiểm kho" : "Kho hàng"}
                    dropdownItems={dropdownItems}
                />
                <div className="container-fluid d-flex gap-2 ">
                    <div style={{ width: "20%" }}>
                        <FilterSideBar
                            importedRange={importedRange}
                            setImportedRange={setImportedRange}
                            inventoryRange={inventoryRange}
                            setInventoryRange={setInventoryRange}
                            soldRange={soldRange}
                            setSoldRange={setSoldRange}
                            filteredProducts={filteredProducts}
                        />
                    </div>
                    {isShowingStockTaking ? (
                        <StockTaking />
                    ) : (
                        <StocksTable
                            importedRange={importedRange}
                            inventoryRange={inventoryRange}
                            soldRange={soldRange}
                            setListCodeProduct={setListCodeProduct}
                            filteredProducts={filteredProducts}
                            setFilteredProducts={setFilteredProducts}
                        />
                    )}
                </div>
            </div>
            <StockImport
                listCodeProduct={listCodeProduct}
                show={showImport}
                setShow={setShowImport}
            />
            <StockExport
                show={showExport}
                setShow={setShowExport}
                listCodeProduct={listCodeProduct}
            />
        </>
    );
};

export default StocksProduct;
