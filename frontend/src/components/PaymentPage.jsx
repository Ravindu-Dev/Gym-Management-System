import { useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import PaymentService from "../services/payment.service";

const PaymentPage = () => {
    const [searchParams] = useSearchParams();
    const planId = searchParams.get("planId");
    const amount = searchParams.get("amount");

    const initiated = useRef(false); // Using a ref to track if we've already started

    useEffect(() => {
        if (amount && planId && !initiated.current) {
            initiated.current = true;
            // Amount in cents for Stripe. 29.99 -> 2999
            const amountInCents = Math.round(parseFloat(amount) * 100);

            PaymentService.createCheckoutSession(planId, amountInCents, "Subscription Plan " + planId)
                .then((res) => {
                    // Redirect to Stripe Hosted Checkout URL
                    window.location.href = res.data.url;
                })
                .catch((err) => {
                    console.error("Error creating checkout session", err);
                    alert("Failed to initiate payment. Please try again.");
                });
        }
    }, [amount, planId]);

    return (
        <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-[60vh]">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-500 mb-4"></div>
            <h1 className="text-2xl font-bold text-white mb-2">Redirecting to Secure Checkout...</h1>
            <p className="text-gray-400">Please wait while we set up your secure payment session.</p>
        </div>
    );
};

export default PaymentPage;
