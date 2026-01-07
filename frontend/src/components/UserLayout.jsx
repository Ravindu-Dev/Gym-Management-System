import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import AuthService from '../services/auth.service';

const UserLayout = ({ children, user }) => {
    const location = useLocation();
    const navigate = useNavigate();

    const menuItems = [
        { name: 'Dashboard', path: '/user', icon: '📊' },
        { name: 'Classes', path: '/classes', icon: '🗓️' },
        { name: 'Workouts', path: '/workouts', icon: '💪' },
        { name: 'Nutrition Log', path: '/nutrition', icon: '🥗' },
        { name: 'Book Trainer', path: '/book-trainer', icon: '🏋️' },
        { name: 'My Bookings', path: '/my-bookings', icon: '📋' },
        { name: 'My Pass', path: '/my-qr', icon: '📱' },
        { name: 'Plans', path: '/plans', icon: '💎' },
        { name: 'Profile', path: '/profile', icon: '👤' },
    ];

    const logOut = () => {
        AuthService.logout();
        navigate("/login");
        window.location.reload();
    };

    return (
        <div className="flex min-h-screen bg-gmsdark-950">
            {/* Sidebar */}
            <aside className="fixed left-0 top-0 h-screen w-64 bg-gmsdark-900 border-r border-white/5 flex flex-col z-50">
                <div className="p-8">
                    <Link to="/" className="text-3xl font-display font-bold heading-gradient tracking-tighter">
                        GMS
                    </Link>
                </div>

                <nav className="flex-1 px-4 space-y-2">
                    {menuItems.map((item) => {
                        const isActive = location.pathname === item.path;
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group ${isActive
                                    ? 'bg-primary-600/10 text-primary-400 border border-primary-500/20 shadow-lg shadow-primary-500/5'
                                    : 'text-gray-400 hover:bg-white/5 hover:text-white'
                                    }`}
                            >
                                <span className={`text-xl transition-transform duration-200 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`}>
                                    {item.icon}
                                </span>
                                <span className="font-medium">{item.name}</span>
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-white/5 space-y-4">
                    <div className="px-4 py-3 rounded-2xl bg-white/5 flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full bg-primary-600 flex items-center justify-center font-bold text-white">
                            {user?.username?.[0]?.toUpperCase() || 'U'}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-white truncate">{user?.username || 'User'}</p>
                            <p className="text-xs text-gray-500 truncate capitalize">{user?.roles?.[0]?.replace('ROLE_', '').toLowerCase() || 'Member'}</p>
                        </div>
                    </div>
                    <button
                        onClick={logOut}
                        className="w-full flex items-center justify-center space-x-2 px-4 py-3 rounded-xl text-gray-400 hover:bg-red-500/10 hover:text-red-400 transition-colors duration-200 font-medium"
                    >
                        <span>🚪</span>
                        <span>Sign Out</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="ml-64 flex-1 p-8 animate-fade-in">
                <div className="max-w-7xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
};

export default UserLayout;
