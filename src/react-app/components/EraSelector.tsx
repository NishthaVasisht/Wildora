import { useState } from 'react';
import { Check } from 'lucide-react';

interface Era {
  id: string;
  name: string;
  color: string;
  gradient: string;
  description: string;
}

const eras: Era[] = [
  {
    id: 'fearless',
    name: 'Fearless',
    color: '#FFD700',
    gradient: 'from-yellow-400 to-amber-500',
    description: 'Country princess with golden curls'
  },
  {
    id: 'red',
    name: 'Red',
    color: '#DC143C',
    gradient: 'from-red-500 to-red-700',
    description: 'All too well in scarlet passion'
  },
  {
    id: '1989',
    name: '1989',
    color: '#87CEEB',
    gradient: 'from-sky-400 to-blue-600',
    description: 'Pop transformation and NYC dreams'
  },
  {
    id: 'reputation',
    name: 'Reputation',
    color: '#2F2F2F',
    gradient: 'from-gray-800 to-black',
    description: 'Dark, bold, and unapologetic'
  },
  {
    id: 'lover',
    name: 'Lover',
    color: '#FFB6C1',
    gradient: 'from-pink-300 to-purple-400',
    description: 'Pastel dreams and rainbow hearts'
  },
  {
    id: 'folklore',
    name: 'Folklore',
    color: '#708090',
    gradient: 'from-gray-400 to-gray-600',
    description: 'Indie folk storytelling magic'
  },
  {
    id: 'evermore',
    name: 'Evermore',
    color: '#A0522D',
    gradient: 'from-amber-600 to-orange-800',
    description: 'Sister album full of autumn'
  },
  {
    id: 'midnights',
    name: 'Midnights',
    color: '#191970',
    gradient: 'from-indigo-900 to-purple-900',
    description: 'Late night confessions'
  },
  {
    id: 'tortured-poets',
    name: 'TTPD',
    color: '#696969',
    gradient: 'from-stone-600 to-slate-800',
    description: 'Raw emotion and literary brilliance'
  }
];

interface EraSelectorProps {
  selectedEra: string;
  onEraChange: (era: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

export default function EraSelector({ selectedEra, onEraChange, isOpen, onClose }: EraSelectorProps) {
  const [tempSelection, setTempSelection] = useState(selectedEra);

  if (!isOpen) return null;

  const handleSave = () => {
    onEraChange(tempSelection);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="relative w-full max-w-4xl mx-auto">
        <div className="backdrop-blur-xl bg-gradient-to-br from-white/25 via-white/15 to-white/10 border border-white/30 rounded-3xl p-8 max-h-[80vh] overflow-y-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">Choose Your Era</h2>
            <p className="text-white/80">This will customize your profile colors and experience</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {eras.map((era) => (
              <button
                key={era.id}
                onClick={() => setTempSelection(era.id)}
                className={`relative p-6 rounded-2xl border-2 transition-all duration-300 hover:scale-105 ${
                  tempSelection === era.id
                    ? 'border-white shadow-2xl'
                    : 'border-white/30 hover:border-white/50'
                }`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${era.gradient} opacity-80 rounded-2xl`} />
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-bold text-white">
                      {era.name}
                    </h3>
                    {tempSelection === era.id && (
                      <Check className="w-6 h-6 text-white" />
                    )}
                  </div>
                  <p className="text-white/90 text-sm leading-relaxed">
                    {era.description}
                  </p>
                </div>
              </button>
            ))}
          </div>

          <div className="flex justify-center space-x-4">
            <button
              onClick={onClose}
              className="px-6 py-3 bg-white/10 border border-white/30 rounded-xl text-white hover:bg-white/20 transition-all duration-300"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-8 py-3 bg-white text-gray-900 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300"
            >
              Save Era
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
