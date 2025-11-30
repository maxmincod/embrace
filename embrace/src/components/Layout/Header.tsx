
import React from 'react';
import { useAuth } from '../../context/AuthContext';
import embraceLogo from '../../../attached_assets/Embrace-removebg-preview_1764516683629.png';

const NavLink: React.FC<{ onClick: () => void; children: React.ReactNode; isActive?: boolean }> = ({ onClick, children, isActive }) => (
    <button
        onClick={onClick}
        className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
            isActive ? 'text-white bg-gray-800' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
        }`}
    >
        {children}
    </button>
);

const Header: React.FC = () => {
    const { currentUser, userType, logout, page, setPage } = useAuth();

    return (
        <header className="bg-gray-900/80 backdrop-blur-sm sticky top-0 z-40">
            <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <button onClick={() => setPage('home')} className="flex-shrink-0">
                            <img src={embraceLogo} alt="Embrace" className="h-12" />
                        </button>
                        <div className="hidden md:block">
                            <div className="ml-10 flex items-baseline space-x-4">
                                <NavLink onClick={() => setPage('discover')} isActive={page === 'discover'}>Discover</NavLink>
                                <NavLink onClick={() => setPage('donations')} isActive={page === 'donations'}>Support</NavLink>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center">
                        {currentUser ? (
                            <>
                                {userType === 'musician' && <NavLink onClick={() => setPage('dashboard')} isActive={page === 'dashboard'}>Dashboard</NavLink>}
                                {userType === 'listener' && <NavLink onClick={() => setPage('profile')} isActive={page === 'profile'}>Profile</NavLink>}
                                <button
                                    onClick={logout}
                                    className="ml-4 px-3 py-2 rounded-md text-sm font-medium text-gray-300 bg-orange-600 hover:bg-orange-700 hover:text-white transition-colors"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <NavLink onClick={() => setPage('login')} isActive={page === 'login'}>
                                Login / Sign Up
                            </NavLink>
                        )}
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;
