import axios from "axios";
import authHeader from "./auth-header";

const API_URL = (import.meta.env.VITE_API_URL || "http://localhost:8081") + "/api/membership/";

const getAllPlans = () => {
    return axios.get(API_URL + "plans");
};

const subscribe = (planId, sessionId = null) => {
    let url = API_URL + "subscribe/" + planId;
    if (sessionId) {
        url += "?sessionId=" + sessionId;
    }
    return axios.post(url, {}, { headers: authHeader() });
};

const getMySubscriptions = () => {
    return axios.get(API_URL + "my-subscriptions", { headers: authHeader() });
};

const MembershipService = {
    getAllPlans,
    subscribe,
    subscribeToPlan: subscribe,
    getMySubscriptions
};

export default MembershipService;
