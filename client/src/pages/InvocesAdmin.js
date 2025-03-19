import React from "react";
import Header from "../components/Dashboard/Header/Header";
import InvoiceTable from "../components/Tables/InvoiceTable";
import CategoryList from "../components/Sidebars/CategoryList";

const InvocesAdmin = () => {
    const dropdownItems = [
        {
            label: "Xuất hóa đơn",
            onClick: () => {
                console.log("Xuất hóa đơn");
            },
        },
    ];
    return (
        <>
            <div>
                <Header title="Hóa đơn" dropdownItems={dropdownItems} />
                <div className="container-fluid d-flex gap-2 ">
                    <div style={{ width: "20%" }}>
                        <CategoryList />
                    </div>
                    <InvoiceTable />
                </div>
            </div>
        </>
    );
};

export default InvocesAdmin;
