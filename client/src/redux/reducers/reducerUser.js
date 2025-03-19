import { SET_CART_ITEMS, REMOVE_ITEM_FROM_CART } from "../actions/actionLogin";

const initialState = {
    cartItems: [],
};
const cartReducer = (state = initialState, action) => {
    switch (action.type) {
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

export default cartReducer;
