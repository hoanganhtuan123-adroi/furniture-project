import { useState } from "react";
import Header from "../components/Dashboard/Header/Header";
import CustomerTable from "../components/Tables/CustomerTable";
import CustomerAddNewModel from "../components/Modal/Dashboard/Customers/CustomerAddNewModel";
import CategoryList from "../components/Sidebars/CategoryList";
const CustomerAdmin = () => {
    const [show, setShow] = useState(false);
    const dropdownItems = [
        {
            label: "Thêm khách hàng",
            onClick: () => {
                setShow(true);
            },
        },
    ];

    return (
        <>
            <div>
                <Header title="Khách hàng" dropdownItems={dropdownItems} />
                <div className="container-fluid d-flex gap-2 ">
                    <div style={{ width: "20%" }}>
                        <CategoryList />
                    </div>
                    <div style={{ width: "80%" }}>
                        <CustomerTable />
                    </div>
                </div>
            </div>
            <CustomerAddNewModel show={show} setShow={setShow} />
        </>
    );
};

export default CustomerAdmin;
