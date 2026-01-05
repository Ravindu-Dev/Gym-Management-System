import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import MembershipService from "../services/membership.service";

const PaymentSuccess = () => {
    const [searchParams] = useSearchParams();
    const planId = searchParams.get("planId");
    const [status, setStatus] = useState("processing");

    useEffect(() => {
        if (planId) {
            MembershipService.subscribeToPlan(planId).then(
                () => {
                    setStatus("success");
                },
                (err) => {
                    console.error("Activation error", err);
                    setStatus("error");
                }
            );
        }
    }, [planId]);

    return (
        <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-[60vh]">
            {status === "processing" && (
                <>
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-500 mb-4"></div>
                    <h1 className="text-3xl font-bold text-white mb-2">Activating Subscription...</h1>
                    <p className="text-gray-400">Payment received! Completing your activation.</p>
                </>
            )}

            {status === "success" && (
                <div className="text-center bg-dark-800 p-8 rounded-xl border border-green-600/30 shadow-2xl max-w-md">
                    <div className="w-20 h-20 bg-green-900/30 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                    </div>
                    <h1 className="text-3xl font-bold text-white mb-2">Payment Successful!</h1>
                    <p className="text-gray-400 mb-8">Your membership is now active. Welcome to the gym!</p>
                    <Link to="/user" className="btn-primary inline-block px-8">
                        Go to Dashboard
                    </Link>
                </div>
            )}

            {status === "error" && (
                <div className="text-center bg-dark-800 p-8 rounded-xl border border-red-600/30 shadow-2xl max-w-md">
                    <div className="w-20 h-20 bg-red-900/30 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </div>
                    <h1 className="text-3xl font-bold text-white mb-2">Activation Error</h1>
                    <p className="text-gray-400 mb-8">Payment was successful, but we hit a snag activating your plan. Please contact support with your transaction ID.</p>
                    <Link to="/user" className="btn-primary inline-block px-8">
                        Go to Dashboard
                    </Link>
                </div>
            )}
        </div>
    );
};

export default PaymentSuccess;
