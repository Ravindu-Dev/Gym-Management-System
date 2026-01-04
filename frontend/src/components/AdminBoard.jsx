import { useState, useEffect } from "react";
import UserService from "../services/user.service";
import axios from "axios";
import AuthService from "../services/auth.service";
import { Link } from "react-router-dom";

const API_URL = "http://localhost:8081/api/equipment";

const AdminBoard = () => {
    const [content, setContent] = useState("");
    const [equipment, setEquipment] = useState([]);
    const [showAddForm, setShowAddForm] = useState(false);
    const [newItem, setNewItem] = useState({ name: "", type: "", status: "FUNCTIONAL", imageUrl: "" });

    const authHeader = () => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user && user.token) {
            return { Authorization: 'Bearer ' + user.token };
        } else {
            return {};
        }
    }

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
        <div className="container mx-auto px-4 py-8">
            <div className="card">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-white">Admin Dashboard</h2>
                    <span className="bg-red-900/50 border border-red-500 text-red-200 px-3 py-1 rounded-full text-sm font-medium">
                        Admin Area
                    </span>
                </div>

                <div className="p-6 bg-dark-900 rounded-lg border border-dark-700 mb-8">
                    <h3 className="text-lg font-medium text-gray-300 mb-2">System Status</h3>
                    <p className="text-white">{content}</p>
                </div>

                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-white">Quick Actions</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                    <Link to="/admin/classes" className="p-6 bg-dark-900 rounded-lg border border-dark-700 hover:border-primary-500 transition-colors group">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-white group-hover:text-primary-400 transition-colors">Manage Classes</h3>
                            <svg className="w-6 h-6 text-gray-500 group-hover:text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                        </div>
                        <p className="text-gray-400 text-sm">Schedule new classes, assign instructors, and manage capacity.</p>
                    </Link>

                    <Link to="/admin/analytics" className="p-6 bg-dark-900 rounded-lg border border-dark-700 hover:border-primary-500 transition-colors group">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-white group-hover:text-primary-400 transition-colors">Analytics</h3>
                            <svg className="w-6 h-6 text-gray-500 group-hover:text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
                        </div>
                        <p className="text-gray-400 text-sm">View revenue trends, member statistics, and other key metrics.</p>
                    </Link>
                </div>

                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-white">Equipment Management</h2>
                    <button
                        onClick={() => setShowAddForm(!showAddForm)}
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                    >
                        {showAddForm ? "Cancel" : "Add Equipment"}
                    </button>
                </div>

                {showAddForm && (
                    <div className="bg-dark-900 p-6 rounded-lg border border-dark-700 mb-8">
                        <h3 className="text-lg font-bold text-white mb-4">Add New Equipment</h3>
                        <form onSubmit={handleAddItem} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-gray-400 mb-1">Name</label>
                                    <input
                                        type="text"
                                        className="input-field"
                                        value={newItem.name}
                                        onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-400 mb-1">Type</label>
                                    <input
                                        type="text"
                                        className="input-field"
                                        value={newItem.type}
                                        onChange={(e) => setNewItem({ ...newItem, type: e.target.value })}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-400 mb-1">Status</label>
                                    <select
                                        className="input-field"
                                        value={newItem.status}
                                        onChange={(e) => setNewItem({ ...newItem, status: e.target.value })}
                                    >
                                        <option value="FUNCTIONAL">Functional</option>
                                        <option value="DAMAGED">Damaged</option>
                                        <option value="UNDER_MAINTENANCE">Under Maintenance</option>
                                    </select>
                                </div>
                            </div>
                            <button type="submit" className="btn-primary">Save Equipment</button>
                        </form>
                    </div>
                )}

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-dark-700 text-gray-400 font-medium text-sm uppercase">
                                <th className="py-3">Name</th>
                                <th className="py-3">Type</th>
                                <th className="py-3">Status</th>
                                <th className="py-3 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {equipment.length === 0 ? (
                                <tr>
                                    <td colSpan="4" className="py-8 text-center text-gray-400">No equipment found.</td>
                                </tr>
                            ) : (
                                equipment.map((item) => (
                                    <tr key={item.id} className="border-b border-dark-700/50 hover:bg-dark-900/50 transition-colors">
                                        <td className="py-4 text-white font-medium">{item.name}</td>
                                        <td className="py-4 text-gray-400">{item.type}</td>
                                        <td className="py-4">
                                            <span className={`inline-block px-2 py-1 text-xs rounded-full ${item.status === 'FUNCTIONAL' ? 'bg-green-900/50 text-green-300 border border-green-600' :
                                                item.status === 'DAMAGED' ? 'bg-red-900/50 text-red-300 border border-red-600' :
                                                    'bg-yellow-900/50 text-yellow-300 border border-yellow-600'
                                                }`}>
                                                {item.status}
                                            </span>
                                        </td>
                                        <td className="py-4 text-right">
                                            <button
                                                onClick={() => handleDelete(item.id)}
                                                className="text-red-400 hover:text-red-300 text-sm font-medium"
                                            >
                                                Delete
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
    );
};

export default AdminBoard;
