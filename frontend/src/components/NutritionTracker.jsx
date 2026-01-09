import { useState, useEffect } from "react";
import NutritionService from "../services/nutrition.service";
import SubscriptionService from "../services/subscription.service";
import AuthService from "../services/auth.service";
import LockedFeature from "./LockedFeature";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';

const NutritionTracker = () => {
    const [logs, setLogs] = useState([]);
    const [todayLogs, setTodayLogs] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [hasAccess, setHasAccess] = useState(null); // null = loading, true = has access, false = no access
    const [newEntry, setNewEntry] = useState({
        mealName: "Breakfast",
        foodName: "",
        calories: 0,
        protein: 0,
        carbs: 0,
        fat: 0
    });

    const goals = {
        calories: 2500,
        protein: 150,
        carbs: 300,
        fat: 70
    };

    useEffect(() => {
        checkAccess();
    }, []);

    const checkAccess = async () => {
        const access = await SubscriptionService.hasFeatureAccess("NUTRITION_TRACKER");
        setHasAccess(access);
        if (access) {
            loadData();
        }
    };

    const loadData = () => {
        NutritionService.getMyNutrition().then(
            (response) => {
                const sorted = response.data.sort((a, b) => new Date(a.date) - new Date(b.date));
                setLogs(sorted);
            },
            (error) => console.log(error)
        );

        NutritionService.getMyNutritionToday().then(
            (response) => setTodayLogs(response.data),
            (error) => console.log(error)
        );
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        NutritionService.logNutrition(newEntry).then(
            () => {
                setShowForm(false);
                setNewEntry({
                    mealName: "Breakfast",
                    foodName: "",
                    calories: 0,
                    protein: 0,
                    carbs: 0,
                    fat: 0
                });
                loadData();
            },
            (error) => alert("Failed to log nutrition")
        );
    };

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this log?")) {
            NutritionService.deleteNutrition(id).then(
                () => loadData(),
                (error) => alert("Failed to delete log")
            );
        }
    }

    const totalsToday = todayLogs.reduce((acc, curr) => ({
        calories: acc.calories + curr.calories,
        protein: acc.protein + curr.protein,
        carbs: acc.carbs + curr.carbs,
        fat: acc.fat + curr.fat
    }), { calories: 0, protein: 0, carbs: 0, fat: 0 });

    const chartData = todayLogs.length > 0 ? [
        { name: 'Calories', current: totalsToday.calories, goal: goals.calories, color: '#3B82F6' },
        { name: 'Protein', current: totalsToday.protein, goal: goals.protein, color: '#10B981' },
        { name: 'Carbs', current: totalsToday.carbs, goal: goals.carbs, color: '#F59E0B' },
        { name: 'Fat', current: totalsToday.fat, goal: goals.fat, color: '#EF4444' }
    ] : [];

    const historyData = Object.values(logs.reduce((acc, log) => {
        const date = new Date(log.date).toLocaleDateString();
        if (!acc[date]) acc[date] = { date, calories: 0 };
        acc[date].calories += log.calories;
        return acc;
    }, {}));

    // Show loading state
    if (hasAccess === null) {
        return (
            <div className="container mx-auto px-4 py-16 flex justify-center items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
            </div>
        );
    }

    // Show locked feature if no access
    if (!hasAccess) {
        return <LockedFeature featureName="Nutrition Tracker" requiredPlan="Premium" />;
    }

    return (
        <div className="container mx-auto px-4 py-8 animate-fade-in">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-4xl font-display font-bold heading-gradient italic mb-2">Nutrition Tracker</h1>
                    <p className="text-gray-400">Fuel your body, track your progress.</p>
                </div>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="btn-primary"
                >
                    {showForm ? "Cancel" : "+ Log Meal"}
                </button>
            </div>

            {/* Daily Overview */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                <div className="lg:col-span-1 glass-panel p-6">
                    <h3 className="text-xl font-bold mb-6 italic">Today's Macros</h3>
                    <div className="space-y-6">
                        {['Calories', 'Protein', 'Carbs', 'Fat'].map((macro) => {
                            const key = macro.toLowerCase();
                            const percentage = Math.min((totalsToday[key] / goals[key]) * 100, 100);
                            const color = key === 'calories' ? 'bg-primary-500' : key === 'protein' ? 'bg-accent-500' : key === 'carbs' ? 'bg-orange-500' : 'bg-red-500';
                            return (
                                <div key={macro}>
                                    <div className="flex justify-between text-sm mb-2">
                                        <span className="text-gray-400 font-medium">{macro}</span>
                                        <span className="text-white font-bold">{totalsToday[key]} / {goals[key]} {key === 'calories' ? 'kcal' : 'g'}</span>
                                    </div>
                                    <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                                        <div
                                            className={`h-full ${color} transition-all duration-1000 ease-out`}
                                            style={{ width: `${percentage}%` }}
                                        ></div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="lg:col-span-2 glass-panel p-6">
                    <h3 className="text-xl font-bold mb-6 italic">Visual Progress</h3>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={chartData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                                <XAxis dataKey="name" stroke="#9CA3AF" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis hide />
                                <Tooltip
                                    cursor={{ fill: 'transparent' }}
                                    contentStyle={{ backgroundColor: '#0f1115', border: '1px solid #ffffff10', borderRadius: '12px' }}
                                />
                                <Bar dataKey="current" radius={[6, 6, 0, 0]}>
                                    {chartData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} fillOpacity={0.8} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {showForm && (
                <div className="glass-panel p-8 mb-8 border-primary-500/30 animate-scale-in">
                    <h2 className="text-2xl font-bold mb-6 italic">Add Entry</h2>
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="md:col-span-1">
                            <label className="block text-sm font-medium text-gray-400 mb-2">Meal Type</label>
                            <select
                                className="input-field"
                                value={newEntry.mealName}
                                onChange={(e) => setNewEntry({ ...newEntry, mealName: e.target.value })}
                            >
                                <option>Breakfast</option>
                                <option>Lunch</option>
                                <option>Dinner</option>
                                <option>Snack</option>
                            </select>
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-400 mb-2">Food Name</label>
                            <input
                                placeholder="e.g. Grilled Chicken Salad"
                                className="input-field"
                                value={newEntry.foodName}
                                onChange={(e) => setNewEntry({ ...newEntry, foodName: e.target.value })}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">Calories (kcal)</label>
                            <input
                                type="number"
                                className="input-field"
                                value={newEntry.calories}
                                onChange={(e) => setNewEntry({ ...newEntry, calories: parseInt(e.target.value) || 0 })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">Protein (g)</label>
                            <input
                                type="number"
                                className="input-field"
                                value={newEntry.protein}
                                onChange={(e) => setNewEntry({ ...newEntry, protein: parseInt(e.target.value) || 0 })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">Carbs (g)</label>
                            <input
                                type="number"
                                className="input-field"
                                value={newEntry.carbs}
                                onChange={(e) => setNewEntry({ ...newEntry, carbs: parseInt(e.target.value) || 0 })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">Fat (g)</label>
                            <input
                                type="number"
                                className="input-field"
                                value={newEntry.fat}
                                onChange={(e) => setNewEntry({ ...newEntry, fat: parseInt(e.target.value) || 0 })}
                            />
                        </div>
                        <div className="md:col-span-3 flex justify-end space-x-4">
                            <button type="button" onClick={() => setShowForm(false)} className="px-6 py-2.5 rounded-xl font-semibold text-gray-400 hover:text-white transition-colors">Cancel</button>
                            <button type="submit" className="btn-primary">Save Entry</button>
                        </div>
                    </form>
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Recent Logs Table */}
                <div className="lg:col-span-2 glass-panel overflow-hidden">
                    <div className="p-6 border-b border-white/5">
                        <h3 className="text-xl font-bold italic">Today's Log</h3>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="text-gray-500 text-xs uppercase tracking-wider">
                                    <th className="px-6 py-4">Meal</th>
                                    <th className="px-6 py-4">Food</th>
                                    <th className="px-6 py-4">Calories</th>
                                    <th className="px-6 py-4">Macros (P/C/F)</th>
                                    <th className="px-6 py-4"></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {todayLogs.length === 0 ? (
                                    <tr>
                                        <td colSpan="5" className="px-6 py-12 text-center text-gray-500 italic">No food logged yet today.</td>
                                    </tr>
                                ) : (
                                    todayLogs.map((log) => (
                                        <tr key={log.id} className="hover:bg-white/5 transition-colors group">
                                            <td className="px-6 py-4">
                                                <span className="text-xs font-bold px-2 py-1 rounded-md bg-white/5 text-gray-300 capitalize">{log.mealName}</span>
                                            </td>
                                            <td className="px-6 py-4 font-medium">{log.foodName}</td>
                                            <td className="px-6 py-4 text-primary-400 font-bold">{log.calories} kcal</td>
                                            <td className="px-6 py-4 text-sm text-gray-400">
                                                {log.protein}g / {log.carbs}g / {log.fat}g
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <button onClick={() => handleDelete(log.id)} className="text-gray-600 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100">
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                    </svg>
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* History Trend */}
                <div className="lg:col-span-1 glass-panel p-6">
                    <h3 className="text-xl font-bold mb-6 italic">History Trend</h3>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={historyData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                                <XAxis dataKey="date" stroke="#9CA3AF" fontSize={10} tickLine={false} axisLine={false} />
                                <YAxis stroke="#9CA3AF" fontSize={10} tickLine={false} axisLine={false} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#0f1115', border: '1px solid #ffffff10', borderRadius: '12px' }}
                                />
                                <Line type="monotone" dataKey="calories" stroke="#3B82F6" strokeWidth={3} dot={{ r: 4, fill: '#3B82F6' }} activeDot={{ r: 6 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NutritionTracker;
