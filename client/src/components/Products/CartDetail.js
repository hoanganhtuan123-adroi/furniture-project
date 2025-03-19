import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Table from "react-bootstrap/Table";
import { FaTrash } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { PiSealCheckLight } from "react-icons/pi";
import { LiaShippingFastSolid } from "react-icons/lia";
import { BiSupport } from "react-icons/bi";
import { PiMedalLight } from "react-icons/pi";
import { convertVND, calculateDiscountedPrice } from "../../config/convertVND";
import { removeCartApi } from "../../services/apiUser";
import { toast } from "react-toastify";
import {
    setCartItems,
    removeItemFromCart,
} from "../../redux/actions/actionLogin.js";

const CartDetail = (props) => {
    const { listCarts, fetchCarts } = props;
    console.log("list cart ", listCarts);
    const dispatch = useDispatch();

    const calculateTotal = () => {
        return listCarts.reduce((total, item) => {
            const itemPrice = item.phan_tram_giam
                ? calculateDiscountedPrice(item.gia_ban, item.phan_tram_giam)
                : item.gia_ban;
            return total + itemPrice * item.so_luong;
        }, 0);
    };

    let totalAmount = calculateTotal();

    const handleRemoveItemFromCart = async (id_gio_hang) => {
        const response = await removeCartApi(id_gio_hang);
        if (response && response.ER === 0) {
            toast.success(response.message);
            dispatch(removeItemFromCart(id_gio_hang));
            const newListCarts = await fetchCarts(); // Giả định fetchCarts trả về danh sách mới
            if (newListCarts) {
                dispatch(setCartItems(newListCarts)); // Cập nhật lại Redux từ server
            }
        } else {
            toast.error(response.message);
        }
    };

    useEffect(() => {
        if (listCarts && listCarts.length >= 0) {
            dispatch(setCartItems(listCarts)); // Đẩy listCarts từ props lên Redux
        }
    }, [listCarts, dispatch]);
    return (
        <>
            <div
                className="container"
                style={{
                    display: "grid",
                    gridTemplateColumns: "65% 30%",
                    justifyContent: "space-between",
                }}
            >
                <Table>
                    <thead>
                        <tr className="tr--table">
                            <th
                                colSpan={4}
                                style={{
                                    backgroundColor: "#F9F1E7",
                                    fontSize: "18px",
                                    fontWeight: 500,
                                    textAlign: "center",
                                }}
                            >
                                Product
                            </th>
                            <th
                                style={{
                                    backgroundColor: "#F9F1E7",
                                    fontSize: "18px",
                                    fontWeight: 500,
                                }}
                            >
                                Price
                            </th>
                            <th
                                style={{
                                    backgroundColor: "#F9F1E7",
                                    fontSize: "18px",
                                    fontWeight: 500,
                                }}
                            >
                                Quantity
                            </th>
                            <th
                                style={{
                                    backgroundColor: "#F9F1E7",
                                    fontSize: "18px",
                                    fontWeight: 500,
                                }}
                            >
                                Subtotal
                            </th>
                        </tr>
                    </thead>
                    {listCarts.length > 0
                        ? listCarts.map((item) => {
                              return (
                                  <tbody key={item.ten_san_pham}>
                                      <tr>
                                          <td colSpan={4}>
                                              <div className="d-flex align-items-center gap-3">
                                                  <div
                                                      style={{
                                                          width: "105px",
                                                          height: "105px",
                                                      }}
                                                  >
                                                      <img
                                                          src={`http://localhost:8080/app${item.duong_dan}`}
                                                          style={{
                                                              width: "100%",
                                                              height: "100%",
                                                              objectFit:
                                                                  "cover",
                                                          }}
                                                      />
                                                  </div>
                                                  <p
                                                      style={{
                                                          color: "#9F9F9F",
                                                          padding: "8px",
                                                          width: "160px",
                                                      }}
                                                  >
                                                      {item.ten_san_pham}
                                                  </p>
                                              </div>
                                          </td>
                                          <td style={{ color: "#9F9F9F" }}>
                                              {item.phan_tram_giam
                                                  ? convertVND(
                                                        calculateDiscountedPrice(
                                                            item.gia_ban,
                                                            item.phan_tram_giam
                                                        )
                                                    )
                                                  : convertVND(item.gia_ban)}
                                          </td>
                                          <td>
                                              <span
                                                  className="d-flex align-items-center justify-content-center border rounded"
                                                  style={{
                                                      width: "35px",
                                                      height: "35px",
                                                      fontSize: "14px",
                                                  }}
                                              >
                                                  {item.so_luong}
                                              </span>
                                          </td>
                                          <td>
                                              <div className="d-flex align-items-center justify-content-between">
                                                  <span>
                                                      {item.phan_tram_giam
                                                          ? convertVND(
                                                                calculateDiscountedPrice(
                                                                    item.gia_ban,
                                                                    item.phan_tram_giam
                                                                ) *
                                                                    item.so_luong
                                                            )
                                                          : convertVND(
                                                                item.gia_ban *
                                                                    item.so_luong
                                                            )}
                                                  </span>
                                                  <FaTrash
                                                      style={{
                                                          fontSize: "24px",
                                                          cursor: "pointer",
                                                          color: "#B88E2F",
                                                      }}
                                                      onClick={() =>
                                                          handleRemoveItemFromCart(
                                                              item.id
                                                          )
                                                      }
                                                  />
                                              </div>
                                          </td>
                                      </tr>
                                  </tbody>
                              );
                          })
                        : "Chưa có sản phẩm trong giỏ hàng"}
                </Table>

                <div
                    style={{ backgroundColor: "#F9F1E7", padding: "40px 20px" }}
                >
                    <h3 className="text-center">Cart Totals</h3>
                    <div className="d-flex align-items-center gap-4 justify-content-center">
                        <span style={{ fontSize: "18px", fontWeight: 500 }}>
                            Total
                        </span>
                        <span
                            style={{
                                fontSize: "20px",
                                fontWeight: 500,
                                color: "#B88E2F",
                            }}
                        >
                            {convertVND(totalAmount)}
                        </span>
                    </div>
                    <div className="text-center mt-3">
                        <NavLink
                            className="btn border rounded border-black text-decoration-none text-black fs-5"
                            style={{ padding: "10px 20px" }}
                            to="/checkout"
                        >
                            Check Out
                        </NavLink>
                    </div>
                </div>
            </div>
            <div
                className="d-flex align-items-center justify-content-around "
                style={{
                    backgroundColor: "#F9F1E7",
                    padding: "30px 10px",
                    marginTop: "65px",
                    marginBottom: "30px",
                }}
            >
                <div className="d-flex align-items-center ">
                    <PiMedalLight style={{ fontSize: "60px" }} />
                    <div className="d-flex flex-column align-items-start justify-content-center gap-1">
                        <span
                            style={{
                                fontSize: "18px",
                                fontWeight: 500,
                                color: "#242424",
                            }}
                        >
                            High Quality
                        </span>
                        <span style={{ fontSize: "16px", color: "#898989" }}>
                            crafted from top materials
                        </span>
                    </div>
                </div>

                <div className="d-flex align-items-center ">
                    <PiSealCheckLight style={{ fontSize: "60px" }} />
                    <div className="d-flex flex-column align-items-start justify-content-center gap-1">
                        <span
                            style={{
                                fontSize: "18px",
                                fontWeight: 500,
                                color: "#242424",
                            }}
                        >
                            Warranty Protection
                        </span>
                        <span style={{ fontSize: "16px", color: "#898989" }}>
                            Over 2 years
                        </span>
                    </div>
                </div>

                <div className="d-flex align-items-center gap-2">
                    <LiaShippingFastSolid style={{ fontSize: "60px" }} />
                    <div className="d-flex flex-column align-items-start justify-content-center gap-1">
                        <span
                            style={{
                                fontSize: "18px",
                                fontWeight: 500,
                                color: "#242424",
                            }}
                        >
                            Free Shipping
                        </span>
                        <span style={{ fontSize: "16px", color: "#898989" }}>
                            Order over 150 $
                        </span>
                    </div>
                </div>

                <div className="d-flex align-items-center gap-2">
                    <BiSupport style={{ fontSize: "60px" }} />
                    <div className="d-flex flex-column align-items-start justify-content-center gap-1">
                        <span
                            style={{
                                fontSize: "18px",
                                fontWeight: 500,
                                color: "#242424",
                            }}
                        >
                            24 / 7 Support
                        </span>
                        <span style={{ fontSize: "16px", color: "#898989" }}>
                            Dedicated support
                        </span>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CartDetail;
