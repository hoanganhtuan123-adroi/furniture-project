import {
    UPDATE_INFOR_DATA,
    UPDATE_DETAIL_DATA,
    RESET_FORM_DATA,
} from "../actions/actionProductDS";

const initalValue = {
    inforData: {},
    detailData: {},
};

const reducerProductDS = (state = initalValue, action) => {
    switch (action.type) {
        case UPDATE_INFOR_DATA:
            return {
                ...state,
                inforData: action.payload,
            };
        case UPDATE_DETAIL_DATA:
            return {
                ...state,
                detailData: action.payload,
            };
        case RESET_FORM_DATA:
            return {
                ...state,
                inforData: {},
                detailData: {},
            };
        default:
            return state;
    }
};

export default reducerProductDS;
