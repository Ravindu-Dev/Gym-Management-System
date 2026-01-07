import axios from "axios";
import authHeader from "./auth-header";

const API_URL = (import.meta.env.VITE_API_URL || "http://localhost:8081") + "/api/";

const getPendingTrainers = () => {
    return axios.get(API_URL + "admin/trainers/pending", { headers: authHeader() });
};

const approveTrainer = (id) => {
    return axios.put(API_URL + `admin/trainers/${id}/approve`, {}, { headers: authHeader() });
};

const rejectTrainer = (id) => {
    return axios.put(API_URL + `admin/trainers/${id}/reject`, {}, { headers: authHeader() });
};

const getAvailableTrainers = () => {
    return axios.get(API_URL + "bookings/trainers", { headers: authHeader() });
};

const getAllTrainers = () => {
    return axios.get(API_URL + "admin/trainers/all", { headers: authHeader() });
};

const TrainerService = {
    getPendingTrainers,
    approveTrainer,
    rejectTrainer,
    getAvailableTrainers,
    getAllTrainers,
};

export default TrainerService;
