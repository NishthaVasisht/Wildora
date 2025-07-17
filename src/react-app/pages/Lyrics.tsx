import { useState, useRef, useEffect } from 'react';
import { Search, Music } from 'lucide-react';
import Navbar from '@/react-app/components/Navbar';

interface Song {
  id: string;
  title: string;
  album: string;
  era: string;
  lyrics: string;
  image: string;
}

const songsData: Song[] = [
  {
    id: '1',
    title: 'Shake It Off',
    album: '1989',
    era: '1989',
    lyrics: 'I stay out too late, got nothing in my brain, that\'s what people say...',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop'
  },
  {
    id: '2',
    title: 'Look What You Made Me Do',
    album: 'reputation',
    era: 'Reputation',
    lyrics: 'I don\'t like your little games, don\'t like your tilted stage...',
    image: 'https://images.unsplash.com/photo-1614624532983-4ce03382d63d?w=300&h=300&fit=crop'
  },
  {
    id: '3',
    title: 'cardigan',
    album: 'folklore',
    era: 'Folklore',
    lyrics: 'Vintage tee, brand new phone, high heels on cobblestones...',
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=300&h=300&fit=crop'
  },
  {
    id: '4',
    title: 'Anti-Hero',
    album: 'Midnights',
    era: 'Midnights',
    lyrics: 'I have this thing where I get older but just never wiser...',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=300&fit=crop'
  }
];

export default function Lyrics() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredSongs, setFilteredSongs] = useState(songsData);
  const resultsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const filtered = songsData.filter(song =>
      song.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      song.album.toLowerCase().includes(searchTerm.toLowerCase()) ||
      song.lyrics.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredSongs(filtered);
  }, [searchTerm]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-800 to-red-600">
      <Navbar />
      
      <div className="pt-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              Lyrics Library
            </h1>
            <p className="text-xl text-white/80">
              Search through Taylor's vast collection of lyrical masterpieces
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative mb-12">
            <div className="relative backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl">
              <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-white/60 w-6 h-6" />
              <input
                type="text"
                placeholder="Search songs, albums, or lyrics..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-16 pr-6 py-4 bg-transparent text-white placeholder-white/60 text-lg focus:outline-none"
              />
            </div>
          </div>

          {/* Results */}
          <div ref={resultsRef} className="space-y-6">
            {filteredSongs.length === 0 ? (
              <div className="text-center py-12">
                <Music className="w-16 h-16 text-white/40 mx-auto mb-4" />
                <p className="text-white/60 text-lg">No songs found matching your search.</p>
              </div>
            ) : (
              filteredSongs.map((song) => (
                <div
                  key={song.id}
                  className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 hover:scale-[1.02]"
                >
                  <div className="flex items-start space-x-6">
                    <img
                      src={song.image}
                      alt={song.album}
                      className="w-20 h-20 rounded-xl object-cover flex-shrink-0"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-2xl font-bold text-white">
                          {song.title}
                        </h3>
                        <span className="text-white/60 text-sm bg-white/10 px-3 py-1 rounded-full">
                          {song.era}
                        </span>
                      </div>
                      <p className="text-white/80 mb-3 font-medium">
                        {song.album}
                      </p>
                      <p className="text-white/70 leading-relaxed">
                        {song.lyrics}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
