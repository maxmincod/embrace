
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Song, Musician, Donation } from '../types';
import { MOCK_SONGS, MOCK_MUSICIANS, MOCK_DONATIONS } from '../constants';

interface DataContextType {
    songs: Song[];
    musicians: Musician[];
    donations: Donation[];
    getSongsSorted: () => Song[];
    getArtistSongs: (musicianId: string) => Song[];
    uploadSong: (song: Omit<Song, 'id' | 'playCount' | 'likes' | 'uploadDate'>) => void;
    deleteSong: (songId: string) => void;
    addDonation: (donation: Omit<Donation, 'id' | 'date'>) => void;
    incrementPlayCount: (songId: string) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [songs, setSongs] = useState<Song[]>(MOCK_SONGS);
    // Fix: Corrected typo from MOCK_MUSICIans to MOCK_MUSICIANS
    const [musicians, setMusicians] = useState<Musician[]>(MOCK_MUSICIANS);
    const [donations, setDonations] = useState<Donation[]>(MOCK_DONATIONS);

    const getSongsSorted = () => {
        return [...songs].sort((a, b) => {
            if (a.playCount !== b.playCount) {
                return a.playCount - b.playCount;
            }
            return b.uploadDate.getTime() - a.uploadDate.getTime();
        });
    };

    const getArtistSongs = (musicianId: string) => {
        return getSongsSorted().filter(song => song.musicianId === musicianId);
    };

    const uploadSong = (songData: Omit<Song, 'id' | 'playCount' | 'likes' | 'uploadDate'>) => {
        const newSong: Song = {
            ...songData,
            id: `song-${Date.now()}`,
            playCount: 0,
            likes: 0,
            uploadDate: new Date(),
        };
        setSongs(prevSongs => [newSong, ...prevSongs]);
    };

    const deleteSong = (songId: string) => {
        setSongs(prevSongs => prevSongs.filter(song => song.id !== songId));
    };

    const addDonation = (donationData: Omit<Donation, 'id' | 'date'>) => {
        const newDonation: Donation = {
            ...donationData,
            id: `donation-${Date.now()}`,
            date: new Date(),
        };
        setDonations(prevDonations => [newDonation, ...prevDonations]);
    };

    const incrementPlayCount = (songId: string) => {
        setSongs(prevSongs =>
            prevSongs.map(song =>
                song.id === songId ? { ...song, playCount: song.playCount + 1 } : song
            )
        );
    };

    return (
        <DataContext.Provider value={{ songs, musicians, donations, getSongsSorted, getArtistSongs, uploadSong, deleteSong, addDonation, incrementPlayCount }}>
            {children}
        </DataContext.Provider>
    );
};

export const useData = () => {
    const context = useContext(DataContext);
    if (context === undefined) {
        throw new Error('useData must be used within a DataProvider');
    }
    return context;
};
