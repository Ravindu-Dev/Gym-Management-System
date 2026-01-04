import { useState, useEffect } from "react";
import WorkoutService from "../services/workout.service";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const WorkoutTracker = () => {
    const [workouts, setWorkouts] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [newWorkout, setNewWorkout] = useState({
        type: "Strength",
        durationMinutes: 60,
        notes: "",
        exercises: [{ name: "", sets: 0, reps: 0, weight: 0 }]
    });

    useEffect(() => {
        loadWorkouts();
    }, []);

    const loadWorkouts = () => {
        WorkoutService.getMyWorkouts().then(
            (response) => {
                // Sort by date ascending for chart
                const sorted = response.data.sort((a, b) => new Date(a.date) - new Date(b.date));
                setWorkouts(sorted);
            },
            (error) => console.log(error)
        );
    };

    const handleAddExercise = () => {
        setNewWorkout({
            ...newWorkout,
            exercises: [...newWorkout.exercises, { name: "", sets: 0, reps: 0, weight: 0 }]
        });
    };

    const handleExerciseChange = (index, field, value) => {
        const updatedExercises = [...newWorkout.exercises];
        updatedExercises[index][field] = value;
        setNewWorkout({ ...newWorkout, exercises: updatedExercises });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        WorkoutService.logWorkout(newWorkout).then(
            () => {
                setShowForm(false);
                setNewWorkout({
                    type: "Strength",
                    durationMinutes: 60,
                    notes: "",
                    exercises: [{ name: "", sets: 0, reps: 0, weight: 0 }]
                });
                loadWorkouts();
            },
            (error) => alert("Failed to log workout")
        );
    };

    // Prepare chart data (Total Volume per workout as an example metric)
    const chartData = workouts.map(w => ({
        date: new Date(w.date).toLocaleDateString(),
        volume: w.exercises.reduce((acc, ex) => acc + (ex.sets * ex.reps * ex.weight), 0)
    }));

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-white">Workout Tracker</h1>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="btn-primary"
                >
                    {showForm ? "Cancel" : "Log Workout"}
                </button>
            </div>

            {showForm && (
                <div className="bg-dark-800 p-6 rounded-lg mb-8 border border-dark-700">
                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div>
                                <label className="block text-gray-400 mb-1">Workout Type</label>
                                <select
                                    className="input-field"
                                    value={newWorkout.type}
                                    onChange={(e) => setNewWorkout({ ...newWorkout, type: e.target.value })}
                                >
                                    <option>Strength</option>
                                    <option>Cardio</option>
                                    <option>HIIT</option>
                                    <option>Yoga</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-gray-400 mb-1">Duration (mins)</label>
                                <input
                                    type="number"
                                    className="input-field"
                                    value={newWorkout.durationMinutes}
                                    onChange={(e) => setNewWorkout({ ...newWorkout, durationMinutes: parseInt(e.target.value) })}
                                />
                            </div>
                        </div>

                        <div className="mb-4">
                            <h3 className="text-white font-bold mb-2">Exercises</h3>
                            {newWorkout.exercises.map((ex, index) => (
                                <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-2 mb-2">
                                    <input
                                        placeholder="Exercise Name"
                                        className="input-field"
                                        value={ex.name}
                                        onChange={(e) => handleExerciseChange(index, "name", e.target.value)}
                                        required
                                    />
                                    <input
                                        placeholder="Sets"
                                        type="number"
                                        className="input-field"
                                        value={ex.sets}
                                        onChange={(e) => handleExerciseChange(index, "sets", parseInt(e.target.value))}
                                    />
                                    <input
                                        placeholder="Reps"
                                        type="number"
                                        className="input-field"
                                        value={ex.reps}
                                        onChange={(e) => handleExerciseChange(index, "reps", parseInt(e.target.value))}
                                    />
                                    <input
                                        placeholder="Weight (kg)"
                                        type="number"
                                        className="input-field"
                                        value={ex.weight}
                                        onChange={(e) => handleExerciseChange(index, "weight", parseFloat(e.target.value))}
                                    />
                                </div>
                            ))}
                            <button type="button" onClick={handleAddExercise} className="text-primary-400 text-sm hover:underline">
                                + Add Exercise
                            </button>
                        </div>

                        <button type="submit" className="btn-primary w-full">Save Log</button>
                    </form>
                </div>
            )}

            {/* Progress Chart */}
            {workouts.length > 0 && (
                <div className="bg-dark-800 p-6 rounded-lg border border-dark-700 mb-8">
                    <h3 className="text-xl font-bold text-white mb-4">Volume Progress (kg * reps * sets)</h3>
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={chartData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                                <XAxis dataKey="date" stroke="#9CA3AF" />
                                <YAxis stroke="#9CA3AF" />
                                <Tooltip contentStyle={{ backgroundColor: '#1F2937', borderColor: '#374151', color: '#fff' }} />
                                <Line type="monotone" dataKey="volume" stroke="#3B82F6" strokeWidth={2} activeDot={{ r: 8 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            )}

            {/* Past Logs */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {workouts.map((w) => (
                    <div key={w.id} className="card">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="text-lg font-bold text-white">{w.type}</h3>
                                <p className="text-gray-400 text-sm">{new Date(w.date).toLocaleDateString()}</p>
                            </div>
                            <span className="text-primary-400 font-bold">{w.durationMinutes}m</span>
                        </div>
                        <div className="space-y-2">
                            {w.exercises.map((ex, i) => (
                                <div key={i} className="flex justify-between text-sm border-b border-dark-700 pb-1 last:border-0">
                                    <span className="text-gray-300">{ex.name}</span>
                                    <span className="text-gray-500">{ex.sets}x{ex.reps} @ {ex.weight}kg</span>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WorkoutTracker;
