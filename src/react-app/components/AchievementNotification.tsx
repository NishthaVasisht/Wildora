import { useEffect, useState } from 'react';
import { Trophy, Star, X } from 'lucide-react';

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: 'trophy' | 'star';
  color: string;
}

interface AchievementNotificationProps {
  achievement: Achievement | null;
  onClose: () => void;
}

export default function AchievementNotification({ achievement, onClose }: AchievementNotificationProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (achievement) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(onClose, 300);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [achievement, onClose]);

  if (!achievement) return null;

  const IconComponent = achievement.icon === 'trophy' ? Trophy : Star;

  return (
    <div className={`fixed top-20 right-4 z-[9999] transition-all duration-300 ${
      isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
    }`}>
      <div className="backdrop-blur-xl bg-gradient-to-r from-purple-500/90 to-pink-500/90 border border-white/30 rounded-2xl p-6 shadow-2xl min-w-[300px]">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-xl bg-${achievement.color}-500/30`}>
              <IconComponent className={`w-6 h-6 text-${achievement.color}-300`} />
            </div>
            <div>
              <h3 className="text-white font-bold text-lg">Achievement Unlocked!</h3>
            </div>
          </div>
          <button
            onClick={() => {
              setIsVisible(false);
              setTimeout(onClose, 300);
            }}
            className="text-white/60 hover:text-white transition-colors"
          >
            <X size={18} />
          </button>
        </div>
        
        <div className="mb-2">
          <h4 className="text-white font-semibold">{achievement.name}</h4>
          <p className="text-white/80 text-sm">{achievement.description}</p>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="w-full bg-white/20 rounded-full h-1">
            <div className="h-1 bg-white rounded-full w-full transition-all duration-1000" />
          </div>
          <span className="text-white/80 text-xs">+10 SwiftCoins</span>
        </div>
      </div>
    </div>
  );
}
