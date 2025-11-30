
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { Musician } from '../types';
import { ALL_GENRES } from '../constants';

const StatCard: React.FC<{ title: string; value: string | number; icon: React.ReactNode }> = ({ title, value, icon }) => (
    <div className="bg-gray-800 p-4 rounded-lg flex items-center">
        <div className="p-3 rounded-full bg-orange-600/20 text-orange-400 mr-4">{icon}</div>
        <div>
            <p className="text-sm text-gray-400">{title}</p>
            <p className="text-2xl font-bold text-white">{value}</p>
        </div>
    </div>
);

const SongUploadModal: React.FC<{ onClose: () => void; musician: Musician }> = ({ onClose, musician }) => {
    const { uploadSong } = useData();
    const [title, setTitle] = useState('');
    const [genre, setGenre] = useState(musician.genre[0] || '');
    const [description, setDescription] = useState('');
    const [audioFile, setAudioFile] = useState<File | null>(null);
    const [coverFile, setCoverFile] = useState<File | null>(null);
    const [audioPreview, setAudioPreview] = useState<string>('');
    const [coverPreview, setCoverPreview] = useState<string>('');

    const handleAudioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && file.type === 'audio/mpeg') {
            setAudioFile(file);
            setAudioPreview(URL.createObjectURL(file));
        }
    };

    const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && file.type.startsWith('image/')) {
            setCoverFile(file);
            setCoverPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!audioFile) {
            alert('Por favor, selecione um arquivo de áudio MP3.');
            return;
        }
        uploadSong({
            title,
            genre,
            description,
            musicianId: musician.id,
            musicianName: musician.artistName,
            coverArt: coverPreview || `https://picsum.photos/seed/${Date.now()}/400/400`,
            audioSrc: audioPreview,
        });
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center overflow-y-auto py-8" onClick={onClose}>
            <div className="bg-gray-800 rounded-lg shadow-xl w-full max-w-md p-6 m-4" onClick={e => e.stopPropagation()}>
                <h2 className="text-2xl font-bold mb-4">Enviar Nova Música</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input type="text" placeholder="Título da Música" value={title} onChange={e => setTitle(e.target.value)} required className="w-full px-4 py-2 bg-gray-700 rounded-md focus:ring-orange-500 focus:outline-none" />
                    <select value={genre} onChange={e => setGenre(e.target.value)} className="w-full px-4 py-2 bg-gray-700 rounded-md focus:ring-orange-500 focus:outline-none">
                        {ALL_GENRES.map(g => <option key={g} value={g}>{g}</option>)}
                    </select>
                    <textarea placeholder="Descrição" value={description} onChange={e => setDescription(e.target.value)} className="w-full px-4 py-2 bg-gray-700 rounded-md focus:ring-orange-500 focus:outline-none" />
                    
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-300">Arquivo de Áudio (MP3) *</label>
                        <div className="flex items-center gap-3">
                            <label className="flex-1 cursor-pointer">
                                <div className={`flex items-center justify-center px-4 py-3 bg-gray-700 rounded-md border-2 border-dashed ${audioFile ? 'border-green-500' : 'border-gray-600'} hover:border-orange-500 transition-colors`}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                                    </svg>
                                    <span className="text-sm text-gray-300 truncate">
                                        {audioFile ? audioFile.name : 'Escolher arquivo MP3...'}
                                    </span>
                                </div>
                                <input type="file" accept="audio/mpeg,.mp3" onChange={handleAudioChange} className="hidden" />
                            </label>
                        </div>
                        {audioPreview && (
                            <audio controls className="w-full mt-2">
                                <source src={audioPreview} type="audio/mpeg" />
                            </audio>
                        )}
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-300">Imagem de Capa (opcional)</label>
                        <div className="flex items-center gap-3">
                            <label className="flex-1 cursor-pointer">
                                <div className={`flex items-center justify-center px-4 py-3 bg-gray-700 rounded-md border-2 border-dashed ${coverFile ? 'border-green-500' : 'border-gray-600'} hover:border-orange-500 transition-colors`}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    <span className="text-sm text-gray-300 truncate">
                                        {coverFile ? coverFile.name : 'Escolher imagem...'}
                                    </span>
                                </div>
                                <input type="file" accept="image/*" onChange={handleCoverChange} className="hidden" />
                            </label>
                        </div>
                        {coverPreview && (
                            <img src={coverPreview} alt="Prévia da capa" className="w-32 h-32 object-cover rounded-md mt-2 mx-auto" />
                        )}
                    </div>

                    <div className="flex justify-end gap-4 pt-4">
                        <button type="button" onClick={onClose} className="px-4 py-2 rounded-md bg-gray-600 hover:bg-gray-500">Cancelar</button>
                        <button type="submit" className="px-4 py-2 rounded-md bg-orange-600 hover:bg-orange-700">Enviar</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const ProfileEditModal: React.FC<{ musician: Musician; onClose: () => void }> = ({ musician, onClose }) => {
    const { updateMusicianProfile } = useAuth();
    const { updateMusician } = useData();
    const [artistName, setArtistName] = useState(musician.artistName);
    const [bio, setBio] = useState(musician.bio);
    const [photoPreview, setPhotoPreview] = useState(musician.profilePhoto);
    const [photoBase64, setPhotoBase64] = useState(musician.profilePhoto);

    const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && file.type.startsWith('image/')) {
            setPhotoPreview(URL.createObjectURL(file));
            const reader = new FileReader();
            reader.onloadend = () => {
                setPhotoBase64(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!artistName.trim()) {
            alert('Por favor, preencha o nome artístico.');
            return;
        }
        updateMusicianProfile(artistName, bio, photoBase64);
        updateMusician(musician.id, { artistName, bio, profilePhoto: photoBase64 });
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center overflow-y-auto py-8" onClick={onClose}>
            <div className="bg-gray-800 rounded-lg shadow-xl w-full max-w-md p-6 m-4" onClick={e => e.stopPropagation()}>
                <h2 className="text-2xl font-bold mb-4">Editar Perfil</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex flex-col items-center mb-4">
                        <img src={photoPreview} alt="Foto de perfil" className="w-32 h-32 rounded-full object-cover border-4 border-gray-700 mb-4" />
                        <label className="cursor-pointer">
                            <div className="flex items-center justify-center px-4 py-2 bg-gray-700 rounded-md hover:bg-gray-600 transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <span className="text-sm text-gray-300">Alterar Foto</span>
                            </div>
                            <input type="file" accept="image/*" onChange={handlePhotoChange} className="hidden" />
                        </label>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Nome Artístico</label>
                        <input type="text" value={artistName} onChange={e => setArtistName(e.target.value)} required className="w-full px-4 py-2 bg-gray-700 rounded-md focus:ring-orange-500 focus:outline-none" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Biografia</label>
                        <textarea value={bio} onChange={e => setBio(e.target.value)} rows={4} className="w-full px-4 py-2 bg-gray-700 rounded-md focus:ring-orange-500 focus:outline-none resize-none" placeholder="Conte sua história como artista..." />
                    </div>

                    <div className="flex justify-end gap-4 pt-4">
                        <button type="button" onClick={onClose} className="px-4 py-2 rounded-md bg-gray-600 hover:bg-gray-500">Cancelar</button>
                        <button type="submit" className="px-4 py-2 rounded-md bg-orange-600 hover:bg-orange-700">Salvar</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const MusicianDashboard: React.FC = () => {
    const { currentUser } = useAuth();
    const { getArtistSongs, donations, deleteSong } = useData();
    const [showUploadModal, setShowUploadModal] = useState(false);
    const [showProfileModal, setShowProfileModal] = useState(false);

    if (!currentUser || currentUser.type !== 'musician') return null;
    const musician = currentUser as Musician;

    const artistSongs = getArtistSongs(musician.id);
    const totalPlays = artistSongs.reduce((sum, song) => sum + song.playCount, 0);
    const artistDonations = donations.filter(d => d.recipientId === musician.id);
    const totalDonations = artistDonations.reduce((sum, d) => sum + d.amount, 0);

    const sortedByPlays = [...artistSongs].sort((a, b) => b.playCount - a.playCount);

    return (
        <div className="space-y-8">
            {showUploadModal && <SongUploadModal musician={musician} onClose={() => setShowUploadModal(false)} />}
            {showProfileModal && <ProfileEditModal musician={musician} onClose={() => setShowProfileModal(false)} />}
            
            <div className="bg-gray-800/50 p-6 rounded-lg flex flex-col md:flex-row items-center gap-6">
                <div className="relative group">
                    <img src={musician.profilePhoto} alt={musician.artistName} className="w-24 h-24 rounded-full object-cover border-4 border-gray-700" />
                    <button onClick={() => setShowProfileModal(true)} className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                    </button>
                </div>
                <div className="flex-1 text-center md:text-left">
                    <h1 className="text-4xl font-bold text-white">Bem-vindo, {musician.artistName}</h1>
                    <p className="text-gray-400 mt-1">{musician.bio}</p>
                    <button onClick={() => setShowProfileModal(true)} className="mt-3 text-sm text-orange-400 hover:text-orange-300 flex items-center gap-1 mx-auto md:mx-0">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                        Editar Perfil
                    </button>
                </div>
                <button onClick={() => setShowUploadModal(true)} className="bg-orange-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-orange-700 transition-colors">
                    Enviar Música
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Total de Reproduções" value={totalPlays} icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /></svg>} />
                <StatCard title="Total de Músicas" value={artistSongs.length} icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2z" /></svg>} />
                <StatCard title="Doações Recebidas" value={`R$${totalDonations}`} icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v.01" /></svg>} />
                <StatCard title="Total de Doadores" value={artistDonations.length} icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-gray-800 p-6 rounded-lg">
                    <h3 className="text-xl font-bold mb-4">Suas Músicas</h3>
                    <div className="space-y-3 max-h-96 overflow-y-auto">
                        {artistSongs.map(song => (
                            <div key={song.id} className="flex items-center justify-between bg-gray-700/50 p-3 rounded-md">
                                <div>
                                    <p className="font-semibold">{song.title}</p>
                                    <p className="text-sm text-gray-400">{song.playCount} reproduções</p>
                                </div>
                                <button onClick={() => { if(confirm('Tem certeza?')) deleteSong(song.id) }} className="text-red-400 hover:text-red-300">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="bg-gray-800 p-6 rounded-lg">
                    <h3 className="text-xl font-bold mb-4">Desempenho das Músicas</h3>
                     <div className="space-y-4">
                        {sortedByPlays.slice(0, 5).map((song) => (
                            <div key={song.id}>
                                <div className="flex justify-between text-sm mb-1">
                                    <span className="font-medium text-gray-300">{song.title}</span>
                                    <span className="text-gray-400">{song.playCount} reproduções</span>
                                </div>
                                <div className="w-full bg-gray-700 rounded-full h-2.5">
                                    <div className="bg-orange-500 h-2.5 rounded-full" style={{ width: `${(song.playCount / (sortedByPlays[0]?.playCount || 1)) * 100}%` }}></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MusicianDashboard;
