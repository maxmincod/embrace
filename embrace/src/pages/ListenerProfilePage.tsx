
import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { Listener } from '../types';
import SongCard from '../components/Music/SongCard';

const ListenerProfilePage: React.FC = () => {
    const { currentUser, setPage } = useAuth();
    const { songs, musicians } = useData();

    if (!currentUser || currentUser.type !== 'listener') {
        return null;
    }

    const listener = currentUser as Listener;

    const likedSongs = songs.filter(song => listener.likedSongs.includes(song.id));
    const followedArtists = musicians.filter(musician => listener.followedArtists.includes(musician.id));

    return (
        <div className="space-y-12">
            <div>
                <h1 className="text-4xl font-bold text-white">@{listener.username}</h1>
                <p className="text-gray-400 mt-1">Your personal space for the music you love.</p>
            </div>

            <section>
                <h2 className="text-2xl font-bold mb-4 text-white">Liked Songs</h2>
                {likedSongs.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {likedSongs.map(song => <SongCard key={song.id} song={song} />)}
                    </div>
                ) : (
                    <p className="text-gray-400">You haven't liked any songs yet. Go explore!</p>
                )}
            </section>

            <section>
                <h2 className="text-2xl font-bold mb-4 text-white">Followed Artists</h2>
                {followedArtists.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                        {followedArtists.map(artist => (
                            <div key={artist.id} className="flex flex-col items-center text-center cursor-pointer group" onClick={() => setPage(`artist/${artist.id}`)}>
                                <img src={artist.profilePhoto} alt={artist.artistName} className="w-24 h-24 rounded-full object-cover border-2 border-gray-700 group-hover:border-orange-500 transition-colors" />
                                <p className="mt-2 font-semibold group-hover:text-orange-400">{artist.artistName}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-400">You're not following any artists yet.</p>
                )}
            </section>
        </div>
    );
};

export default ListenerProfilePage;
