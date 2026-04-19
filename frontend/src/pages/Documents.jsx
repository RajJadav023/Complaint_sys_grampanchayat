import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ScrollReveal from '../components/ScrollReveal';

export default function Documents() {
    const { t } = useTranslation();
    const [selectedService, setSelectedService] = useState('');
    const [showRequirements, setShowRequirements] = useState(false);

    const services = ['pan', 'aadhaar', 'birth', 'ration', 'voter', 'income'];

    const handleCheck = (e) => {
        e.preventDefault();
        if (selectedService) {
            setShowRequirements(true);
        }
    };

    const requirements = selectedService 
        ? t(`documents.requirements.${selectedService}`, { returnObjects: true }) 
        : [];

    return (
        <div className="max-w-5xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
            <ScrollReveal className="text-center mb-16">
                <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tighter uppercase mb-4">
                    {t('documents.title')}
                </h1>
                <p className="text-gray-500 font-medium text-lg opacity-80 max-w-2xl mx-auto">
                    {t('documents.subtitle')}
                </p>
            </ScrollReveal>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                {/* Selection Section */}
                <ScrollReveal delay={200} className="bg-white p-8 md:p-12 rounded-[40px] shadow-[0_30px_60px_rgba(0,0,0,0.04)] border border-gray-100">
                    <form onSubmit={handleCheck} className="space-y-8">
                        <div>
                            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4 px-2">
                                {t('documents.selectService')}
                            </label>
                            <div className="grid grid-cols-1 gap-3">
                                {services.map((service) => (
                                    <button
                                        key={service}
                                        type="button"
                                        onClick={() => {
                                            setSelectedService(service);
                                            setShowRequirements(false);
                                        }}
                                        className={`flex items-center justify-between p-5 rounded-2xl border-2 transition-all duration-300 ${
                                            selectedService === service
                                                ? 'bg-blue-600 border-blue-600 text-white shadow-xl shadow-blue-500/20'
                                                : 'bg-gray-50 border-transparent text-gray-700 hover:bg-white hover:border-gray-200'
                                        }`}
                                    >
                                        <span className="font-bold text-sm uppercase tracking-wider">
                                            {t(`documents.services.${service}`)}
                                        </span>
                                        {selectedService === service && (
                                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                            </svg>
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={!selectedService}
                            className={`w-full py-5 rounded-3xl font-black text-xs uppercase tracking-[0.2em] transition-all ${
                                selectedService
                                    ? 'bg-gray-900 text-white hover:bg-black shadow-2xl shadow-black/20 hover:-translate-y-1'
                                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            }`}
                        >
                            {t('documents.checkRequired')}
                        </button>
                    </form>
                </ScrollReveal>

                {/* Results Section */}
                <div className="sticky top-24">
                    {showRequirements ? (
                        <ScrollReveal key={selectedService} className="bg-gray-900 text-white p-8 md:p-12 rounded-[40px] shadow-2xl relative overflow-hidden">
                            <div className="relative z-10">
                                <h2 className="text-[10px] font-black text-blue-400 uppercase tracking-[0.3em] mb-4">
                                    {t('documents.requiredFor')}
                                </h2>
                                <h3 className="text-3xl font-black uppercase tracking-tight mb-10 border-b border-white/10 pb-6">
                                    {t(`documents.services.${selectedService}`)}
                                </h3>
                                
                                <ul className="space-y-6">
                                    {requirements.map((req, i) => (
                                        <li key={i} className="flex items-start gap-4 group">
                                            <div className="mt-1.5 w-2 h-2 rounded-full bg-blue-500 group-hover:scale-150 transition-transform"></div>
                                            <span className="text-gray-300 font-bold text-sm leading-relaxed group-hover:text-white transition-colors">
                                                {req}
                                            </span>
                                        </li>
                                    ))}
                                </ul>

                                <div className="mt-12 pt-10 border-t border-white/10 flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">
                                            <svg className="h-4 w-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </div>
                                        <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Village Standards Verified</span>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Decorative Elements */}
                            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl"></div>
                            <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-blue-600/5 rounded-full blur-3xl"></div>
                        </ScrollReveal>
                    ) : (
                        <div className="h-full flex flex-col items-center justify-center p-12 bg-gray-50 rounded-[40px] border-4 border-dashed border-gray-100 text-center opacity-60">
                            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm">
                                <svg className="h-8 w-8 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </div>
                            <p className="text-gray-400 font-bold text-xs uppercase tracking-widest leading-relaxed">
                                Select a service to view<br/>the required documents
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
