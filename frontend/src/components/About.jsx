import React from 'react';

const About = () => {
    return (
        <div className="max-w-7xl mx-auto px-6 py-24 space-y-24 animate-fade-in">
            {/* Mission Section */}
            <div className="text-center space-y-6">
                <h1 className="text-5xl lg:text-7xl font-display font-bold italic heading-gradient">Our Mission</h1>
                <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
                    At GMS, we believe fitness is not just about the body, but about the spirit. We've built an ecosystem where technology meets iron to help you achieve the impossible.
                </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                    { label: 'Founded', value: '2020' },
                    { label: 'Active Members', value: '5,000+' },
                    { label: 'Expert Trainers', value: '24' },
                    { label: 'Facilities', value: 'Global' },
                ].map((stat, i) => (
                    <div key={i} className="glass-panel p-8 text-center group hover:border-primary-500/30 transition-all">
                        <p className="text-4xl font-display font-bold text-white mb-2">{stat.value}</p>
                        <p className="text-sm font-bold text-gray-500 uppercase tracking-widest">{stat.label}</p>
                    </div>
                ))}
            </div>

            {/* Image Section */}
            <div className="relative h-[500px] rounded-3xl overflow-hidden glass-panel">
                <img
                    src="/src/assets/hero_fitness_bg_1767629210300.png"
                    alt="Our Facility"
                    className="w-full h-full object-cover opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gmsdark-950 px-12 pb-12 flex flex-col justify-end">
                    <h2 className="text-3xl font-bold mb-4 italic">World Class Facilities</h2>
                    <p className="text-gray-300 max-w-xl">Our centers are equipped with the latest biometric tracking and elite-level equipment used by professional athletes.</p>
                </div>
            </div>

            {/* Team Section */}
            <div className="space-y-12">
                <div className="text-center">
                    <h2 className="text-4xl font-display font-bold italic italic mb-4">The Experts</h2>
                    <p className="text-gray-400">Led by industry veterans and world-class athletes.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        { name: 'Marcus Thorne', role: 'Head of Performance', bio: 'Former Olympian with 15+ years of coaching experience.' },
                        { name: 'Elena Vance', role: 'Nutrition Director', bio: 'Specialist in metabolic conditioning and performance fueling.' },
                        { name: 'David Cho', role: 'Tech Lead', bio: 'Visionary behind our digital tracking ecosystem.' }
                    ].map((member, i) => (
                        <div key={i} className="glass-card flex flex-col items-center text-center">
                            <div className="w-24 h-24 rounded-full bg-gmsdark-900 border-2 border-primary-500/20 mb-6 flex items-center justify-center text-3xl">
                                👤
                            </div>
                            <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                            <p className="text-xs text-primary-400 font-bold uppercase tracking-wider mb-4">{member.role}</p>
                            <p className="text-sm text-gray-400">{member.bio}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default About;
