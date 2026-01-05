import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8081/api/workouts";

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
