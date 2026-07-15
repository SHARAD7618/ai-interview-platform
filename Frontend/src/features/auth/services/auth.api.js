import axios from "axios";

const api = axios.create({
    baseURL: "https://ai-interview-platform-5ypl.onrender.com",
    withCredentials: true,
    headers: {
        "Content-Type": "application/json"
    }
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("accessToken");

    if (token) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

const persistToken = (token) => {
    if (token) {
        localStorage.setItem("accessToken", token);
    }
};

export async function register({ username, email, password }) {
    try {
        const response = await api.post("/api/auth/register", {
            username,
            email,
            password
        });

        persistToken(response.data?.token);
        return response.data;
    } catch (err) {
        console.error("Register Error:", err.response?.data || err.message);
        throw err;
    }
}

export async function login({ email, password }) {
    try {
        const response = await api.post("/api/auth/login", {
            email,
            password
        });

        persistToken(response.data?.token);
        return response.data;
    } catch (err) {
        console.error("Login Error:", err.response?.data || err.message);
        throw err;
    }
}

export async function logout() {
    try {
        localStorage.removeItem("accessToken");
        const response = await api.get("/api/auth/logout");

        return response.data;
    } catch (err) {
        console.error("Logout Error:", err.response?.data || err.message);
        throw err;
    }
}

export async function getMe() {
    try {
        const response = await api.get("/api/auth/get-me");

        return response.data;
    } catch (err) {
        console.error("GetMe Error:", err.response?.data || err.message);
        throw err;
    }
}

export default api;