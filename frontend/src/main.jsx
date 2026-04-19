import React, { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import './i18n'

const LoadingFallback = () => (
    <div className="h-screen w-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-blue-600"></div>
            <p className="text-gray-500 font-bold text-xs uppercase tracking-widest animate-pulse">Initializing DCMS...</p>
        </div>
    </div>
);

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <Suspense fallback={<LoadingFallback />}>
            <App />
        </Suspense>
    </StrictMode>,
)
