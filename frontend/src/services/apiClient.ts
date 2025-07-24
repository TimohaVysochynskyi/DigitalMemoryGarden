import axios from "axios";

const BASE_URL = "http://localhost:3000/api";

const apiClient = axios.create({
    baseURL: BASE_URL,
});

apiClient.interceptors.request.use((config) => {
    const adminData = JSON.parse(localStorage.getItem("adminPassword") || "{}");
    if (adminData.password) {
        config.headers["x-admin-password"] = adminData.password;
    }
    return config;
});

export default apiClient;