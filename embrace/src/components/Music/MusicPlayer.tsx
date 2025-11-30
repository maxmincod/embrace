
import React from 'react';
import { useMusic } from '../../context/MusicContext';

const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
};

const MusicPlayer: React.FC = () => {
    const { currentSong, isPlaying, duration, currentTime, togglePlay, seek } = useMusic();

    if (!currentSong) {
        return null;
    }

    const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-gray-800/80 backdrop-blur-lg border-t border-gray-700 z-50 text-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <div className="flex items-center w-1/3">
                        <img src={currentSong.coverArt} alt={currentSong.title} className="w-12 h-12 rounded-md object-cover" />
                        <div className="ml-4">
                            <p className="font-semibold truncate">{currentSong.title}</p>
                            <p className="text-sm text-gray-400 truncate">{currentSong.musicianName}</p>
                        </div>
                    </div>

                    <div className="flex flex-col items-center justify-center w-1/3">
                        <button onClick={togglePlay} className="p-2 rounded-full bg-orange-600 hover:bg-orange-500 transition-transform duration-200 transform hover:scale-110">
                            {isPlaying ? (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            )}
                        </button>
                        <div className="w-full max-w-xs flex items-center space-x-2 mt-2">
                            <span className="text-xs text-gray-400">{formatTime(currentTime)}</span>
                            <div className="w-full bg-gray-600 rounded-full h-1.5 cursor-pointer" onClick={(e) => {
                                const rect = e.currentTarget.getBoundingClientRect();
                                const clickX = e.clientX - rect.left;
                                const width = rect.width;
                                seek((clickX / width) * duration);
                            }}>
                                <div className="bg-orange-500 h-1.5 rounded-full" style={{ width: `${progress}%` }}></div>
                            </div>
                            <span className="text-xs text-gray-400">{formatTime(duration)}</span>
                        </div>
                    </div>

                    <div className="w-1/3"></div>
                </div>
            </div>
        </div>
    );
};

export default MusicPlayer;
