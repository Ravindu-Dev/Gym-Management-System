import AuthService from "../services/auth.service";

const Profile = () => {
    const currentUser = AuthService.getCurrentUser();

    if (!currentUser) {
        // Redirect or show access denied
        return (
            <div className="text-center py-20">
                <h2 className="text-2xl font-bold text-red-500">Access Denied</h2>
                <p className="text-gray-400">Please login to view this page.</p>
            </div>
        )
    }

    return (
        <div className="max-w-4xl mx-auto">
            <div className="card">
                <div className="flex items-center space-x-6 mb-8">
                    <div className="w-20 h-20 bg-primary-600 rounded-full flex items-center justify-center text-3xl font-bold text-white uppercase">
                        {currentUser.username.substring(0, 1)}
                    </div>
                    <div>
                        <h2 className="text-3xl font-bold text-white">{currentUser.username}</h2>
                        <p className="text-gray-400">{currentUser.email}</p>
                    </div>
                </div>

                <div className="bg-dark-900 rounded-lg p-6 border border-dark-700">
                    <h3 className="text-lg font-semibold text-white mb-4">Account Information</h3>
                    <div className="space-y-3">
                        <div className="flex border-b border-dark-700 pb-2">
                            <span className="text-gray-400 w-32">User ID:</span>
                            <span className="text-white font-mono text-sm">{currentUser.id}</span>
                        </div>
                        <div className="flex border-b border-dark-700 pb-2">
                            <span className="text-gray-400 w-32">Token:</span>
                            <span className="text-white font-mono text-xs truncate w-full" title={currentUser.token}>
                                {currentUser.token.substring(0, 20)}...{currentUser.token.substr(currentUser.token.length - 20)}
                            </span>
                        </div>
                        <div className="flex pt-2">
                            <span className="text-gray-400 w-32">Authorities:</span>
                            <div className="flex flex-wrap gap-2">
                                {currentUser.roles &&
                                    currentUser.roles.map((role, index) => (
                                        <span key={index} className="px-2 py-1 bg-primary-900/50 border border-primary-700 text-primary-300 text-xs rounded-full">
                                            {role}
                                        </span>
                                    ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
