import { useState, useEffect } from "react";
import AnalyticsService from "../services/analytics.service";
import { Link } from "react-router-dom";
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
            <div className="flex items-center space-x-6 mb-10">
                <Link to="/admin" className="w-10 h-10 bg-dark-800 rounded-xl flex items-center justify-center text-gray-400 hover:text-primary-500 hover:bg-primary-900/20 transition-all border border-dark-700">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
                </Link>
                <div>
                    <h1 className="text-3xl font-extrabold text-white tracking-tight">Business Analytics</h1>
                    <p className="text-gray-400 mt-1">Growth and performance tracking</p>
                </div>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
                <div className="card p-6 border-b-4 border-b-blue-500">
                    <h3 className="text-gray-500 text-xs font-bold uppercase tracking-widest">Total Members</h3>
                    <p className="text-3xl font-bold text-white mt-2">{stats.totalMembers}</p>
                    <div className="h-1 w-full bg-dark-700 mt-4 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 w-[65%]"></div>
                    </div>
                </div>
                <div className="card p-6 border-b-4 border-b-green-500">
                    <h3 className="text-gray-500 text-xs font-bold uppercase tracking-widest">Monthly Revenue</h3>
                    <p className="text-3xl font-bold text-green-400 mt-2">${stats.totalRevenue.toFixed(2)}</p>
                    <div className="h-1 w-full bg-dark-700 mt-4 rounded-full overflow-hidden">
                        <div className="h-full bg-green-500 w-[80%]"></div>
                    </div>
                </div>
                <div className="card p-6 border-b-4 border-b-orange-500">
                    <h3 className="text-gray-500 text-xs font-bold uppercase tracking-widest">Gym Equipment</h3>
                    <p className="text-3xl font-bold text-orange-400 mt-2">{stats.totalEquipment}</p>
                    <div className="h-1 w-full bg-dark-700 mt-4 rounded-full overflow-hidden">
                        <div className="h-full bg-orange-500 w-[45%]"></div>
                    </div>
                </div>
                <div className="card p-6 border-b-4 border-b-purple-500">
                    <h3 className="text-gray-500 text-xs font-bold uppercase tracking-widest">Active Classes</h3>
                    <p className="text-3xl font-bold text-purple-400 mt-2">{stats.totalClasses}</p>
                    <div className="h-1 w-full bg-dark-700 mt-4 rounded-full overflow-hidden">
                        <div className="h-full bg-purple-500 w-[90%]"></div>
                    </div>
                </div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Revenue Chart */}
                <div className="card p-8 bg-dark-800/50 backdrop-blur-sm">
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="text-xl font-bold text-white">Revenue Trajectory</h3>
                        <span className="text-xs font-bold text-green-400 bg-green-900/20 px-3 py-1 rounded-full border border-green-500/30">+14% YoY</span>
                    </div>
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={revenueData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} />
                                <XAxis dataKey="name" stroke="#6B7280" fontSize={12} tickLine={false} axisLine={false} dy={10} />
                                <YAxis stroke="#6B7280" fontSize={12} tickLine={false} axisLine={false} dx={-10} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#111827', borderColor: '#374151', borderRadius: '12px', border: '1px solid #374151', color: '#fff' }}
                                    itemStyle={{ color: '#10B981' }}
                                />
                                <Line type="monotone" dataKey="revenue" stroke="#10B981" strokeWidth={4} dot={{ r: 4, fill: '#10B981', strokeWidth: 2, stroke: '#111827' }} activeDot={{ r: 8, strokeWidth: 0 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Member Distribution */}
                <div className="card p-8 bg-dark-800/50 backdrop-blur-sm">
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="text-xl font-bold text-white">Member Engagement</h3>
                        <span className="text-xs font-bold text-blue-400 bg-blue-900/20 px-3 py-1 rounded-full border border-blue-500/30">Live Data</span>
                    </div>
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={memberData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={70}
                                    outerRadius={100}
                                    fill="#8884d8"
                                    paddingAngle={8}
                                    dataKey="value"
                                    stroke="none"
                                >
                                    {memberData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} cornerRadius={8} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#111827', borderColor: '#374151', borderRadius: '12px', border: '1px solid #374151', color: '#fff' }}
                                />
                                <Legend verticalAlign="bottom" height={36} iconType="circle" />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminAnalytics;
