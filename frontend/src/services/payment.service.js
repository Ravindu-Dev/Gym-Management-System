import axios from "axios";
import authHeader from "./auth-header";

const API_URL = (import.meta.env.VITE_API_URL || "http://localhost:8081") + "/api/payment";

const createCheckoutSession = (planId, amount, description) => {
    return axios.post(API_URL + "/create-checkout-session/" + planId, {
        amount,
        description
    }, { headers: authHeader() });
};

const PaymentService = {
    createCheckoutSession
};

export default PaymentService;
