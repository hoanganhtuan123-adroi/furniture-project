import instance from "../config/axios.config";

export const getStockApi = async () => {
    try {
        const response = await instance.get("/dashboard/stocks/all");
        if (response && response.ER === 0) {
            return response;
        } else {
            return [];
        }
    } catch (error) {
        console.log(error);
    }
};

export const getProductByCodeApi = async (data) => {
    try {
        console.log("code input >>", data);
        const response = await instance.get(
            `/dashboard/stocks/${data}/products`
        );
        console.log(response);
        if (response && response.ER === 0) {
            return response;
        } else {
            return [];
        }
    } catch (error) {
        console.log(error);
    }
};

export const importStockApi = async (data) => {
    try {
        const response = await instance.post(
            "/dashboard/stocks/importstock",
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

export const exportStockApi = async (data) => {
    try {
        const response = await instance.post(
            "/dashboard/stocks/exportstock",
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

export const takingStockApi = async () => {
    try {
        const response = await instance.get("/dashboard/stocks/takingstock");
        if (response && response.ER === 0) {
            return response;
        } else {
            return [];
        }
    } catch (error) {
        console.log(error);
    }
};
