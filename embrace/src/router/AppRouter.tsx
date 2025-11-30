
import React from 'react';
import { useAuth } from '../context/AuthContext';
import HomePage from '../pages/HomePage';
import DiscoverPage from '../pages/DiscoverPage';
import DonationsPage from '../pages/DonationsPage';
// Fix: Corrected typo in import path from 'pagesag' to 'pages'
import LoginPage from '../pages/LoginPage';
import MusicianDashboard from '../pages/MusicianDashboard';
import ListenerProfilePage from '../pages/ListenerProfilePage';
import ArtistProfilePage from '../pages/ArtistProfilePage';

const AppRouter: React.FC = () => {
    const { page, userType } = useAuth();

    if (page.startsWith('artist/')) {
        const artistId = page.split('/')[1];
        return <ArtistProfilePage artistId={artistId} />;
    }

    switch (page) {
        case 'home':
            return <HomePage />;
        case 'discover':
            return <DiscoverPage />;
        case 'donations':
            return <DonationsPage />;
        case 'login':
            return <LoginPage />;
        case 'dashboard':
            return userType === 'musician' ? <MusicianDashboard /> : <HomePage />;
        case 'profile':
            return userType === 'listener' ? <ListenerProfilePage /> : <HomePage />;
        default:
            return <HomePage />;
    }
};

export default AppRouter;
