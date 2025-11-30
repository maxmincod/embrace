
import React from 'react';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import SongCard from '../components/Music/SongCard';

interface ArtistProfilePageProps {
    artistId: string;
}

const ArtistProfilePage: React.FC<ArtistProfilePageProps> = ({ artistId }) => {
    const { musicians, getArtistSongs } = useData();
    const { setPage } = useAuth();

    const artist = musicians.find(m => m.id === artistId);
    const artistSongs = getArtistSongs(artistId);

    if (!artist) {
        return (
            <div className="text-center py-16">
                <h1 className="text-3xl font-bold">Artist Not Found</h1>
                <button onClick={() => setPage('discover')} className="mt-4 text-orange-400 hover:text-orange-300">
                    Back to Discover
                </button>
            </div>
        );
    }

    return (
        <div className="space-y-12">
            <header className="flex flex-col md:flex-row items-center gap-8 bg-gray-800/50 p-8 rounded-lg">
                <img src={artist.profilePhoto} alt={artist.artistName} className="w-40 h-40 rounded-full object-cover border-4 border-gray-700" />
                <div>
                    <h1 className="text-5xl font-black text-white">{artist.artistName}</h1>
                    <p className="text-orange-400 font-semibold mt-1">{artist.genre.join(' / ')}</p>
                    <p className="mt-4 text-gray-300 max-w-2xl">{artist.bio}</p>
                </div>
            </header>

            <section>
                <h2 className="text-3xl font-bold mb-6 text-white">Music</h2>
                {artistSongs.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {artistSongs.map(song => <SongCard key={song.id} song={song} />)}
                    </div>
                ) : (
                    <p className="text-gray-400 bg-gray-800 p-6 rounded-lg">This artist hasn't uploaded any music yet.</p>
                )}
            </section>
        </div>
    );
};

export default ArtistProfilePage;
