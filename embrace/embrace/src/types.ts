
export type UserType = 'musician' | 'listener';

export interface User {
    id: string;
    email: string;
    username: string;
    type: UserType;
}

export interface Musician extends User {
    type: 'musician';
    artistName: string;
    bio: string;
    genre: string[];
    socialLinks: {
        spotify?: string;
        appleMusic?: string;
        instagram?: string;
    };
    profilePhoto: string;
}

export interface Listener extends User {
    type: 'listener';
    favoriteGenres: string[];
    likedSongs: string[]; // array of song IDs
    followedArtists: string[]; // array of musician IDs
}

export interface Song {
    id: string;
    title: string;
    musicianId: string;
    musicianName: string;
    genre: string;
    description: string;
    coverArt: string;
    audioSrc: string;
    playCount: number;
    likes: number;
    uploadDate: Date;
}

export interface Donation {
    id: string;
    donorId: string | null; // null for anonymous
    donorName: string; // 'Anonymous' if donorId is null
    recipientId: string; // musicianId or 'label'
    amount: number;
    message?: string;
    date: Date;
}

export type Page = 'home' | 'discover' | 'donations' | 'login' | 'dashboard' | 'profile' | `artist/${string}`;
