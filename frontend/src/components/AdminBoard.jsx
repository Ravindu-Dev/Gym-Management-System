import { useState, useEffect } from "react";
import UserService from "../services/user.service";
import axios from "axios";
import AuthService from "../services/auth.service";
import authHeader from "../services/auth-header";
import { Link, useNavigate } from "react-router-dom";

const API_URL = "http://localhost:8081/api/equipment";

const AdminBoard = () => {
    const [content, setContent] = useState("");
    const [equipment, setEquipment] = useState([]);
    const [showAddForm, setShowAddForm] = useState(false);
    const [newItem, setNewItem] = useState({ name: "", type: "", status: "FUNCTIONAL", imageUrl: "" });
    const navigate = useNavigate();

    const handleLogout = () => {
        AuthService.logout();
        navigate("/login");
        window.location.reload();
    };

    useEffect(() => {
        UserService.getAdminBoard().then(
            (response) => {
                setContent(response.data);
            },
            (error) => {
                setContent("Error fetching admin content.");
            }
        );

        fetchEquipment();
    }, []);

    const fetchEquipment = () => {
        axios.get(API_URL).then(
            (response) => {
                setEquipment(response.data);
            },
            (error) => {
                console.log(error);
            }
        );
    };

    const handleAddItem = (e) => {
        e.preventDefault();
        axios.post(API_URL, newItem, { headers: authHeader() }).then(
            () => {
                setShowAddForm(false);
                setNewItem({ name: "", type: "", status: "FUNCTIONAL", imageUrl: "" });
                fetchEquipment();
            },
            (error) => {
                alert("Failed to add equipment");
            }
        );
    };

    const handleDelete = (id) => {
        // eslint-disable-next-line
        if (window.confirm("Are you sure you want to delete this item?")) {
            axios.delete(API_URL + "/" + id, { headers: authHeader() }).then(
                () => {
                    fetchEquipment();
                },
                (error) => {
                    alert("Failed to delete equipment");
                }
            );
        }
    };

    return (
        <div className="container mx-auto px-6 py-10">
            <div className="flex flex-col lg:flex-row gap-10">
                {/* Sidebar Navigation */}
                <div className="w-64 flex-shrink-0">
                    <div className="card sticky top-8">
                        <div className="flex items-center space-x-3 mb-8 px-2">
                            <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center shadow-lg shadow-primary-500/20">
                                <span className="text-xl font-bold text-white">G</span>
                            </div>
                            <div>
                                <h2 className="text-lg font-bold text-white leading-none">Admin</h2>
                                <p className="text-xs text-gray-500 mt-1">Management Portal</p>
                            </div>
                        </div>

                        <nav className="space-y-4">
                            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-2 mb-2">Main Menu</div>
                            <Link to="/admin" className="flex items-center space-x-3 px-4 py-3 bg-primary-900/40 text-primary-400 rounded-xl border border-primary-800/50 transition-all font-medium">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
                                <span>Dashboard</span>
                            </Link>
                            <Link to="/admin/classes" className="flex items-center space-x-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-dark-700 rounded-xl transition-all font-medium">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                                <span>Classes</span>
                            </Link>
                            <Link to="/admin/analytics" className="flex items-center space-x-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-dark-700 rounded-xl transition-all font-medium">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
                                <span>Analytics</span>
                            </Link>
                            <Link to="/admin/scan" className="flex items-center space-x-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-dark-700 rounded-xl transition-all font-medium">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"></path></svg>
                                <span>Scanner</span>
                            </Link>
                            <Link to="/admin/trainers" className="flex items-center space-x-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-dark-700 rounded-xl transition-all font-medium">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                                <span>Trainers</span>
                            </Link>

                            <div className="pt-8 border-t border-dark-700 mt-8">
                                <button onClick={handleLogout} className="flex items-center space-x-3 px-4 py-3 text-red-400 hover:bg-red-900/20 rounded-xl transition-all font-medium w-full">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
                                    <span>Logout</span>
                                </button>
                            </div>
                        </nav>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="flex-1 space-y-8">
                    {/* Modern Header */}
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-extrabold text-white tracking-tight">Overview</h1>
                            <p className="text-gray-400 mt-1">Status: <span className="text-green-400 font-medium">{content}</span></p>
                        </div>
                        <div className="flex items-center space-x-3 bg-dark-800 p-2 rounded-2xl border border-dark-700">
                            <div className="w-10 h-10 bg-dark-700 rounded-xl flex items-center justify-center">
                                <span className="text-primary-400 font-bold">AD</span>
                            </div>
                            <div className="pr-4">
                                <p className="text-sm font-bold text-white leading-none">Admin User</p>
                                <p className="text-xs text-gray-500 mt-1">Super Admin</p>
                            </div>
                        </div>
                    </div>

                    {/* Quick Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <div className="card p-6 border-l-4 border-l-primary-500">
                            <h3 className="text-gray-500 text-xs font-bold uppercase tracking-widest">Active Users</h3>
                            <p className="text-3xl font-bold text-white mt-2">1,248</p>
                            <p className="text-xs text-green-400 mt-2 flex items-center">
                                <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
                                +12% from last month
                            </p>
                        </div>
                        <div className="card p-6 border-l-4 border-l-green-500">
                            <h3 className="text-gray-500 text-xs font-bold uppercase tracking-widest">Revenue</h3>
                            <p className="text-3xl font-bold text-white mt-2">$24,650</p>
                            <p className="text-xs text-green-400 mt-2 flex items-center">
                                <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
                                +8.4% growth
                            </p>
                        </div>
                        <div className="card p-6 border-l-4 border-l-orange-500">
                            <h3 className="text-gray-500 text-xs font-bold uppercase tracking-widest">Live Classes</h3>
                            <p className="text-3xl font-bold text-white mt-2">18</p>
                            <p className="text-xs text-orange-400 mt-2 flex items-center">Currently in session</p>
                        </div>
                        <div className="card p-6 border-l-4 border-l-blue-500">
                            <h3 className="text-gray-500 text-xs font-bold uppercase tracking-widest">Equipment</h3>
                            <p className="text-3xl font-bold text-white mt-2">{equipment.length}</p>
                            <p className="text-xs text-gray-500 mt-2">Total tracked items</p>
                        </div>
                    </div>

                    {/* Equipment Management Section */}
                    <div className="card overflow-hidden">
                        <div className="p-6 border-b border-dark-700 flex justify-between items-center bg-dark-800/50">
                            <div>
                                <h2 className="text-xl font-bold text-white">Equipment Inventory</h2>
                                <p className="text-sm text-gray-500 mt-1">Monitor and manage gym machinery</p>
                            </div>
                            <button
                                onClick={() => setShowAddForm(!showAddForm)}
                                className="bg-primary-600 hover:bg-primary-500 text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-all shadow-lg shadow-primary-900/20 flex items-center space-x-2"
                            >
                                <span>{showAddForm ? "✕ Cancel" : "+ Add Item"}</span>
                            </button>
                        </div>

                        {showAddForm && (
                            <div className="p-6 bg-dark-800/30 border-b border-dark-700 animate-in fade-in slide-in-from-top-4 duration-300">
                                <form onSubmit={handleAddItem} className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        <div>
                                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Item Name</label>
                                            <input
                                                type="text"
                                                className="input-field bg-dark-900 border-dark-700"
                                                value={newItem.name}
                                                onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                                                required
                                                placeholder="e.g. Peloton Bike Z1"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Category</label>
                                            <input
                                                type="text"
                                                className="input-field bg-dark-900 border-dark-700"
                                                value={newItem.type}
                                                onChange={(e) => setNewItem({ ...newItem, type: e.target.value })}
                                                required
                                                placeholder="e.g. Cardio"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Operating Status</label>
                                            <select
                                                className="input-field bg-dark-900 border-dark-700"
                                                value={newItem.status}
                                                onChange={(e) => setNewItem({ ...newItem, status: e.target.value })}
                                            >
                                                <option value="FUNCTIONAL">Functional</option>
                                                <option value="DAMAGED">Damaged</option>
                                                <option value="UNDER_MAINTENANCE">Under Maintenance</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="flex justify-end">
                                        <button type="submit" className="btn-primary px-8">Save to Inventory</button>
                                    </div>
                                </form>
                            </div>
                        )}

                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="bg-dark-900/50 text-gray-500 text-xs font-bold uppercase tracking-widest border-b border-dark-700">
                                        <th className="px-6 py-4">Equipment</th>
                                        <th className="px-6 py-4">Category</th>
                                        <th className="px-6 py-4">Current Status</th>
                                        <th className="px-6 py-4 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-dark-700/50">
                                    {equipment.length === 0 ? (
                                        <tr>
                                            <td colSpan="4" className="px-6 py-12 text-center text-gray-500 italic">No equipment assets found in the system.</td>
                                        </tr>
                                    ) : (
                                        equipment.map((item) => (
                                            <tr key={item.id} className="hover:bg-dark-700/20 transition-colors group">
                                                <td className="px-6 py-4">
                                                    <div className="font-bold text-white group-hover:text-primary-400 transition-colors">{item.name}</div>
                                                    <div className="text-xs text-gray-500">ID: {item.id.substring(0, 8)}...</div>
                                                </td>
                                                <td className="px-6 py-4 text-gray-400 text-sm">{item.type}</td>
                                                <td className="px-6 py-4">
                                                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${item.status === 'FUNCTIONAL' ? 'bg-green-900/20 text-green-400 border-green-500/30' :
                                                        item.status === 'DAMAGED' ? 'bg-red-900/20 text-red-400 border-red-500/30' :
                                                            'bg-orange-900/20 text-orange-400 border-orange-500/30'
                                                        }`}>
                                                        <span className={`w-1.5 h-1.5 rounded-full mr-2 ${item.status === 'FUNCTIONAL' ? 'bg-green-400' : item.status === 'DAMAGED' ? 'bg-red-400' : 'bg-orange-400'}`}></span>
                                                        {item.status.replace('_', ' ')}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <button
                                                        onClick={() => handleDelete(item.id)}
                                                        className="p-2 text-gray-500 hover:text-red-400 transition-all hover:bg-red-900/20 rounded-lg"
                                                        title="Delete Item"
                                                    >
                                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminBoard;
