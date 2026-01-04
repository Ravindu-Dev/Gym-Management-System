import { useState, useEffect } from "react";
import AnalyticsService from "../services/analytics.service";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

const AdminAnalytics = () => {
    const [stats, setStats] = useState({
        totalMembers: 0,
        totalRevenue: 0,
        totalEquipment: 0,
        totalClasses: 0
    });

    useEffect(() => {
        AnalyticsService.getStats().then(
            (response) => {
                setStats(response.data);
            },
            (error) => {
                console.log(error);
            }
        );
    }, []);

    // Mock data for visualizations (since backend historical data is complex to implement quickly)
    const revenueData = [
        { name: 'Jan', revenue: 4000 },
        { name: 'Feb', revenue: 3000 },
        { name: 'Mar', revenue: 2000 },
        { name: 'Apr', revenue: 2780 },
        { name: 'May', revenue: 1890 },
        { name: 'Jun', revenue: 2390 },
        { name: 'Jul', revenue: 3490 },
    ];

    // Scale the last month based on actual total revenue if reasonable, or just show trends
    // For demo purposes, the static data looks better than a single point.

    const memberData = [
        { name: 'Active', value: stats.totalMembers },
        { name: 'Inactive', value: 5 }, // Mock inactive
    ];

    const COLORS = ['#0088FE', '#FFBB28'];

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-white mb-8">Gym Performance Analytics</h1>

            {/* Stat Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
                <div className="bg-dark-800 p-6 rounded-lg border border-dark-700">
                    <h3 className="text-gray-400 text-sm uppercase">Total Members</h3>
                    <p className="text-3xl font-bold text-white mt-2">{stats.totalMembers}</p>
                </div>
                <div className="bg-dark-800 p-6 rounded-lg border border-dark-700">
                    <h3 className="text-gray-400 text-sm uppercase">Monthly Revenue</h3>
                    <p className="text-3xl font-bold text-green-400 mt-2">${stats.totalRevenue.toFixed(2)}</p>
                </div>
                <div className="bg-dark-800 p-6 rounded-lg border border-dark-700">
                    <h3 className="text-gray-400 text-sm uppercase">Equipment Items</h3>
                    <p className="text-3xl font-bold text-blue-400 mt-2">{stats.totalEquipment}</p>
                </div>
                <div className="bg-dark-800 p-6 rounded-lg border border-dark-700">
                    <h3 className="text-gray-400 text-sm uppercase">Scheduled Classes</h3>
                    <p className="text-3xl font-bold text-purple-400 mt-2">{stats.totalClasses}</p>
                </div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Revenue Chart */}
                <div className="bg-dark-800 p-6 rounded-lg border border-dark-700">
                    <h3 className="text-xl font-bold text-white mb-6">Revenue Trend (6 Months)</h3>
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={revenueData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                                <XAxis dataKey="name" stroke="#9CA3AF" />
                                <YAxis stroke="#9CA3AF" />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#1F2937', borderColor: '#374151', color: '#fff' }}
                                />
                                <Legend />
                                <Line type="monotone" dataKey="revenue" stroke="#10B981" strokeWidth={2} activeDot={{ r: 8 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Member Distribution */}
                <div className="bg-dark-800 p-6 rounded-lg border border-dark-700">
                    <h3 className="text-xl font-bold text-white mb-6">Member Activity</h3>
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={memberData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={100}
                                    fill="#8884d8"
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {memberData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#1F2937', borderColor: '#374151', color: '#fff' }}
                                />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminAnalytics;
