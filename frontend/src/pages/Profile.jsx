import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import api from '../api/axios';
import { AuthContext } from '../context/AuthContext';
import { useTranslation } from 'react-i18next';
import ScrollReveal from '../components/ScrollReveal';

export default function Profile() {
    const { t } = useTranslation();
    const { user: authUser, login } = useContext(AuthContext);
    const [userData, setUserData] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({});
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState({ type: '', text: '' });

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await api.get('/auth/me');
                setUserData(response.data);
                setFormData(response.data);
            } catch (err) {
                console.error("Profile fetch error", err);
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await api.put('/auth/profile', formData);
            setUserData(response.data);
            login(response.data); // Update context
            setIsEditing(false);
            setMessage({ type: 'success', text: t('profile.success') });
            setTimeout(() => setMessage({ type: '', text: '' }), 3000);
        } catch (err) {
            setMessage({ type: 'error', text: t('profile.error') });
        } finally {
            setLoading(false);
        }
    };

    if (loading && !userData) return (
        <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-blue-600"></div>
        </div>
    );

    const user = userData || authUser;

    return (
        <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <ScrollReveal className="mb-12 flex justify-between items-end">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 tracking-tight">{t('profile.title')}</h1>
                    <p className="mt-1 text-gray-500 font-medium text-sm">{t('profile.subtitle')}</p>
                </div>
                {!isEditing && (
                    <button
                        onClick={() => setIsEditing(true)}
                        className="px-6 py-2.5 bg-gray-900 text-white text-[10px] font-bold uppercase tracking-widest rounded-xl hover:bg-black transition-all"
                    >
                        {t('profile.edit')}
                    </button>
                )}
            </ScrollReveal>

            {message.text && (
                <div className={`mb-8 p-4 rounded-2xl text-xs font-bold border-l-4 animate-in fade-in slide-in-from-top-4 duration-500 ${message.type === 'success' ? 'bg-green-50 text-green-800 border-green-500' : 'bg-red-50 text-red-800 border-red-500'}`}>
                    {message.text}
                </div>
            )}

            <ScrollReveal delay={200} className="bg-white rounded-[40px] shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-gray-100 overflow-hidden">
                <div className="p-8 md:p-12">
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-10 mb-12">
                        <div className="h-24 w-24 bg-blue-600 rounded-[30px] flex items-center justify-center text-4xl font-bold text-white shadow-2xl shadow-blue-500/10 uppercase shrink-0">
                            {user.name?.charAt(0)}
                        </div>
                        <div className="text-center md:text-left pt-2">
                            <h2 className="text-xl font-bold text-gray-900 tracking-tight mb-2">{user.name}</h2>
                            <div className="flex flex-wrap justify-center md:justify-start gap-3">
                                <span className="px-4 py-1.5 bg-blue-50 text-blue-700 text-[10px] font-bold uppercase tracking-widest rounded-full border border-blue-100">
                                    {user.role} {t('profile.labels.identity')}
                                </span>
                                <span className="px-4 py-1.5 bg-gray-50 text-gray-600 text-[10px] font-bold uppercase tracking-widest rounded-full border border-gray-100 italic">
                                    {t('profile.labels.verified')}
                                </span>
                            </div>
                        </div>
                    </div>

                    <form onSubmit={handleSave} className="space-y-10 pt-10 border-t border-gray-50">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                            {[
                                { label: t('profile.labels.name'), name: 'name', value: user.name, icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
                                { label: t('profile.labels.email'), name: 'email', value: user.email, icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
                                { label: t('profile.labels.phone'), name: 'phoneNumber', value: user.phoneNumber || 'Not Linked', icon: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z' },
                                { label: t('profile.labels.pincode'), name: 'pincode', value: user.pincode || 'Not Set', icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z' },
                                { label: t('profile.labels.village'), name: 'village', value: user.village || 'Pending Grid Search', icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4' },
                            ].map((field) => (
                                <div key={field.name} className="flex gap-6 group">
                                    <div className="h-10 w-10 bg-gray-50 rounded-xl flex items-center justify-center shrink-0 border border-gray-100 group-hover:border-blue-100 group-hover:bg-blue-50/50 transition-colors">
                                        <svg className="h-5 w-5 text-gray-400 group-hover:text-blue-600 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={field.icon} />
                                        </svg>
                                    </div>
                                    <div className="flex-1">
                                        <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">{field.label}</label>
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                name={field.name}
                                                value={formData[field.name] || ''}
                                                onChange={handleChange}
                                                className="w-full bg-gray-50/50 border border-gray-100 px-3 py-2 rounded-xl text-sm font-semibold text-gray-700 focus:ring-4 focus:ring-blue-100 outline-none transition-all"
                                            />
                                        ) : (
                                            <span className="block text-base font-semibold text-gray-900 tracking-tight">{field.value}</span>
                                        )}
                                    </div>
                                </div>
                            ))}
                            <div className="flex gap-6 group">
                                <div className="h-10 w-10 bg-gray-50 rounded-xl flex items-center justify-center shrink-0 border border-gray-100">
                                    <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    </svg>
                                </div>
                                <div className="flex-1">
                                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">{t('profile.labels.address')}</label>
                                    {isEditing ? (
                                        <textarea
                                            name="address"
                                            value={formData.address || ''}
                                            onChange={handleChange}
                                            rows="2"
                                            className="w-full bg-gray-50/50 border border-gray-100 px-3 py-2 rounded-xl text-sm font-semibold text-gray-700 focus:ring-4 focus:ring-blue-100 outline-none transition-all"
                                        />
                                    ) : (
                                        <span className="block text-sm font-medium text-gray-500 leading-relaxed border-l-2 border-gray-100 pl-4">
                                            {user.address || 'Address verification required.'}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>

                        {isEditing && (
                            <div className="pt-10 flex gap-4">
                                <button
                                    type="submit"
                                    className="flex-1 py-4 bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest rounded-3xl shadow-xl shadow-blue-500/20 hover:bg-blue-700 transition-all hover:-translate-y-1"
                                >
                                    {t('profile.save')}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setIsEditing(false)}
                                    className="px-10 py-4 bg-gray-100 text-gray-500 text-[10px] font-black uppercase tracking-widest rounded-3xl hover:bg-gray-200 transition-all"
                                >
                                    {t('profile.cancel')}
                                </button>
                            </div>
                        )}
                    </form>
                </div>
            </ScrollReveal>
        </div>
    );
}
