import { Link } from 'react-router-dom';

const TermsOfService = () => {
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
                        Terms of Service
                    </h1>
                    <p className="text-gray-400">
                        Last updated: January 7, 2026
                    </p>
                </div>
            </div>

            {/* Content */}
            <div className="container mx-auto px-6 py-16">
                <div className="max-w-4xl mx-auto">
                    <div className="glass-panel p-8 mb-8">
                        <h2 className="text-2xl font-bold text-white mb-4">Agreement to Terms</h2>
                        <p className="text-gray-400 leading-relaxed">
                            By accessing or using GMS (Gym Management System), you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using our services.
                        </p>
                    </div>

                    <div className="glass-panel p-8 mb-8">
                        <h2 className="text-2xl font-bold text-white mb-4">Membership Terms</h2>
                        <div className="space-y-4 text-gray-400">
                            <div>
                                <h3 className="text-lg font-semibold text-white mb-2">Eligibility</h3>
                                <p className="leading-relaxed">
                                    You must be at least 18 years old to register for a membership. Minors (ages 13-17) may use our facilities with parental consent and supervision.
                                </p>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-white mb-2">Membership Plans</h3>
                                <ul className="list-disc list-inside space-y-1 ml-4">
                                    <li>All memberships are billed on a recurring monthly basis</li>
                                    <li>Membership fees are non-refundable except as required by law</li>
                                    <li>We reserve the right to modify membership fees with 30 days' notice</li>
                                    <li>You may cancel your membership at any time from your account settings</li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-white mb-2">Payment</h3>
                                <p className="leading-relaxed">
                                    By providing payment information, you authorize us to charge your payment method for all fees incurred. You are responsible for keeping your payment information current.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="glass-panel p-8 mb-8">
                        <h2 className="text-2xl font-bold text-white mb-4">Facility Rules and Conduct</h2>
                        <div className="space-y-4 text-gray-400">
                            <p className="leading-relaxed">Members must adhere to the following rules:</p>
                            <ul className="list-disc list-inside space-y-2 ml-4">
                                <li>Respect all staff, trainers, and fellow members</li>
                                <li>Maintain proper hygiene and wear appropriate athletic attire</li>
                                <li>Wipe down equipment after use</li>
                                <li>Return all equipment to designated areas</li>
                                <li>No photography or video recording without permission</li>
                                <li>No harassment, discrimination, or inappropriate behavior</li>
                                <li>Follow all posted safety guidelines and staff instructions</li>
                                <li>Children must be supervised at all times</li>
                            </ul>
                            <p className="leading-relaxed mt-4">
                                Violation of these rules may result in membership suspension or termination without refund.
                            </p>
                        </div>
                    </div>

                    <div className="glass-panel p-8 mb-8">
                        <h2 className="text-2xl font-bold text-white mb-4">Health and Safety</h2>
                        <div className="space-y-4 text-gray-400">
                            <div>
                                <h3 className="text-lg font-semibold text-white mb-2">Medical Clearance</h3>
                                <p className="leading-relaxed">
                                    You should consult with a physician before beginning any exercise program. By using our facilities, you represent that you are in good health and have no medical conditions that would prevent safe participation.
                                </p>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-white mb-2">Assumption of Risk</h3>
                                <p className="leading-relaxed">
                                    You acknowledge that physical exercise involves inherent risks of injury. You voluntarily assume all risks associated with your use of our facilities and services.
                                </p>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-white mb-2">Emergency Procedures</h3>
                                <p className="leading-relaxed">
                                    In case of medical emergency, our staff will contact emergency services. You consent to receive emergency medical treatment if necessary.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="glass-panel p-8 mb-8">
                        <h2 className="text-2xl font-bold text-white mb-4">Limitation of Liability</h2>
                        <p className="text-gray-400 leading-relaxed mb-4">
                            To the fullest extent permitted by law:
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-gray-400 ml-4">
                            <li>GMS shall not be liable for any injuries, losses, or damages arising from your use of our facilities</li>
                            <li>We are not responsible for lost, stolen, or damaged personal property</li>
                            <li>Our total liability shall not exceed the amount you paid for membership in the past 12 months</li>
                            <li>We disclaim all warranties, express or implied, regarding our services</li>
                        </ul>
                    </div>

                    <div className="glass-panel p-8 mb-8">
                        <h2 className="text-2xl font-bold text-white mb-4">Intellectual Property</h2>
                        <p className="text-gray-400 leading-relaxed">
                            All content on our platform, including text, graphics, logos, and software, is the property of GMS and protected by copyright and trademark laws. You may not reproduce, distribute, or create derivative works without our written permission.
                        </p>
                    </div>

                    <div className="glass-panel p-8 mb-8">
                        <h2 className="text-2xl font-bold text-white mb-4">Account Responsibilities</h2>
                        <div className="space-y-4 text-gray-400">
                            <p className="leading-relaxed">You are responsible for:</p>
                            <ul className="list-disc list-inside space-y-2 ml-4">
                                <li>Maintaining the confidentiality of your account credentials</li>
                                <li>All activities that occur under your account</li>
                                <li>Notifying us immediately of any unauthorized use</li>
                                <li>Providing accurate and current information</li>
                            </ul>
                            <p className="leading-relaxed mt-4">
                                We reserve the right to suspend or terminate accounts that violate these terms or engage in fraudulent activity.
                            </p>
                        </div>
                    </div>

                    <div className="glass-panel p-8 mb-8">
                        <h2 className="text-2xl font-bold text-white mb-4">Class Bookings and Cancellations</h2>
                        <ul className="list-disc list-inside space-y-2 text-gray-400 ml-4">
                            <li>Class bookings are subject to availability</li>
                            <li>You must cancel at least 2 hours before class start time</li>
                            <li>Late cancellations or no-shows may result in fees or booking restrictions</li>
                            <li>We reserve the right to cancel classes due to low enrollment or unforeseen circumstances</li>
                        </ul>
                    </div>

                    <div className="glass-panel p-8 mb-8">
                        <h2 className="text-2xl font-bold text-white mb-4">Termination</h2>
                        <div className="space-y-4 text-gray-400">
                            <p className="leading-relaxed">
                                Either party may terminate the membership agreement:
                            </p>
                            <ul className="list-disc list-inside space-y-2 ml-4">
                                <li><strong className="text-white">By You:</strong> Cancel anytime from your account settings. Access continues until the end of your billing period.</li>
                                <li><strong className="text-white">By Us:</strong> We may terminate immediately for violations of these terms, non-payment, or inappropriate conduct.</li>
                            </ul>
                            <p className="leading-relaxed mt-4">
                                Upon termination, your access to facilities and services will cease, and you must return any gym property in your possession.
                            </p>
                        </div>
                    </div>

                    <div className="glass-panel p-8 mb-8">
                        <h2 className="text-2xl font-bold text-white mb-4">Dispute Resolution</h2>
                        <p className="text-gray-400 leading-relaxed">
                            Any disputes arising from these terms shall be resolved through binding arbitration in accordance with the rules of the American Arbitration Association. You waive your right to participate in class action lawsuits.
                        </p>
                    </div>

                    <div className="glass-panel p-8 mb-8">
                        <h2 className="text-2xl font-bold text-white mb-4">Changes to Terms</h2>
                        <p className="text-gray-400 leading-relaxed">
                            We reserve the right to modify these Terms of Service at any time. We will notify you of material changes via email or through our platform. Your continued use after changes constitutes acceptance of the modified terms.
                        </p>
                    </div>

                    <div className="glass-panel p-8 mb-8">
                        <h2 className="text-2xl font-bold text-white mb-4">Governing Law</h2>
                        <p className="text-gray-400 leading-relaxed">
                            These terms are governed by the laws of the State of California, without regard to conflict of law principles. Any legal action must be brought in the courts located in Los Angeles County, California.
                        </p>
                    </div>

                    <div className="glass-panel p-8 bg-gradient-to-br from-primary-600/10 to-accent-500/10 border-primary-500/20">
                        <h2 className="text-2xl font-bold text-white mb-4">Contact Information</h2>
                        <p className="text-gray-400 leading-relaxed mb-4">
                            For questions about these Terms of Service, please contact us:
                        </p>
                        <ul className="space-y-2 text-gray-400">
                            <li>Email: <a href="mailto:legal@gms.com" className="text-primary-400 hover:text-primary-300">legal@gms.com</a></li>
                            <li>Phone: +1 (555) 123-4567</li>
                            <li>Address: 123 Fitness Street, Wellness City, WC 12345</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TermsOfService;
