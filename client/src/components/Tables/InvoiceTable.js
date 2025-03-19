import { useState, useEffect } from "react";
import { getInvoiceApi } from "../../services/apiInvoice";
import InvoiceDetail from "../Modal/Dashboard/Invoices/InvoiceDetail";
const InvoiceTable = () => {
    const [show, setShow] = useState(false);
    const [invoices, setInvoices] = useState([]);
    const [invoiceDetail, setInvoiceDetail] = useState({});
    const [loading, setLoading] = useState(true);

    const handleShow = (invoice) => {
        setShow(true);
        setInvoiceDetail(invoice);
    };

    const callApiInvoice = async () => {
        try {
            const response = await getInvoiceApi();
            if (response && response.data) {
                setInvoices(response.data);
                setLoading(false);
            }
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        callApiInvoice();
    }, []);
    return (
        <>
            <div className="bg-light-subtle" style={{ width: "80%" }}>
                <table className="table table-hover">
                    <thead>
                        <tr className="">
                            <th scope="col">Mã hóa đơn</th>
                            <th scope="col">Thời gian</th>
                            <th scope="col">Tên khách hàng</th>
                            <th scope="col">Tổng tiền hàng</th>
                            <th scope="col">Khách đã trả</th>
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
                            invoices.map((invoice, index) => (
                                <tr
                                    onClick={() => {
                                        handleShow(invoice);
                                    }}
                                    key={index}
                                >
                                    <td>{invoice.ma_hoa_don}</td>
                                    <td>{invoice.ngay_thanh_toan}</td>
                                    <td>{invoice.ho_va_ten}</td>
                                    <td>{invoice.tong_gia_tri}</td>
                                    <td>{invoice.khach_da_tra}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
            <InvoiceDetail
                show={show}
                setShow={setShow}
                invoiceDetail={invoiceDetail}
            />
        </>
    );
};

export default InvoiceTable;
