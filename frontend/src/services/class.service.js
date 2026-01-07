import axios from "axios";
import authHeader from "./auth-header";

const API_URL = (import.meta.env.VITE_API_URL || "http://localhost:8081") + "/api/classes";

const getAllClasses = () => {
    return axios.get(API_URL);
};

const createClass = (classData) => {
    return axios.post(API_URL, classData, { headers: authHeader() });
};

const deleteClass = (id) => {
    return axios.delete(API_URL + "/" + id, { headers: authHeader() });
};

const bookClass = (id) => {
    return axios.post(API_URL + "/" + id + "/book", {}, { headers: authHeader() });
};

const cancelBooking = (id) => {
    return axios.delete(API_URL + "/" + id + "/book", { headers: authHeader() });
};

const ClassService = {
    getAllClasses,
    createClass,
    deleteClass,
    bookClass,
    cancelBooking
};

export default ClassService;
