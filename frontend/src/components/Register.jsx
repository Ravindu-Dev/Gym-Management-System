import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/auth.service";
import { isEmail } from "validator";

const Register = () => {
    let navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [successful, setSuccessful] = useState(false);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleRegister = (e) => {
        e.preventDefault();

        setMessage("");
        setSuccessful(false);
        setLoading(true);

        if (!username || !email || !password) {
            setMessage("All fields are required.");
            setLoading(false);
            return;
        }

        if (username.length < 3 || username.length > 20) {
            setMessage("Username must be between 3 and 20 characters.");
            setLoading(false);
            return;
        }

        if (!isEmail(email)) {
            setMessage("This is not a valid email.");
            setLoading(false);
            return;
        }

        if (password.length < 6 || password.length > 40) {
            setMessage("Password must be between 6 and 40 characters.");
            setLoading(false);
            return;
        }

        AuthService.register(username, email, password).then(
            (response) => {
                setMessage(response.data.message);
                setSuccessful(true);
                setLoading(false);
                setTimeout(() => {
                    navigate("/login");
                }, 2000);
            },
            (error) => {
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();

                setMessage(resMessage);
                setSuccessful(false);
                setLoading(false);
            }
        );
    };

    return (
        <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
            <div className="card w-full max-w-md space-y-8">
                <div className="text-center">
                    <h2 className="mt-6 text-3xl font-extrabold text-white">Create an account</h2>
                    <p className="mt-2 text-sm text-gray-400">Join our community today</p>
                </div>

                <form onSubmit={handleRegister} className="mt-8 space-y-6">
                    {!successful && (
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="username" className="block text-sm font-medium text-gray-300">Username</label>
                                <input
                                    type="text"
                                    className="input-field mt-1"
                                    name="username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    placeholder="Choose a username"
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email</label>
                                <input
                                    type="text"
                                    className="input-field mt-1"
                                    name="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="you@example.com"
                                />
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-300">Password</label>
                                <input
                                    type="password"
                                    className="input-field mt-1"
                                    name="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>
                    )}

                    {message && (
                        <div className={`border px-4 py-3 rounded relative ${successful ? 'bg-green-900/50 border-green-500 text-green-200' : 'bg-red-900/50 border-red-500 text-red-200'}`} role="alert">
                            <span className="block sm:inline">{message}</span>
                        </div>
                    )}

                    {!successful && (
                        <button
                            type="submit"
                            className="w-full btn-primary flex justify-center relative"
                            disabled={loading}
                        >
                            {loading && (
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            )}
                            {loading ? 'Signing up...' : 'Sign Up'}
                        </button>
                    )}
                </form>
            </div>
        </div>
    );
};

export default Register;
