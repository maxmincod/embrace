
import React from 'react';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import SongCard from '../components/Music/SongCard';
import { Musician } from '../types';

// Mock data for the new merch section
const MOCK_MERCH = [
    {
        id: 'merch-1',
        itemName: 'Nova Wave Logo Tee',
        artistName: 'Nova Wave',
        price: 25.00,
        imageUrl: 'https://picsum.photos/seed/merch1/400/400'
    },
    {
        id: 'merch-2',
        itemName: 'Leo King "Forest Path" Vinyl',
        artistName: 'Leo King',
        price: 35.00,
        imageUrl: 'https://picsum.photos/seed/merch2/400/400'
    },
    {
        id: 'merch-3',
        itemName: 'Glitch System Beanie',
        artistName: 'Glitch System',
        price: 20.00,
        imageUrl: 'https://picsum.photos/seed/merch3/400/400'
    },
    {
        id: 'merch-4',
        itemName: 'Ascend Records Tote Bag',
        artistName: 'Ascend Records',
        price: 15.00,
        imageUrl: 'https://picsum.photos/seed/merch4/400/400'
    }
];

const HomePage: React.FC = () => {
    const { getSongsSorted, musicians } = useData();
    const { setPage } = useAuth();
    const sortedSongs = getSongsSorted();
    const threeDaysAgo = new Date(Date.now() - 24 * 60 * 60 * 1000 * 3);

    const trendingUpSongs = sortedSongs.slice(0, 4);
    const newSongs = sortedSongs.filter(s => s.uploadDate > threeDaysAgo).slice(0, 4);
    const recentMusicians = [...musicians].reverse().slice(0, 4);

    const MusicianAvatar: React.FC<{musician: Musician}> = ({musician}) => (
        <div className="flex flex-col items-center text-center cursor-pointer group" onClick={() => setPage(`artist/${musician.id}`)}>
            <img src={musician.profilePhoto} alt={musician.artistName} className="w-24 h-24 rounded-full object-cover border-2 border-gray-700 group-hover:border-orange-500 transition-all duration-300" />
            <p className="mt-2 font-semibold text-white group-hover:text-orange-400">{musician.artistName}</p>
            <p className="text-sm text-gray-400">{musician.genre.join(', ')}</p>
        </div>
    );

    const MerchCard: React.FC<{item: typeof MOCK_MERCH[0]}> = ({item}) => (
        <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-orange-500/20 hover:scale-[1.02]">
            <img src={item.imageUrl} alt={item.itemName} className="w-full h-48 object-cover" />
            <div className="p-4">
                <h3 className="font-bold text-lg truncate text-white">{item.itemName}</h3>
                <p className="text-sm text-gray-400 truncate">{item.artistName}</p>
                <div className="flex justify-between items-center mt-3">
                    <span className="font-semibold text-lg text-orange-400">${item.price.toFixed(2)}</span>
                    <button className="bg-gray-700 text-white font-bold py-2 px-4 rounded-lg hover:bg-gray-600 transition-colors text-sm">
                        View Item
                    </button>
                </div>
            </div>
        </div>
    );

    return (
        <div className="space-y-20 pb-16">
            <section className="text-center py-16 rounded-lg bg-gray-800/50">
                <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white">
                    The Future of Music is <span className="ascend-gradient-text">Here</span>.
                </h1>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-300">
                    Ascend Records is a launchpad for the undiscovered. We champion emerging artists, giving them the platform to shine and connect with listeners who crave fresh sounds.
                </p>
                <div className="mt-8 flex justify-center gap-4">
                    <button onClick={() => setPage('discover')} className="bg-orange-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-orange-700 transition-transform duration-200 transform hover:scale-105">
                        Explore Music
                    </button>
                    <button onClick={() => setPage('login')} className="bg-gray-700 text-white font-bold py-3 px-6 rounded-lg hover:bg-gray-600 transition-transform duration-200 transform hover:scale-105">
                        Join as an Artist
                    </button>
                </div>
            </section>

            <section>
                <h2 className="text-3xl font-bold mb-6 text-white">Trending Up <span className="text-base font-normal text-gray-400">(Lowest Plays)</span></h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {trendingUpSongs.map(song => <SongCard key={song.id} song={song} />)}
                </div>
            </section>

            <section>
                <h2 className="text-3xl font-bold mb-6 text-white">Newly Uploaded</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {newSongs.length > 0 ? newSongs.map(song => <SongCard key={song.id} song={song} isNew />) : <p className="text-gray-400">No new songs in the last 3 days.</p>}
                </div>
            </section>

            <section className="grid md:grid-cols-2 gap-8 items-center bg-gray-800/50 p-8 rounded-lg">
                <div className="order-2 md:order-1">
                    <h2 className="text-3xl font-bold text-white mb-4">Our Story</h2>
                    <p className="text-gray-300 mb-4">
                        Founded in a small studio with a big dream, Ascend Records was born from a passion for authentic music that deserves to be heard. We saw countless talented artists struggling to break through the noise. We decided to build a label that flips the script—one that measures success not by streams, but by the courage to create.
                    </p>
                    <p className="text-gray-300">
                        Our mission is simple: find the hidden gems, give them the tools to grow, and connect them with a community that values originality. We are more than a label; we are a collective of artists, listeners, and believers in the power of new music.
                    </p>
                </div>
                <div className="order-1 md:order-2">
                    <img src="https://picsum.photos/seed/studio/600/400" alt="Music studio" className="rounded-lg shadow-lg w-full h-full object-cover" />
                </div>
            </section>

            <section>
                <h2 className="text-3xl font-bold mb-6 text-white">The Indie Store</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {MOCK_MERCH.map(item => <MerchCard key={item.id} item={item} />)}
                </div>
            </section>

            <section>
                <h2 className="text-3xl font-bold mb-6 text-white">Recent Artists</h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                    {recentMusicians.map(musician => <MusicianAvatar key={musician.id} musician={musician} />)}
                </div>
            </section>

            <section className="text-center bg-gray-800/50 p-12 rounded-lg">
                <h2 className="text-3xl font-bold text-white">Join the Movement</h2>
                <p className="mt-3 max-w-2xl mx-auto text-gray-300">
                    Are you an artist with a unique sound? We want to hear from you. We provide the platform, the tools, and a community to help you grow. No gatekeepers, just good music.
                </p>
                <button onClick={() => setPage('login')} className="mt-6 bg-orange-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-orange-700 transition-transform duration-200 transform hover:scale-105">
                    Work With Us
                </button>
            </section>

            <section className="bg-orange-600/10 border border-orange-500/30 rounded-lg p-8 flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                    <h3 className="text-2xl font-bold text-white">Support the Scene</h3>
                    <p className="text-orange-200/80 mt-2 max-w-3xl">Your contributions directly fund our artists and help us continue our mission. Support an artist you love or donate to the label to fuel the next generation of music.</p>
                </div>
                <button onClick={() => setPage('donations')} className="bg-orange-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-orange-500 transition-transform duration-200 transform hover:scale-105 flex-shrink-0">
                    Donate Now
                </button>
            </section>
        </div>
    );
};

export default HomePage;
