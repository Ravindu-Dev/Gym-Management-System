import { useState, useEffect } from "react";
import AuthService from "../services/auth.service";
import QRCode from "react-qr-code";

const MemberQR = () => {
    const [currentUser, setCurrentUser] = useState(undefined);

    useEffect(() => {
        const user = AuthService.getCurrentUser();
        if (user) setCurrentUser(user);
    }, []);

    if (!currentUser) return null;

    return (
        <div className="container mx-auto px-4 py-8 flex flex-col items-center justify-center min-h-[60vh]">
            <h1 className="text-3xl font-bold text-white mb-8">Your Member Pass</h1>

            <div className="bg-white p-8 rounded-lg shadow-2xl">
                <div style={{ height: "auto", margin: "0 auto", maxWidth: 256, width: "100%" }}>
                    <QRCode
                        size={256}
                        style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                        value={currentUser.id}
                        viewBox={`0 0 256 256`}
                    />
                </div>
            </div>

            <div className="mt-8 text-center text-gray-400">
                <p className="text-lg text-white font-medium">{currentUser.username}</p>
                <p className="text-sm">Scan this at the front desk to check in.</p>
                <p className="text-xs mt-2 uppercase tracking-widest opacity-50">Member ID: {currentUser.id}</p>
            </div>
        </div>
    );
};

export default MemberQR;
