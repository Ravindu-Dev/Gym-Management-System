import { useNavigate } from 'react-router-dom';

const LockedFeature = ({ featureName, requiredPlan = "Premium" }) => {
    const navigate = useNavigate();

    return (
        <div className="container mx-auto px-4 py-16 animate-fade-in">
            <div className="max-w-2xl mx-auto glass-panel p-12 text-center">
                {/* Lock Icon */}
                <div className="mb-8 flex justify-center">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary-500/20 to-accent-500/20 flex items-center justify-center">
                        <svg className="w-12 h-12 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                    </div>
                </div>

                {/* Heading */}
                <h1 className="text-4xl font-display font-bold heading-gradient italic mb-4">
                    {featureName} Locked
                </h1>

                {/* Description */}
                <p className="text-gray-400 text-lg mb-8">
                    This feature requires a <span className="text-primary-400 font-semibold">{requiredPlan}</span> membership plan.
                    <br />
                    Upgrade your plan to unlock this feature and more!
                </p>

                {/* Features List */}
                <div className="bg-white/5 rounded-xl p-6 mb-8 text-left">
                    <h3 className="text-lg font-bold text-white mb-4">✨ What you'll get with {requiredPlan}:</h3>
                    <ul className="space-y-3">
                        {requiredPlan === "Premium" || requiredPlan === "Annual" ? (
                            <>
                                <li className="flex items-center text-gray-300">
                                    <svg className="w-5 h-5 text-accent-400 mr-3" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    Workout Tracker
                                </li>
                                <li className="flex items-center text-gray-300">
                                    <svg className="w-5 h-5 text-accent-400 mr-3" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    Nutrition Tracker
                                </li>
                                <li className="flex items-center text-gray-300">
                                    <svg className="w-5 h-5 text-accent-400 mr-3" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    Book Personal Trainers
                                </li>
                                <li className="flex items-center text-gray-300">
                                    <svg className="w-5 h-5 text-accent-400 mr-3" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    Class Schedule & Booking
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="flex items-center text-gray-300">
                                    <svg className="w-5 h-5 text-accent-400 mr-3" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    Workout Tracker
                                </li>
                                <li className="flex items-center text-gray-300">
                                    <svg className="w-5 h-5 text-accent-400 mr-3" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    Class Schedule & Booking
                                </li>
                            </>
                        )}
                    </ul>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                        onClick={() => navigate('/plans')}
                        className="btn-primary px-8 py-3 text-lg"
                    >
                        View Plans & Upgrade
                    </button>
                    <button
                        onClick={() => navigate('/user')}
                        className="px-8 py-3 text-lg rounded-xl font-semibold text-gray-400 hover:text-white hover:bg-white/5 transition-all"
                    >
                        Back to Dashboard
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LockedFeature;
