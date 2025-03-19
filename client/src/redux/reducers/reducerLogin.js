import {
    LOGIN,
    LOGIN_FAILURE,
    LOGOUT,
    LOAD_USER_FROM_STORAGE,  SET_CART_ITEMS, REMOVE_ITEM_FROM_CART 
} from "../actions/actionLogin";

const initialState = {
    isAuthenticated: false,
    user: null,
    token: null,
    role: null,
    id: null,
    loading: false,
    error: null,
    cartItems: [],
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload.username,
                token: action.payload.token,
                role: action.payload.role,
                id: action.payload.id,
                loading: false,
                error: false,
            };
        case LOGIN_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case LOAD_USER_FROM_STORAGE:
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload.user,
                token: action.payload.token,
                role: action.payload.role,
                id: action.payload.id,
            };
        case LOGOUT:
            localStorage.removeItem("token"); // Xóa token khi logout
            return {
                ...state,
                isAuthenticated: false,
                user: null,
                token: null,
                role: null,
                id: null,
                cartItems: [],
            };
        case SET_CART_ITEMS:
            return {
                ...state,
                cartItems: action.payload,
            };
        case REMOVE_ITEM_FROM_CART:
            return {
                ...state,
                cartItems: state.cartItems.filter(
                    (item) => item.id !== action.payload
                ),
            };

        default:
            return state;
    }
};

export default authReducer;
