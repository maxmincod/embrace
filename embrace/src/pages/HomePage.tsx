
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
        itemName: 'Embrace Tote Bag',
        artistName: 'Embrace',
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
                    Embrace é uma plataforma de lançamento para o que ainda não foi descoberto. Nós apoiamos artistas, fazemos eles brilharem mais forte para serem notados como tantas outras estrelas.
                </p>
                <div className="mt-8 flex justify-center gap-4">
                    <button onClick={() => setPage('discover')} className="bg-orange-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-orange-700 transition-transform duration-200 transform hover:scale-105">
                        Conheça nossas músicas
                    </button>
                    <button onClick={() => setPage('login')} className="bg-gray-700 text-white font-bold py-3 px-6 rounded-lg hover:bg-gray-600 transition-transform duration-200 transform hover:scale-105">
                        Se junte a nós e brilhe alto
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
                        Nascida na mente de uma só pessoinha nosso fundador Lucas Castilho da Silva, com um sonho gigante, a Embrace surgiu da paixão por músicas autênticas daquelas que realmente merecem ser ouvidas. Vimos artistas talentosos tentando sobreviver no meio do barulho da indústria, suas vozes esquecidas em meio a cidade, as pessoas tão centradas em si que esquecem de ouvir e ver quem está tentando, começando a surgir no meio das outras estrelas. Então decidimos mudar isso: criar um meio que mede sucesso não por números, mas pela coragem de criar. Essa é a Embrace, onde seus sonhos, sua música e seus esforços não passam despercebidos.
                    </p>
                    <p className="text-gray-300">
                        Nossa missão é simples: encontrar talentos ocultos, dar a eles as ferramentas para crescer e conectá-los a uma comunidade que valoriza a originalidade.
                    </p>
                </div>
                <div className="order-1 md:order-2">
                    <img src="https://picsum.photos/seed/studio/600/400" alt="Music studio" className="rounded-lg shadow-lg w-full h-full object-cover" />
                </div>
            </section>

            <section>
                <h2 className="text-3xl font-bold mb-6 text-white">Loja Indie</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {MOCK_MERCH.map(item => <MerchCard key={item.id} item={item} />)}
                </div>
            </section>

            <section>
                <h2 className="text-3xl font-bold mb-6 text-white">Artistas mais recentes!</h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                    {recentMusicians.map(musician => <MusicianAvatar key={musician.id} musician={musician} />)}
                </div>
            </section>

            <section className="text-center bg-gray-800/50 p-12 rounded-lg">
                <h2 className="text-3xl font-bold text-white">Faça parte do movimento</h2>
                <p className="mt-3 max-w-2xl mx-auto text-gray-300">
                    É artista e tem um som único? A gente quer te ouvir. Aqui, você encontra plataforma, ferramentas e uma comunidade inteira pra impulsionar o seu crescimento.
                </p>
                <button onClick={() => setPage('login')} className="mt-6 bg-orange-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-orange-700 transition-transform duration-200 transform hover:scale-105">
                    Trabalhe com a gente!
                </button>
            </section>

            <section className="bg-orange-600/10 border border-orange-500/30 rounded-lg p-8 flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                    <h3 className="text-2xl font-bold text-white">Nos ajude a continuar apoaindo estrelas!</h3>
                    <p className="text-orange-200/80 mt-2 max-w-3xl">Não deixe as estrelas virarem cadentes! Suas contribuições financiam diretamente nossos artistas e mantêm viva a nossa missão. Apoie um artista que você ama ou faça uma doação para a Embrace e ajude a impulsionar a próxima geração da música.</p>
                </div>
                <button onClick={() => setPage('donations')} className="bg-orange-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-orange-500 transition-transform duration-200 transform hover:scale-105 flex-shrink-0">
                    Nunca mais estrelas cadentes
                </button>
            </section>
        </div>
    );
};

export default HomePage;
