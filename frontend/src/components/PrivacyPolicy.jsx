import { Link } from 'react-router-dom';

const PrivacyPolicy = () => {
    return (
        <div className="min-h-screen bg-gmsdark-950 text-gray-100">
            {/* Hero Section */}
            <div className="relative overflow-hidden bg-gradient-to-br from-gmsdark-900 via-gmsdark-950 to-gmsdark-900 border-b border-white/5">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary-900/20 via-transparent to-transparent"></div>
                <div className="container mx-auto px-6 py-20 relative">
                    <Link to="/" className="inline-flex items-center text-gray-400 hover:text-white mb-8 transition-colors">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back to Home
                    </Link>
                    <h1 className="text-5xl md:text-6xl font-display font-bold heading-gradient mb-4 italic">
                        Privacy Policy
                    </h1>
                    <p className="text-gray-400">
                        Last updated: January 7, 2026
                    </p>
                </div>
            </div>

            {/* Content */}
            <div className="container mx-auto px-6 py-16">
                <div className="max-w-4xl mx-auto prose prose-invert prose-lg">
                    <div className="glass-panel p-8 mb-8">
                        <h2 className="text-2xl font-bold text-white mb-4">Introduction</h2>
                        <p className="text-gray-400 leading-relaxed">
                            At GMS (Gym Management System), we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our services. Please read this policy carefully.
                        </p>
                    </div>

                    <div className="glass-panel p-8 mb-8">
                        <h2 className="text-2xl font-bold text-white mb-4">Information We Collect</h2>
                        <div className="space-y-4 text-gray-400">
                            <div>
                                <h3 className="text-lg font-semibold text-white mb-2">Personal Information</h3>
                                <p className="leading-relaxed">
                                    We collect information that you provide directly to us, including:
                                </p>
                                <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
                                    <li>Name, email address, and phone number</li>
                                    <li>Billing and payment information</li>
                                    <li>Profile information (age, gender, fitness goals)</li>
                                    <li>Workout and nutrition logs</li>
                                    <li>Class bookings and attendance records</li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-white mb-2">Automatically Collected Information</h3>
                                <p className="leading-relaxed">
                                    When you access our services, we may automatically collect:
                                </p>
                                <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
                                    <li>Device information (IP address, browser type, operating system)</li>
                                    <li>Usage data (pages visited, time spent, features used)</li>
                                    <li>Location data (with your permission)</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="glass-panel p-8 mb-8">
                        <h2 className="text-2xl font-bold text-white mb-4">How We Use Your Information</h2>
                        <p className="text-gray-400 leading-relaxed mb-4">
                            We use the information we collect to:
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-gray-400 ml-4">
                            <li>Provide, maintain, and improve our services</li>
                            <li>Process your membership and payments</li>
                            <li>Send you confirmations, updates, and administrative messages</li>
                            <li>Personalize your experience and provide tailored recommendations</li>
                            <li>Monitor and analyze usage patterns and trends</li>
                            <li>Detect, prevent, and address technical issues or fraudulent activity</li>
                            <li>Comply with legal obligations</li>
                        </ul>
                    </div>

                    <div className="glass-panel p-8 mb-8">
                        <h2 className="text-2xl font-bold text-white mb-4">Information Sharing and Disclosure</h2>
                        <p className="text-gray-400 leading-relaxed mb-4">
                            We do not sell your personal information. We may share your information only in the following circumstances:
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-gray-400 ml-4">
                            <li><strong className="text-white">Service Providers:</strong> With third-party vendors who perform services on our behalf (e.g., payment processing, email delivery)</li>
                            <li><strong className="text-white">Legal Requirements:</strong> When required by law or to protect our rights and safety</li>
                            <li><strong className="text-white">Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets</li>
                            <li><strong className="text-white">With Your Consent:</strong> When you explicitly authorize us to share your information</li>
                        </ul>
                    </div>

                    <div className="glass-panel p-8 mb-8">
                        <h2 className="text-2xl font-bold text-white mb-4">Data Security</h2>
                        <p className="text-gray-400 leading-relaxed">
                            We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.
                        </p>
                    </div>

                    <div className="glass-panel p-8 mb-8">
                        <h2 className="text-2xl font-bold text-white mb-4">Your Rights and Choices</h2>
                        <p className="text-gray-400 leading-relaxed mb-4">
                            You have the following rights regarding your personal information:
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-gray-400 ml-4">
                            <li><strong className="text-white">Access:</strong> Request a copy of your personal data</li>
                            <li><strong className="text-white">Correction:</strong> Update or correct inaccurate information</li>
                            <li><strong className="text-white">Deletion:</strong> Request deletion of your account and data</li>
                            <li><strong className="text-white">Opt-Out:</strong> Unsubscribe from marketing communications</li>
                            <li><strong className="text-white">Data Portability:</strong> Receive your data in a structured format</li>
                        </ul>
                        <p className="text-gray-400 leading-relaxed mt-4">
                            To exercise these rights, please contact us at <a href="mailto:privacy@gms.com" className="text-primary-400 hover:text-primary-300">privacy@gms.com</a>.
                        </p>
                    </div>

                    <div className="glass-panel p-8 mb-8">
                        <h2 className="text-2xl font-bold text-white mb-4">Cookies and Tracking Technologies</h2>
                        <p className="text-gray-400 leading-relaxed">
                            We use cookies and similar tracking technologies to collect and track information about your use of our services. You can control cookies through your browser settings, but disabling cookies may affect the functionality of our services.
                        </p>
                    </div>

                    <div className="glass-panel p-8 mb-8">
                        <h2 className="text-2xl font-bold text-white mb-4">Children's Privacy</h2>
                        <p className="text-gray-400 leading-relaxed">
                            Our services are not intended for individuals under the age of 18. We do not knowingly collect personal information from children. If you believe we have collected information from a child, please contact us immediately.
                        </p>
                    </div>

                    <div className="glass-panel p-8 mb-8">
                        <h2 className="text-2xl font-bold text-white mb-4">Changes to This Policy</h2>
                        <p className="text-gray-400 leading-relaxed">
                            We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last updated" date. Your continued use of our services after changes constitutes acceptance of the updated policy.
                        </p>
                    </div>

                    <div className="glass-panel p-8 bg-gradient-to-br from-primary-600/10 to-accent-500/10 border-primary-500/20">
                        <h2 className="text-2xl font-bold text-white mb-4">Contact Us</h2>
                        <p className="text-gray-400 leading-relaxed mb-4">
                            If you have any questions about this Privacy Policy, please contact us:
                        </p>
                        <ul className="space-y-2 text-gray-400">
                            <li>Email: <a href="mailto:privacy@gms.com" className="text-primary-400 hover:text-primary-300">privacy@gms.com</a></li>
                            <li>Phone: +1 (555) 123-4567</li>
                            <li>Address: 123 Fitness Street, Wellness City, WC 12345</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
