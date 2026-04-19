import React from 'react';
import { useTranslation } from 'react-i18next';
import ScrollReveal from '../components/ScrollReveal';

export default function About() {
    const { t } = useTranslation();

    return (
        <div className="bg-gray-50 min-h-screen">
            {/* Hero Section */}
            <section className="bg-blue-600 py-24 text-white text-center px-4 relative overflow-hidden">
                <ScrollReveal className="max-w-4xl mx-auto relative z-10">
                    <h1 className="text-5xl md:text-6xl font-black mb-6 tracking-tight leading-tight">
                        {t('about.heroTitle')}
                    </h1>
                    <p className="text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed font-medium">
                        {t('about.heroDesc')}
                    </p>
                </ScrollReveal>
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl"></div>
            </section>

            {/* Mission & Vision */}
            <section className="max-w-6xl mx-auto py-24 px-4 overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                    <ScrollReveal delay={200} className="space-y-6">
                        <div className="inline-block px-4 py-1.5 bg-blue-100 text-blue-700 rounded-full text-sm font-black uppercase tracking-widest">
                            {t('about.mission')}
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight">
                            {t('about.missionTitle')}
                        </h2>
                        <p className="text-gray-600 text-lg leading-relaxed font-medium">
                            {t('about.missionDesc')}
                        </p>
                        <ul className="space-y-4 pt-4">
                            {[
                                t('about.points.0'),
                                t('about.points.1'),
                                t('about.points.2')
                            ].map((item, idx) => (
                                <li key={idx} className="flex items-center space-x-3 group">
                                    <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center group-hover:bg-green-600 transition-colors">
                                        <svg className="w-4 h-4 text-green-600 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <span className="text-gray-700 font-bold text-sm uppercase tracking-wide">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </ScrollReveal>

                    <ScrollReveal delay={400} className="bg-white p-10 rounded-[40px] shadow-[0_30px_70px_rgba(0,0,0,0.05)] border border-gray-100">
                        <div className="grid grid-cols-2 gap-8">
                            {[
                                { label: t('about.stats.solved'), val: "10K+", delay: 100 },
                                { label: t('about.stats.digitized'), val: "150+", delay: 200 },
                                { label: t('about.stats.response'), val: "94%", delay: 300 },
                                { label: t('about.stats.uptime'), val: "99.9%", delay: 400 }
                            ].map((stat, i) => (
                                <div key={i} className="text-center p-6 bg-gray-50/50 rounded-3xl border border-transparent hover:border-blue-100 hover:bg-white hover:shadow-xl transition-all duration-300">
                                    <div className="text-3xl font-black text-blue-600 mb-1">{stat.val}</div>
                                    <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-tight">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* Core Values */}
            <section className="bg-white py-32">
                <div className="max-w-6xl mx-auto px-4 text-center">
                    <ScrollReveal>
                        <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4 tracking-tight uppercase">{t('about.valuesTitle')}</h2>
                        <p className="text-gray-500 font-medium mb-20 max-w-xl mx-auto">{t('about.valuesSubtitle')}</p>
                    </ScrollReveal>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        {[
                            {
                                title: t('about.values.integrity.title'),
                                desc: t('about.values.integrity.desc'),
                                icon: (
                                    <svg className="w-10 h-10 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-7.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                    </svg>
                                )
                            },
                            {
                                title: t('about.values.innovation.title'),
                                desc: t('about.values.innovation.desc'),
                                icon: (
                                    <svg className="w-10 h-10 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                )
                            },
                            {
                                title: t('about.values.empowerment.title'),
                                desc: t('about.values.empowerment.desc'),
                                icon: (
                                    <svg className="w-10 h-10 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                    </svg>
                                )
                            }
                        ].map((value, i) => (
                            <ScrollReveal key={i} delay={i * 200}>
                                <div className="p-12 bg-gray-50 rounded-[40px] border border-gray-100 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 transform hover:-translate-y-3 group text-left">
                                    <div className="mb-8 p-4 bg-white rounded-2xl inline-block shadow-sm group-hover:scale-110 group-hover:shadow-lg transition-all duration-500">{value.icon}</div>
                                    <h3 className="text-xl font-black text-gray-900 mb-4 uppercase tracking-tighter leading-none">{value.title}</h3>
                                    <p className="text-gray-500 leading-relaxed text-sm font-medium opacity-80 group-hover:opacity-100">
                                        {value.desc}
                                    </p>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact CTA */}
            <section className="py-24 bg-gray-900 text-white text-center relative overflow-hidden">
                <ScrollReveal className="max-w-2xl mx-auto px-4 relative z-10">
                    <h2 className="text-3xl md:text-4xl font-black mb-4 tracking-tighter uppercase">{t('about.ctaTitle')}</h2>
                    <p className="text-gray-400 mb-12 font-medium max-w-lg mx-auto leading-relaxed">{t('about.ctaDesc')}</p>
                    <button className="bg-blue-600 hover:bg-blue-700 font-black text-xs uppercase tracking-[0.2em] py-5 px-12 rounded-2xl transition-all shadow-2xl shadow-blue-500/20 active:scale-95 group">
                        <span className="flex items-center justify-center">
                            {t('about.ctaButton')}
                            <svg className="ml-3 h-4 w-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </span>
                    </button>
                </ScrollReveal>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(0,0,0,0.4)_100%)]"></div>
            </section>
        </div>
    );
}
