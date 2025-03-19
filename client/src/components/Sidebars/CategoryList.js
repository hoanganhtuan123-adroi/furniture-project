import React, { useState } from "react";
import { Form, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const CategoryList = () => {
    // State để lưu trữ các mục đã chọn
    const [selectedCategories, setSelectedCategories] = useState({
        phongNgu: false,
        phongAn: false,
        phongKhach: false,
    });

    // Hàm xử lý khi checkbox thay đổi
    const handleCheckboxChange = (event) => {
        const { name, checked } = event.target;
        setSelectedCategories((prevState) => ({
            ...prevState,
            [name]: checked,
        }));
    };

    return (
        <Card className="p-3">
            <Card.Title>Danh mục</Card.Title>
            <Form>
                <Form.Check
                    type="checkbox"
                    id="phongNgu"
                    name="phongNgu"
                    label="Phòng ngủ"
                    checked={selectedCategories.phongNgu}
                    onChange={handleCheckboxChange}
                    className="mb-2"
                />
                <Form.Check
                    type="checkbox"
                    id="phongAn"
                    name="phongAn"
                    label="Phòng ăn"
                    checked={selectedCategories.phongAn}
                    onChange={handleCheckboxChange}
                    className="mb-2"
                />
                <Form.Check
                    type="checkbox"
                    id="phongKhach"
                    name="phongKhach"
                    label="Phòng khách"
                    checked={selectedCategories.phongKhach}
                    onChange={handleCheckboxChange}
                    className="mb-2"
                />
            </Form>
        </Card>
    );
};

export default CategoryList;
