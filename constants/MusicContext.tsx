import React, { createContext, useState, useContext, ReactNode } from 'react';

// Define what a Playlist looks like
interface Playlist {
  id: string;
  name: string;
  trackCount?: number;
}

// Define everything our Context will hold
interface MusicContextType {
  playlists: Playlist[];
  addPlaylist: (name: string) => void;
  favorites: string[];
  toggleFavorite: (id: string) => void;
  // 👉 NEW: Username state
  username: string;
  setUsername: (name: string) => void;
}

const MusicContext = createContext<MusicContextType | undefined>(undefined);

export function MusicProvider({ children }: { children: ReactNode }) {
  // Existing state
  const [playlists, setPlaylists] = useState<Playlist[]>([
    { id: 'p1', name: 'Chill Vibes', trackCount: 12 },
    { id: 'p2', name: 'Workout', trackCount: 24 },
  ]);
  const [favorites, setFavorites] = useState<string[]>([]);
  
  // 👉 NEW: Default username state
  const [username, setUsername] = useState('Guest');

  const addPlaylist = (name: string) => {
    const newPlaylist = { id: `p${Date.now()}`, name, trackCount: 0 };
    setPlaylists([...playlists, newPlaylist]);
  };

  const toggleFavorite = (id: string) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(favId => favId !== id) : [...prev, id]
    );
  };

  return (
    // 👉 NEW: Passed username and setUsername down to the app
    <MusicContext.Provider value={{ playlists, addPlaylist, favorites, toggleFavorite, username, setUsername }}>
      {children}
    </MusicContext.Provider>
  );
}

export function useMusic() {
  const context = useContext(MusicContext);
  if (context === undefined) {
    throw new Error('useMusic must be used within a MusicProvider');
  }
  return context;
}