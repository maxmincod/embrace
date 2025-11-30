
import React, { useState, useMemo } from 'react';
import { useData } from '../context/DataContext';
import SongCard from '../components/Music/SongCard';
import { ALL_GENRES } from '../constants';

const DiscoverPage: React.FC = () => {
    const { getSongsSorted } = useData();
    const [selectedGenre, setSelectedGenre] = useState<string>('All');
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000 * 3);

    const filteredSongs = useMemo(() => {
        const sorted = getSongsSorted();
        if (selectedGenre === 'All') {
            return sorted;
        }
        return sorted.filter(song => song.genre === selectedGenre);
    }, [selectedGenre, getSongsSorted]);

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-4xl font-bold text-white">Descubra Músicas</h1>
                <p className="text-gray-400 mt-2">Encontre seu próximo artista favorito. Músicas com menos reproduções aparecem primeiro.</p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
                <button
                    onClick={() => setSelectedGenre('All')}
                    className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${selectedGenre === 'All' ? 'bg-orange-600 text-white' : 'bg-gray-700 hover:bg-gray-600'}`}
                >
                    Todos os Gêneros
                </button>
                {ALL_GENRES.map(genre => (
                    <button
                        key={genre}
                        onClick={() => setSelectedGenre(genre)}
                        className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${selectedGenre === genre ? 'bg-orange-600 text-white' : 'bg-gray-700 hover:bg-gray-600'}`}
                    >
                        {genre}
                    </button>
                ))}
            </div>

            {filteredSongs.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    {filteredSongs.map(song => (
                        <SongCard key={song.id} song={song} isNew={song.uploadDate > oneDayAgo} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-16 bg-gray-800 rounded-lg">
                    <h3 className="text-xl font-semibold">Nenhuma música encontrada</h3>
                    <p className="text-gray-400 mt-2">Tente um gênero diferente ou volte mais tarde!</p>
                </div>
            )}
        </div>
    );
};

export default DiscoverPage;
