import { useState, useEffect } from "react";
import { getAllCustomersApi } from "../../services/apiCustomer";
import CustomerDetailModal from "../Modal/Dashboard/Customers/CustomerDetailModal";
const CustomerTable = (props) => {
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const [listCustomers, setListCustomers] = useState([]);
    const [detailCustomer, setDetailCustomer] = useState({});

    const callApiCustomer = async () => {
        const response = await getAllCustomersApi();
        setListCustomers(response.data);
    };

    const handleShow = (customer) => {
        setShow(true);
        setDetailCustomer(customer);
    };
    useEffect(() => {
        callApiCustomer();
    }, []);
    return (
        <>
            <div className="bg-light-subtle" style={{ width: "80%" }}>
                <table className="table table-hover">
                    <thead>
                        <tr className="">
                            <th scope="col">Khách hàng</th>
                            <th scope="col">Số điện thoại</th>
                            <th scope="col">Ngày sinh</th>
                            <th scope="col">Địa chỉ</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan="5" className="text-center">
                                    Loading...
                                </td>
                            </tr>
                        ) : (
                            listCustomers.map((customer, index) => (
                                <tr
                                    onClick={() => handleShow(customer)}
                                    key={customer + index}
                                >
                                    <td>{customer.ho_va_ten}</td>
                                    <td>{customer.so_dien_thoai}</td>
                                    <td>{customer.ngay_sinh}</td>
                                    <td>{customer.dia_chi}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
            <CustomerDetailModal
                show={show}
                setShow={setShow}
                detailCustomer={detailCustomer}
                callApiCustomer={callApiCustomer}
            />
        </>
    );
};

export default CustomerTable;
