import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div className="relative min-h-screen bg-gmsdark-950 overflow-hidden">
            {/* Hero Section */}
            <div className="relative pt-12 pb-20 lg:pt-24 lg:pb-32 px-6">
                {/* Background Image with Overlay */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="/src/assets/hero_fitness_bg_1767629210300.png"
                        alt="Premium Gym Interior"
                        className="w-full h-full object-cover opacity-30 mix-blend-luminosity"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-gmsdark-950 via-gmsdark-950/80 to-gmsdark-950"></div>
                </div>

                <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="animate-slide-up">
                        <span className="inline-block px-4 py-1.5 rounded-full bg-primary-600/10 border border-primary-500/20 text-primary-400 text-sm font-semibold mb-6">
                            NEW ARRIVAL: ADVANCED ANALYTICS 📈
                        </span>
                        <h1 className="text-5xl lg:text-7xl font-display font-bold leading-tight mb-6">
                            Unleash Your <span className="heading-gradient">True Potential</span>
                        </h1>
                        <p className="text-xl text-gray-400 mb-10 max-w-lg leading-relaxed text-balance">
                            Experience the future of fitness management. State-of-the-art equipment, personalized tracking, and a community dedicated to excellence.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link to="/register" className="btn-primary text-center text-lg">
                                Start Your Journey
                            </Link>
                            <Link to="/plans" className="px-8 py-3 rounded-xl border border-white/10 text-white font-semibold hover:bg-white/5 transition-all text-center">
                                View Memberships
                            </Link>
                        </div>

                        <div className="mt-12 flex items-center space-x-8 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                            {/* Mock partner logos or social proof */}
                            <div className="flex -space-x-3">
                                {[1, 2, 3, 4].map(i => (
                                    <div key={i} className="w-10 h-10 rounded-full border-2 border-dark-950 bg-dark-800 flex items-center justify-center text-xs font-bold">
                                        JD
                                    </div>
                                ))}
                            </div>
                            <p className="text-sm font-medium text-gray-400">Trusted by 500+ active members</p>
                        </div>
                    </div>

                    <div className="hidden lg:block animate-fade-in delay-200">
                        <div className="relative p-2 glass-panel group">
                            <img
                                src="/src/assets/hero_fitness_bg_1767629210300.png"
                                alt="Dashboard Preview"
                                className="rounded-xl shadow-2xl transition-transform duration-700 group-hover:scale-[1.02]"
                            />
                            {/* Decorative elements */}
                            <div className="absolute -top-6 -right-6 w-32 h-32 bg-primary-600/20 blur-3xl rounded-full animate-pulse-soft"></div>
                            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-accent-500/10 blur-3xl rounded-full"></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Features Grid */}
            <div className="max-w-7xl mx-auto px-6 py-24">
                <div className="text-center mb-16">
                    <h2 className="text-3xl lg:text-5xl font-display font-bold mb-4 italic">Core Excellence</h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">Everything you need to manage your health and fitness in one seamless platform.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        { title: '24/7 Elite Access', desc: 'Secure entry via QR code anytime, day or night.', icon: '🔑' },
                        { title: 'Smart Tracking', desc: 'Monitor your progress with deep workout analytics.', icon: '📊' },
                        { title: 'Expert Guidance', desc: 'Direct connection to world-class certified trainers.', icon: '🏆' }
                    ].map((feature, idx) => (
                        <div key={idx} className="glass-card flex flex-col items-center text-center group hover:-translate-y-2">
                            <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-3xl mb-6 group-hover:bg-primary-600/20 group-hover:border-primary-500/30 transition-all duration-300">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                            <p className="text-gray-400 leading-relaxed">{feature.desc}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* CTA Section */}
            <div className="max-w-7xl mx-auto px-6 pb-24">
                <div className="glass-panel p-12 lg:p-20 text-center relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 opacity-10">
                        <svg className="w-64 h-64" viewBox="0 0 200 200" fill="currentColor">
                            <path d="M40,60 C40,40 60,40 100,40 C140,40 160,40 160,60 C160,80 140,80 100,80 C60,80 40,80 40,60 Z" />
                        </svg>
                    </div>
                    <h2 className="text-4xl lg:text-6xl font-display font-bold mb-8 italic">Ready to transform?</h2>
                    <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">Join GMS today and get access to the best facilities and digital tools in the industry.</p>
                    <Link to="/register" className="btn-primary text-xl px-12 py-4">
                        Join the Club
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Home;
