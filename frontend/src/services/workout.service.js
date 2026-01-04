import axios from "axios";
import AuthService from "./auth.service";

const API_URL = "http://localhost:8081/api/workouts";

const authHeader = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.token) {
        return { Authorization: 'Bearer ' + user.token };
    } else {
        return {};
    }
}

const getMyWorkouts = () => {
    return axios.get(API_URL, { headers: authHeader() });
};

const logWorkout = (workout) => {
    return axios.post(API_URL, workout, { headers: authHeader() });
};

const WorkoutService = {
    getMyWorkouts,
    logWorkout
};

export default WorkoutService;
