import { useState, useEffect } from "react";
import { takingStockApi } from "../../services/apiStock";
import { DiDropbox } from "react-icons/di";
const StockTaking = () => {
    const [listProducts, setListProducts] = useState([]);
    const callApiStocks = async () => {
        const response = await takingStockApi();
        if (response && response.ER === 0) {
            console.log(response.data);
            setListProducts(response.data);
        } else {
            return [];
        }
    };
    useEffect(() => {
        callApiStocks();
    }, []);
    return (
        <div className="bg-light-subtle" style={{ width: "80%" }}>
            <table className="table table-hover">
                <thead>
                    <tr className="">
                        <th scope="col">Loại giao dịch</th>
                        <th scope="col">Số lượng</th>
                        <th scope="col">Giá</th>
                        <th scope="col">Ngày giao dịch</th>
                        <th scope="col">Mã phiếu</th>
                        <th scope="col">Tổng giá trị</th>
                        <th scope="col">Lý do</th>
                    </tr>
                </thead>
                <tbody>
                    {listProducts.length > 0 ? (
                        listProducts.map((product, index) => (
                            <tr
                                key={product.ma_phieu + index}
                                style={{ cursor: "pointer" }}
                                className="product-row"
                            >
                                <td>{product.loai_giao_dich}</td>
                                <td>{product.so_luong}</td>
                                <td>
                                    {new Intl.NumberFormat("vi-VN", {
                                        style: "currency",
                                        currency: "VND",
                                    }).format(product.gia)}
                                </td>
                                <td>{product.ngay_giao_dich}</td>
                                <td>{product.ma_phieu}</td>
                                <td>{product.tong_gia_tri}</td>
                                <td>{product.ly_do}</td>
                            </tr>
                        ))
                    ) : (
                        <div className="p-5 mx-auto">
                            <DiDropbox size={50} />
                            Chưa có sản phẩm
                        </div>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default StockTaking;
