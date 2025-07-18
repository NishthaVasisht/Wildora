import { Link, useLocation } from 'react-router';
import { Music, Heart, Search, HelpCircle, Users, LogIn, LogOut, User, Coins } from 'lucide-react';
import { useAuth } from '@getmocha/users-service/react';
import { useState } from 'react';
import LoginModal from './LoginModal';
import EraSelector from './EraSelector';
import EraSwitcher from './EraSwitcher';
// import FanTheoryRoom from '../pages/FanTheoryRoom';
import { useUserProfile } from '@/react-app/hooks/useUserProfile';

export default function Navbar() {
  const location = useLocation();
  const { user, logout } = useAuth();
  const { profile, updateProfile } = useUserProfile();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isEraSelectorOpen, setIsEraSelectorOpen] = useState(false);

  const navItems = [
    { path: '/eras', label: 'Eras', icon: Music },
    { path: '/lyrics', label: 'Lyrics', icon: Search },
    { path: '/quiz', label: 'Quiz', icon: HelpCircle },
    { path: '/social', label: 'Social', icon: Users },
    { path: '/theory', label: 'Theory', icon: Heart },
  ];

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const handleEraChange = async (era: string) => {
    try {
      await updateProfile({ favorite_era: era });
    } catch (error) {
      console.error('Failed to update era:', error);
    }
  };

  // const getEraColors = (era: string) => {
  //   const eraColors = {
  //     'fearless': 'from-yellow-400 to-amber-500',
  //     'red': 'from-red-500 to-red-700',
  //     '1989': 'from-sky-400 to-blue-600',
  //     'reputation': 'from-gray-800 to-black',
  //     'lover': 'from-pink-300 to-purple-400',
  //     'folklore': 'from-gray-400 to-gray-600',
  //     'evermore': 'from-amber-600 to-orange-800',
  //     'midnights': 'from-indigo-900 to-purple-900',
  //     'tortured-poets': 'from-stone-600 to-slate-800'
  //   };
  //   return eraColors[era as keyof typeof eraColors] || 'from-purple-900 to-pink-800';
  // };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/10 border-b border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-2xl font-bold text-white tracking-tight">
            Wildora
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {navItems.map(({ path, label, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 ${location.pathname === path
                    ? 'bg-white/20 text-white'
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                  }`}
              >
                <Icon size={18} />
                <span>{label}</span>
              </Link>
            ))}

            {/* Auth Section */}
            <div className="flex items-center space-x-4">
              {user && profile ? (
                <div className="flex items-center space-x-3">
                  {/* SwiftCoins */}
                  <div className="flex items-center space-x-2 px-3 py-1 bg-white/10 rounded-full border border-white/20">
                    <Coins size={16} className="text-yellow-400" />
                    <span className="text-white font-semibold text-sm">{profile.swift_coins}</span>
                  </div>

                  {/* Era Switcher */}
                  <EraSwitcher />

                  {/* User Info */}
                  <div className="flex items-center space-x-2">
                    {user.google_user_data.picture ? (
                      <img
                        src={user.google_user_data.picture}
                        alt={user.google_user_data.name || 'User'}
                        className="w-8 h-8 rounded-full border-2 border-white/30"
                      />
                    ) : (
                      <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center border-2 border-white/30">
                        <User size={16} className="text-white" />
                      </div>
                    )}
                    <span className="text-white/80 text-sm">
                      {user.google_user_data.given_name || 'User'}
                    </span>
                  </div>

                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 px-3 py-2 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-all duration-300 cursor-pointer"
                  >
                    <LogOut size={16} />
                    <span>Logout</span>
                  </button>
                </div>
              ) : user ? (
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2">
                    {user.google_user_data.picture ? (
                      <img
                        src={user.google_user_data.picture}
                        alt={user.google_user_data.name || 'User'}
                        className="w-8 h-8 rounded-full"
                      />
                    ) : (
                      <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                        <User size={16} className="text-white" />
                      </div>
                    )}
                    <span className="text-white/80 text-sm">
                      {user.google_user_data.given_name || 'User'}
                    </span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 px-4 py-2 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-all duration-300"
                  >
                    <LogOut size={16} />
                    <span>Logout</span>
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsLoginModalOpen(true)}
                  className="flex items-center space-x-2 px-4 py-2 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-all duration-300"
                >
                  <LogIn size={16} />
                  <span>Login</span>
                </button>
              )}
            </div>
          </div>

          {/* Mobile menu */}
          <div className="md:hidden flex items-center space-x-4">
            {navItems.map(({ path, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                className={`p-2 rounded-full transition-all duration-300 ${location.pathname === path
                    ? 'bg-white/20 text-white'
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                  }`}
              >
                <Icon size={20} />
              </Link>
            ))}

            {/* Mobile Auth */}
            {user ? (
              <div className="flex items-center space-x-2">
                {user.google_user_data.picture ? (
                  <img
                    src={user.google_user_data.picture}
                    alt={user.google_user_data.name || 'User'}
                    className="w-8 h-8 rounded-full"
                  />
                ) : (
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                    <User size={16} className="text-white" />
                  </div>
                )}
                <button
                  onClick={handleLogout}
                  className="p-2 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-all duration-300"
                >
                  <LogOut size={16} />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsLoginModalOpen(true)}
                className="p-2 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-all duration-300"
              >
                <LogIn size={16} />
              </button>
            )}
          </div>
        </div>
      </div>

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />

      <EraSelector
        selectedEra={profile?.favorite_era || 'midnights'}
        onEraChange={handleEraChange}
        isOpen={isEraSelectorOpen}
        onClose={() => setIsEraSelectorOpen(false)}
      />
    </nav>
  );
}
