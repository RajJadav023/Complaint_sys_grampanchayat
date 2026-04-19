import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import { AuthContext } from '../context/AuthContext';
import { useTranslation } from 'react-i18next';
import ScrollReveal from '../components/ScrollReveal';

export default function Home() {
    const { user } = useContext(AuthContext);
    const { t } = useTranslation();
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await api.get('/events');
                setEvents(response.data);
            } catch (error) {
                console.error('Failed to fetch events:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchEvents();
    }, []);

    const getCategoryStyles = (category) => {
        switch (category) {
            case 'Infrastructure': return { color: 'text-blue-600', bg: 'bg-blue-50', hover: 'hover:shadow-blue-500/10' };
            case 'Sanitization': return { color: 'text-green-600', bg: 'bg-green-50', hover: 'hover:shadow-green-500/10' };
            case 'Medical': return { color: 'text-red-600', bg: 'bg-red-50', hover: 'hover:shadow-red-500/10' };
            case 'Community': return { color: 'text-yellow-600', bg: 'bg-yellow-50', hover: 'hover:shadow-yellow-500/10' };
            default: return { color: 'text-gray-600', bg: 'bg-gray-50', hover: 'hover:shadow-gray-500/10' };
        }
    };

    return (
        <div className="bg-white px-4 sm:px-6 lg:px-8 overflow-hidden">
            {/* Hero Section */}
            <div className="relative pt-16 pb-20 lg:pt-24 lg:pb-32">
                <div className="relative max-w-7xl mx-auto text-center">
                    <ScrollReveal>
                        <h1 className="text-4xl tracking-tighter font-black text-gray-900 sm:text-6xl md:text-7xl mb-8 uppercase leading-[0.9]">
                            {t('home.heroTitle')} <br />
                            <span className="text-blue-600">{t('home.heroSubtitle')}</span>
                        </h1>
                    </ScrollReveal>
                    
                    <ScrollReveal delay={200}>
                        <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-500 font-medium leading-relaxed opacity-80">
                            {t('home.heroDescription')}
                        </p>
                    </ScrollReveal>

                    {user?.role !== 'admin' && (
                        <ScrollReveal delay={400} className="mt-12 flex flex-col sm:flex-row justify-center gap-5">
                            <Link to="/complain" className="inline-flex items-center justify-center px-12 py-5 border border-transparent text-xs font-black uppercase tracking-[0.2em] rounded-2xl text-white bg-blue-600 hover:bg-blue-700 shadow-2xl shadow-blue-500/30 transition-all hover:-translate-y-1 active:scale-95 group">
                                {t('home.fileComplaint')}
                                <svg className="ml-3 h-4 w-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </Link>
                            <Link to="/status" className="inline-flex items-center justify-center px-12 py-5 border-2 border-gray-100 text-xs font-black uppercase tracking-[0.2em] rounded-2xl text-gray-700 bg-white hover:bg-gray-50 shadow-xl transition-all hover:-translate-y-1 active:scale-95">
                                {t('home.trackStatus')}
                            </Link>
                        </ScrollReveal>
                    )}

                    {user?.role === 'admin' && (
                        <ScrollReveal delay={400} className="mt-12 flex justify-center">
                            <Link to="/admin" className="inline-flex items-center justify-center px-12 py-5 border border-transparent text-xs font-black uppercase tracking-[0.2em] rounded-2xl text-white bg-gray-900 hover:bg-black shadow-2xl shadow-black/20 transition-all hover:-translate-y-1 active:scale-95 group">
                                {t('home.manageComplaints') || 'Manage Complaints'}
                                <svg className="ml-3 h-4 w-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </Link>
                        </ScrollReveal>
                    )}
                </div>
            </div>

            {/* Feature/News Section */}
            <div className="py-24 border-t border-gray-50">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
                        <ScrollReveal className="max-w-xl text-left">
                            <h2 className="text-[10px] font-black text-blue-600 uppercase tracking-[0.3em] mb-4 bg-blue-50 px-4 py-2 rounded-full inline-block border border-blue-100">
                                {t('home.liveBroadcast')}
                            </h2>
                            <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tighter uppercase">{t('home.villageUpdates')}</h2>
                            <p className="mt-4 text-lg text-gray-500 font-medium tracking-tight opacity-70">{t('home.villageUpdatesDesc')}</p>
                        </ScrollReveal>
                    </div>

                    {loading ? (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="h-80 bg-gray-50 rounded-[40px] animate-pulse"></div>
                            ))}
                        </div>
                    ) : events.length === 0 ? (
                        <ScrollReveal>
                            <div className="text-center py-24 bg-gray-50 rounded-[50px] border-4 border-dashed border-gray-100">
                                <div className="bg-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
                                    <svg className="w-8 h-8 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-black text-gray-900 uppercase tracking-tight">{t('home.noBroadcasts')}</h3>
                                <p className="text-gray-500 font-medium mt-2 max-w-xs mx-auto">{t('home.noBroadcastsDesc')}</p>
                            </div>
                        </ScrollReveal>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                            {events.map((event, i) => {
                                const style = getCategoryStyles(event.category);
                                return (
                                    <ScrollReveal key={event._id} delay={i * 150}>
                                        <div className={`group bg-white rounded-[45px] p-10 border border-gray-100 shadow-[0_20px_50px_rgba(0,0,0,0.02)] transition-all duration-700 hover:-translate-y-4 hover:shadow-2xl ${style.hover}`}>
                                            <div className={`w-14 h-14 ${style.bg} rounded-[20px] flex items-center justify-center mb-8 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-sm`}>
                                                <svg className={`w-7 h-7 ${style.color}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                                                </svg>
                                            </div>
                                            <div className="flex justify-between items-center mb-4">
                                                <span className={`text-[10px] font-black ${style.color} uppercase tracking-[0.2em]`}>{event.category}</span>
                                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{new Date(event.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</span>
                                            </div>
                                            <h3 className="text-2xl font-black text-gray-900 mb-4 tracking-tight leading-none uppercase">{event.title}</h3>
                                            <p className="text-gray-500 font-medium leading-[1.8] text-sm line-clamp-3 opacity-80 group-hover:opacity-100 transition-opacity">"{event.description}"</p>
                                            <div className="mt-8 pt-8 border-t border-gray-50 flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
                                                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">@{event.location}</span>
                                                </div>
                                                <svg className="w-5 h-5 text-gray-200 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                                </svg>
                                            </div>
                                        </div>
                                    </ScrollReveal>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
