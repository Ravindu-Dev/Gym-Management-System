import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import MembershipService from "../services/membership.service";
import AuthService from "../services/auth.service";

const PlansPage = () => {
    const [plans, setPlans] = useState([]);
    const [currentUser, setCurrentUser] = useState(undefined);
    const navigate = useNavigate();

    useEffect(() => {
        const user = AuthService.getCurrentUser();
        if (user) {
            setCurrentUser(user);
        }

        MembershipService.getAllPlans().then(
            (response) => {
                setPlans(response.data);
            },
            (error) => {
                console.log(error);
            }
        );
    }, []);

    const handleSubscribe = (planId, price) => {
        if (!currentUser) {
            navigate("/login");
            return;
        }
        navigate(`/payment?planId=${planId}&amount=${price}`);
    };

    return (
        <div className="container mx-auto px-4 py-16">
            <div className="text-center mb-16">
                <h1 className="text-4xl font-bold text-white mb-4">Choose Your Plan</h1>
                <p className="text-xl text-gray-400">Select the perfect membership package for your fitness journey.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {plans.length === 0 ? (
                    <div className="col-span-3 text-center text-gray-400">
                        <p>No plans available at the moment. Please check back later.</p>
                        {/* Mock data for visualization if backend is empty */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8 opacity-50 pointer-events-none">
                            <div className="card">
                                <h3 className="text-2xl font-bold text-white">Basic</h3>
                                <p className="text-3xl font-bold text-primary-500 mt-4">$29<span className="text-sm text-gray-400">/mo</span></p>
                            </div>
                        </div>
                    </div>
                ) : (
                    plans.map((plan) => (
                        <div key={plan.id} className="card relative transform hover:-translate-y-2 transition-transform duration-300">
                            <h3 className="text-2xl font-bold text-white">{plan.name}</h3>
                            <div className="mt-4 flex items-baseline">
                                <span className="text-4xl font-extrabold text-primary-500">${plan.price}</span>
                            </div>
                            <p className="mt-4 text-gray-400">{plan.description}</p>
                            <div className="mt-6">
                                <p className="text-sm text-gray-500">Duration: {plan.durationInMonths} Months</p>
                            </div>
                            <button
                                onClick={() => handleSubscribe(plan.id, plan.price)}
                                className="w-full mt-8 btn-primary"
                            >
                                {currentUser ? "Subscribe Now" : "Login to Subscribe"}
                            </button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default PlansPage;
