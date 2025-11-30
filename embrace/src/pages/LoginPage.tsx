
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { ALL_GENRES } from '../constants';

const LoginPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'listener' | 'musician'>('listener');
    const [isRegister, setIsRegister] = useState(false);
    const { login, registerListener, registerMusician } = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    // Form state
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [artistName, setArtistName] = useState('');
    const [genres, setGenres] = useState<string[]>([]);

    const handleTabClick = (tab: 'listener' | 'musician') => {
        setActiveTab(tab);
        setIsRegister(false);
        setError('');
        setEmail('');
        setUsername('');
        setArtistName('');
        setGenres([]);
    };

    const handleGenreChange = (genre: string) => {
        setGenres(prev => prev.includes(genre) ? prev.filter(g => g !== genre) : [...prev, genre]);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        let success = false;
        try {
            if (isRegister) {
                if (activeTab === 'listener') {
                    success = registerListener(email, username);
                } else {
                    if (genres.length === 0) {
                        setError('Please select at least one genre.');
                        setLoading(false);
                        return;
                    }
                    success = await registerMusician(email, artistName, genres);
                }
            } else {
                success = login(email, activeTab);
            }
        } catch (err) {
            setError('An unexpected error occurred.');
        } finally {
            setLoading(false);
            if (!success) {
                setError(isRegister ? 'Registration failed. User may already exist.' : 'Login failed. Check your email and user type.');
            }
        }
    };

    const renderFormFields = () => {
        return (
            <>
                <input type="email" placeholder="Email Address" value={email} onChange={e => setEmail(e.target.value)} required className="w-full px-4 py-2 bg-gray-700 rounded-md focus:ring-orange-500 focus:outline-none" />
                {isRegister && activeTab === 'listener' && (
                    <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} required className="w-full px-4 py-2 bg-gray-700 rounded-md focus:ring-orange-500 focus:outline-none" />
                )}
                {isRegister && activeTab === 'musician' && (
                    <>
                        <input type="text" placeholder="Artist Name" value={artistName} onChange={e => setArtistName(e.target.value)} required className="w-full px-4 py-2 bg-gray-700 rounded-md focus:ring-orange-500 focus:outline-none" />
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Genres (select at least one)</label>
                            <div className="flex flex-wrap gap-2">
                                {ALL_GENRES.slice(0, 8).map(g => (
                                    <button type="button" key={g} onClick={() => handleGenreChange(g)} className={`px-3 py-1 text-sm rounded-full ${genres.includes(g) ? 'bg-orange-600 text-white' : 'bg-gray-600 hover:bg-gray-500'}`}>
                                        {g}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </>
                )}
            </>
        );
    };

    return (
        <div className="max-w-md mx-auto mt-10">
            <div className="bg-gray-800 rounded-lg shadow-xl overflow-hidden">
                <div className="flex">
                    <button onClick={() => handleTabClick('listener')} className={`w-1/2 py-4 text-center font-semibold transition-colors ${activeTab === 'listener' ? 'bg-orange-600 text-white' : 'bg-gray-700 hover:bg-gray-600'}`}>
                        Listener
                    </button>
                    <button onClick={() => handleTabClick('musician')} className={`w-1/2 py-4 text-center font-semibold transition-colors ${activeTab === 'musician' ? 'bg-orange-600 text-white' : 'bg-gray-700 hover:bg-gray-600'}`}>
                        Musician
                    </button>
                </div>
                <div className="p-8">
                    <h2 className="text-2xl font-bold text-center text-white mb-2">{isRegister ? 'Create Account' : 'Welcome Back'}</h2>
                    <p className="text-center text-gray-400 mb-6">Login or register as a {activeTab}.</p>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {renderFormFields()}
                        {error && <p className="text-red-400 text-sm">{error}</p>}
                        <button type="submit" disabled={loading} className="w-full py-3 font-bold text-white bg-orange-600 rounded-md hover:bg-orange-700 transition-colors disabled:bg-gray-500">
                            {loading ? 'Processing...' : (isRegister ? 'Register' : 'Login')}
                        </button>
                    </form>
                    <p className="text-center text-sm text-gray-400 mt-6">
                        {isRegister ? 'Already have an account?' : "Don't have an account?"}
                        <button onClick={() => { setIsRegister(!isRegister); setError(''); }} className="font-medium text-orange-400 hover:text-orange-300 ml-1">
                            {isRegister ? 'Login' : 'Sign Up'}
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
