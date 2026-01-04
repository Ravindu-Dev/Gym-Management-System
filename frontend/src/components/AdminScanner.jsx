import { useState } from "react";
import AttendanceService from "../services/attendance.service";

const AdminScanner = () => {
    const [userId, setUserId] = useState("");
    const [message, setMessage] = useState("");
    const [status, setStatus] = useState("idle"); // idle, success, error

    const handleCheckIn = (e) => {
        e.preventDefault();
        setMessage("Processing...");
        setStatus("idle");

        AttendanceService.checkIn(userId).then(
            () => {
                setMessage(`Check-in SUCCESS for User ID: ${userId}`);
                setStatus("success");
                setUserId("");
            },
            (error) => {
                setMessage("Check-in FAILED: " + (error.response?.data?.message || error.message));
                setStatus("error");
            }
        );
    };

    const handleCheckOut = () => {
        setMessage("Processing...");
        setStatus("idle");

        AttendanceService.checkOut(userId).then(
            () => {
                setMessage(`Check-out SUCCESS for User ID: ${userId}`);
                setStatus("success");
                setUserId("");
            },
            (error) => {
                setMessage("Check-out FAILED: " + (error.response?.data?.message || error.message));
                setStatus("error");
            }
        );
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-white mb-8 text-center">Attendance Scanner</h1>

            <div className="max-w-md mx-auto bg-dark-800 p-8 rounded-lg border border-dark-700 shadow-xl">
                <div className="mb-6 text-center">
                    <p className="text-gray-400">Enter Member ID manually or focus here to scan.</p>
                </div>

                <form onSubmit={handleCheckIn} className="space-y-6">
                    <div>
                        <input
                            type="text"
                            className="w-full bg-dark-900 border border-dark-600 text-white text-xl text-center p-4 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all placeholder-gray-600"
                            placeholder="Scan / Enter Member ID"
                            value={userId}
                            onChange={(e) => setUserId(e.target.value)}
                            autoFocus
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <button type="submit" className="btn-primary py-4 text-lg">
                            CHECK IN
                        </button>
                        <button type="button" onClick={handleCheckOut} className="bg-dark-700 text-gray-300 hover:bg-dark-600 font-bold py-4 rounded-lg transition-colors border border-dark-600">
                            CHECK OUT
                        </button>
                    </div>
                </form>

                {message && (
                    <div className={`mt-8 p-4 rounded-lg text-center font-medium ${status === 'success' ? 'bg-green-900/50 text-green-300 border border-green-600' :
                            status === 'error' ? 'bg-red-900/50 text-red-300 border border-red-600' : 'text-gray-300'
                        }`}>
                        {message}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminScanner;
