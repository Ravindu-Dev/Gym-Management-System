import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div className="relative isolate overflow-hidden">
            <div className="mx-auto max-w-2xl text-center py-24 sm:py-32">
                <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
                    Take your fitness to the <span className="text-primary-500">Next Level</span>
                </h1>
                <p className="mt-6 text-lg leading-8 text-gray-300">
                    Manage your gym membership, track your progress, and access premium equipment with our state-of-the-art Gym Management System.
                </p>
                <div className="mt-10 flex items-center justify-center gap-x-6">
                    <Link to="/register" className="btn-primary text-lg px-8 py-3">
                        Get Started
                    </Link>
                    <Link to="/login" className="text-sm font-semibold leading-6 text-white hover:text-primary-300 transition-colors">
                        Member Login <span aria-hidden="true">→</span>
                    </Link>
                </div>
            </div>

            <div className="mx-auto max-w-7xl px-6 lg:px-8 pb-24">
                <div className="bg-dark-800 rounded-2xl p-8 border border-dark-700 shadow-2xl">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center p-6 bg-dark-900 rounded-xl border border-dark-700 hover:border-primary-500/50 transition-colors">
                            <div className="bg-primary-500/10 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                                <svg className="w-6 h-6 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">24/7 Access</h3>
                            <p className="text-gray-400">Train whenever you want with our round-the-clock facility access.</p>
                        </div>
                        <div className="text-center p-6 bg-dark-900 rounded-xl border border-dark-700 hover:border-primary-500/50 transition-colors">
                            <div className="bg-primary-500/10 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                                <svg className="w-6 h-6 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">Modern Equipment</h3>
                            <p className="text-gray-400">Access to the latest fitness technology and premium weights.</p>
                        </div>
                        <div className="text-center p-6 bg-dark-900 rounded-xl border border-dark-700 hover:border-primary-500/50 transition-colors">
                            <div className="bg-primary-500/10 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                                <svg className="w-6 h-6 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">Expert Trainers</h3>
                            <p className="text-gray-400">Professional guidance to help you reach your fitness goals.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
