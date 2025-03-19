import React, { useState, useEffect } from "react";
import { getStockApi } from "../../services/apiStock";
import { DiDropbox } from "react-icons/di";
const StocksTable = (props) => {
    const {
        setListCodeProduct,
        importedRange,
        inventoryRange,
        soldRange,
        filteredProducts,
        setFilteredProducts,
    } = props;
    const [listProducts, setListProducts] = useState([]);
    const arrayCode = [];

    const callApiStocks = async () => {
        const response = await getStockApi();
        if (response && response.ER === 0) {
            setListProducts(response.data);
            response.data.forEach((element) => {
                arrayCode.push(element.ma_san_pham);
            });
            setListCodeProduct(arrayCode);
        } else {
            return [];
        }
    };

    useEffect(() => {
        callApiStocks();
    }, []);

    useEffect(() => {
        if (listProducts.length > 0) {
            const filtered = listProducts.filter(
                (product) =>
                    product.so_luong_nhap >= importedRange && // Lọc theo số lượng nhập
                    product.so_luong_ton_kho >= inventoryRange && // Lọc theo số lượng tồn kho
                    product.so_luong_ban_ra >= soldRange
            );
            setFilteredProducts(filtered);
        }
    }, [importedRange, inventoryRange, soldRange, listProducts]);
    return (
        <div className="bg-light-subtle" style={{ width: "80%" }}>
            <table className="table table-hover">
                <thead>
                    <tr className="">
                        <th scope="col">Mã Hàng</th>
                        <th scope="col">Tên Hàng</th>
                        <th scope="col">Lô Hàng</th>
                        <th scope="col">Số lượng nhập</th>
                        <th scope="col">Số lượng bán</th>
                        <th scope="col">Số lượng tồn kho</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredProducts.length > 0 ? (
                        filteredProducts.map((product, index) => (
                            <tr
                                key={product.ma_san_pham + index}
                                style={{ cursor: "pointer" }}
                                className="product-row"
                            >
                                <td>
                                    <img
                                        src={
                                            product.duong_dan
                                                ? `http://localhost:8080/app${
                                                      product.duong_dan.split(
                                                          ","
                                                      )[0]
                                                  }`
                                                : ""
                                        }
                                        alt={product.ten_anh}
                                        style={{
                                            width: "30px",
                                            height: "30px",
                                        }}
                                    />
                                </td>
                                <td>{product.ten_san_pham}</td>
                                <td>{product.lo_hang}</td>
                                <td>{product.so_luong_nhap}</td>
                                <td>{product.so_luong_ban_ra}</td>
                                <td>{product.so_luong_ton_kho}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" className="text-center p-5">
                                <DiDropbox size={50} />
                                <div>Chưa có sản phẩm phù hợp</div>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default StocksTable;
