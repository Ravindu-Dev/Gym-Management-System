import { useState, useEffect } from "react";
import BookingService from "../services/booking.service";

const MyBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");

    useEffect(() => {
        loadBookings();
    }, []);

    const loadBookings = () => {
        setLoading(true);
        BookingService.getUserBookings().then(
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

    const pendingBookings = bookings.filter(b => b.status === "PENDING");
    const acceptedBookings = bookings.filter(b => b.status === "ACCEPTED");
    const rejectedBookings = bookings.filter(b => b.status === "REJECTED");

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-extrabold text-white tracking-tight">My Bookings</h1>
                <p className="text-gray-400 mt-1">Track your trainer booking requests</p>
            </div>

            {message && (
                <div className="bg-blue-900/50 border border-blue-500 text-blue-200 px-4 py-3 rounded-xl">
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
                                                <h3 className="text-lg font-semibold text-white">{booking.trainerName}</h3>
                                                <p className="text-sm text-gray-400">{booking.workoutType}</p>
                                            </div>
                                            <span className="px-2 py-1 bg-yellow-900/50 text-yellow-500 text-xs font-medium rounded-full border border-yellow-500/50">
                                                PENDING
                                            </span>
                                        </div>

                                        {booking.sessionDateTime && (
                                            <div className="flex items-center space-x-2 text-sm text-gray-300 bg-white/5 p-3 rounded-lg">
                                                <svg className="w-4 h-4 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                                </svg>
                                                <span>{new Date(booking.sessionDateTime).toLocaleString()}</span>
                                            </div>
                                        )}

                                        {booking.practicePreferences && (
                                            <div className="bg-white/5 p-3 rounded-lg">
                                                <p className="text-xs text-gray-500 font-semibold uppercase mb-1">Your Goals</p>
                                                <p className="text-sm text-gray-300">{booking.practicePreferences}</p>
                                            </div>
                                        )}

                                        <div className="text-xs text-gray-500 pt-2 border-t border-white/5">
                                            Waiting for trainer approval...
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
                                    <div key={booking.id} className="glass-panel p-6 space-y-3 border-l-4 border-green-500">
                                        <div className="flex justify-between items-start">
                                            <h3 className="text-lg font-semibold text-white">{booking.trainerName}</h3>
                                            <span className="px-2 py-1 bg-green-900/50 text-green-500 text-xs font-medium rounded-full border border-green-500/50">
                                                ACCEPTED
                                            </span>
                                        </div>
                                        <p className="text-sm text-gray-400">{booking.workoutType}</p>
                                        {booking.sessionDateTime && (
                                            <div className="flex items-center space-x-2 text-sm text-gray-300">
                                                <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                                </svg>
                                                <span className="font-medium">{new Date(booking.sessionDateTime).toLocaleString()}</span>
                                            </div>
                                        )}
                                        <div className="pt-2 border-t border-white/5">
                                            <p className="text-xs text-green-400 font-medium">✓ Confirmed by trainer</p>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                    {/* Rejected Bookings */}
                    <div>
                        <h2 className="text-xl font-bold text-white mb-4">Rejected Requests ({rejectedBookings.length})</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {rejectedBookings.length === 0 ? (
                                <div className="col-span-full glass-panel p-8 text-center">
                                    <p className="text-gray-400">No rejected bookings.</p>
                                </div>
                            ) : (
                                rejectedBookings.map((booking) => (
                                    <div key={booking.id} className="glass-panel p-6 space-y-3 opacity-75 border-l-4 border-red-500">
                                        <div className="flex justify-between items-start">
                                            <h3 className="text-lg font-semibold text-white">{booking.trainerName}</h3>
                                            <span className="px-2 py-1 bg-red-900/50 text-red-500 text-xs font-medium rounded-full border border-red-500/50">
                                                REJECTED
                                            </span>
                                        </div>
                                        <p className="text-sm text-gray-400">{booking.workoutType}</p>
                                        {booking.sessionDateTime && (
                                            <div className="flex items-center space-x-2 text-sm text-gray-300">
                                                <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                                </svg>
                                                <span>{new Date(booking.sessionDateTime).toLocaleString()}</span>
                                            </div>
                                        )}
                                        <div className="pt-2 border-t border-white/5">
                                            <p className="text-xs text-red-400">Trainer declined this request</p>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyBookings;
