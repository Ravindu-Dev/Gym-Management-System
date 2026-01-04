import { useState, useEffect } from "react";
import ClassService from "../services/class.service";

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
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">Manage Classes</h2>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="btn-primary"
                >
                    {showForm ? "Cancel" : "Schedule New Class"}
                </button>
            </div>

            {showForm && (
                <div className="bg-dark-800 p-6 rounded-lg mb-8 border border-dark-700">
                    <form onSubmit={handleCreate} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-gray-400 mb-1">Class Name</label>
                            <input
                                type="text"
                                className="input-field"
                                value={newClass.name}
                                onChange={(e) => setNewClass({ ...newClass, name: e.target.value })}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-400 mb-1">Instructor</label>
                            <input
                                type="text"
                                className="input-field"
                                value={newClass.instructor}
                                onChange={(e) => setNewClass({ ...newClass, instructor: e.target.value })}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-400 mb-1">Start Time</label>
                            <input
                                type="datetime-local"
                                className="input-field"
                                value={newClass.startTime}
                                onChange={(e) => setNewClass({ ...newClass, startTime: e.target.value })}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-400 mb-1">Duration (Minutes)</label>
                            <input
                                type="number"
                                className="input-field"
                                value={newClass.durationMinutes}
                                onChange={(e) => setNewClass({ ...newClass, durationMinutes: parseInt(e.target.value) })}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-400 mb-1">Capacity</label>
                            <input
                                type="number"
                                className="input-field"
                                value={newClass.capacity}
                                onChange={(e) => setNewClass({ ...newClass, capacity: parseInt(e.target.value) })}
                                required
                            />
                        </div>
                        <div className="md:col-span-2 mt-4">
                            <button type="submit" className="btn-primary w-full">Create Class</button>
                        </div>
                    </form>
                </div>
            )}

            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-dark-700 text-gray-400 uppercase text-sm">
                            <th className="py-3">Class</th>
                            <th className="py-3">Instructor</th>
                            <th className="py-3">Time</th>
                            <th className="py-3">Capacity</th>
                            <th className="py-3 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {classes.map((c) => (
                            <tr key={c.id} className="border-b border-dark-700/50 hover:bg-dark-800/50 transition-colors">
                                <td className="py-4 text-white font-medium">{c.name}</td>
                                <td className="py-4 text-gray-400">{c.instructor}</td>
                                <td className="py-4 text-gray-400">{new Date(c.startTime).toLocaleString()}</td>
                                <td className="py-4 text-gray-400">{c.enrolledMemberIds?.length || 0} / {c.capacity}</td>
                                <td className="py-4 text-right">
                                    <button
                                        onClick={() => handleDelete(c.id)}
                                        className="text-red-400 hover:text-red-300 font-medium"
                                    >
                                        Cancel
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {classes.length === 0 && (
                            <tr><td colSpan="5" className="text-center py-8 text-gray-500">No classes scheduled.</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminClassManagement;
