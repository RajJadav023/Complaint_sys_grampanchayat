import React from 'react';

export default function About() {
    return (
        <div className="bg-gray-50 min-h-screen">
            {/* Hero Section */}
            <section className="bg-blue-600 py-20 text-white text-center px-4">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-5xl font-black mb-6 tracking-tight">Bridging the Gap Between Villages & Governance</h1>
                    <p className="text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed">
                        DCMS is a next-generation platform designed to empower rural communities by digitizing the grievance redressal process and ensuring accountability at every level.
                    </p>
                </div>
            </section>

            {/* Mission & Vision */}
            <section className="max-w-6xl mx-auto py-20 px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                        <div className="inline-block px-4 py-1.5 bg-blue-100 text-blue-700 rounded-full text-sm font-black uppercase tracking-widest">
                            Our Mission
                        </div>
                        <h2 className="text-4xl font-extrabold text-gray-900 leading-tight">
                            Transparency for every villager, accountability for every official.
                        </h2>
                        <p className="text-gray-600 text-lg leading-relaxed">
                            Our primary mission is to provide an accessible and transparent digital portal where villagers can report issues—from electricity failures to sanitization concerns—without having to visit government offices multiple times.
                        </p>
                        <ul className="space-y-4 pt-4">
                            {[
                                "Real-time status tracking for all complaints",
                                "Direct redirection to relevant district authorities",
                                "Empowering local leadership with data-driven insights"
                            ].map((item, idx) => (
                                <li key={idx} className="flex items-center space-x-3">
                                    <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                                        <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <span className="text-gray-700 font-medium">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
                        <div className="grid grid-cols-2 gap-6">
                            {[
                                { label: "Complaints Solved", val: "10K+" },
                                { label: "Villages Digitized", val: "150+" },
                                { label: "Response Rate", val: "94%" },
                                { label: "System Uptime", val: "99.9%" }
                            ].map((stat, i) => (
                                <div key={i} className="text-center p-6 bg-gray-50 rounded-2xl">
                                    <div className="text-3xl font-black text-blue-600 mb-1">{stat.val}</div>
                                    <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Core Values */}
            <section className="bg-white py-24">
                <div className="max-w-6xl mx-auto px-4 text-center">
                    <h2 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">Our Core Values</h2>
                    <p className="text-gray-500 mb-16 max-w-xl mx-auto">The foundation of everything we build at DCMS.</p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                title: "Integrity",
                                desc: "Honesty and ethical accountability are the core of our digital infrastructure.",
                                icon: (
                                    <svg className="w-8 h-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-7.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                    </svg>
                                )
                            },
                            {
                                title: "Innovation",
                                desc: "Using AI and cloud technology to simplify complex bureaucratic workflows.",
                                icon: (
                                    <svg className="w-8 h-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                )
                            },
                            {
                                title: "Empowerment",
                                desc: "Putting power back into the hands of citizens through digital accessibility.",
                                icon: (
                                    <svg className="w-8 h-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                    </svg>
                                )
                            }
                        ].map((value, i) => (
                            <div key={i} className="p-10 bg-gray-50 rounded-3xl border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                                <div className="mb-6 flex justify-center">{value.icon}</div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3 uppercase tracking-tight">{value.title}</h3>
                                <p className="text-gray-600 leading-relaxed text-sm">
                                    {value.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact CTA */}
            <section className="py-24 bg-gray-900 text-white text-center">
                <div className="max-w-2xl mx-auto px-4">
                    <h2 className="text-3xl font-black mb-4">Want to implement DCMS in your village?</h2>
                    <p className="text-gray-400 mb-10 font-medium">We are scaling to 1,000+ villages by 2026. Join the movement.</p>
                    <button className="bg-blue-600 hover:bg-blue-700 font-black text-xs uppercase tracking-widest py-4 px-10 rounded-full transition-all shadow-xl shadow-blue-600/20 active:scale-95">
                        Contact Official Support
                    </button>
                </div>
            </section>
        </div>
    );
}
