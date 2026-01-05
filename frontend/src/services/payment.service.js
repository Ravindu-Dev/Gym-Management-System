import axios from "axios";

const API_URL = "http://localhost:8081/api/payment";

const authHeader = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.token) {
        return { Authorization: 'Bearer ' + user.token };
    } else {
        return {};
    }
}

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
