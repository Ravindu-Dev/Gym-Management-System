import axios from "axios";
import authHeader from "./auth-header";

const API_URL = (import.meta.env.VITE_API_URL || "http://localhost:8081") + "/api/attendance";

const getMyAttendance = () => {
    return axios.get(API_URL + "/my", { headers: authHeader() });
};

const checkIn = (userId) => {
    return axios.post(API_URL + "/checkin/" + userId, {}, { headers: authHeader() });
};

const checkOut = (userId) => {
    return axios.post(API_URL + "/checkout/" + userId, {}, { headers: authHeader() });
};

const getAllAttendance = () => {
    return axios.get(API_URL + "/all", { headers: authHeader() });
};

const AttendanceService = {
    getMyAttendance,
    checkIn,
    checkOut,
    getAllAttendance
};

export default AttendanceService;
