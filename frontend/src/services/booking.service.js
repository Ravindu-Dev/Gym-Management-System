import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8081/api/bookings/";

const getAvailableTrainers = () => {
    return axios.get(API_URL + "trainers", { headers: authHeader() });
};

const createBooking = (bookingData) => {
    return axios.post(API_URL + "book", bookingData, { headers: authHeader() });
};

const getUserBookings = () => {
    return axios.get(API_URL + "user", { headers: authHeader() });
};

const getTrainerBookings = () => {
    return axios.get(API_URL + "trainer", { headers: authHeader() });
};

const acceptBooking = (id) => {
    return axios.put(API_URL + `${id}/accept`, {}, { headers: authHeader() });
};

const rejectBooking = (id) => {
    return axios.put(API_URL + `${id}/reject`, {}, { headers: authHeader() });
};

const getAllBookings = () => {
    return axios.get(API_URL + "admin/all", { headers: authHeader() });
};

const BookingService = {
    getAvailableTrainers,
    createBooking,
    getUserBookings,
    getTrainerBookings,
    acceptBooking,
    rejectBooking,
    getAllBookings,
};

export default BookingService;
