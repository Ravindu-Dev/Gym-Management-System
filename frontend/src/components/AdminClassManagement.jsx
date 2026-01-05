import { useState, useEffect } from "react";
import ClassService from "../services/class.service";
import { Link } from "react-router-dom";

const AdminClassManagement = () => {
    const [classes, setClasses] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [newClass, setNewClass] = useState({
        name: "",
        instructor: "",
        startTime: "",
        durationMinutes: 60,
        capacity: 20
    });

    useEffect(() => {
        loadClasses();
    }, []);

    const loadClasses = () => {
        ClassService.getAllClasses().then(
            (response) => {
                setClasses(response.data);
            },
            (error) => {
                console.log(error);
            }
        );
    };

    const handleCreate = (e) => {
        e.preventDefault();
        // Format datetime-local to ISO string or keep as is depending on backend expectation
        // Backend expects LocalDateTime which can parse ISO format generally
        ClassService.createClass(newClass).then(
            () => {
                setShowForm(false);
                setNewClass({ name: "", instructor: "", startTime: "", durationMinutes: 60, capacity: 20 });
                loadClasses();
            },
            (error) => {
                alert("Failed to create class: " + error.message);
            }
        );
    };

    const handleDelete = (id) => {
        if (window.confirm("Delete this class?")) {
            ClassService.deleteClass(id).then(
                () => {
                    loadClasses();
                },
                (error) => {
                    alert("Failed to delete class");
                }
            );
        }
    };

    return (
        <div className="container mx-auto px-6 py-10">
            <div className="flex justify-between items-center mb-8">
                <div className="flex items-center space-x-6">
                    <Link to="/admin" className="w-10 h-10 bg-dark-800 rounded-xl flex items-center justify-center text-gray-400 hover:text-primary-500 hover:bg-primary-900/20 transition-all border border-dark-700">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
                    </Link>
                    <div>
                        <h2 className="text-3xl font-extrabold text-white tracking-tight">Class Management</h2>
                        <p className="text-gray-400 mt-1">Schedule and monitor gym sessions</p>
                    </div>
                </div>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="bg-primary-600 hover:bg-primary-500 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg shadow-primary-900/20 flex items-center space-x-2"
                >
                    <span>{showForm ? "✕ Cancel" : "+ Schedule Class"}</span>
                </button>
            </div>

            {showForm && (
                <div className="card p-8 mb-8 border-t-4 border-t-primary-600 animate-in fade-in slide-in-from-top-4 duration-300">
                    <h3 className="text-xl font-bold text-white mb-6">Create New Session</h3>
                    <form onSubmit={handleCreate} className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="md:col-span-2">
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Class Name</label>
                            <input
                                type="text"
                                className="input-field bg-dark-900 border-dark-700"
                                value={newClass.name}
                                onChange={(e) => setNewClass({ ...newClass, name: e.target.value })}
                                required
                                placeholder="e.g. Morning Yoga Flow"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Instructor</label>
                            <input
                                type="text"
                                className="input-field bg-dark-900 border-dark-700"
                                value={newClass.instructor}
                                onChange={(e) => setNewClass({ ...newClass, instructor: e.target.value })}
                                required
                                placeholder="e.g. Sarah J."
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Date & Time</label>
                            <input
                                type="datetime-local"
                                className="input-field bg-dark-900 border-dark-700"
                                value={newClass.startTime}
                                onChange={(e) => setNewClass({ ...newClass, startTime: e.target.value })}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Duration (Mins)</label>
                            <input
                                type="number"
                                className="input-field bg-dark-900 border-dark-700"
                                value={newClass.durationMinutes}
                                onChange={(e) => setNewClass({ ...newClass, durationMinutes: parseInt(e.target.value) })}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Max Capacity</label>
                            <input
                                type="number"
                                className="input-field bg-dark-900 border-dark-700"
                                value={newClass.capacity}
                                onChange={(e) => setNewClass({ ...newClass, capacity: parseInt(e.target.value) })}
                                required
                            />
                        </div>
                        <div className="md:col-span-3 pt-4">
                            <button type="submit" className="btn-primary w-full py-4 text-lg">Initialize Class Session</button>
                        </div>
                    </form>
                </div>
            )}

            <div className="card overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-dark-900/50 text-gray-500 text-xs font-bold uppercase tracking-widest border-b border-dark-700">
                                <th className="px-6 py-4">Session Info</th>
                                <th className="px-6 py-4">Instructor</th>
                                <th className="px-6 py-4">Date & Time</th>
                                <th className="px-6 py-4 text-center">Enrolled</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-dark-700/50">
                            {classes.map((c) => (
                                <tr key={c.id} className="hover:bg-dark-700/20 transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="font-bold text-white group-hover:text-primary-400 transition-colors">{c.name}</div>
                                        <div className="text-xs text-gray-500">{c.durationMinutes} minutes</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center space-x-2">
                                            <div className="w-8 h-8 bg-dark-700 rounded-full flex items-center justify-center text-[10px] font-bold text-primary-400 border border-dark-600">
                                                {c.instructor.charAt(0)}
                                            </div>
                                            <span className="text-gray-300 font-medium">{c.instructor}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-white text-sm">{new Date(c.startTime).toLocaleDateString()}</div>
                                        <div className="text-xs text-gray-500 font-medium">{new Date(c.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <div className="inline-flex items-center space-x-2 bg-dark-900 px-3 py-1 rounded-full border border-dark-700">
                                            <span className={`font-bold ${c.enrolledMemberIds?.length >= c.capacity ? 'text-red-400' : 'text-primary-400'}`}>
                                                {c.enrolledMemberIds?.length || 0}
                                            </span>
                                            <span className="text-gray-600">/</span>
                                            <span className="text-gray-400">{c.capacity}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button
                                            onClick={() => handleDelete(c.id)}
                                            className="text-red-400 hover:text-red-300 font-bold text-xs uppercase tracking-widest hover:bg-red-900/20 px-3 py-1.5 rounded-lg transition-all"
                                        >
                                            Cancel Session
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {classes.length === 0 && (
                                <tr><td colSpan="5" className="text-center py-20 text-gray-500 italic">No gym classes are currently scheduled.</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminClassManagement;
