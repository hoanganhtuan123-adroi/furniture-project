import { useState } from "react";
import Header from "../components/Dashboard/Header/Header";
import OrderTable from "../components/Tables/OrderTable";
import OrderCreateModal from "../components/Modal/Dashboard/Orders/OrderCreateModal";
import CategoryList from "../components/Sidebars/CategoryList";

const OrdersAdmin = () => {
    const [show, setShow] = useState(false);
    const dropdownItems = [
        {
            label: "Thêm đơn hàng",
            onClick: () => {
                setShow(true);
            },
        },
    ];
    return (
        <>
            <div>
                <Header title="Đơn hàng" dropdownItems={dropdownItems} />
                <div className="container-fluid d-flex gap-2 ">
                    <div style={{ width: "20%" }}>
                        <CategoryList />
                    </div>
                    <OrderTable style={{ width: "80%" }} />
                </div>
            </div>
            <OrderCreateModal show={show} setShow={setShow} />
        </>
    );
};

export default OrdersAdmin;
