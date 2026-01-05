import React from 'react';

const Contact = () => {
    return (
        <div className="max-w-7xl mx-auto px-6 py-24 animate-fade-in">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                {/* Contact Info */}
                <div className="space-y-12">
                    <div className="space-y-6">
                        <h1 className="text-6xl font-display font-bold italic heading-gradient">Get In Touch</h1>
                        <p className="text-xl text-gray-400 leading-relaxed">
                            Have questions? We're here to help you on your fitness journey. Reach out anytime.
                        </p>
                    </div>

                    <div className="space-y-8">
                        <div className="flex items-center space-x-6 glass-panel p-6 group hover:border-primary-500/30 transition-all">
                            <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-2xl group-hover:bg-primary-600/20 transition-all">
                                📍
                            </div>
                            <div>
                                <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Our Location</p>
                                <p className="text-lg font-bold">123 Fitness Way, Tech City, 90210</p>
                            </div>
                        </div>

                        <div className="flex items-center space-x-6 glass-panel p-6 group hover:border-accent-500/30 transition-all">
                            <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-2xl group-hover:bg-accent-500/20 transition-all">
                                📧
                            </div>
                            <div>
                                <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Email Support</p>
                                <p className="text-lg font-bold">support@gms-fitness.com</p>
                            </div>
                        </div>

                        <div className="flex items-center space-x-6 glass-panel p-6 group hover:border-orange-500/30 transition-all">
                            <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-2xl group-hover:bg-orange-500/20 transition-all">
                                📞
                            </div>
                            <div>
                                <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Phone Line</p>
                                <p className="text-lg font-bold">+1 (555) 000-1234</p>
                            </div>
                        </div>
                    </div>

                    <div className="pt-8 flex space-x-6">
                        {['fb', 'ig', 'tw', 'li'].map(social => (
                            <div key={social} className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 cursor-pointer transition-all font-bold text-xs uppercase">
                                {social}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Contact Form */}
                <div className="glass-panel p-10 lg:p-12 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 text-6xl opacity-10 rotate-12">✉️</div>
                    <form className="space-y-6 relative z-10">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Full Name</label>
                                <input type="text" className="input-field" placeholder="John Doe" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Email Address</label>
                                <input type="email" className="input-field" placeholder="john@example.com" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Subject</label>
                            <select className="input-field appearance-none">
                                <option>Membership Inquiry</option>
                                <option>Technical Support</option>
                                <option>Personal Training</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Message</label>
                            <textarea rows="5" className="input-field resize-none" placeholder="How can we help you?"></textarea>
                        </div>
                        <button type="submit" className="w-full btn-primary py-4">
                            Send Message
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Contact;
