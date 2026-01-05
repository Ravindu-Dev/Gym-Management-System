import { useState, useEffect } from "react";
import ClassService from "../services/class.service";
import AuthService from "../services/auth.service";
import { useNavigate } from "react-router-dom";

const ClassSchedule = () => {
    const [classes, setClasses] = useState([]);
    const [currentUser, setCurrentUser] = useState(undefined);
    const navigate = useNavigate();

    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const user = AuthService.getCurrentUser();
        if (user) {
            setCurrentUser(user);
            setIsAdmin(user.roles.includes("ROLE_ADMIN"));
        }
        loadClasses();
    }, []);

    const loadClasses = () => {
        ClassService.getAllClasses().then(
            (response) => {
                // Sort by time
                const sorted = response.data.sort((a, b) => new Date(a.startTime) - new Date(b.startTime));
                setClasses(sorted);
            },
            (error) => console.log(error)
        );
    };

    const handleBook = (id) => {
        if (!currentUser) {
            navigate("/login");
            return;
        }

        ClassService.bookClass(id).then(
            () => {
                alert("Boosting successful!");
                loadClasses();
            },
            (error) => {
                alert("Booking failed: " + (error.response?.data?.message || error.message));
            }
        );
    };

    const isEnrolled = (gymClass) => {
        return currentUser && gymClass.enrolledMemberIds && gymClass.enrolledMemberIds.includes(currentUser.id);
    };

    const isFull = (gymClass) => {
        return gymClass.enrolledMemberIds && gymClass.enrolledMemberIds.length >= gymClass.capacity;
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-white mb-8 text-center">Class Schedule</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {classes.map((c) => (
                    <div key={c.id} className="card hover:border-primary-500 transition-colors">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="text-xl font-bold text-white">{c.name}</h3>
                                <p className="text-primary-400 font-medium">{c.instructor}</p>
                            </div>
                            <div className="text-right">
                                <span className="block text-2xl font-bold text-white">
                                    {new Date(c.startTime).getDate()}
                                </span>
                                <span className="text-sm text-gray-400 uppercase">
                                    {new Date(c.startTime).toLocaleString('default', { month: 'short' })}
                                </span>
                            </div>
                        </div>

                        <div className="space-y-2 mb-6">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-400">Time:</span>
                                <span className="text-white">
                                    {new Date(c.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-400">Duration:</span>
                                <span className="text-white">{c.durationMinutes} mins</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-400">Spots:</span>
                                <span className={`${isFull(c) ? 'text-red-400' : 'text-green-400'}`}>
                                    {c.capacity - (c.enrolledMemberIds?.length || 0)} left
                                </span>
                            </div>
                        </div>

                        {isAdmin ? (
                            <div className="text-center py-2 bg-dark-900 rounded-lg text-gray-500 text-sm italic">
                                Preview Mode (Admin)
                            </div>
                        ) : isEnrolled(c) ? (
                            <button disabled className="w-full bg-green-900/50 text-green-300 border border-green-600 py-2 rounded-lg font-medium cursor-default">
                                Enrolled ✓
                            </button>
                        ) : isFull(c) ? (
                            <button disabled className="w-full bg-gray-700 text-gray-400 py-2 rounded-lg font-medium cursor-not-allowed">
                                Class Full
                            </button>
                        ) : (
                            <button
                                onClick={() => handleBook(c.id)}
                                className="w-full btn-primary"
                            >
                                Book Now
                            </button>
                        )}
                    </div>
                ))}
            </div>

            {classes.length === 0 && (
                <p className="text-center text-gray-500 mt-12">No upcoming classes found.</p>
            )}
        </div>
    );
};

export default ClassSchedule;
