import { useState, useEffect } from 'react';
import { Palette, Music, Volume2, VolumeX } from 'lucide-react';
import { useUserProfile } from '@/react-app/hooks/useUserProfile';

interface EraTheme {
  id: string;
  name: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    gradient: string;
  };
  font: string;
  music?: string;
  description: string;
}

const eraThemes: EraTheme[] = [
  {
    id: 'fearless',
    name: 'Fearless',
    colors: {
      primary: '#FFD700',
      secondary: '#FFA500',
      accent: '#FFFF00',
      gradient: 'from-yellow-400 to-amber-500'
    },
    font: 'Dancing Script',
    description: 'Golden curls and country dreams',
  },
  {
    id: 'red',
    name: 'Red',
    colors: {
      primary: '#DC143C',
      secondary: '#8B0000',
      accent: '#FF6347',
      gradient: 'from-red-500 to-red-700'
    },
    font: 'Playfair Display',
    description: 'Passionate autumn romance',
  },
  {
    id: '1989',
    name: '1989',
    colors: {
      primary: '#87CEEB',
      secondary: '#4169E1',
      accent: '#ADD8E6',
      gradient: 'from-sky-400 to-blue-600'
    },
    font: 'Montserrat',
    description: 'Polaroid pop perfection',
  },
  {
    id: 'reputation',
    name: 'Reputation',
    colors: {
      primary: '#2F2F2F',
      secondary: '#000000',
      accent: '#696969',
      gradient: 'from-gray-800 to-black'
    },
    font: 'Bebas Neue',
    description: 'Dark and unapologetic',
  },
  {
    id: 'lover',
    name: 'Lover',
    colors: {
      primary: '#FFB6C1',
      secondary: '#DA70D6',
      accent: '#FFE4E1',
      gradient: 'from-pink-300 to-purple-400'
    },
    font: 'Pacifico',
    description: 'Pastel rainbow dreams',
  },
  {
    id: 'folklore',
    name: 'Folklore',
    colors: {
      primary: '#708090',
      secondary: '#2F4F4F',
      accent: '#D3D3D3',
      gradient: 'from-gray-400 to-gray-600'
    },
    font: 'Crimson Text',
    description: 'Cozy indie storytelling',
  },
  {
    id: 'evermore',
    name: 'Evermore',
    colors: {
      primary: '#A0522D',
      secondary: '#8B4513',
      accent: '#CD853F',
      gradient: 'from-amber-600 to-orange-800'
    },
    font: 'Merriweather',
    description: 'Sister album autumn',
  },
  {
    id: 'midnights',
    name: 'Midnights',
    colors: {
      primary: '#191970',
      secondary: '#4B0082',
      accent: '#663399',
      gradient: 'from-indigo-900 to-purple-900'
    },
    font: 'Space Grotesk',
    description: 'Lavender haze nights',
  },
  {
    id: 'tortured-poets',
    name: 'TTPD',
    colors: {
      primary: '#696969',
      secondary: '#2F2F2F',
      accent: '#A9A9A9',
      gradient: 'from-stone-600 to-slate-800'
    },
    font: 'EB Garamond',
    description: 'Gothic poetry depths',
  }
];

interface EraSwitcherProps {
  onThemeChange?: (theme: EraTheme) => void;
}

