import React, { useState } from 'react';

export default function Help() {
    const [activeTab, setActiveTab] = useState('general');

    const categories = [
        { id: 'general', name: 'General Support', icon: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
        { id: 'complaints', name: 'Complaint Flow', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01' },
        { id: 'technical', name: 'Identity & Access', icon: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z' }
    ];

    const faqs = {
        general: [
            { q: "What is DCMS?", a: "The Digital Complain Management System (DCMS) is a centralized portal for villagers to report infrastructure, electricity, or water issues directly to their Grampanchayat and district officials." },
            { q: "Who can use this portal?", a: "Any registered resident of the villages currently integrated into the system can use DCMS to file complaints and track their progress." },
            { q: "Is there any cost for filing a complaint?", a: "No, DCMS is a completely free service provided for public convenience and transparency." }
        ],
        complaints: [
            { q: "How do I file a new complaint?", a: "Navigate to the 'Complain' section in the sidebar/navbar, select the relevant category (e.g., Road, Electricity), provide the address and description, and click submit." },
            { q: "How long does it take to resolve a complaint?", a: "Resolution times vary by category. Urgent issues like electricity usually take 24-48 hours, while major infrastructure projects may take longer." },
            { q: "How can I check my complaint status?", a: "Go to the 'Status' page. You will see a list of all your complaints, their current state (Pending, Resolved, etc.), and official admin responses." }
        ],
        technical: [
            { q: "I forgot my password, what should I do?", a: "Currently, you can contact your local Grampanchayat IT administrator to reset your credentials manually." },
            { q: "Can I change my username?", a: "Usernames are unique identity markers and cannot be changed once the account is created. You can, however, update your display name in the profile." },
            { q: "Is my data secure?", a: "Yes, DCMS uses industry-standard encryption for passwords and maintains secure session cookies to protect your personal information." }
        ]
    };

    return (
        <div className="bg-white min-h-screen">
            {/* Header - Simple */}
            <header className="bg-gray-50 border-b border-gray-100 py-16 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-4">Help Center</h1>
                    <p className="text-gray-500 text-lg font-medium">Find answers to common questions about the DCMS portal.</p>
                </div>
            </header>

            {/* Support Grid */}
            <main className="max-w-6xl mx-auto py-16 px-4">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Categories Sidebar */}
                    <div className="space-y-4">
                        <h2 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-6 px-4">Help Categories</h2>
                        {categories.map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => setActiveTab(cat.id)}
                                className={`w-full flex items-center space-x-4 p-4 rounded-2xl transition-all border-2 ${activeTab === cat.id
                                        ? 'bg-blue-600 border-blue-600 text-white shadow-lg'
                                        : 'bg-white border-transparent text-gray-600 hover:bg-gray-50'
                                    }`}
                            >
                                <svg className={`h-6 w-6 ${activeTab === cat.id ? 'text-white' : 'text-blue-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={cat.icon} />
                                </svg>
                                <span className="font-bold">{cat.name}</span>
                            </button>
                        ))}

                        <div className="mt-12 p-8 bg-blue-50 rounded-3xl border border-blue-100">
                            <h3 className="text-blue-900 font-bold mb-2">Need Direct Help?</h3>
                            <p className="text-blue-700 text-sm mb-4 leading-relaxed">Our official support desk is available Monday to Saturday, 10 AM - 5 PM.</p>
                            <a href="mailto:support@dcms-gov.in" className="text-blue-900 text-sm font-black underline">support@dcms-gov.in</a>
                        </div>
                    </div>

                    {/* FAQ Content */}
                    <div className="lg:col-span-2 space-y-8 animate-in fade-in transition-all duration-500">
                        <h2 className="text-2xl font-black text-gray-900 mb-8 border-b pb-4 flex items-center">
                            <span className="bg-gray-900 h-2 w-2 rounded-full mr-3"></span>
                            {categories.find(c => c.id === activeTab)?.name}
                        </h2>

                        <div className="space-y-6">
                            {faqs[activeTab].map((faq, idx) => (
                                <div key={idx} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                                    <h4 className="text-lg font-bold text-gray-900 mb-2">{faq.q}</h4>
                                    <p className="text-gray-600 leading-relaxed text-sm">
                                        {faq.a}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>

            {/* Footer Support Info */}
            <footer className="bg-gray-50 py-12 border-t border-gray-100 text-center">
                <div className="max-w-4xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
                    <div>
                        <span className="block font-black text-gray-400 uppercase tracking-widest mb-2">District Helpline</span>
                        <span className="text-gray-900 font-bold">+91 000-111-2222</span>
                    </div>
                    <div>
                        <span className="block font-black text-gray-400 uppercase tracking-widest mb-2">Local Grampanchayat</span>
                        <span className="text-gray-900 font-bold">Office Hours: 10AM - 6PM</span>
                    </div>
                    <div>
                        <span className="block font-black text-gray-400 uppercase tracking-widest mb-2">Platform Version</span>
                        <span className="text-gray-900 font-bold">DCMS v2.4.0 (Alpha Build)</span>
                    </div>
                </div>
            </footer>
        </div>
    );
}
