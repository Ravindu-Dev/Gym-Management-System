import axios from "axios";
import AuthService from "./auth.service";

const API_URL = "http://localhost:8081/api/classes";

const authHeader = () => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user && user.token) {
        return { Authorization: 'Bearer ' + user.token };
    } else {
        return {};
    }
}

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
