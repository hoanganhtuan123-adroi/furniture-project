import instance from "../config/axios.config";

export const getProductApi = async () => {
    try {
        const response = await instance.get("/dashboard/products/all");
        if (response && response.ER === 0 && response.products) {
            return response.products;
        } else {
            return [];
        }
    } catch (error) {
        console.error(error);
    }
};
// Chưa fix được
export const updateProductApi = async (data) => {
    try {
        console.log("Check Dta inpit >>> ", data);
        const response = await instance.put(
            "/dashboard/products/update",
            data,
            {
                headers: {
                    "Content-Type": "multipart/form-data", // Đảm bảo header đúng cho FormData
                },
            }
        );
        console.log(response);
        return response;
    } catch (error) {
        console.log(error);
    }
};

export const getDiscountCodeApi = async () => {
    try {
        const response = await instance.get("/dashboard/products/discounts");
        return response;
    } catch (error) {
        console.log(error);
    }
};

export const getSubCategoryApi = async () => {
    try {
        const response = await instance.get(
            "/dashboard/products/subcategories"
        );
        return response;
    } catch (error) {
        console.log(error);
    }
};

export const deleteProductApi = async (data) => {
    try {
        console.log("check id product >>> ", data);
        const response = await instance.delete(
            "/dashboard/products/delete",
            data
        );
        return response;
    } catch (error) {
        console.log(error);
    }
};

export const createProductApi = async (data) => {
    try {
        console.log("check data input : ", data);
        const response = await instance.post("/dashboard/products", data, {
            headers: {
                "Content-Type": "multipart/form-data", // Đảm bảo header đúng cho FormData
            },
        });
        if (response && response.ER === 0) {
            return response;
        } else {
            return [];
        }
    } catch (error) {
        console.error(error);
    }
};

export const getDetailProductApi = async (id) => {
    try {
        const response = await instance.get(`/shop/${id}/detail`);
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
