import { useState, useEffect } from "react";
import MembershipService from "../services/membership.service";
import AuthService from "../services/auth.service";
import { Link } from "react-router-dom";

const UserBoard = () => {
    const [subscriptions, setSubscriptions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        MembershipService.getMySubscriptions().then(
            (response) => {
                setSubscriptions(response.data);
                setLoading(false);
            },
            (error) => {
                console.log(error);
                setLoading(false);
            }
        );
    }, []);

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold text-white">My Dashboard</h2>
                <Link to="/plans" className="btn-primary">Browse Plans</Link>
            </div>

            {loading ? (
                <div className="text-center text-white">Loading...</div>
            ) : subscriptions.length === 0 ? (
                <div className="text-center py-16 bg-dark-800 rounded-xl border border-dark-700">
                    <h3 className="text-xl font-semibold text-white mb-2">No Active Subscriptions</h3>
                    <p className="text-gray-400 mb-6">You haven't subscribed to any membership plans yet.</p>
                    <Link to="/plans" className="text-primary-400 hover:text-primary-300 font-medium">View Available Plans →</Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {subscriptions.map((sub) => (
                        <div key={sub.id} className="card border-l-4 border-l-primary-500">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="text-xl font-bold text-white">{sub.plan.name}</h3>
                                    <span className={`inline-block px-2 py-1 text-xs rounded-full mt-2 ${sub.status === 'ACTIVE' ? 'bg-green-900/50 text-green-300 border border-green-600' : 'bg-gray-700 text-gray-300'}`}>
                                        {sub.status}
                                    </span>
                                </div>
                            </div>
                            <div className="mt-4 space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-400">Start Date:</span>
                                    <span className="text-white">{sub.startDate}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-400">End Date:</span>
                                    <span className="text-white">{sub.endDate}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default UserBoard;
