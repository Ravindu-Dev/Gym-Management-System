import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import TrainerService from "../services/trainer.service";
import AuthService from "../services/auth.service";

const AdminTrainerManagement = () => {
    const [allTrainers, setAllTrainers] = useState([]);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState("pending"); // pending, approved, rejected

    useEffect(() => {
        loadAllTrainers();
    }, []);

    const loadAllTrainers = () => {
        setLoading(true);
        TrainerService.getAllTrainers().then(
            (response) => {
                setAllTrainers(response.data);
                setLoading(false);
            },
            (error) => {
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();
                setMessage(resMessage);
                setLoading(false);
            }
        );
    };

    const handleApprove = (id) => {
        TrainerService.approveTrainer(id).then(
            () => {
                setMessage("Trainer approved successfully!");
                setTimeout(() => setMessage(""), 3000);
                loadAllTrainers();
            },
            (error) => {
                setMessage("Could not approve trainer.");
                setTimeout(() => setMessage(""), 3000);
            }
        );
    };

    const handleReject = (id) => {
        TrainerService.rejectTrainer(id).then(
            () => {
                setMessage("Trainer rejected successfully!");
                setTimeout(() => setMessage(""), 3000);
                loadAllTrainers();
            },
            (error) => {
                setMessage("Could not reject trainer.");
                setTimeout(() => setMessage(""), 3000);
            }
        );
    };

    const pendingTrainers = allTrainers.filter(t => t.status === "PENDING");
    const approvedTrainers = allTrainers.filter(t => t.status === "APPROVED");
    const rejectedTrainers = allTrainers.filter(t => t.status === "REJECTED");

    const getDisplayTrainers = () => {
        switch (activeTab) {
            case "pending": return pendingTrainers;
            case "approved": return approvedTrainers;
            case "rejected": return rejectedTrainers;
            default: return pendingTrainers;
        }
    };

    return (
        <div className="container mx-auto px-6 py-10">
            <div className="flex justify-between items-center mb-8">
                <div className="flex items-center space-x-6">
                    <Link to="/admin" className="w-10 h-10 bg-dark-800 rounded-xl flex items-center justify-center text-gray-400 hover:text-primary-500 hover:bg-primary-900/20 transition-all border border-dark-700">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
                    </Link>
                    <div>
                        <h2 className="text-3xl font-extrabold text-white tracking-tight">Trainer Management</h2>
                        <p className="text-gray-400 mt-1">Approve and manage trainer registrations</p>
                    </div>
                </div>
                <button
                    onClick={loadAllTrainers}
                    className="p-3 bg-white/5 hover:bg-white/10 rounded-xl text-gray-400 hover:text-white transition-all border border-white/5"
                    title="Refresh List"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                </button>
            </div>

            {message && (
                <div className="mb-6 bg-blue-900/50 border border-blue-500 text-blue-200 px-4 py-3 rounded-xl relative animate-in fade-in slide-in-from-top-2 duration-300">
                    {message}
                </div>
            )}

            {/* Tabs */}
            <div className="flex space-x-2 mb-6 border-b border-dark-700">
                <button
                    onClick={() => setActiveTab("pending")}
                    className={`px-6 py-3 font-bold text-sm transition-all relative ${activeTab === "pending"
                        ? "text-primary-400 border-b-2 border-primary-500"
                        : "text-gray-500 hover:text-gray-300"
                        }`}
                >
                    Pending
                    {pendingTrainers.length > 0 && (
                        <span className="ml-2 px-2 py-0.5 bg-yellow-900/50 text-yellow-400 text-xs rounded-full border border-yellow-500/50">
                            {pendingTrainers.length}
                        </span>
                    )}
                </button>
                <button
                    onClick={() => setActiveTab("approved")}
                    className={`px-6 py-3 font-bold text-sm transition-all relative ${activeTab === "approved"
                        ? "text-primary-400 border-b-2 border-primary-500"
                        : "text-gray-500 hover:text-gray-300"
                        }`}
                >
                    Approved
                    {approvedTrainers.length > 0 && (
                        <span className="ml-2 px-2 py-0.5 bg-green-900/50 text-green-400 text-xs rounded-full border border-green-500/50">
                            {approvedTrainers.length}
                        </span>
                    )}
                </button>
                <button
                    onClick={() => setActiveTab("rejected")}
                    className={`px-6 py-3 font-bold text-sm transition-all relative ${activeTab === "rejected"
                        ? "text-primary-400 border-b-2 border-primary-500"
                        : "text-gray-500 hover:text-gray-300"
                        }`}
                >
                    Rejected
                    {rejectedTrainers.length > 0 && (
                        <span className="ml-2 px-2 py-0.5 bg-red-900/50 text-red-400 text-xs rounded-full border border-red-500/50">
                            {rejectedTrainers.length}
                        </span>
                    )}
                </button>
            </div>

            {loading ? (
                <div className="flex justify-center items-center h-64 card">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                </div>
            ) : (
                <div className="card overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-dark-900/50 text-gray-500 text-xs font-bold uppercase tracking-widest border-b border-dark-700">
                                    <th className="px-6 py-4">Trainer Info</th>
                                    <th className="px-6 py-4">Specialization</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-dark-700/50">
                                {getDisplayTrainers().length === 0 ? (
                                    <tr>
                                        <td colSpan="4" className="text-center py-20 text-gray-500 italic">
                                            No {activeTab} trainers found.
                                        </td>
                                    </tr>
                                ) : (
                                    getDisplayTrainers().map((trainer) => (
                                        <tr key={trainer.id} className="hover:bg-dark-700/20 transition-colors group">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center space-x-3">
                                                    <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center">
                                                        <span className="text-lg font-bold text-white">
                                                            {trainer.username?.charAt(0).toUpperCase()}
                                                        </span>
                                                    </div>
                                                    <div>
                                                        <div className="font-bold text-white group-hover:text-primary-400 transition-colors">
                                                            {trainer.fullName || trainer.username}
                                                        </div>
                                                        <div className="text-xs text-gray-500">{trainer.email}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-dark-900 text-gray-300 border border-dark-700">
                                                    {trainer.specialization || "General Fitness"}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest border ${trainer.status === 'PENDING' ? 'bg-yellow-900/20 text-yellow-400 border-yellow-500/30' :
                                                    trainer.status === 'APPROVED' ? 'bg-green-900/20 text-green-400 border-green-500/30' :
                                                        'bg-red-900/20 text-red-400 border-red-500/30'
                                                    }`}>
                                                    <span className={`w-1.5 h-1.5 rounded-full mr-2 ${trainer.status === 'PENDING' ? 'bg-yellow-400' :
                                                        trainer.status === 'APPROVED' ? 'bg-green-400' :
                                                            'bg-red-400'
                                                        }`}></span>
                                                    {trainer.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex justify-end space-x-2">
                                                    {trainer.status === "PENDING" && (
                                                        <>
                                                            <button
                                                                onClick={() => handleApprove(trainer.id)}
                                                                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-xs font-bold uppercase tracking-widest rounded-lg transition-all"
                                                            >
                                                                Approve
                                                            </button>
                                                            <button
                                                                onClick={() => handleReject(trainer.id)}
                                                                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold uppercase tracking-widest rounded-lg transition-all"
                                                            >
                                                                Reject
                                                            </button>
                                                        </>
                                                    )}
                                                    {trainer.status === "REJECTED" && (
                                                        <button
                                                            onClick={() => handleApprove(trainer.id)}
                                                            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-xs font-bold uppercase tracking-widest rounded-lg transition-all"
                                                        >
                                                            Approve
                                                        </button>
                                                    )}
                                                    {trainer.status === "APPROVED" && (
                                                        <button
                                                            onClick={() => handleReject(trainer.id)}
                                                            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold uppercase tracking-widest rounded-lg transition-all"
                                                        >
                                                            Revoke
                                                        </button>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminTrainerManagement;
