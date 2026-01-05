import { useState } from "react";
import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import MembershipService from "../services/membership.service";
import { useNavigate } from "react-router-dom";

const CheckoutForm = ({ planId, amount }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [message, setMessage] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setIsProcessing(true);

        const { error, paymentIntent } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                // Return URL isn't needed for redirect-less card payments usually, 
                // but required by API. We'll handle success manually if possible, 
                // or let it redirect. For simplicity in this SPA, we might want to 
                // avoid full page redirect if possible, but confirmPayment often redirects.
                // Let's set a return_url just in case.
                return_url: window.location.origin + "/payment/success",
            },
            redirect: "if_required",
        });

        if (error) {
            setMessage(error.message);
            setIsProcessing(false);
        } else if (paymentIntent && paymentIntent.status === "succeeded") {
            setMessage("Payment Success!");
            // Now fulfill the subscription on backend
            MembershipService.subscribeToPlan(planId).then(
                () => {
                    alert("Subscription Activated Successfully!");
                    navigate("/user");
                },
                (err) => {
                    setMessage("Payment succeeded, but subscription activation failed. Contact support.");
                    setIsProcessing(false);
                }
            );
        } else {
            setMessage("Unexpected state.");
            setIsProcessing(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <PaymentElement />
            <button
                disabled={isProcessing || !stripe || !elements}
                id="submit"
                className="w-full btn-primary py-3 font-bold text-lg shadow-lg flex justify-center items-center"
            >
                {isProcessing ? "Processing..." : `Pay $${amount}`}
            </button>
            {message && <div id="payment-message" className="text-red-400 text-center font-medium">{message}</div>}
        </form>
    );
};

export default CheckoutForm;
