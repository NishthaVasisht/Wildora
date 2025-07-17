import { useState, useEffect } from 'react';
import { Star, Gift, Sparkles, X } from 'lucide-react';
import { useUserProfile } from '@/react-app/hooks/useUserProfile';

interface EasterEgg {
  id: string;
  type: 'number' | 'symbol' | 'color' | 'word';
  content: string;
  hint: string;
  reward: {
    coins: number;
    badge?: string;
    description: string;
  };
  found: boolean;
}

const easterEggs: EasterEgg[] = [
  {
    id: '13',
    type: 'number',
    content: '13',
    hint: "Taylor's lucky number is hidden somewhere...",
    reward: {
      coins: 13,
      badge: 'lucky_13',
      description: 'Found the lucky number 13!'
    },
    found: false
  },
  {
    id: 'snake',
    type: 'symbol',
    content: '🐍',
    hint: 'A certain reptile from the Reputation era lurks nearby...',
    reward: {
      coins: 20,
      badge: 'snake_finder',
      description: 'Spotted the reputation snake!'
    },
    found: false
  },
  {
    id: 'purple',
    type: 'color',
    content: 'lavender',
    hint: 'A dreamy purple hue from Midnights is calling...',
    reward: {
      coins: 15,
      badge: 'lavender_haze',
      description: 'Found the lavender haze!'
    },
    found: false
  },
  {
    id: 'red_scarf',
    type: 'word',
    content: 'scarf',
    hint: 'A red accessory from a famous breakup song...',
    reward: {
      coins: 25,
      badge: 'all_too_well',
      description: 'Found the legendary red scarf!'
    },
    found: false
  }
];

export default function EasterEggHunt() {
  const [eggs, setEggs] = useState(easterEggs);
  const [foundEgg, setFoundEgg] = useState<EasterEgg | null>(null);
  const [huntActive, setHuntActive] = useState(false);
  const [showHints, setShowHints] = useState(false);
  const { addSwiftCoins, addAchievement } = useUserProfile();

  useEffect(() => {
    // Randomly activate egg hunt
    const shouldActivate = Math.random() < 0.3; // 30% chance
    if (shouldActivate) {
      setHuntActive(true);
      setTimeout(() => {
        setShowHints(true);
      }, 2000);
    }
  }, []);

  const handleEggFound = async (eggId: string) => {
    const egg = eggs.find(e => e.id === eggId);
    if (!egg || egg.found) return;

    // Mark egg as found
    setEggs(prev => prev.map(e => 
      e.id === eggId ? { ...e, found: true } : e
    ));

    // Show found notification
    setFoundEgg(egg);

    // Award rewards
    try {
      await addSwiftCoins(egg.reward.coins);
      if (egg.reward.badge) {
        await addAchievement(egg.reward.badge);
      }
    } catch (error) {
      console.error('Failed to award easter egg rewards:', error);
    }

    // Hide after 3 seconds
    setTimeout(() => {
      setFoundEgg(null);
    }, 3000);
  };

  const renderHiddenEggs = () => {
    if (!huntActive) return null;

    return eggs.map(egg => {
      if (egg.found) return null;

      // Randomly position eggs
      const positions = [
        { top: '20%', left: '10%' },
        { top: '60%', right: '15%' },
        { bottom: '30%', left: '20%' },
        { top: '40%', right: '25%' },
      ];
      
      const position = positions[eggs.indexOf(egg) % positions.length];

      return (
        <div
          key={egg.id}
          className="fixed z-40 cursor-pointer animate-pulse"
          style={position}
          onClick={() => handleEggFound(egg.id)}
        >
          {egg.type === 'number' && (
            <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg hover:scale-110 transition-transform">
              {egg.content}
            </div>
          )}
          {egg.type === 'symbol' && (
            <div className="text-2xl hover:scale-110 transition-transform filter drop-shadow-lg">
              {egg.content}
            </div>
          )}
          {egg.type === 'color' && (
            <div className="w-6 h-6 bg-purple-400 rounded-full shadow-lg hover:scale-110 transition-transform border-2 border-white/50" />
          )}
          {egg.type === 'word' && (
            <div className="bg-red-500 text-white text-xs px-2 py-1 rounded-full shadow-lg hover:scale-110 transition-transform">
              {egg.content}
            </div>
          )}
        </div>
      );
    });
  };

  if (!huntActive) return null;

  return (
    <>
      {/* Hidden Easter Eggs */}
      {renderHiddenEggs()}

      {/* Hunt Notification */}
      {showHints && (
        <div className="fixed top-24 right-4 z-50 backdrop-blur-xl bg-gradient-to-r from-purple-500/90 to-pink-500/90 border border-white/30 rounded-2xl p-4 max-w-sm">
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-yellow-300" />
              <h3 className="text-white font-bold">Easter Egg Hunt!</h3>
            </div>
            <button
              onClick={() => setShowHints(false)}
              className="text-white/60 hover:text-white"
            >
              <X size={16} />
            </button>
          </div>
          <p className="text-white/90 text-sm mb-3">
            Hidden treasures are scattered around! Look for:
          </p>
          <div className="space-y-1">
            {eggs.filter(egg => !egg.found).map(egg => (
              <div key={egg.id} className="text-white/80 text-xs">
                • {egg.hint}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Found Egg Notification */}
      {foundEgg && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[9999]">
          <div className="backdrop-blur-xl bg-gradient-to-r from-yellow-500/90 to-orange-500/90 border border-white/30 rounded-3xl p-8 text-center max-w-sm animate-bounce">
            <div className="mb-4">
              <Gift className="w-12 h-12 text-white mx-auto mb-2" />
              <h2 className="text-2xl font-bold text-white">Easter Egg Found!</h2>
            </div>
            <div className="mb-4">
              <p className="text-white font-semibold">{foundEgg.reward.description}</p>
              <div className="flex items-center justify-center space-x-4 mt-2">
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-300" />
                  <span className="text-white">+{foundEgg.reward.coins} SwiftCoins</span>
                </div>
                {foundEgg.reward.badge && (
                  <div className="bg-white/20 px-2 py-1 rounded-full">
                    <span className="text-white text-xs">Badge Unlocked!</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
