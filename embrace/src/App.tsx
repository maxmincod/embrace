
import React from 'react';
import { AuthProvider } from './context/AuthContext';
import { DataProvider } from './context/DataContext';
import { MusicProvider } from './context/MusicContext';
import AppRouter from './router/AppRouter';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import MusicPlayer from './components/Music/MusicPlayer';

const App: React.FC = () => {
    return (
        <AuthProvider>
            <DataProvider>
                <MusicProvider>
                    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col">
                        <Header />
                        <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                            <AppRouter />
                        </main>
                        <Footer />
                        <MusicPlayer />
                    </div>
                </MusicProvider>
            </DataProvider>
        </AuthProvider>
    );
};

export default App;
