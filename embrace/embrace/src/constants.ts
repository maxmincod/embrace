
import { Musician, Listener, Song, Donation } from './types';

// MOCK DATA - Simulates a database

export const MOCK_MUSICIANS: Musician[] = [
    {
        id: 'musician-1',
        email: 'nova@ascend.com',
        username: 'nova_wave',
        type: 'musician',
        artistName: 'Nova Wave',
        bio: 'Crafting ethereal soundscapes from the heart of the city. Nova Wave blends synth-pop with ambient textures to create a unique auditory experience.',
        genre: ['Synth-pop', 'Ambient'],
        socialLinks: {},
        profilePhoto: 'https://i.pravatar.cc/150?u=musician-1',
    },
    {
        id: 'musician-2',
        email: 'leo@ascend.com',
        username: 'leo_king',
        type: 'musician',
        artistName: 'Leo King',
        bio: 'Acoustic soul-stirring melodies and heartfelt lyrics. Leo King brings a raw, honest approach to folk music.',
        genre: ['Folk', 'Acoustic'],
        socialLinks: {},
        profilePhoto: 'https://i.pravatar.cc/150?u=musician-2',
    },
    {
        id: 'musician-3',
        email: 'glitch@ascend.com',
        username: 'glitch_system',
        type: 'musician',
        artistName: 'Glitch System',
        bio: 'Pushing the boundaries of electronic music with experimental beats and complex rhythms. For the adventurous listener.',
        genre: ['IDM', 'Electronic'],
        socialLinks: {},
        profilePhoto: 'https://i.pravatar.cc/150?u=musician-3',
    },
];

export const MOCK_LISTENERS: Listener[] = [
    {
        id: 'listener-1',
        email: 'alex@email.com',
        username: 'AlexTheExplorer',
        type: 'listener',
        favoriteGenres: ['Synth-pop', 'IDM'],
        likedSongs: ['song-1', 'song-4'],
        followedArtists: ['musician-1', 'musician-3'],
    },
];

export const MOCK_SONGS: Song[] = [
    {
        id: 'song-1',
        title: 'City Lights',
        musicianId: 'musician-1',
        musicianName: 'Nova Wave',
        genre: 'Synth-pop',
        description: 'A shimmering track for late-night drives.',
        coverArt: `https://picsum.photos/seed/song1/400/400`,
        audioSrc: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
        playCount: 12,
        likes: 3,
        uploadDate: new Date('2024-07-20T10:00:00Z'),
    },
    {
        id: 'song-2',
        title: 'Forest Path',
        musicianId: 'musician-2',
        musicianName: 'Leo King',
        genre: 'Folk',
        description: 'An acoustic journey through nature.',
        coverArt: `https://picsum.photos/seed/song2/400/400`,
        audioSrc: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
        playCount: 5,
        likes: 1,
        uploadDate: new Date('2024-07-22T11:00:00Z'),
    },
    {
        id: 'song-3',
        title: 'Digital Rain',
        musicianId: 'musician-3',
        musicianName: 'Glitch System',
        genre: 'IDM',
        description: 'Complex rhythms for a complex world.',
        coverArt: `https://picsum.photos/seed/song3/400/400`,
        audioSrc: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
        playCount: 25,
        likes: 8,
        uploadDate: new Date('2024-07-15T14:00:00Z'),
    },
    {
        id: 'song-4',
        title: 'Neon Dreams',
        musicianId: 'musician-1',
        musicianName: 'Nova Wave',
        genre: 'Synth-pop',
        description: 'The sequel to City Lights, diving deeper into the night.',
        coverArt: `https://picsum.photos/seed/song4/400/400`,
        audioSrc: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
        playCount: 8,
        likes: 2,
        uploadDate: new Date('2024-07-23T18:00:00Z'),
    },
    {
        id: 'song-5',
        title: 'Campfire Stories',
        musicianId: 'musician-2',
        musicianName: 'Leo King',
        genre: 'Acoustic',
        description: 'Warm chords and a story to tell.',
        coverArt: `https://picsum.photos/seed/song5/400/400`,
        audioSrc: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
        playCount: 3,
        likes: 1,
        uploadDate: new Date('2024-07-24T09:00:00Z'),
    },
];

export const MOCK_DONATIONS: Donation[] = [
    {
        id: 'donation-1',
        donorId: 'listener-1',
        donorName: 'AlexTheExplorer',
        recipientId: 'musician-2',
        amount: 10,
        message: 'Love your new song!',
        date: new Date('2024-07-22T15:00:00Z'),
    },
    {
        id: 'donation-2',
        donorId: null,
        donorName: 'Anonymous',
        recipientId: 'label',
        amount: 50,
        message: 'Keep up the great work supporting new artists.',
        date: new Date('2024-07-21T12:00:00Z'),
    },
];

export const ALL_GENRES = ['Synth-pop', 'Ambient', 'Folk', 'Acoustic', 'IDM', 'Electronic', 'Rock', 'Hip-Hop', 'Jazz', 'Classical'];