export default function EraSwitcher({ onThemeChange }: EraSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentTheme, setCurrentTheme] = useState(eraThemes[7]); // Default to Midnights
  const [musicEnabled, setMusicEnabled] = useState(false);
  const { profile, updateProfile } = useUserProfile();

  useEffect(() => {
    if (profile?.favorite_era) {
      const theme = eraThemes.find(t => t.id === profile.favorite_era) || eraThemes[7];
      setCurrentTheme(theme);
      loadFont(theme.font);
    }
  }, [profile]);

  const loadFont = (fontName: string) => {
    if (!document.querySelector(`link[href*="${fontName.replace(' ', '+')}"]`)) {
      const link = document.createElement('link');
      link.href = `https://fonts.googleapis.com/css2?family=${fontName.replace(' ', '+')}:wght@300;400;600;700&display=swap`;
      link.rel = 'stylesheet';
      document.head.appendChild(link);
    }
  };

  const handleThemeSwitch = async (theme: EraTheme) => {
    setCurrentTheme(theme);
    loadFont(theme.font);
    
    // Apply theme to document
    document.documentElement.style.setProperty('--era-primary', theme.colors.primary);
    document.documentElement.style.setProperty('--era-secondary', theme.colors.secondary);
    document.documentElement.style.setProperty('--era-accent', theme.colors.accent);
    document.documentElement.style.setProperty('--era-font', theme.font);
    
    // Update user profile
    try {
      await updateProfile({ favorite_era: theme.id });
    } catch (error) {
      console.error('Failed to update era:', error);
    }
    
    // Notify parent component
    onThemeChange?.(theme);
    setIsOpen(false);
  };

  const toggleMusic = () => {
    setMusicEnabled(!musicEnabled);
    // Here you would implement actual background music functionality
  };

  return (
    <div className="relative">
      {/* Era Switcher Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center space-x-2 px-4 py-2 bg-gradient-to-r ${currentTheme.colors.gradient} rounded-full text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer`}
      >
        <Palette size={16} />
        <span>{currentTheme.name}</span>
      </button>

      {/* Era Selection Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="relative w-full max-w-4xl mx-auto max-h-[80vh] overflow-y-auto">
            <div className="backdrop-blur-xl bg-gradient-to-br from-white/25 via-white/15 to-white/10 border border-white/30 rounded-3xl p-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-white mb-4">Choose Your Era Experience</h2>
                <p className="text-white/80 mb-4">
                  Each era brings unique colors, fonts, and vibes to customize your experience
                </p>
                
                {/* Music Toggle */}
                <div className="flex items-center justify-center space-x-3">
                  <Music size={18} className="text-white/60" />
                  <span className="text-white/80 text-sm">Background Music</span>
                  <button
                    onClick={toggleMusic}
                    className={`flex items-center space-x-1 px-3 py-1 rounded-full transition-all duration-300 cursor-pointer ${
                      musicEnabled ? 'bg-green-500/30 text-green-300' : 'bg-white/10 text-white/60'
                    }`}
                  >
                    {musicEnabled ? <Volume2 size={14} /> : <VolumeX size={14} />}
                    <span className="text-xs">{musicEnabled ? 'ON' : 'OFF'}</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                {eraThemes.map((theme) => (
                  <button
                    key={theme.id}
                    onClick={() => handleThemeSwitch(theme)}
                    className={`relative p-6 rounded-2xl border-2 transition-all duration-300 hover:scale-105 cursor-pointer ${
                      currentTheme.id === theme.id
                        ? 'border-white shadow-2xl'
                        : 'border-white/30 hover:border-white/50'
                    }`}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${theme.colors.gradient} opacity-80 rounded-2xl`} />
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-xl font-bold text-white" style={{ fontFamily: theme.font }}>
                          {theme.name}
                        </h3>
                        {currentTheme.id === theme.id && (
                          <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                            <div className="w-3 h-3 bg-green-500 rounded-full" />
                          </div>
                        )}
                      </div>
                      <p className="text-white/90 text-sm leading-relaxed mb-4">
                        {theme.description}
                      </p>
                      
                      {/* Color Preview */}
                      <div className="flex space-x-2 mb-3">
                        <div 
                          className="w-4 h-4 rounded-full border border-white/30"
                          style={{ backgroundColor: theme.colors.primary }}
                        />
                        <div 
                          className="w-4 h-4 rounded-full border border-white/30"
                          style={{ backgroundColor: theme.colors.secondary }}
                        />
                        <div 
                          className="w-4 h-4 rounded-full border border-white/30"
                          style={{ backgroundColor: theme.colors.accent }}
                        />
                      </div>
                      
                      {/* Font Preview */}
                      <div className="text-white/80 text-xs" style={{ fontFamily: theme.font }}>
                        Font: {theme.font}
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              <div className="flex justify-center">
                <button
                  onClick={() => setIsOpen(false)}
                  className="px-8 py-3 bg-white/10 border border-white/30 rounded-xl text-white hover:bg-white/20 transition-all duration-300 cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
