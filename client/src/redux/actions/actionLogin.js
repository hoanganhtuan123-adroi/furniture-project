import instance from "../../config/axios.config";
import { addToCartApi } from "../../services/apiUser";
import { getDetailProductApi } from "../../services/apiProduct";
// Action Types
export const LOGIN = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const LOGOUT = "LOGOUT";
export const LOAD_USER_FROM_STORAGE = "LOAD_USER_FROM_STORAGE";

export const REMOVE_ITEM_FROM_CART = "REMOVE_ITEM_FROM_CART";
export const SET_CART_ITEMS = "SET_CART_ITEMS";

export const login = (data) => ({
    type: LOGIN,
    payload: data,
});

export const loginFailure = (error) => ({
    type: LOGIN_FAILURE,
    payload: error,
});
export const logout = () => ({ type: LOGOUT });

export const removeItemFromCart = (id_gio_hang) => ({
    type: REMOVE_ITEM_FROM_CART,
    payload: id_gio_hang,
});

// Action để cập nhật danh sách giỏ hàng
export const setCartItems = (listCarts) => ({
    type: SET_CART_ITEMS,
    payload: listCarts,
});
