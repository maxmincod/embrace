
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { User, Musician, Listener, UserType, Page } from '../types';
import { MOCK_MUSICIANS, MOCK_LISTENERS } from '../constants';
import { generateArtistBio } from '../lib/gemini';

interface AuthContextType {
    currentUser: User | null;
    userType: UserType | null;
    page: Page;
    setPage: (page: Page) => void;
    login: (email: string, type: UserType) => boolean;
    logout: () => void;
    registerMusician: (email: string, artistName: string, genre: string[]) => Promise<boolean>;
    registerListener: (email: string, username: string) => boolean;
    toggleLikeSong: (songId: string) => boolean;
    isLikedSong: (songId: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [userType, setUserType] = useState<UserType | null>(null);
    const [page, setPage] = useState<Page>('home');

    const login = (email: string, type: UserType): boolean => {
        let user: User | undefined;
        if (type === 'musician') {
            user = MOCK_MUSICIANS.find(m => m.email === email);
        } else {
            user = MOCK_LISTENERS.find(l => l.email === email);
        }

        if (user) {
            setCurrentUser(user);
            setUserType(type);
            setPage(type === 'musician' ? 'dashboard' : 'discover');
            return true;
        }
        return false;
    };

    const logout = () => {
        setCurrentUser(null);
        setUserType(null);
        setPage('home');
    };

    const registerMusician = async (email: string, artistName: string, genre: string[]): Promise<boolean> => {
        if (MOCK_MUSICIANS.some(m => m.email === email || m.artistName === artistName)) {
            return false;
        }
        const bio = await generateArtistBio(artistName, genre.join('/'));
        const newMusician: Musician = {
            id: `musician-${Date.now()}`,
            email,
            username: artistName.toLowerCase().replace(/\s/g, '_'),
            type: 'musician',
            artistName,
            genre,
            bio,
            socialLinks: {},
            profilePhoto: `https://i.pravatar.cc/150?u=${Date.now()}`,
        };
        MOCK_MUSICIANS.push(newMusician);
        setCurrentUser(newMusician);
        setUserType('musician');
        setPage('dashboard');
        return true;
    };

    const registerListener = (email: string, username: string): boolean => {
        if (MOCK_LISTENERS.some(l => l.email === email || l.username === username)) {
            return false;
        }
        const newListener: Listener = {
            id: `listener-${Date.now()}`,
            email,
            username,
            type: 'listener',
            favoriteGenres: [],
            likedSongs: [],
            followedArtists: [],
        };
        MOCK_LISTENERS.push(newListener);
        setCurrentUser(newListener);
        setUserType('listener');
        setPage('discover');
        return true;
    };

    const toggleLikeSong = (songId: string): boolean => {
        if (!currentUser || currentUser.type !== 'listener') return false;
        const listener = currentUser as Listener;
        const isLiked = listener.likedSongs.includes(songId);
        const updatedLikedSongs = isLiked
            ? listener.likedSongs.filter(id => id !== songId)
            : [...listener.likedSongs, songId];
        const updatedListener = { ...listener, likedSongs: updatedLikedSongs };
        
        const listenerIndex = MOCK_LISTENERS.findIndex(l => l.id === listener.id);
        if (listenerIndex !== -1) {
            MOCK_LISTENERS[listenerIndex] = updatedListener;
        }
        
        setCurrentUser(updatedListener);
        return !isLiked;
    };

    const isLikedSong = (songId: string): boolean => {
        if (!currentUser || currentUser.type !== 'listener') return false;
        const listener = currentUser as Listener;
        return listener.likedSongs.includes(songId);
    };

    return (
        <AuthContext.Provider value={{ currentUser, userType, page, setPage, login, logout, registerMusician, registerListener, toggleLikeSong, isLikedSong }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
