import instance from "../config/axios.config";

export const loginApi = async (data) => {
    try {
        const response = await instance.post("auth/login", data);
        if (response.success === true) {
            return response;
        } else {
            return response.message;
        }
    } catch (error) {
        console.log(error);
    }
};
