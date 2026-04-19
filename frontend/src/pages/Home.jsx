import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';

export default function Home() {
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
        <div className="bg-white px-4 sm:px-6 lg:px-8">
            {/* Hero Section */}
            <div className="relative pt-16 pb-20 lg:pt-24 lg:pb-28">
                <div className="relative max-w-7xl mx-auto text-center">
                    <h1 className="text-5xl tracking-tight font-black text-gray-900 sm:text-6xl md:text-7xl mb-6">
                        Digital Complain <br />
                        <span className="text-blue-600">Management System</span>
                    </h1>
                    <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500 font-medium leading-relaxed">
                        Empowering Grampanchayat villages with transparency and efficiency.
                        Register complaints and track status smarter.
                    </p>
                    <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
                        <Link to="/complain" className="inline-flex items-center justify-center px-10 py-4 border border-transparent text-sm font-black uppercase tracking-widest rounded-2xl text-white bg-blue-600 hover:bg-blue-700 shadow-xl shadow-blue-500/20 transition-all hover:-translate-y-1 active:scale-95">
                            File a Complaint
                        </Link>
                        <Link to="/status" className="inline-flex items-center justify-center px-10 py-4 border border-gray-200 text-sm font-black uppercase tracking-widest rounded-2xl text-gray-700 bg-white hover:bg-gray-50 shadow-lg transition-all hover:-translate-y-1 active:scale-95">
                            Track Status
                        </Link>
                    </div>
                </div>
            </div>

            {/* Feature/News Section */}
            <div className="py-20 border-t border-gray-50">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                        <div className="max-w-xl text-left">
                            <h2 className="text-3xl font-black text-gray-900 tracking-tight">Village Updates</h2>
                            <p className="mt-3 text-lg text-gray-500 font-medium tracking-tight">Stay informed on what's happening around your local Grampanchayat.</p>
                        </div>
                        <div className="hidden md:block">
                            <span className="text-xs font-black text-blue-600 uppercase tracking-[0.2em] bg-blue-50 px-4 py-2 rounded-full border border-blue-100 animate-pulse">Live Broadcast Active</span>
                        </div>
                    </div>

                    {loading ? (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="h-64 bg-gray-50 rounded-3xl animate-pulse"></div>
                            ))}
                        </div>
                    ) : events.length === 0 ? (
                        <div className="text-center py-20 bg-gray-50 rounded-[40px] border border-dashed border-gray-200">
                            <h3 className="text-lg font-black text-gray-900">No active broadcasts</h3>
                            <p className="text-gray-500 font-medium mt-1">Check back later for upcoming village events and infrastructure updates.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {events.map((event) => {
                                const style = getCategoryStyles(event.category);
                                return (
                                    <div key={event._id} className={`group bg-white rounded-3xl p-8 border border-gray-100 shadow-[0_10px_40px_rgba(0,0,0,0.03)] transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl ${style.hover}`}>
                                        <div className={`w-12 h-12 ${style.bg} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500`}>
                                            <svg className={`w-6 h-6 ${style.color}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                                            </svg>
                                        </div>
                                        <div className="flex justify-between items-start mb-2">
                                            <span className={`text-[10px] font-black ${style.color} uppercase tracking-widest`}>{event.category}</span>
                                            <span className="text-[10px] font-bold text-gray-400 uppercase">{new Date(event.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</span>
                                        </div>
                                        <h3 className="text-xl font-black text-gray-900 mb-3 tracking-tight">{event.title}</h3>
                                        <p className="text-gray-500 font-medium leading-relaxed text-sm line-clamp-3">"{event.description}"</p>
                                        <div className="mt-6 flex items-center gap-2">
                                            <svg className="w-4 h-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            </svg>
                                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">@{event.location}</span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
