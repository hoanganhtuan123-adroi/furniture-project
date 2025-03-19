import instance from "../config/axios.config";

export const addToCartApi = async (data) => {
    try {
        const response = await instance.post("/cart/add", data);
        if (response.ER === 0) {
            return response;
        } else {
            return [];
        }
    } catch (error) {
        console.log(error);
    }
};

export const getCartApi = async (id) => {
    try {
        const response = await instance.get(`/cart/user/${id}/detail`);
        if (response.ER === 0) {
            return response;
        } else {
            return [];
        }
    } catch (error) {
        console.log(error);
    }
};

export const removeCartApi = async (id) => {
    try {
        const response = await instance.delete(`/cart/${id}/remove`);
        if (response.ER === 0) {
            return response;
        } else {
            return [];
        }
    } catch (error) {
        console.log(error);
    }
};

export const payOrderApi = async (data) => {
    try {
        console.log(data);
        const response = await instance.post("/payments/payorder", data);
        console.log(response);
        if (response.ER === 0) {
            return response;
        } else {
            return [];
        }
    } catch (error) {
        console.log(error);
    }
};

export const getOrderUser = async (id) => {
    try {
        const response = await instance.get(`/user/${id}/myorder`);
        if (response.ER === 0) {
            return response;
        } else {
            return [];
        }
    } catch (error) {
        console.log(error);
    }
};

export const payOrderATMApi = async (data) => {
    try {
        console.log(data);
        const response = await instance.post("/payments/payorderatm", data);
        console.log(response);
        if (response.ER === 0) {
            return response;
        } else {
            return [];
        }
    } catch (error) {
        console.log(error);
    }
};
