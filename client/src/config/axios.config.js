import axios from "axios";
import NProgress from "nprogress";
NProgress.configure({ showSpinner: false, trickleSpeed: 300 });
const instance = axios.create({
    baseURL: "http://localhost:8080/api",
    timeout: 5000,
    headers: {
        "Content-Type": "application/json",
    },
});

// Add a request interceptor
instance.interceptors.request.use(
    function (config) {
        // Do something before request is sent
        NProgress.start();
        return config;
    },
    function (error) {
        NProgress.done();
        // Do something with request error
        return Promise.reject(error);
    }
);

// Add a response interceptor
instance.interceptors.response.use(
    function (response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        NProgress.done();
        return response.data;
    },
    function (error) {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        NProgress.done();
        return Promise.reject(error);
    }
);

export default instance;
