import React, { useState } from "react";
import { Form, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import * as XLSX from "xlsx";
const FilterSideBar = (props) => {
    // State để lưu trữ giá trị của các thanh kéo (range) cho số lượng
    const {
        inventoryRange,
        setInventoryRange,
        soldRange,
        setSoldRange,
        importedRange,
        setImportedRange,
        filteredProducts,
    } = props;

    // Hàm xử lý khi thanh kéo thay đổi
    const handleInventoryRangeChange = (event) => {
        setInventoryRange(event.target.value);
    };

    const handleSoldRangeChange = (event) => {
        setSoldRange(event.target.value);
    };

    const handleImportedRangeChange = (event) => {
        setImportedRange(event.target.value);
    };

    const exportToExcel = () => {
        if (filteredProducts.length === 0) {
            alert("Không có dữ liệu để xuất!");
            return;
        }

        // Chuẩn bị dữ liệu cho Excel (loại bỏ cột hình ảnh, chỉ lấy dữ liệu văn bản)
        const dataForExcel = filteredProducts.map((product) => ({
            "Mã Sản Phẩm": product.ma_san_pham,
            "Tên Sản Phẩm": product.ten_san_pham,
            "Lô Hàng": product.lo_hang,
            "Số Lượng Nhập": product.so_luong_nhap,
            "Số Lượng Bán": product.so_luong_ban_ra,
            "Số Lượng Tồn Kho": product.so_luong_ton_kho,
        }));

        // Tạo một workbook và worksheet
        const worksheet = XLSX.utils.json_to_sheet(dataForExcel);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Danh Sách Sản Phẩm");

        // Xuất file Excel
        XLSX.writeFile(workbook, "DanhSachSanPham.xlsx");
    };

    return (
        <Card className="p-3">
            <Card.Title>Bộ lọc</Card.Title>
            <Form>
                {/* Bộ lọc theo số lượng tồn kho */}
                <h6 className="mt-4">Số lượng tồn kho: {inventoryRange}</h6>
                <Form.Range
                    min={0}
                    max={20} // Giả sử số lượng tối đa là 20 (dựa trên hình ảnh)
                    step={1}
                    value={inventoryRange}
                    onChange={handleInventoryRangeChange}
                    className="mb-3"
                />
                {/* Bộ lọc theo số lượng bán */}
                <h6 className="mt-3">Số lượng bán: {soldRange}</h6>
                <Form.Range
                    min={0}
                    max={20} // Giả sử số lượng tối đa là 20
                    step={1}
                    value={soldRange}
                    onChange={handleSoldRangeChange}
                    className="mb-3"
                />
                {/* Bộ lọc theo số lượng nhập */}
                <h6 className="mt-3">Số lượng nhập: {importedRange}</h6>
                <Form.Range
                    min={0}
                    max={20} // Giả sử số lượng tối đa là 20
                    step={1}
                    value={importedRange}
                    onChange={handleImportedRangeChange}
                    className="mb-3"
                />
                <Button onClick={exportToExcel} variant="success">
                    Xuất Excel
                </Button>
            </Form>
        </Card>
    );
};

export default FilterSideBar;
