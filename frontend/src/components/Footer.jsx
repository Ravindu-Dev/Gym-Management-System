import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="relative z-10 bg-gmsdark-950 border-t border-white/5 pt-24 pb-12">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Brand Section */}
                    <div className="space-y-6">
                        <Link to="/" className="text-3xl font-display font-bold heading-gradient tracking-tighter">
                            GMS
                        </Link>
                        <p className="text-gray-400 leading-relaxed text-sm">
                            Elevating the fitness experience through technology and elite coaching. Join the evolution of strength.
                        </p>
                        <div className="flex space-x-4">
                            {['FB', 'IG', 'TW', 'LI'].map((social) => (
                                <a key={social} href="#" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-xs font-bold hover:bg-primary-600/20 hover:border-primary-500/30 transition-all">
                                    {social}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-widest">Explore</h4>
                        <ul className="space-y-4">
                            <li><Link to="/home" className="text-gray-400 hover:text-primary-400 transition-colors text-sm">Home</Link></li>
                            <li><Link to="/about" className="text-gray-400 hover:text-primary-400 transition-colors text-sm">About Us</Link></li>
                            <li><Link to="/classes" className="text-gray-400 hover:text-primary-400 transition-colors text-sm">Classes</Link></li>
                            <li><Link to="/plans" className="text-gray-400 hover:text-primary-400 transition-colors text-sm">Memberships</Link></li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-widest">Support</h4>
                        <ul className="space-y-4">
                            <li><Link to="/contact" className="text-gray-400 hover:text-primary-400 transition-colors text-sm">Contact</Link></li>
                            <li><a href="#" className="text-gray-400 hover:text-primary-400 transition-colors text-sm">FAQs</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-primary-400 transition-colors text-sm">Privacy Policy</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-primary-400 transition-colors text-sm">Terms of Service</a></li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div className="space-y-6">
                        <h4 className="text-white font-bold text-sm uppercase tracking-widest leading-none">Stay Updated</h4>
                        <p className="text-gray-400 text-sm">Get training tips and exclusive offers.</p>
                        <div className="relative group">
                            <input
                                type="email"
                                placeholder="Email address"
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary-500/50 transition-all"
                            />
                            <button className="absolute right-2 top-2 h-8 px-4 bg-primary-600 hover:bg-primary-500 text-white text-xs font-bold rounded-lg transition-all">
                                Join
                            </button>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-gray-500 text-xs text-center md:text-left">
                        © {new Date().getFullYear()} Gym Management System. All rights reserved. Built for performance.
                    </p>
                    <div className="flex items-center space-x-6 text-xs text-gray-500">
                        <span className="flex items-center space-x-2">
                            <span className="w-2 h-2 rounded-full bg-accent-500 animate-pulse"></span>
                            <span>Systems Operational</span>
                        </span>
                    </div>
                </div>
            </div>

            {/* Subtle Gradient Shadow */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-500/20 to-transparent"></div>
        </footer>
    );
};

export default Footer;
