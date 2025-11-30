
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { ALL_GENRES } from '../constants';

const LoginPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'listener' | 'musician'>('listener');
    const [isRegister, setIsRegister] = useState(false);
    const { login, registerListener, registerMusician } = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

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
                        setError('Por favor, selecione pelo menos um gênero.');
                        setLoading(false);
                        return;
                    }
                    success = await registerMusician(email, artistName, genres);
                }
            } else {
                success = login(email, activeTab);
            }
        } catch (err) {
            setError('Ocorreu um erro inesperado.');
        } finally {
            setLoading(false);
            if (!success) {
                setError(isRegister ? 'Cadastro falhou. O usuário pode já existir.' : 'Login falhou. Verifique seu email e tipo de usuário.');
            }
        }
    };

    const renderFormFields = () => {
        return (
            <>
                <input type="email" placeholder="Endereço de Email" value={email} onChange={e => setEmail(e.target.value)} required className="w-full px-4 py-2 bg-gray-700 rounded-md focus:ring-orange-500 focus:outline-none" />
                {isRegister && activeTab === 'listener' && (
                    <input type="text" placeholder="Nome de Usuário" value={username} onChange={e => setUsername(e.target.value)} required className="w-full px-4 py-2 bg-gray-700 rounded-md focus:ring-orange-500 focus:outline-none" />
                )}
                {isRegister && activeTab === 'musician' && (
                    <>
                        <input type="text" placeholder="Nome Artístico" value={artistName} onChange={e => setArtistName(e.target.value)} required className="w-full px-4 py-2 bg-gray-700 rounded-md focus:ring-orange-500 focus:outline-none" />
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Gêneros (selecione pelo menos um)</label>
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
                        Ouvinte
                    </button>
                    <button onClick={() => handleTabClick('musician')} className={`w-1/2 py-4 text-center font-semibold transition-colors ${activeTab === 'musician' ? 'bg-orange-600 text-white' : 'bg-gray-700 hover:bg-gray-600'}`}>
                        Músico
                    </button>
                </div>
                <div className="p-8">
                    <h2 className="text-2xl font-bold text-center text-white mb-2">{isRegister ? 'Criar Conta' : 'Bem-vindo de Volta'}</h2>
                    <p className="text-center text-gray-400 mb-6">Entre ou cadastre-se como {activeTab === 'listener' ? 'ouvinte' : 'músico'}.</p>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {renderFormFields()}
                        {error && <p className="text-red-400 text-sm">{error}</p>}
                        <button type="submit" disabled={loading} className="w-full py-3 font-bold text-white bg-orange-600 rounded-md hover:bg-orange-700 transition-colors disabled:bg-gray-500">
                            {loading ? 'Processando...' : (isRegister ? 'Cadastrar' : 'Entrar')}
                        </button>
                    </form>
                    <p className="text-center text-sm text-gray-400 mt-6">
                        {isRegister ? 'Já tem uma conta?' : 'Não tem uma conta?'}
                        <button onClick={() => { setIsRegister(!isRegister); setError(''); }} className="font-medium text-orange-400 hover:text-orange-300 ml-1">
                            {isRegister ? 'Entrar' : 'Cadastre-se'}
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
