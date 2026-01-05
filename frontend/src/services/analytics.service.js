import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8081/api/analytics";

const getStats = () => {
    return axios.get(API_URL, { headers: authHeader() });
};

const AnalyticsService = {
    getStats
};

export default AnalyticsService;
