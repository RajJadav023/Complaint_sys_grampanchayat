import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

export default function Complain() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        category: 'Electricity',
        priority: 'Medium',
        description: '',
        address: '',
        documentUrl: ''
    });
    const [message, setMessage] = useState({ type: '', text: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage({ type: '', text: '' });
        setIsSubmitting(true);

        try {
            const payload = {
                title: formData.title,
                category: formData.category,
                priority: formData.priority,
                description: formData.description,
                locationDetails: {
                    address: formData.address
                },
                documentUrl: formData.documentUrl
            };
            await api.post('/complaints', payload);
            setMessage({ type: 'success', text: 'Report successfully filed. Official tracking is now active.' });

            // Clear form
            setFormData({
                title: '',
                category: 'Electricity',
                priority: 'Medium',
                description: '',
                address: '',
                documentUrl: ''
            });

            setTimeout(() => {
                navigate('/status');
            }, 3000);

        } catch (error) {
            console.error('Failed to register complaint:', error.response?.data?.message || error.message);
            setMessage({
                type: 'error',
                text: error.response?.data?.message || 'Failed to submit report. Access denied or connection lost.'
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div className="mb-10 text-center">
                <h1 className="text-4xl font-black text-gray-900 tracking-tight">Post Digital Report</h1>
                <p className="mt-2 text-gray-500 font-medium tracking-tight">Rapid response for village infrastructure issues.</p>
            </div>

            <div className="bg-white rounded-[40px] shadow-[0_30px_60px_rgba(0,0,0,0.05)] border border-gray-100 overflow-hidden">
                <div className="p-8 md:p-12">
                    {message.text && (
                        <div className={`mb-10 p-5 rounded-3xl text-sm font-bold border-l-4 animate-in fade-in slide-in-from-top-4 duration-500 ${message.type === 'success'
                            ? 'bg-green-50 text-green-800 border-green-500'
                            : 'bg-red-50 text-red-800 border-red-500'
                            }`}>
                            {message.text}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-1">
                            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Report Title</label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                className="block w-full px-5 py-3.5 bg-gray-50/50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-blue-100 outline-none transition-all font-bold text-gray-700 placeholder-gray-300"
                                placeholder="e.g. Broken streetlight on Main St"
                                required
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-1">
                                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Category</label>
                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    className="block w-full px-5 py-3.5 bg-gray-50/50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-blue-100 outline-none transition-all font-bold text-gray-700"
                                >
                                    {['Electricity', 'Road', 'Water', 'Sanitization', 'Garbage', 'Other'].map(cat => (
                                        <option key={cat} value={cat}>{cat}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="space-y-1">
                                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Priority Level</label>
                                <select
                                    name="priority"
                                    value={formData.priority}
                                    onChange={handleChange}
                                    className="block w-full px-5 py-3.5 bg-gray-50/50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-blue-100 outline-none transition-all font-bold text-gray-700"
                                >
                                    {['Low', 'Medium', 'High'].map(prio => (
                                        <option key={prio} value={prio}>{prio}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Specific Location in Village</label>
                            <input
                                type="text"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                className="block w-full px-5 py-3.5 bg-gray-50/50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-blue-100 outline-none transition-all font-medium text-gray-700 placeholder-gray-300"
                                placeholder="E.g. Ward 3, Near Old Banyan Tree"
                                required
                            />
                        </div>

                        <div className="space-y-1">
                            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest px-1 flex justify-between">
                                Detailed Description
                                <span className={`${formData.description.length > 200 ? 'text-red-500' : 'text-gray-300'}`}>{formData.description.length}/300</span>
                            </label>
                            <textarea
                                name="description"
                                rows={3}
                                maxLength={300}
                                value={formData.description}
                                onChange={handleChange}
                                className="block w-full px-5 py-4 bg-gray-50/50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-blue-100 outline-none transition-all font-medium text-gray-700 placeholder-gray-300 resize-none"
                                placeholder="Provide as much detail as possible to assist officials..."
                                required
                            />
                        </div>

                        <div className="pt-8">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`w-full py-5 bg-blue-600 hover:bg-blue-700 text-white font-black text-xs uppercase tracking-[0.2em] rounded-2xl shadow-xl shadow-blue-500/20 transition-all transform active:scale-[0.98] flex items-center justify-center ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:-translate-y-1'}`}
                            >
                                {isSubmitting ? 'Synchronizing with District Console...' : 'Submit Official Report'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
