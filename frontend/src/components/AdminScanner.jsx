import { useState, useEffect } from "react";
import AttendanceService from "../services/attendance.service";
import { Link } from "react-router-dom";
import { Html5QrcodeScanner } from "html5-qrcode";

const AdminScanner = () => {
    const [userId, setUserId] = useState("");
    const [message, setMessage] = useState("");
    const [status, setStatus] = useState("idle"); // idle, success, error
    const [showScanner, setShowScanner] = useState(false);

    useEffect(() => {
        let scanner = null;

        if (showScanner) {
            // Initialize scanner when showScanner is true
            scanner = new Html5QrcodeScanner(
                "reader",
                { fps: 10, qrbox: { width: 250, height: 250 } },
                /* verbose= */ false
            );

            scanner.render(
                (decodedText) => {
                    // Success callback
                    setUserId(decodedText);
                    handleScanSuccess(decodedText);
                    scanner.clear();
                    setShowScanner(false);
                },
                (errorMessage) => {
                    // Error callback (ignore for scanning in progress)
                    // console.log(errorMessage);
                }
            );
        }

        return () => {
            // Cleanup scanner on component unmount or when showScanner changes
            if (scanner) {
                scanner.clear().catch(error => console.error("Failed to clear scanner", error));
            }
        };
    }, [showScanner]);

    const handleScanSuccess = (scannedId) => {
        setMessage("Processing Scan...");
        setStatus("idle");

        AttendanceService.checkIn(scannedId).then(
            () => {
                setMessage(`Check-in SUCCESS for User ID: ${scannedId}`);
                setStatus("success");
                // setUserId(""); // Keep ID visible for confirmation? Or clear it? Let's keep it for a moment or clear.
                // Optionally clear after delay
                setTimeout(() => setUserId(""), 3000);
            },
            (error) => {
                setMessage("Check-in FAILED: " + (error.response?.data?.message || error.message));
                setStatus("error");
            }
        );
    };

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
        <div className="container mx-auto px-6 py-10">
            <div className="flex items-center space-x-6 mb-12">
                <Link to="/admin" className="w-10 h-10 bg-gmsdark-800 rounded-xl flex items-center justify-center text-gray-400 hover:text-primary-500 hover:bg-primary-900/20 transition-all border border-gmsdark-700">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
                </Link>
                <div>
                    <h1 className="text-3xl font-extrabold text-white tracking-tight">Entry Scanner</h1>
                    <p className="text-gray-400 mt-1">Access control and attendance logging</p>
                </div>
            </div>

            <div className="max-w-xl mx-auto">
                <div className="glass-card p-10 border-t-4 border-t-primary-600 shadow-2xl">
                    <div className="text-center mb-10">
                        <div className="w-20 h-20 bg-primary-900/30 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-primary-500/20">
                            <svg className="w-10 h-10 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"></path></svg>
                        </div>
                        <h2 className="text-2xl font-bold text-white mb-2">Member Authentication</h2>
                        <p className="text-gray-500">Scan QR code or enter Member ID manually</p>
                    </div>

                    {/* Camera Scanner Section */}
                    <div className="mb-8">
                        {!showScanner ? (
                            <button
                                onClick={() => setShowScanner(true)}
                                className="w-full py-3 bg-gmsdark-700 hover:bg-gmsdark-600 text-white rounded-xl font-semibold border border-gmsdark-600 transition-all flex items-center justify-center gap-2"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                                Open Camera Scanner
                            </button>
                        ) : (
                            <div className="bg-gmsdark-900 p-4 rounded-xl border border-gmsdark-700 animate-in fade-in zoom-in duration-300">
                                <div id="reader" className="w-full rounded-lg overflow-hidden"></div>
                                <button
                                    onClick={() => setShowScanner(false)}
                                    className="w-full mt-4 py-2 bg-red-600/20 hover:bg-red-600/30 text-red-400 rounded-lg text-sm font-semibold transition-all"
                                >
                                    Close Scanner
                                </button>
                            </div>
                        )}
                    </div>

                    <form onSubmit={handleCheckIn} className="space-y-8">
                        <div className="relative">
                            <input
                                type="text"
                                className="w-full bg-gmsdark-950 border-2 border-gmsdark-700 text-white text-2xl text-center py-6 px-4 rounded-2xl focus:ring-4 focus:ring-primary-500/20 focus:border-primary-500 outline-none transition-all placeholder-gray-700 font-mono tracking-widest"
                                placeholder="GMS-000-000"
                                value={userId}
                                onChange={(e) => setUserId(e.target.value)}
                                autoFocus
                            />
                            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                                <span className="text-gray-700 animate-pulse">●</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <button type="submit" className="bg-primary-600 hover:bg-primary-500 text-white font-black py-5 rounded-2xl transition-all shadow-lg shadow-primary-900/20 tracking-widest text-lg">
                                CHECK IN
                            </button>
                            <button type="button" onClick={handleCheckOut} className="bg-gmsdark-700 text-gray-400 hover:text-white hover:bg-gmsdark-600 font-black py-5 rounded-2xl transition-all border border-gmsdark-600 tracking-widest text-lg">
                                CHECK OUT
                            </button>
                        </div>
                    </form>

                    {message && (
                        <div className={`mt-10 p-6 rounded-2xl text-center font-bold animate-in fade-in zoom-in duration-300 ${status === 'success' ? 'bg-green-900/20 text-green-400 border border-green-500/30' :
                            status === 'error' ? 'bg-red-900/20 text-red-400 border border-red-600/30' : 'bg-gmsdark-900 text-gray-400'
                            }`}>
                            <div className="flex items-center justify-center space-x-3">
                                {status === 'success' && <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>}
                                {status === 'error' && <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"></path></svg>}
                                <span>{message}</span>
                            </div>
                        </div>
                    )}
                </div>

                <div className="mt-8 grid grid-cols-2 gap-4">
                    <div className="bg-gmsdark-800/40 p-4 rounded-2xl border border-gmsdark-700 text-center">
                        <p className="text-xs text-gray-500 uppercase font-black mb-1">Total Entry Today</p>
                        <p className="text-xl font-bold text-white">42</p>
                    </div>
                    <div className="bg-gmsdark-800/40 p-4 rounded-2xl border border-gmsdark-700 text-center">
                        <p className="text-xs text-gray-500 uppercase font-black mb-1">Active Now</p>
                        <p className="text-xl font-bold text-green-400">12</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminScanner;
