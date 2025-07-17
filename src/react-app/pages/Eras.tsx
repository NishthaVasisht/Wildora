import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Navbar from '@/react-app/components/Navbar';

interface Era {
  id: string;
  name: string;
  album: string;
  year: string;
  color: string;
  image: string;
  description: string;
}

const eras: Era[] = [
  {
    id: '1989',
    name: '1989',
    album: '1989',
    year: '2014',
    color: 'from-sky-400 to-blue-600',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop',
    description: 'The pop transformation that changed everything'
  },
  {
    id: 'reputation',
    name: 'Reputation',
    album: 'reputation',
    year: '2017',
    color: 'from-gray-800 to-black',
    image: 'https://images.unsplash.com/photo-1614624532983-4ce03382d63d?w=400&h=400&fit=crop',
    description: 'Dark, bold, and unapologetically fierce'
  },
  {
    id: 'folklore',
    name: 'Folklore',
    album: 'folklore',
    year: '2020',
    color: 'from-gray-400 to-gray-600',
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=400&fit=crop',
    description: 'Indie folk storytelling at its finest'
  },
  {
    id: 'evermore',
    name: 'Evermore',
    album: 'evermore',
    year: '2020',
    color: 'from-amber-600 to-orange-800',
    image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=400&h=400&fit=crop',
    description: 'The sister album full of autumn magic'
  },
  {
    id: 'midnights',
    name: 'Midnights',
    album: 'Midnights',
    year: '2022',
    color: 'from-indigo-900 to-purple-900',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop',
    description: 'Late night confessions and revelations'
  },
  {
    id: 'tortured-poets',
    name: 'The Tortured Poets Department',
    album: 'The Tortured Poets Department',
    year: '2024',
    color: 'from-stone-600 to-slate-800',
    image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=400&fit=crop',
    description: 'Raw emotion and literary brilliance'
  }
];

export default function Eras() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!gridRef.current) return;

    const cards = gridRef.current.querySelectorAll('.era-card');
    
    gsap.set(cards, {
      opacity: 0,
      y: 60,
      scale: 0.8,
    });

    gsap.to(cards, {
      duration: 0.8,
      opacity: 1,
      y: 0,
      scale: 1,
      ease: "power3.out",
      stagger: 0.1,
      delay: 0.2,
    });

  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-800 to-red-600">
      <Navbar />
      
      <div className="pt-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              The Eras
            </h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Journey through Taylor's musical evolution, from country sweetheart to pop icon to indie storyteller.
            </p>
          </div>

          <div 
            ref={gridRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-16"
          >
            {eras.map((era) => (
              <div
                key={era.id}
                className="era-card group cursor-pointer"
              >
                <div className="relative overflow-hidden rounded-2xl backdrop-blur-md bg-white/10 border border-white/20 hover:bg-white/20 transition-all duration-500 hover:scale-105 hover:-translate-y-2">
                  {/* Album cover */}
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={era.image}
                      alt={era.album}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${era.color} opacity-40 group-hover:opacity-60 transition-opacity duration-500`} />
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-2xl font-bold text-white">
                        {era.name}
                      </h3>
                      <span className="text-white/60 text-sm font-medium">
                        {era.year}
                      </span>
                    </div>
                    <p className="text-white/80 text-sm leading-relaxed">
                      {era.description}
                    </p>
                  </div>

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end">
                    <div className="p-6 w-full">
                      <div className="text-white text-sm font-medium mb-2">
                        Click to explore
                      </div>
                      <div className="w-full bg-white/20 rounded-full h-1">
                        <div className="h-1 bg-white rounded-full w-0 group-hover:w-full transition-all duration-1000 delay-200" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
