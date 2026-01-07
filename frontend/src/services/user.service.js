import axios from "axios";
import authHeader from "./auth-header";

const API_URL = (import.meta.env.VITE_API_URL || "http://localhost:8081") + "/api/users/";
const TEST_URL = (import.meta.env.VITE_API_URL || "http://localhost:8081") + "/api/test/";

const getPublicContent = () => {
    return axios.get(TEST_URL + "all");
};

const getUserBoard = () => {
    return axios.get(TEST_URL + "user", { headers: authHeader() });
};

const getModeratorBoard = () => {
    return axios.get(TEST_URL + "mod", { headers: authHeader() });
};

const getAdminBoard = () => {
    return axios.get(TEST_URL + "admin", { headers: authHeader() });
};

const getUserProfile = () => {
    return axios.get(API_URL + "profile", { headers: authHeader() });
};

const updateUserProfile = (profileData) => {
    return axios.put(API_URL + "profile", profileData, { headers: authHeader() });
};

const deleteUserProfile = () => {
    return axios.delete(API_URL + "profile", { headers: authHeader() });
};

const UserService = {
    getPublicContent,
    getUserBoard,
    getModeratorBoard,
    getAdminBoard,
    getUserProfile,
    updateUserProfile,
    deleteUserProfile,
};

export default UserService;
