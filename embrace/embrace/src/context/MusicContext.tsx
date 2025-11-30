
import React, { createContext, useState, useContext, ReactNode, useRef, useEffect } from 'react';
import { Song } from '../types';
import { useData } from './DataContext';

interface MusicContextType {
    currentSong: Song | null;
    isPlaying: boolean;
    duration: number;
    currentTime: number;
    playSong: (song: Song) => void;
    togglePlay: () => void;
    seek: (time: number) => void;
}

const MusicContext = createContext<MusicContextType | undefined>(undefined);

export const MusicProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [currentSong, setCurrentSong] = useState<Song | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const { incrementPlayCount } = useData();

    useEffect(() => {
        if (typeof window !== 'undefined') {
            audioRef.current = new Audio();
            const audio = audioRef.current;

            const setAudioData = () => setDuration(audio.duration);
            const setAudioTime = () => setCurrentTime(audio.currentTime);

            audio.addEventListener('loadeddata', setAudioData);
            audio.addEventListener('timeupdate', setAudioTime);
            audio.addEventListener('ended', () => setIsPlaying(false));

            return () => {
                audio.removeEventListener('loadeddata', setAudioData);
                audio.removeEventListener('timeupdate', setAudioTime);
                audio.removeEventListener('ended', () => setIsPlaying(false));
            };
        }
    }, []);

    const playSong = (song: Song) => {
        if (audioRef.current) {
            if (currentSong?.id !== song.id) {
                setCurrentSong(song);
                audioRef.current.src = song.audioSrc;
                incrementPlayCount(song.id);
            }
            audioRef.current.play();
            setIsPlaying(true);
        }
    };

    const togglePlay = () => {
        if (!audioRef.current || !currentSong) return;
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    const seek = (time: number) => {
        if (audioRef.current) {
            audioRef.current.currentTime = time;
            setCurrentTime(time);
        }
    };

    return (
        <MusicContext.Provider value={{ currentSong, isPlaying, duration, currentTime, playSong, togglePlay, seek }}>
            {children}
        </MusicContext.Provider>
    );
};

export const useMusic = () => {
    const context = useContext(MusicContext);
    if (context === undefined) {
        throw new Error('useMusic must be used within a MusicProvider');
    }
    return context;
};
