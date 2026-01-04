import axios from "axios";
import AuthService from "./auth.service";

const API_URL = "http://localhost:8081/api/analytics";

const authHeader = () => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user && user.token) {
        return { Authorization: 'Bearer ' + user.token };
    } else {
        return {};
    }
}

const getStats = () => {
    return axios.get(API_URL, { headers: authHeader() });
};

const AnalyticsService = {
    getStats
};

export default AnalyticsService;
