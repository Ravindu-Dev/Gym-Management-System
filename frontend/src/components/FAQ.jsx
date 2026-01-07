import { useState } from 'react';
import { Link } from 'react-router-dom';

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const faqs = [
        {
            category: "Membership & Billing",
            questions: [
                {
                    q: "What membership plans do you offer?",
                    a: "We offer three main plans: Basic ($29/month), Premium ($49/month), and Elite ($79/month). Each plan includes different levels of access to classes, equipment, and personal training sessions."
                },
                {
                    q: "Can I cancel my membership anytime?",
                    a: "Yes! All our memberships are flexible. You can cancel anytime from your profile settings. Your access will continue until the end of your current billing period."
                },
                {
                    q: "Do you offer student or senior discounts?",
                    a: "Yes, we offer 15% off for students with valid ID and 20% off for seniors (65+). Contact us to apply the discount to your account."
                },
                {
                    q: "What payment methods do you accept?",
                    a: "We accept all major credit cards, debit cards, and digital wallets through our secure Stripe payment gateway."
                }
            ]
        },
        {
            category: "Classes & Training",
            questions: [
                {
                    q: "How do I book a class?",
                    a: "Log into your dashboard, navigate to 'Classes', browse available sessions, and click 'Book' on your preferred class. You'll receive a confirmation email."
                },
                {
                    q: "Can I bring a guest?",
                    a: "Premium and Elite members can bring one guest per visit. Basic members can purchase guest passes for $10 each."
                },
                {
                    q: "What if I need to cancel a class booking?",
                    a: "You can cancel up to 2 hours before the class starts without penalty. Late cancellations may result in a no-show fee."
                },
                {
                    q: "Do you offer personal training?",
                    a: "Yes! You can book certified personal trainers through the 'Book Trainer' section. Rates vary by trainer experience level."
                }
            ]
        },
        {
            category: "Facilities & Equipment",
            questions: [
                {
                    q: "What are your operating hours?",
                    a: "We're open 24/7 for Elite members. Premium members have access from 5 AM to 11 PM. Basic members can access the gym from 6 AM to 8 PM on weekdays."
                },
                {
                    q: "Do you provide lockers and showers?",
                    a: "Yes, we have complimentary lockers (bring your own lock) and shower facilities with towel service for all members."
                },
                {
                    q: "Is there parking available?",
                    a: "Yes, we offer free parking for all members in our dedicated lot. Bike racks are also available."
                },
                {
                    q: "What equipment do you have?",
                    a: "We have a full range of cardio machines, free weights, resistance machines, functional training areas, and specialized equipment for CrossFit and Olympic lifting."
                }
            ]
        },
        {
            category: "Account & Technical",
            questions: [
                {
                    q: "How do I reset my password?",
                    a: "Click 'Forgot Password' on the login page, enter your email, and follow the reset link sent to your inbox."
                },
                {
                    q: "Can I freeze my membership?",
                    a: "Yes, you can freeze your membership for up to 3 months per year. Contact support or manage it from your profile."
                },
                {
                    q: "How does the QR entry pass work?",
                    a: "Your digital QR pass is available in your dashboard under 'My Pass'. Simply show it at the entrance scanner for quick check-in."
                },
                {
                    q: "I'm having technical issues. Who do I contact?",
                    a: "Reach out to our support team via the Contact page or email support@gms.com. We typically respond within 24 hours."
                }
            ]
        }
    ];

    const toggleFAQ = (categoryIndex, questionIndex) => {
        const index = `${categoryIndex}-${questionIndex}`;
        setOpenIndex(openIndex === index ? null : index);
    };

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
                        Frequently Asked Questions
                    </h1>
                    <p className="text-xl text-gray-400 max-w-2xl">
                        Find answers to common questions about memberships, classes, facilities, and more.
                    </p>
                </div>
            </div>

            {/* FAQ Content */}
            <div className="container mx-auto px-6 py-16">
                <div className="max-w-4xl mx-auto space-y-12">
                    {faqs.map((category, categoryIndex) => (
                        <div key={categoryIndex}>
                            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                                <span className="w-1 h-8 bg-primary-500 mr-4 rounded-full"></span>
                                {category.category}
                            </h2>
                            <div className="space-y-4">
                                {category.questions.map((faq, questionIndex) => {
                                    const index = `${categoryIndex}-${questionIndex}`;
                                    const isOpen = openIndex === index;
                                    return (
                                        <div
                                            key={questionIndex}
                                            className="glass-panel overflow-hidden transition-all duration-300"
                                        >
                                            <button
                                                onClick={() => toggleFAQ(categoryIndex, questionIndex)}
                                                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
                                            >
                                                <span className="font-semibold text-white pr-8">{faq.q}</span>
                                                <svg
                                                    className={`w-5 h-5 text-primary-400 flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                                </svg>
                                            </button>
                                            <div
                                                className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96' : 'max-h-0'}`}
                                            >
                                                <div className="px-6 pb-5 text-gray-400 border-t border-white/5 pt-4">
                                                    {faq.a}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Still Have Questions */}
                <div className="max-w-4xl mx-auto mt-16">
                    <div className="glass-panel p-8 text-center bg-gradient-to-br from-primary-600/10 to-accent-500/10 border-primary-500/20">
                        <h3 className="text-2xl font-bold text-white mb-3">Still have questions?</h3>
                        <p className="text-gray-400 mb-6">
                            Can't find what you're looking for? Our support team is here to help.
                        </p>
                        <Link to="/contact" className="btn-primary inline-block">
                            Contact Support
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FAQ;
