import { useState, useEffect, useMemo } from "react";
import AuthService from "../services/auth.service";
import UserService from "../services/user.service";

const Profile = () => {
    const currentUser = useMemo(() => AuthService.getCurrentUser(), []);
    const [profile, setProfile] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    const [formData, setFormData] = useState({
        fullName: "",
        phoneNumber: "",
        address: "",
        bio: "",
        profileImageUrl: ""
    });

    useEffect(() => {
        if (currentUser) {
            fetchProfile();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fetchProfile = () => {
        setLoading(true);
        UserService.getUserProfile()
            .then(response => {
                setProfile(response.data);
                setFormData({
                    fullName: response.data.fullName || "",
                    phoneNumber: response.data.phoneNumber || "",
                    address: response.data.address || "",
                    bio: response.data.bio || "",
                    profileImageUrl: response.data.profileImageUrl || ""
                });
                setLoading(false);
            })
            .catch(err => {
                setError("Could not fetch profile data.");
                setLoading(false);
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

    if (!currentUser) {
        return (
            <div className="text-center py-20">
                <h2 className="text-2xl font-bold text-red-500">Access Denied</h2>
                <p className="text-gray-400">Please login to view this page.</p>
            </div>
        );
    }

    if (loading) {
        return <div className="text-center py-20 text-white">Loading profile...</div>;
    }

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
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
                                <button
                                    onClick={() => setIsEditing(true)}
                                    className="px-6 py-2 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg shadow-primary-900/20"
                                >
                                    Edit Profile
                                </button>
                                <button
                                    onClick={handleDeleteAccount}
                                    className="px-6 py-2 bg-red-600/20 hover:bg-red-600 text-red-500 hover:text-white border border-red-600/50 font-semibold rounded-lg transition-all duration-300"
                                >
                                    Delete Account
                                </button>
                            </div>
                        )}
                    </div>

                    {message && (
                        <div className="mb-6 p-4 bg-green-900/40 border border-green-700 text-green-300 rounded-xl animate-fade-in">
                            {message}
                        </div>
                    )}

                    {error && (
                        <div className="mb-6 p-4 bg-red-900/40 border border-red-700 text-red-300 rounded-xl animate-fade-in">
                            {error}
                        </div>
                    )}

                    {isEditing ? (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-400">Full Name</label>
                                    <input
                                        type="text"
                                        name="fullName"
                                        value={formData.fullName}
                                        onChange={handleInputChange}
                                        className="w-full bg-gmsdark-900 border border-gmsdark-600 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-primary-500 transition-colors"
                                        placeholder="Enter your full name"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-400">Phone Number</label>
                                    <input
                                        type="text"
                                        name="phoneNumber"
                                        value={formData.phoneNumber}
                                        onChange={handleInputChange}
                                        className="w-full bg-gmsdark-900 border border-gmsdark-600 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-primary-500 transition-colors"
                                        placeholder="Phone number"
                                    />
                                </div>
                                <div className="space-y-2 md:col-span-2">
                                    <label className="text-sm font-medium text-gray-400">Address</label>
                                    <input
                                        type="text"
                                        name="address"
                                        value={formData.address}
                                        onChange={handleInputChange}
                                        className="w-full bg-gmsdark-900 border border-gmsdark-600 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-primary-500 transition-colors"
                                        placeholder="Home or work address"
                                    />
                                </div>
                                <div className="space-y-2 md:col-span-2">
                                    <label className="text-sm font-medium text-gray-400">Bio</label>
                                    <textarea
                                        name="bio"
                                        value={formData.bio}
                                        onChange={handleInputChange}
                                        rows="3"
                                        className="w-full bg-gmsdark-900 border border-gmsdark-600 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-primary-500 transition-colors resize-none"
                                        placeholder="Tell us about yourself"
                                    ></textarea>
                                </div>
                                <div className="space-y-2 md:col-span-2">
                                    <label className="text-sm font-medium text-gray-400">Profile Image URL</label>
                                    <input
                                        type="text"
                                        name="profileImageUrl"
                                        value={formData.profileImageUrl}
                                        onChange={handleInputChange}
                                        className="w-full bg-gmsdark-900 border border-gmsdark-600 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-primary-500 transition-colors"
                                        placeholder="https://..."
                                    />
                                </div>
                            </div>

                            <div className="flex gap-4 pt-4">
                                <button
                                    type="submit"
                                    className="px-8 py-2.5 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-xl transition-all duration-300"
                                >
                                    Save Changes
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setIsEditing(false)}
                                    className="px-8 py-2.5 bg-dark-700 hover:bg-dark-600 text-white font-semibold rounded-xl transition-all duration-300"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-6">
                                <section>
                                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                                        <span className="w-1 h-6 bg-primary-500 rounded-full"></span>
                                        Personal Information
                                    </h3>
                                    <div className="space-y-4">
                                        <div>
                                            <p className="text-xs uppercase tracking-wider text-gray-500 font-bold mb-1">Full Name</p>
                                            <p className="text-white bg-dark-900/50 backdrop-blur px-4 py-2 rounded-lg border border-dark-700/50">
                                                {profile?.fullName || "Not provided"}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-xs uppercase tracking-wider text-gray-500 font-bold mb-1">Phone</p>
                                            <p className="text-white bg-dark-900/50 backdrop-blur px-4 py-2 rounded-lg border border-dark-700/50">
                                                {profile?.phoneNumber || "Not provided"}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-xs uppercase tracking-wider text-gray-500 font-bold mb-1">Address</p>
                                            <p className="text-white bg-dark-900/50 backdrop-blur px-4 py-2 rounded-lg border border-dark-700/50">
                                                {profile?.address || "Not provided"}
                                            </p>
                                        </div>
                                    </div>
                                </section>
                            </div>

                            <div className="space-y-6">
                                <section>
                                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                                        <span className="w-1 h-6 bg-primary-500 rounded-full"></span>
                                        About
                                    </h3>
                                    <div className="bg-dark-900/50 backdrop-blur p-4 rounded-xl border border-dark-700/50 min-h-[100px]">
                                        <p className="text-gray-300 leading-relaxed italic">
                                            {profile?.bio || "No bio available. Add one to let people know more about you!"}
                                        </p>
                                    </div>
                                </section>

                                <section>
                                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                                        <span className="w-1 h-6 bg-primary-500 rounded-full"></span>
                                        Account Details
                                    </h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="bg-dark-900/50 backdrop-blur p-4 rounded-xl border border-dark-700/50">
                                            <p className="text-xs text-gray-500 uppercase font-bold mb-1">User ID</p>
                                            <p className="text-white text-sm font-mono truncate">{currentUser.id}</p>
                                        </div>
                                        <div className="bg-dark-900/50 backdrop-blur p-4 rounded-xl border border-dark-700/50">
                                            <p className="text-xs text-gray-500 uppercase font-bold mb-1">Roles</p>
                                            <div className="flex flex-wrap gap-1 mt-1">
                                                {currentUser.roles?.map((role, i) => (
                                                    <span key={i} className="text-[10px] bg-primary-900/30 text-primary-400 px-2 py-0.5 rounded-full border border-primary-800/50">
                                                        {role.replace("ROLE_", "")}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;
