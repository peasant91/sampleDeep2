import axios from "axios";

const clientVersioning = axios.create({
    baseURL: "https://android.timedoor.biz/api/v1"
});

clientVersioning.interceptors.request.use(
    async (config) => {
        config.headers.Accept = "application/json";
        config.headers.ContentType = "application/json";
        return config;
    },
    (err) => {
        return Promise.reject(err);
    }
);

export default clientVersioning;