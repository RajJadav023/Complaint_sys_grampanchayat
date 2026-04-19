import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ScrollReveal from '../components/ScrollReveal';

export default function Help() {
    const { t } = useTranslation();
    const [activeTab, setActiveTab] = useState('general');

    const categories = [
        { id: 'general', name: t('help.categories.general'), icon: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
        { id: 'complaints', name: t('help.categories.complaints'), icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01' },
        { id: 'technical', name: t('help.categories.technical'), icon: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z' }
    ];

    const currentFaqs = t(`help.faqs.${activeTab}`, { returnObjects: true }) || [];

    return (
        <div className="bg-white min-h-screen">
            {/* Header - Simple */}
            <header className="bg-gray-50 border-b border-gray-100 py-20 px-4">
                <ScrollReveal className="max-w-4xl mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tighter mb-4 uppercase">{t('help.title')}</h1>
                    <p className="text-gray-500 text-lg font-bold opacity-80">{t('help.subtitle')}</p>
                </ScrollReveal>
            </header>

            {/* Support Grid */}
            <main className="max-w-6xl mx-auto py-20 px-4">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                    {/* Categories Sidebar */}
                    <div className="space-y-6">
                        <ScrollReveal>
                            <h2 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-6 px-4">{t('help.categoriesTitle')}</h2>
                        </ScrollReveal>
                        <div className="space-y-3">
                            {categories.map((cat, i) => (
                                <ScrollReveal key={cat.id} delay={i * 100}>
                                    <button
                                        onClick={() => setActiveTab(cat.id)}
                                        className={`w-full flex items-center space-x-4 p-5 rounded-3xl transition-all border-2 ${activeTab === cat.id
                                            ? 'bg-blue-600 border-blue-600 text-white shadow-2xl shadow-blue-600/20'
                                            : 'bg-white border-transparent text-gray-600 hover:bg-gray-50'
                                            }`}
                                    >
                                        <div className={`p-2 rounded-xl ${activeTab === cat.id ? 'bg-white/20 text-white' : 'bg-blue-50 text-blue-600'}`}>
                                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d={cat.icon} />
                                            </svg>
                                        </div>
                                        <span className="font-black text-xs uppercase tracking-widest">{cat.name}</span>
                                    </button>
                                </ScrollReveal>
                            ))}
                        </div>

                        <ScrollReveal delay={400} className="mt-12 p-8 bg-black rounded-[40px] text-white">
                            <h3 className="font-black text-xs uppercase tracking-widest mb-3 text-blue-400">{t('help.directHelp')}</h3>
                            <p className="text-gray-400 text-xs font-bold mb-6 leading-relaxed opacity-80">{t('help.directHelpDesc')}</p>
                            <a href="mailto:support@dcms-gov.in" className="inline-block py-3 px-6 bg-white/10 hover:bg-white/20 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all">
                                support@dcms-gov.in
                            </a>
                        </ScrollReveal>
                    </div>

                    {/* FAQ Content */}
                    <div className="lg:col-span-2 space-y-10">
                        <ScrollReveal>
                            <h2 className="text-3xl font-black text-gray-900 mb-10 border-b-4 border-gray-900 pb-4 inline-block uppercase tracking-tighter">
                                {categories.find(c => c.id === activeTab)?.name}
                            </h2>
                        </ScrollReveal>

                        <div className="space-y-6">
                            {Array.isArray(currentFaqs) && currentFaqs.map((faq, idx) => (
                                <ScrollReveal key={activeTab + idx} delay={idx * 150}>
                                    <div className="group bg-white p-8 rounded-[35px] border border-gray-100 shadow-sm hover:shadow-2xl hover:shadow-blue-500/5 transition-all duration-500 hover:-translate-y-1">
                                        <div className="flex items-start gap-4">
                                            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-black text-[10px] group-hover:bg-blue-600 group-hover:text-white transition-colors duration-500">
                                                Q
                                            </span>
                                            <div>
                                                <h4 className="text-lg font-black text-gray-900 mb-3 tracking-tight leading-tight">{faq.q}</h4>
                                                <p className="text-gray-500 font-medium leading-relaxed text-sm opacity-80">
                                                    {faq.a}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </ScrollReveal>
                            ))}
                        </div>
                    </div>
                </div>
            </main>

            {/* Footer Support Info */}
            <footer className="bg-white py-16 border-t border-gray-50 text-center">
                <ScrollReveal className="max-w-4xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-12 text-sm">
                    <div>
                        <span className="block font-black text-gray-400 uppercase tracking-[0.2em] mb-3 text-[10px]">{t('help.footer.helpline')}</span>
                        <span className="text-gray-900 font-black text-lg underline decoration-blue-500 decoration-4 underline-offset-4">+91 000-111-2222</span>
                    </div>
                    <div>
                        <span className="block font-black text-gray-400 uppercase tracking-[0.2em] mb-3 text-[10px]">{t('help.footer.grampanchayat')}</span>
                        <span className="text-gray-900 font-black text-lg uppercase tracking-widest">{t('help.footer.hours')}</span>
                    </div>
                    <div>
                        <span className="block font-black text-gray-400 uppercase tracking-[0.2em] mb-3 text-[10px]">{t('help.footer.version')}</span>
                        <span className="text-gray-900 font-black text-lg uppercase tracking-normal opacity-40">v2.4.0 (Alpha)</span>
                    </div>
                </ScrollReveal>
            </footer>
        </div>
    );
}
