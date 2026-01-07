import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';

const Contact = () => {
    const form = useRef();
    const [status, setStatus] = useState('idle'); // idle, sending, success, error
    const [message, setMessage] = useState('');

    const [formData, setFormData] = useState({
        user_name: '',
        user_email: '',
        subject: 'Membership Inquiry',
        message: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const sendEmail = (e) => {
        e.preventDefault();
        setStatus('sending');

        // Replace these with your actual IDs from EmailJS
        const SERVICE_ID = 'service_ve23nbz';
        const TEMPLATE_ID = 'template_3sidh7o';
        const PUBLIC_KEY = 'UA0Ttvut-g5dpmnJO';

        emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form.current, PUBLIC_KEY)
            .then((result) => {
                console.log(result.text);
                setStatus('success');
                setMessage('Thank you! Your message has been sent successfully.');
                setFormData({ user_name: '', user_email: '', subject: 'Membership Inquiry', message: '' });
                setTimeout(() => setStatus('idle'), 5000);
            }, (error) => {
                console.log(error.text);
                setStatus('error');
                setMessage('Oops! Something went wrong. Please try again later.');
                setTimeout(() => setStatus('idle'), 5000);
            });
    };

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
                                <p className="text-lg font-bold">123 Dalada Veediya, Kandy, Sri Lanka, 20000</p>
                            </div>
                        </div>

                        <div className="flex items-center space-x-6 glass-panel p-6 group hover:border-accent-500/30 transition-all">
                            <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-2xl group-hover:bg-accent-500/20 transition-all">
                                📧
                            </div>
                            <div>
                                <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Email Support</p>
                                <p className="text-lg font-bold">info@gmskandy.lk</p>
                            </div>
                        </div>

                        <div className="flex items-center space-x-6 glass-panel p-6 group hover:border-orange-500/30 transition-all">
                            <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-2xl group-hover:bg-orange-500/20 transition-all">
                                📞
                            </div>
                            <div>
                                <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Phone Line</p>
                                <p className="text-lg font-bold">+94 81 222 3333</p>
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

                    {status === 'success' ? (
                        <div className="text-center py-20 space-y-6 relative z-10 animate-fade-in">
                            <div className="w-20 h-20 bg-accent-500/20 text-accent-400 rounded-full flex items-center justify-center text-4xl mx-auto shadow-lg border border-accent-500/30">✓</div>
                            <h2 className="text-3xl font-bold text-white italic">Message Sent!</h2>
                            <p className="text-gray-400">{message}</p>
                            <button onClick={() => setStatus('idle')} className="btn-primary">Send Another</button>
                        </div>
                    ) : (
                        <>
                            <form ref={form} onSubmit={sendEmail} className="space-y-6 relative z-10">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Full Name</label>
                                        <input type="text" name="user_name" value={formData.user_name} onChange={handleChange} required className="input-field" placeholder="John Doe" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Email Address</label>
                                        <input type="email" name="user_email" value={formData.user_email} onChange={handleChange} required className="input-field" placeholder="john@example.com" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Subject</label>
                                    <select name="subject" value={formData.subject} onChange={handleChange} className="input-field appearance-none bg-[#1e293b]">
                                        <option value="Membership Inquiry">Membership Inquiry</option>
                                        <option value="Technical Support">Technical Support</option>
                                        <option value="Personal Training">Personal Training</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Message</label>
                                    <textarea name="message" value={formData.message} onChange={handleChange} required rows="5" className="input-field resize-none" placeholder="How can we help you?"></textarea>
                                </div>

                                {status === 'error' && <p className="text-red-400 text-sm font-medium">{message}</p>}

                                <button type="submit" disabled={status === 'sending'} className={`w-full btn-primary py-4 flex items-center justify-center gap-3 ${status === 'sending' ? 'opacity-50 cursor-not-allowed' : ''}`}>
                                    {status === 'sending' ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                            Sending...
                                        </>
                                    ) : 'Send Message'}
                                </button>
                            </form>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Contact;
