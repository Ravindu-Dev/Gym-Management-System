import { useState, useEffect } from "react";
import MembershipService from "../services/membership.service";
import AuthService from "../services/auth.service";
import { Link } from "react-router-dom";

const UserBoard = () => {
    const [subscriptions, setSubscriptions] = useState([]);
    const [loading, setLoading] = useState(true);
    const user = AuthService.getCurrentUser();

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

    const activeSubscription = subscriptions.find(sub => sub.status === 'ACTIVE');

    return (
        <div className="space-y-8 animate-fade-in">
            {/* Header / Welcome */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-display font-bold heading-gradient mb-2 italic">Dashboard</h1>
                    <p className="text-gray-400 font-medium">Welcome back, {user?.username}! Ready for your next session?</p>
                </div>
                <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-3">
                        <Link to="/my-qr" className="glass-panel px-6 py-2.5 flex items-center space-x-2 hover:bg-white/10 transition-colors font-semibold">
                            <span>📱</span>
                            <span>Entry Pass</span>
                        </Link>
                        <Link to="/plans" className="btn-primary">
                            Upgrade
                        </Link>
                    </div>
                    {/* Dashboard Close Button */}
                    <Link
                        to="/"
                        className="w-12 h-12 flex items-center justify-center rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 text-gray-400 hover:text-white transition-all duration-300"
                        title="Exit Dashboard"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </Link>
                </div>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="glass-card flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-xl bg-primary-600/20 flex items-center justify-center text-2xl">⚡</div>
                    <div>
                        <p className="text-sm text-gray-400 font-medium">Workouts This Week</p>
                        <p className="text-2xl font-bold">4 Sessions</p>
                    </div>
                </div>
                <div className="glass-card flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-xl bg-accent-500/20 flex items-center justify-center text-2xl">🔥</div>
                    <div>
                        <p className="text-sm text-gray-400 font-medium">Calories Burned</p>
                        <p className="text-2xl font-bold">2,450 kcal</p>
                    </div>
                </div>
                <div className="glass-card flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-xl bg-orange-500/20 flex items-center justify-center text-2xl">⏳</div>
                    <div>
                        <p className="text-sm text-gray-400 font-medium">Time Trained</p>
                        <p className="text-2xl font-bold">6h 12m</p>
                    </div>
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Membership Status */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="glass-panel overflow-hidden">
                        <div className="p-6 border-b border-white/5 flex items-center justify-between">
                            <h3 className="text-xl font-bold">Active Memberships</h3>
                            <Link to="/plans" className="text-sm text-primary-400 hover:text-primary-300 font-medium">Browse All →</Link>
                        </div>
                        <div className="p-6">
                            {loading ? (
                                <div className="flex justify-center py-12">
                                    <div className="w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
                                </div>
                            ) : subscriptions.length === 0 ? (
                                <div className="text-center py-12">
                                    <p className="text-gray-400 mb-6 italic">No active subscriptions found.</p>
                                    <Link to="/plans" className="btn-primary">Get a Plan Now</Link>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {subscriptions.map((sub) => (
                                        <div key={sub.id} className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition-all group">
                                            <div className="flex items-center space-x-4">
                                                <div className="w-12 h-12 rounded-lg bg-gmsdark-900 flex items-center justify-center text-2xl group-hover:bg-primary-600/20 transition-colors">
                                                    💎
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-white">{sub.plan.name}</h4>
                                                    <p className="text-xs text-gray-500">Expires: {sub.endDate}</p>
                                                </div>
                                            </div>
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${sub.status === 'ACTIVE' ? 'bg-accent-500/10 text-accent-400 border border-accent-500/20' : 'bg-gray-700 text-gray-400'}`}>
                                                {sub.status}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Quick Shortcuts */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <Link to="/classes" className="glass-card group hover:border-primary-500/30">
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-3xl">🗓️</span>
                                <span className="text-gray-500 group-hover:text-primary-400 transition-colors">→</span>
                            </div>
                            <h3 className="text-lg font-bold mb-1 italic">Book a Class</h3>
                            <p className="text-sm text-gray-400">Yoga, HIIT, Strength Training and more.</p>
                        </Link>
                        <Link to="/workouts" className="glass-card group hover:border-accent-500/30">
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-3xl">💪</span>
                                <span className="text-gray-500 group-hover:text-accent-400 transition-colors">→</span>
                            </div>
                            <h3 className="text-lg font-bold mb-1 italic">Log Workout</h3>
                            <p className="text-sm text-gray-400">Keep track of your reps, sets, and progress.</p>
                        </Link>
                        <Link to="/book-trainer" className="glass-card group hover:border-orange-500/30">
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-3xl">🏋️</span>
                                <span className="text-gray-500 group-hover:text-orange-400 transition-colors">→</span>
                            </div>
                            <h3 className="text-lg font-bold mb-1 italic">Book a Trainer</h3>
                            <p className="text-sm text-gray-400">Get personalized training sessions.</p>
                        </Link>
                    </div>
                </div>

                {/* Sidebar Column */}
                <div className="space-y-6">
                    {/* Access Card Component */}
                    <div className="glass-panel p-6 bg-gradient-to-br from-primary-600/20 to-accent-500/10 border-primary-500/20">
                        <h3 className="text-lg font-bold mb-4 italic">Quick Entry</h3>
                        <div className="aspect-square bg-white p-4 rounded-2xl mb-6 shadow-inner flex items-center justify-center">
                            {/* Placeholder for actual QR code or illustration */}
                            <div className="text-6xl">📱</div>
                        </div>
                        <Link to="/my-qr" className="w-full btn-primary text-center block text-sm">
                            Open Full Pass
                        </Link>
                    </div>

                    {/* Upcoming Class Mock */}
                    <div className="glass-panel p-6">
                        <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Upcoming Next</h3>
                        <div className="flex items-start space-x-4">
                            <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-orange-500/20 flex flex-col items-center justify-center font-bold text-orange-400">
                                <span className="text-xs">JAN</span>
                                <span className="text-lg leading-tight">07</span>
                            </div>
                            <div>
                                <h4 className="font-bold">Power Yoga</h4>
                                <p className="text-xs text-gray-500">08:00 AM - 09:30 AM</p>
                                <p className="text-xs text-primary-400 mt-2 font-semibold hover:underline cursor-pointer">View Details</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserBoard;
