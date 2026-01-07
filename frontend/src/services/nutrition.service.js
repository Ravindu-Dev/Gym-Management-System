import axios from "axios";
import authHeader from "./auth-header";

const API_URL = (import.meta.env.VITE_API_URL || "http://localhost:8081") + "/api/nutrition";

const logNutrition = (nutrition) => {
    return axios.post(API_URL, nutrition, { headers: authHeader() });
};

const getMyNutrition = () => {
    return axios.get(API_URL + "/me", { headers: authHeader() });
};

const getMyNutritionToday = () => {
    return axios.get(API_URL + "/me/today", { headers: authHeader() });
};

const getMyNutritionByDate = (date) => {
    return axios.get(API_URL + "/me/date?date=" + date, { headers: authHeader() });
};

const deleteNutrition = (id) => {
    return axios.delete(API_URL + "/" + id, { headers: authHeader() });
}

const NutritionService = {
    logNutrition,
    getMyNutrition,
    getMyNutritionToday,
    getMyNutritionByDate,
    deleteNutrition
};

export default NutritionService;
