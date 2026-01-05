import { Link } from "react-router-dom";

const PaymentCancel = () => {
    return (
        <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-[60vh]">
            <div className="text-center bg-dark-800 p-8 rounded-xl border border-yellow-600/30 shadow-2xl max-w-md">
                <div className="w-20 h-20 bg-yellow-900/30 text-yellow-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
                </div>
                <h1 className="text-3xl font-bold text-white mb-2">Payment Cancelled</h1>
                <p className="text-gray-400 mb-8">No worries! You can try again whenever you're ready.</p>
                <div className="space-x-4">
                    <Link to="/plans" className="btn-primary inline-block">
                        View Plans
                    </Link>
                    <Link to="/" className="text-gray-400 hover:text-white transition-colors">
                        Return Home
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default PaymentCancel;
