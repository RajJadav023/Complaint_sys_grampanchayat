import React, { useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    const isActive = (path) => location.pathname === path;

    const linkClass = (path) => `
    px-4 py-2 rounded-2xl transition-all duration-500 text-xs font-black uppercase tracking-widest
    ${isActive(path)
            ? 'bg-blue-600 text-white shadow-xl shadow-blue-500/20'
            : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'}
  `;

    return (
        <nav className="bg-white/80 border-b border-gray-100 sticky top-0 z-50 backdrop-blur-xl">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-20 items-center">
                    <div className="flex-shrink-0 flex items-center">
                        <Link to="/" className="flex items-center space-x-3 group">
                            <div className="bg-blue-600 p-2 rounded-2xl group-hover:scale-110 transition-transform duration-500 shadow-lg shadow-blue-500/20">
                                <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                </svg>
                            </div>
                            <span className="text-gray-900 text-2xl font-black tracking-tight">DCMS</span>
                        </Link>
                    </div>

                    <div className="hidden lg:ml-10 lg:flex lg:items-center lg:space-x-1">
                        <Link to="/" className={linkClass('/')}>Home</Link>
                        {user?.role !== 'admin' && (
                            <>
                                <Link to="/complain" className={linkClass('/complain')}>Complain</Link>
                                <Link to="/status" className={linkClass('/status')}>Status</Link>
                            </>
                        )}
                        <Link to="/profile" className={linkClass('/profile')}>Profile</Link>
                        <Link to="/about" className={linkClass('/about')}>About</Link>
                        <Link to="/help" className={linkClass('/help')}>Help</Link>

                        {user?.role === 'admin' && (
                            <Link to="/admin" className={linkClass('/admin')}>
                                Admin Panel
                            </Link>
                        )}
                    </div>

                    <div className="flex items-center space-x-6">
                        {user ? (
                            <div className="flex items-center space-x-4">
                                <div className="hidden md:flex flex-col items-end">
                                    <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest leading-none mb-1">Authenticated</span>
                                    <span className="text-xs font-bold text-gray-500 leading-none">{user.name}</span>
                                </div>
                                <button
                                    onClick={handleLogout}
                                    className="px-6 py-2.5 bg-gray-50 hover:bg-gray-100 text-gray-900 text-[10px] font-black uppercase tracking-widest rounded-xl border border-gray-200 transition-all active:scale-95"
                                >
                                    Sign Out
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center space-x-3">
                                <Link to="/login" className="text-gray-500 hover:text-gray-900 px-4 py-2 text-xs font-black uppercase tracking-widest transition-all">Log In</Link>
                                <Link to="/register" className="bg-blue-600 text-white hover:bg-blue-700 px-8 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all shadow-xl shadow-blue-500/20">
                                    Join Network
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
