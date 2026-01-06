import { useState, useEffect, useMemo } from "react";
import { useNavigate, Link } from "react-router-dom";
import BookingService from "../services/booking.service";
import AuthService from "../services/auth.service";
import UserService from "../services/user.service";

const TrainerDashboard = () => {
    const currentUser = useMemo(() => AuthService.getCurrentUser(), []);
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");
    const [activeView, setActiveView] = useState("bookings"); // 'bookings' or 'profile'
    const navigate = useNavigate();

    // Profile states
    const [profile, setProfile] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [error, setError] = useState("");
    const [formData, setFormData] = useState({
        fullName: "",
        phoneNumber: "",
        address: "",
        bio: "",
        profileImageUrl: "",
        specialization: "",
        gender: "",
        age: ""
    });

    useEffect(() => {
        loadBookings();
        if (currentUser) {
            fetchProfile();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
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

    const fetchProfile = () => {
        UserService.getUserProfile()
            .then(response => {
                setProfile(response.data);
                setFormData({
                    fullName: response.data.fullName || "",
                    phoneNumber: response.data.phoneNumber || "",
                    address: response.data.address || "",
                    bio: response.data.bio || "",
                    profileImageUrl: response.data.profileImageUrl || "",
                    specialization: response.data.specialization || "",
                    gender: response.data.gender || "",
                    age: response.data.age || ""
                });
            })
            .catch(err => {
                setError("Could not fetch profile data.");
            });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setMessage("");
        setError("");

        UserService.updateUserProfile(formData)
            .then(response => {
                setMessage("Profile updated successfully!");
                setIsEditing(false);
                fetchProfile();
                setTimeout(() => setMessage(""), 3000);
            })
            .catch(err => {
                setError("Failed to update profile.");
            });
    };

    const handleDeleteAccount = () => {
        if (window.confirm("Are you sure you want to delete your account? This action cannot be undone and will permanently remove all your data.")) {
            UserService.deleteUserProfile()
                .then(response => {
                    AuthService.logout();
                    window.location.href = "/login";
                })
                .catch(err => {
                    setError("Failed to delete account. Please try again.");
                });
        }
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
                                <button
                                    onClick={() => setActiveView("bookings")}
                                    className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all font-medium w-full ${activeView === "bookings"
                                        ? "bg-primary-900/40 text-primary-400 border border-primary-800/50"
                                        : "text-gray-400 hover:bg-white/5 hover:text-white"
                                        }`}
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                                    <span>My Bookings</span>
                                </button>

                                <button
                                    onClick={() => {
                                        setActiveView("profile");
                                        setIsEditing(false);
                                    }}
                                    className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all font-medium w-full ${activeView === "profile"
                                        ? "bg-primary-900/40 text-primary-400 border border-primary-800/50"
                                        : "text-gray-400 hover:bg-white/5 hover:text-white"
                                        }`}
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                                    <span>Profile</span>
                                </button>

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
                        {activeView === "bookings" ? (
                            <>
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
                                                            {booking.sessionDateTime && (
                                                                <div className="flex items-center space-x-2 text-sm text-gray-300">
                                                                    <svg className="w-4 h-4 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                                                    </svg>
                                                                    <span>{new Date(booking.sessionDateTime).toLocaleString()}</span>
                                                                </div>
                                                            )}
                                                        </div>
                                                    ))
                                                )}
                                            </div>
                                        </div>

                                        {/* Rejected Bookings */}
                                        <div>
                                            <h2 className="text-xl font-bold text-white mb-4">Rejected Sessions ({rejectedBookings.length})</h2>
                                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                                {rejectedBookings.length === 0 ? (
                                                    <div className="col-span-full glass-panel p-8 text-center">
                                                        <p className="text-gray-400">No rejected bookings.</p>
                                                    </div>
                                                ) : (
                                                    rejectedBookings.map((booking) => (
                                                        <div key={booking.id} className="glass-panel p-6 space-y-3 opacity-75">
                                                            <div className="flex justify-between items-start">
                                                                <h3 className="text-lg font-semibold text-white">{booking.userName}</h3>
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
                                                        </div>
                                                    ))
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </>
                        ) : (
                            <>
                                <div>
                                    <h1 className="text-3xl font-extrabold text-white tracking-tight">My Profile</h1>
                                    <p className="text-gray-400 mt-1">Manage your trainer profile</p>
                                </div>

                                {message && (
                                    <div className="bg-green-900/40 border border-green-700 text-green-300 px-4 py-3 rounded-xl">
                                        {message}
                                    </div>
                                )}

                                {error && (
                                    <div className="bg-red-900/40 border border-red-700 text-red-300 px-4 py-3 rounded-xl">
                                        {error}
                                    </div>
                                )}

                                {!profile ? (
                                    <div className="flex justify-center items-center h-64">
                                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                                    </div>
                                ) : (
                                    <div className="bg-gmsdark-800/50 backdrop-blur-xl border border-gmsdark-700 rounded-2xl overflow-hidden shadow-2xl">
                                        {/* Header/Banner Section */}
                                        <div className="h-32 bg-gradient-to-r from-primary-600 to-primary-900"></div>

                                        <div className="px-8 pb-8">
                                            <div className="relative flex justify-between items-end -mt-12 mb-6">
                                                <div className="flex items-end gap-6">
                                                    <div className="w-32 h-32 rounded-2xl bg-gmsdark-900 border-4 border-gmsdark-800 flex items-center justify-center text-4xl font-bold text-white shadow-xl overflow-hidden">
                                                        {formData.profileImageUrl ? (
                                                            <img src={formData.profileImageUrl} alt="Profile" className="w-full h-full object-cover" />
                                                        ) : (
                                                            currentUser.username.substring(0, 1).toUpperCase()
                                                        )}
                                                    </div>
                                                    <div className="mb-2">
                                                        <h2 className="text-3xl font-bold text-white mb-1">
                                                            {profile?.fullName || currentUser.username}
                                                        </h2>
                                                        <p className="text-gray-400">@{currentUser.username} • {currentUser.email}</p>
                                                    </div>
                                                </div>

                                                {!isEditing && (
                                                    <div className="flex gap-3">
                                                        <button onClick={() => setIsEditing(true)} className="px-6 py-2 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg shadow-primary-900/20">Edit Profile</button>
                                                        <button onClick={handleDeleteAccount} className="px-6 py-2 bg-red-600/20 hover:bg-red-600 text-red-500 hover:text-white border border-red-600/50 font-semibold rounded-lg transition-all duration-300">Delete Account</button>
                                                    </div>
                                                )}
                                            </div>

                                            {isEditing ? (
                                                <form onSubmit={handleSubmit} className="space-y-6">
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                        <div className="space-y-2">
                                                            <label className="text-sm font-medium text-gray-400">Full Name</label>
                                                            <input type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} className="w-full bg-gmsdark-900 border border-gmsdark-600 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-primary-500 transition-colors" placeholder="Enter your full name" />
                                                        </div>
                                                        <div className="space-y-2">
                                                            <label className="text-sm font-medium text-gray-400">Phone Number</label>
                                                            <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleInputChange} className="w-full bg-gmsdark-900 border border-gmsdark-600 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-primary-500 transition-colors" placeholder="Phone number" />
                                                        </div>
                                                        <div className="space-y-2">
                                                            <label className="text-sm font-medium text-gray-400">Specialization</label>
                                                            <input type="text" name="specialization" value={formData.specialization} onChange={handleInputChange} className="w-full bg-gmsdark-900 border border-gmsdark-600 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-primary-500 transition-colors" placeholder="e.g. Yoga, Crossfit" />
                                                        </div>
                                                        <div className="space-y-2">
                                                            <label className="text-sm font-medium text-gray-400">Gender</label>
                                                            <select name="gender" value={formData.gender} onChange={handleInputChange} className="w-full bg-gmsdark-900 border border-gmsdark-600 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-primary-500 transition-colors">
                                                                <option value="">Select Gender</option>
                                                                <option value="Male">Male</option>
                                                                <option value="Female">Female</option>
                                                                <option value="Other">Other</option>
                                                            </select>
                                                        </div>
                                                        <div className="space-y-2">
                                                            <label className="text-sm font-medium text-gray-400">Age</label>
                                                            <input type="number" name="age" value={formData.age} onChange={handleInputChange} className="w-full bg-gmsdark-900 border border-gmsdark-600 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-primary-500 transition-colors" placeholder="Age" min="18" max="100" />
                                                        </div>
                                                        <div className="space-y-2 md:col-span-2">
                                                            <label className="text-sm font-medium text-gray-400">Address</label>
                                                            <input type="text" name="address" value={formData.address} onChange={handleInputChange} className="w-full bg-gmsdark-900 border border-gmsdark-600 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-primary-500 transition-colors" placeholder="Address" />
                                                        </div>
                                                        <div className="space-y-2 md:col-span-2">
                                                            <label className="text-sm font-medium text-gray-400">Bio</label>
                                                            <textarea name="bio" value={formData.bio} onChange={handleInputChange} rows="3" className="w-full bg-gmsdark-900 border border-gmsdark-600 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-primary-500 transition-colors resize-none" placeholder="Tell us about yourself"></textarea>
                                                        </div>
                                                        <div className="space-y-2 md:col-span-2">
                                                            <label className="text-sm font-medium text-gray-400">Profile Image URL</label>
                                                            <input type="text" name="profileImageUrl" value={formData.profileImageUrl} onChange={handleInputChange} className="w-full bg-gmsdark-900 border border-gmsdark-600 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-primary-500 transition-colors" placeholder="https://..." />
                                                        </div>
                                                    </div>
                                                    <div className="flex gap-4 pt-4">
                                                        <button type="submit" className="px-8 py-2.5 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-xl transition-all duration-300">Save Changes</button>
                                                        <button type="button" onClick={() => setIsEditing(false)} className="px-8 py-2.5 bg-gmsdark-700 hover:bg-gmsdark-600 text-white font-semibold rounded-xl transition-all duration-300">Cancel</button>
                                                    </div>
                                                </form>
                                            ) : (
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                                    <div className="space-y-6">
                                                        <section>
                                                            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2"><span className="w-1 h-6 bg-primary-500 rounded-full"></span>Personal Information</h3>
                                                            <div className="space-y-4">
                                                                <div><p className="text-xs uppercase tracking-wider text-gray-500 font-bold mb-1">Full Name</p><p className="text-white bg-gmsdark-900/50 backdrop-blur px-4 py-2 rounded-lg border border-gmsdark-700/50">{profile?.fullName || "Not provided"}</p></div>
                                                                <div><p className="text-xs uppercase tracking-wider text-gray-500 font-bold mb-1">Phone</p><p className="text-white bg-gmsdark-900/50 backdrop-blur px-4 py-2 rounded-lg border border-gmsdark-700/50">{profile?.phoneNumber || "Not provided"}</p></div>
                                                                <div><p className="text-xs uppercase tracking-wider text-gray-500 font-bold mb-1">Address</p><p className="text-white bg-gmsdark-900/50 backdrop-blur px-4 py-2 rounded-lg border border-gmsdark-700/50">{profile?.address || "Not provided"}</p></div>
                                                            </div>
                                                        </section>
                                                        <section>
                                                            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2"><span className="w-1 h-6 bg-primary-500 rounded-full"></span>Trainer Details</h3>
                                                            <div className="space-y-4">
                                                                <div><p className="text-xs uppercase tracking-wider text-gray-500 font-bold mb-1">Specialization</p><p className="text-white bg-gmsdark-900/50 backdrop-blur px-4 py-2 rounded-lg border border-gmsdark-700/50">{profile?.specialization || "Not provided"}</p></div>
                                                                <div className="grid grid-cols-2 gap-4">
                                                                    <div><p className="text-xs uppercase tracking-wider text-gray-500 font-bold mb-1">Gender</p><p className="text-white bg-gmsdark-900/50 backdrop-blur px-4 py-2 rounded-lg border border-gmsdark-700/50">{profile?.gender || "Not provided"}</p></div>
                                                                    <div><p className="text-xs uppercase tracking-wider text-gray-500 font-bold mb-1">Age</p><p className="text-white bg-gmsdark-900/50 backdrop-blur px-4 py-2 rounded-lg border border-gmsdark-700/50">{profile?.age ? `${profile.age} years` : "Not provided"}</p></div>
                                                                </div>
                                                            </div>
                                                        </section>
                                                    </div>
                                                    <div className="space-y-6">
                                                        <section>
                                                            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2"><span className="w-1 h-6 bg-primary-500 rounded-full"></span>About</h3>
                                                            <div className="bg-gmsdark-900/50 backdrop-blur p-4 rounded-xl border border-gmsdark-700/50 min-h-[100px]"><p className="text-gray-300 leading-relaxed italic">{profile?.bio || "No bio available."}</p></div>
                                                        </section>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TrainerDashboard;
