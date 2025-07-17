import { useState, useEffect } from 'react';
import { useAuth } from '@getmocha/users-service/react';

interface UserProfile {
  id: number;
  user_id: string;
  favorite_era: string;
  swift_coins: number;
  achievement_badges: string[];
  created_at: string;
  updated_at: string;
}

export function useUserProfile() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      setProfile(null);
      setLoading(false);
      return;
    }

    fetchProfile();
  }, [user]);

  const fetchProfile = async () => {
    if (!user) return;

    try {
      setLoading(true);
      const response = await fetch('/api/user/profile');
      
      if (response.ok) {
        const data = await response.json();
        setProfile(data);
      } else if (response.status === 404) {
        // Create default profile
        await createProfile();
      } else {
        throw new Error('Failed to fetch profile');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  const createProfile = async () => {
    if (!user) return;

    try {
      const response = await fetch('/api/user/profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          favorite_era: 'midnights',
          swift_coins: 0,
          achievement_badges: []
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setProfile(data);
      } else {
        throw new Error('Failed to create profile');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    }
  };

  const updateProfile = async (updates: Partial<Pick<UserProfile, 'favorite_era' | 'swift_coins' | 'achievement_badges'>>) => {
    if (!user || !profile) return;

    try {
      const response = await fetch('/api/user/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
      });

      if (response.ok) {
        const data = await response.json();
        setProfile(data);
        return data;
      } else {
        throw new Error('Failed to update profile');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      throw err;
    }
  };

  const addSwiftCoins = async (amount: number) => {
    if (!profile) return;
    
    return updateProfile({ 
      swift_coins: profile.swift_coins + amount 
    });
  };

  const addAchievement = async (badge: string) => {
    if (!profile) return;
    
    const currentBadges = profile.achievement_badges || [];
    if (!currentBadges.includes(badge)) {
      return updateProfile({ 
        achievement_badges: [...currentBadges, badge] 
      });
    }
  };

  return {
    profile,
    loading,
    error,
    updateProfile,
    addSwiftCoins,
    addAchievement,
    refetch: fetchProfile
  };
}
