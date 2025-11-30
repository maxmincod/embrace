
import React from 'react';
import { Song } from '../../types';
import { useMusic } from '../../context/MusicContext';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';

interface SongCardProps {
    song: Song;
    isNew?: boolean;
}

const SongCard: React.FC<SongCardProps> = ({ song, isNew }) => {
    const { playSong, currentSong, isPlaying } = useMusic();
    const { setPage, currentUser, isLikedSong, toggleLikeSong } = useAuth();
    const { updateSongLikes } = useData();
    const isActive = currentSong?.id === song.id;
    const isListener = currentUser?.type === 'listener';
    const isLiked = isLikedSong(song.id);

    const handleLike = (e: React.MouseEvent) => {
        e.stopPropagation();
        const nowLiked = toggleLikeSong(song.id);
        updateSongLikes(song.id, nowLiked);
    };

    return (
        <div className={`bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-orange-500/20 hover:scale-[1.02] relative ${isActive ? 'ring-2 ring-orange-500' : ''}`}>
            {isNew && <div className="absolute top-2 right-2 bg-orange-600 text-white text-xs font-bold px-2 py-1 rounded-full z-10">NEW</div>}
            <div className="relative">
                <img src={song.coverArt} alt={song.title} className="w-full h-48 object-cover" />
                <button
                    onClick={() => playSong(song)}
                    className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-50 flex items-center justify-center transition-opacity duration-300 opacity-0 hover:opacity-100"
                    aria-label={`Play ${song.title}`}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className={`h-16 w-16 text-white ${isActive && isPlaying ? 'hidden' : 'block'}`} fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8.118v3.764a1 1 0 001.555.832l3.197-1.882a1 1 0 000-1.664l-3.197-1.882z" clipRule="evenodd" />
                    </svg>
                     <svg xmlns="http://www.w3.org/2000/svg" className={`h-16 w-16 text-white ${isActive && isPlaying ? 'block' : 'hidden'}`} fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                </button>
            </div>
            <div className="p-4">
                <h3 className="font-bold text-lg truncate text-white">{song.title}</h3>
                <p 
                    className="text-sm text-gray-400 hover:text-orange-400 cursor-pointer truncate"
                    onClick={() => setPage(`artist/${song.musicianId}`)}
                >
                    {song.musicianName}
                </p>
                <div className="flex justify-between items-center mt-3 text-xs text-gray-500">
                    <div className="flex items-center gap-3">
                        <span className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor"><path d="M10 12a2 2 0 100-4 2 2 0 000 4z" /><path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.022 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" /></svg>
                            {song.playCount}
                        </span>
                        {isListener ? (
                            <button 
                                onClick={handleLike}
                                className={`flex items-center transition-colors ${isLiked ? 'text-red-500' : 'text-gray-500 hover:text-red-400'}`}
                                title={isLiked ? 'Unlike' : 'Like'}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                                </svg>
                                {song.likes}
                            </button>
                        ) : (
                            <span className="flex items-center text-gray-500">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                                </svg>
                                {song.likes}
                            </span>
                        )}
                    </div>
                    <span className="font-semibold text-orange-400">{song.genre}</span>
                </div>
            </div>
        </div>
    );
};

export default SongCard;
