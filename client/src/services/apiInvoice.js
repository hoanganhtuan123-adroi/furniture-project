import instance from "../config/axios.config";

export const getInvoiceApi = async () => {
    try {
        const response = await instance.get("/dashboard/payments/all");
        if (response && response.ER === 0) {
            return response;
        } else {
            return [];
        }
    } catch (error) {
        console.log(error);
    }
};

export const updateInvoiceApi = async (data) => {
    try {
        const response = await instance.put("/dashboard/payments/update", data);
        if (response && response.ER === 0) {
            return response;
        } else {
            return [];
        }
    } catch (error) {
        console.log(error);
    }
};

export const deleteInvoiceApi = async (id) => {
    try {
        const response = await instance.delete(
            "/api/dashboard/payments/{id}/delete",
            id
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
