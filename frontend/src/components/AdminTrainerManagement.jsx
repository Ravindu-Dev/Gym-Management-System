import { useState, useEffect } from "react";
import TrainerService from "../services/trainer.service";

const AdminTrainerManagement = () => {
    const [pendingTrainers, setPendingTrainers] = useState([]);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadPendingTrainers();
    }, []);

    const loadPendingTrainers = () => {
        setLoading(true);
        TrainerService.getPendingTrainers().then(
            (response) => {
                setPendingTrainers(response.data);
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
                loadPendingTrainers();
            },
            (error) => {
                setMessage("Could not approve trainer.");
            }
        );
    };

    const handleReject = (id) => {
        TrainerService.rejectTrainer(id).then(
            () => {
                setMessage("Trainer rejected successfully!");
                loadPendingTrainers();
            },
            (error) => {
                setMessage("Could not reject trainer.");
            }
        );
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">Trainer Registration Requests</h2>
                <button
                    onClick={loadPendingTrainers}
                    className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-all"
                    title="Refresh List"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                </button>
            </div>

            {message && (
                <div className="mb-4 bg-blue-900/50 border border-blue-500 text-blue-200 px-4 py-3 rounded relative">
                    {message}
                </div>
            )}

            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {pendingTrainers.length === 0 ? (
                        <div className="col-span-full text-center py-12 glass-panel">
                            <p className="text-gray-400">No pending trainer requests.</p>
                        </div>
                    ) : (
                        pendingTrainers.map((trainer) => (
                            <div key={trainer.id} className="glass-panel p-6 space-y-4">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="text-xl font-semibold text-white">{trainer.username}</h3>
                                        <p className="text-sm text-gray-400">{trainer.email}</p>
                                    </div>
                                    <span className="px-2 py-1 bg-yellow-900/50 text-yellow-500 text-xs font-medium rounded-full border border-yellow-500/50 uppercase">
                                        Pending
                                    </span>
                                </div>

                                <div className="space-y-2">
                                    <div className="text-sm">
                                        <span className="text-gray-500">Specialization:</span>
                                        <span className="ml-2 text-gray-200">{trainer.specialization || "N/A"}</span>
                                    </div>
                                </div>

                                <div className="flex space-x-3 pt-4 border-t border-white/5">
                                    <button
                                        onClick={() => handleApprove(trainer.id)}
                                        className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg transition-colors"
                                    >
                                        Approve
                                    </button>
                                    <button
                                        onClick={() => handleReject(trainer.id)}
                                        className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg transition-colors"
                                    >
                                        Reject
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
};

export default AdminTrainerManagement;
