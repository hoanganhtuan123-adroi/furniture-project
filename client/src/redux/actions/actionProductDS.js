// src/redux/productActions.js
export const UPDATE_INFOR_DATA = "UPDATE_INFOR_DATA";
export const UPDATE_DETAIL_DATA = "UPDATE_DETAIL_DATA";
export const RESET_FORM_DATA = "RESET_FORM_DATA";

// Action creators
export const updateInforData = (data) => ({
    type: UPDATE_INFOR_DATA,
    payload: data,
});

export const updateDetailData = (data) => ({
    type: UPDATE_DETAIL_DATA,
    payload: data,
});

export const resetFormData = () => ({
    type: RESET_FORM_DATA,
});
