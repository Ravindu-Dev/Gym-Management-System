import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import BookingService from "../services/booking.service";
import AuthService from "../services/auth.service";

const TrainerDashboard = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        loadBookings();
    }, []);

    const loadBookings = () => {
        setLoading(true);
        BookingService.getTrainerBookings().then(
            (response) => {
                setBookings(response.data);
                setLoading(false);
            },
            (error) => {
                setMessage("Error loading bookings.");
                setLoading(false);
            }
        );
    };

    const handleAccept = (id) => {
        BookingService.acceptBooking(id).then(
            () => {
                setMessage("Booking accepted!");
                loadBookings();
            },
            (error) => {
                setMessage("Could not accept booking.");
            }
        );
    };

    const handleReject = (id) => {
        BookingService.rejectBooking(id).then(
            () => {
                setMessage("Booking rejected!");
                loadBookings();
            },
            (error) => {
                setMessage("Could not reject booking.");
            }
        );
    };

    const handleLogout = () => {
        AuthService.logout();
        navigate("/login");
        window.location.reload();
    };

    const pendingBookings = bookings.filter(b => b.status === "PENDING");
    const acceptedBookings = bookings.filter(b => b.status === "ACCEPTED");
    const rejectedBookings = bookings.filter(b => b.status === "REJECTED");

    return (
        <div className="min-h-screen bg-gmsdark-950">
            <div className="container mx-auto px-6 py-10">
                <div className="flex flex-col lg:flex-row gap-10">
                    {/* Sidebar */}
                    <div className="w-64 flex-shrink-0">
                        <div className="card sticky top-8">
                            <div className="flex items-center space-x-3 mb-8 px-2">
                                <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center shadow-lg shadow-primary-500/20">
                                    <span className="text-xl font-bold text-white">T</span>
                                </div>
                                <div>
                                    <h2 className="text-lg font-bold text-white leading-none">Trainer</h2>
                                    <p className="text-xs text-gray-500 mt-1">Dashboard</p>
                                </div>
                            </div>

                            <nav className="space-y-4">
                                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-2 mb-2">Menu</div>
                                <Link to="/trainer-dashboard" className="flex items-center space-x-3 px-4 py-3 bg-primary-900/40 text-primary-400 rounded-xl border border-primary-800/50 transition-all font-medium">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                                    <span>My Bookings</span>
                                </Link>

                                <div className="pt-8 border-t border-dark-700 mt-8">
                                    <button onClick={handleLogout} className="flex items-center space-x-3 px-4 py-3 text-red-400 hover:bg-red-900/20 rounded-xl transition-all font-medium w-full">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
                                        <span>Logout</span>
                                    </button>
                                </div>
                            </nav>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="flex-1 space-y-8">
                        <div>
                            <h1 className="text-3xl font-extrabold text-white tracking-tight">My Bookings</h1>
                            <p className="text-gray-400 mt-1">Manage your training sessions</p>
                        </div>

                        {message && (
                            <div className="bg-blue-900/50 border border-blue-500 text-blue-200 px-4 py-3 rounded relative">
                                {message}
                            </div>
                        )}

                        {loading ? (
                            <div className="flex justify-center items-center h-64">
                                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                            </div>
                        ) : (
                            <div className="space-y-8">
                                {/* Pending Bookings */}
                                <div>
                                    <h2 className="text-xl font-bold text-white mb-4">Pending Requests ({pendingBookings.length})</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {pendingBookings.length === 0 ? (
                                            <div className="col-span-full glass-panel p-8 text-center">
                                                <p className="text-gray-400">No pending booking requests.</p>
                                            </div>
                                        ) : (
                                            pendingBookings.map((booking) => (
                                                <div key={booking.id} className="glass-panel p-6 space-y-4">
                                                    <div className="flex justify-between items-start">
                                                        <div>
                                                            <h3 className="text-lg font-semibold text-white">{booking.userName}</h3>
                                                            <p className="text-sm text-gray-400">{booking.workoutType}</p>
                                                        </div>
                                                        <span className="px-2 py-1 bg-yellow-900/50 text-yellow-500 text-xs font-medium rounded-full border border-yellow-500/50">
                                                            PENDING
                                                        </span>
                                                    </div>

                                                    {/* Session Details */}
                                                    <div className="space-y-2 bg-white/5 p-3 rounded-lg">
                                                        {booking.sessionDateTime && (
                                                            <div className="flex items-center space-x-2 text-sm">
                                                                <svg className="w-4 h-4 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                                                </svg>
                                                                <span className="text-gray-300">
                                                                    {new Date(booking.sessionDateTime).toLocaleString()}
                                                                </span>
                                                            </div>
                                                        )}
                                                        {(booking.userWeight || booking.userHeight) && (
                                                            <div className="flex items-center space-x-2 text-sm">
                                                                <svg className="w-4 h-4 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                                                                </svg>
                                                                <span className="text-gray-300">
                                                                    {booking.userWeight && `${booking.userWeight}kg`}
                                                                    {booking.userWeight && booking.userHeight && ' • '}
                                                                    {booking.userHeight && `${booking.userHeight}cm`}
                                                                </span>
                                                            </div>
                                                        )}
                                                    </div>

                                                    {booking.practicePreferences && (
                                                        <div className="bg-white/5 p-3 rounded-lg">
                                                            <p className="text-xs text-gray-500 font-semibold uppercase mb-1">Practice Goals</p>
                                                            <p className="text-sm text-gray-300">{booking.practicePreferences}</p>
                                                        </div>
                                                    )}

                                                    {booking.message && (
                                                        <div className="bg-white/5 p-3 rounded-lg">
                                                            <p className="text-xs text-gray-500 font-semibold uppercase mb-1">Additional Notes</p>
                                                            <p className="text-sm text-gray-300">{booking.message}</p>
                                                        </div>
                                                    )}

                                                    <div className="flex space-x-3 pt-4 border-t border-white/5">
                                                        <button
                                                            onClick={() => handleAccept(booking.id)}
                                                            className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg transition-colors"
                                                        >
                                                            Accept
                                                        </button>
                                                        <button
                                                            onClick={() => handleReject(booking.id)}
                                                            className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg transition-colors"
                                                        >
                                                            Reject
                                                        </button>
                                                    </div>
                                                </div>
                                            ))
                                        )}
                                    </div>
                                </div>

                                {/* Accepted Bookings */}
                                <div>
                                    <h2 className="text-xl font-bold text-white mb-4">Accepted Sessions ({acceptedBookings.length})</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {acceptedBookings.length === 0 ? (
                                            <div className="col-span-full glass-panel p-8 text-center">
                                                <p className="text-gray-400">No accepted bookings yet.</p>
                                            </div>
                                        ) : (
                                            acceptedBookings.map((booking) => (
                                                <div key={booking.id} className="glass-panel p-6 space-y-3">
                                                    <div className="flex justify-between items-start">
                                                        <h3 className="text-lg font-semibold text-white">{booking.userName}</h3>
                                                        <span className="px-2 py-1 bg-green-900/50 text-green-500 text-xs font-medium rounded-full border border-green-500/50">
                                                            ACCEPTED
                                                        </span>
                                                    </div>
                                                    <p className="text-sm text-gray-400">{booking.workoutType}</p>
                                                </div>
                                            ))
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TrainerDashboard;
