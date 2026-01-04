import axios from "axios";
import AuthService from "./auth.service";

const API_URL = "http://localhost:8081/api/attendance";

const authHeader = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.token) {
        return { Authorization: 'Bearer ' + user.token };
    } else {
        return {};
    }
}

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
