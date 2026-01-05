import axios from "axios";
import AuthService from "./auth.service";

const API_URL = "http://localhost:8081/api/membership/";

const authHeader = () => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user && user.token) {
        return { Authorization: 'Bearer ' + user.token };
    } else {
        return {};
    }
}

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
