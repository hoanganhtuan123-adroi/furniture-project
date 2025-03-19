import instance from "../config/axios.config";

export const getAllOrdersApi = async () => {
    try {
        const res = await instance.get("/dashboard/orders/all");
        if (res && res.ER === 0) {
            return res;
        }
    } catch (error) {
        console.log(error);
    }
};

export const getAllUsersApi = async () => {
    try {
        const response = await instance.get("/dashboard/orders/users/all");
        if (response && response.ER === 0) {
            return response;
        } else {
            return [];
        }
    } catch (error) {
        console.log(error);
    }
};

export const getDetailOrderApi = async (id) => {
    try {
        const res = await instance.get(`dashboard/orders/${id}/details`);
        if (res && res.ER === 0) {
            return res;
        }
    } catch (error) {
        console.log(error);
    }
};

export const updateOrderStatusApi = async (data) => {
    try {
        const res = await instance.put("dashboard/orders/update", data);
        if (res && res.ER === 0) {
            return res;
        }
    } catch (error) {
        console.log(error);
    }
};

export const createOrderApi = async (data) => {
    try {
        console.log("check data input >>> ", data);
        const res = await instance.post("dashboard/orders/create", data);
        if (res && res.ER === 0) {
            return res;
        } else {
            return [];
        }
    } catch (error) {
        console.log(error);
    }
};

export const deleteOrderApi = async (id) => {
    try {
        const res = await instance.delete(`dashboard/orders/${id}/delete`);
        if (res && res.ER === 0) {
            return res;
        } else {
            return [];
        }
    } catch (error) {
        console.log(error);
    }
};
