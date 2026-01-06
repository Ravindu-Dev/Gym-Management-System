import { useState, useEffect } from "react";
import BookingService from "../services/booking.service";

const BookTrainer = () => {
    const [trainers, setTrainers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");
    const [selectedTrainer, setSelectedTrainer] = useState(null);
    const [workoutType, setWorkoutType] = useState("");
    const [bookingMessage, setBookingMessage] = useState("");

    useEffect(() => {
        loadTrainers();
    }, []);

    const loadTrainers = () => {
        setLoading(true);
        BookingService.getAvailableTrainers().then(
            (response) => {
                const approvedTrainers = response.data.filter(t => t.roles && t.roles.includes("ROLE_TRAINER"));
                setTrainers(approvedTrainers);
                setLoading(false);
            },
            (error) => {
                setMessage("Error loading trainers.");
                setLoading(false);
            }
        );
    };

    const handleBooking = (e) => {
        e.preventDefault();

        const bookingData = {
            trainerId: selectedTrainer.id,
            workoutType: workoutType,
            message: bookingMessage
        };

        BookingService.createBooking(bookingData).then(
            () => {
                setMessage("Booking request sent successfully!");
                setSelectedTrainer(null);
                setWorkoutType("");
                setBookingMessage("");
            },
            (error) => {
                setMessage("Failed to create booking.");
            }
        );
    };

    return (
        <div className="p-6 space-y-8">
            <div>
                <h1 className="text-3xl font-extrabold text-white tracking-tight">Book a Trainer</h1>
                <p className="text-gray-400 mt-1">Choose from our expert trainers</p>
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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {trainers.length === 0 ? (
                        <div className="col-span-full glass-panel p-12 text-center">
                            <p className="text-gray-400">No trainers available at the moment.</p>
                        </div>
                    ) : (
                        trainers.map((trainer) => (
                            <div key={trainer.id} className="glass-panel p-6 space-y-4 hover:border-primary-500/50 transition-all">
                                <div className="flex items-center space-x-4">
                                    <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center">
                                        <span className="text-2xl font-bold text-white">
                                            {trainer.username?.charAt(0).toUpperCase()}
                                        </span>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold text-white">{trainer.fullName || trainer.username}</h3>
                                        <p className="text-sm text-gray-400">{trainer.email}</p>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <div className="flex items-center space-x-2">
                                        <svg className="w-5 h-5 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path>
                                        </svg>
                                        <span className="text-sm text-gray-300">
                                            <span className="font-semibold text-primary-400">Specialization:</span> {trainer.specialization || "General Fitness"}
                                        </span>
                                    </div>
                                </div>

                                <button
                                    onClick={() => setSelectedTrainer(trainer)}
                                    className="w-full btn-primary"
                                >
                                    Book Now
                                </button>
                            </div>
                        ))
                    )}
                </div>
            )}

            {/* Booking Modal */}
            {selectedTrainer && (
                <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-6">
                    <div className="glass-panel max-w-md w-full p-8 space-y-6">
                        <div className="flex justify-between items-start">
                            <div>
                                <h2 className="text-2xl font-bold text-white">Book {selectedTrainer.fullName || selectedTrainer.username}</h2>
                                <p className="text-sm text-gray-400 mt-1">{selectedTrainer.specialization}</p>
                            </div>
                            <button
                                onClick={() => setSelectedTrainer(null)}
                                className="text-gray-400 hover:text-white transition-colors"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                                </svg>
                            </button>
                        </div>

                        <form onSubmit={handleBooking} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Workout Type</label>
                                <input
                                    type="text"
                                    className="input-field"
                                    value={workoutType}
                                    onChange={(e) => setWorkoutType(e.target.value)}
                                    placeholder="e.g. Strength Training, Cardio"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Message (Optional)</label>
                                <textarea
                                    className="input-field"
                                    rows="3"
                                    value={bookingMessage}
                                    onChange={(e) => setBookingMessage(e.target.value)}
                                    placeholder="Any specific requirements or goals..."
                                ></textarea>
                            </div>

                            <div className="flex space-x-3">
                                <button
                                    type="button"
                                    onClick={() => setSelectedTrainer(null)}
                                    className="flex-1 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 btn-primary"
                                >
                                    Confirm Booking
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BookTrainer;
