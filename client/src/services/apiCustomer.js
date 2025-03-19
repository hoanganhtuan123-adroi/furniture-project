import instance from "../config/axios.config";

export const getAllCustomersApi = async () => {
    try {
        const response = await instance.get("/dashboard/customers/all");
        if (response && response.ER === 0) {
            return response;
        } else {
            return [];
        }
    } catch (error) {
        console.log(error);
    }
};

export const updateCustomerApi = async (data) => {
    try {
        const response = await instance.put(
            "/dashboard/customers/update",
            data
        );
        if (response && response.ER === 0) {
            return response;
        } else {
            return [];
        }
    } catch (error) {
        console.log(error);
    }
};

export const createCustomerApi = async (data) => {
    try {
        const response = await instance.post(
            "/dashboard/customers/create",
            data
        );
        if (response && response.ER === 0) {
            return response;
        } else {
            return [];
        }
    } catch (error) {
        console.log(error);
    }
};

export const deleteCustomerApi = async (id) => {
    try {
        const response = await instance.delete(
            `/dashboard/customers/${id}/delete`
        );
        if (response && response.ER === 0) {
            return response;
        } else {
            return [];
        }
    } catch (error) {
        console.log(error);
    }
};
