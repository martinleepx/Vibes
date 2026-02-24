import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import type { Streak, Milestone } from '@/types';
import {
  getOrCreateStreak,
  confirmDay,
  recordRelapse,
  restoreStreak,
  hasConfirmedToday,
  isStreakCold,
  getRestoresRemaining,
} from '@/services/streaks';
import { checkAndAwardMilestone } from '@/services/milestones';
import { useAuth } from './AuthContext';

interface StreakContextValue {
  streak: Streak | null;
  loading: boolean;
  confirmedToday: boolean;
  streakCold: boolean;
  restoresRemaining: number;
  newMilestone: Milestone | null;
  dismissMilestone: () => void;
  handleConfirmDay: () => Promise<void>;
  handleRelapse: () => Promise<void>;
  handleRestoreStreak: () => Promise<boolean>;
  refreshStreak: () => Promise<void>;
}

const StreakContext = createContext<StreakContextValue>({
  streak: null,
  loading: true,
  confirmedToday: false,
  streakCold: false,
  restoresRemaining: 3,
  newMilestone: null,
  dismissMilestone: () => {},
  handleConfirmDay: async () => {},
  handleRelapse: async () => {},
  handleRestoreStreak: async () => false,
  refreshStreak: async () => {},
});

export function StreakProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [streak, setStreak] = useState<Streak | null>(null);
  const [loading, setLoading] = useState(true);
  const [newMilestone, setNewMilestone] = useState<Milestone | null>(null);

  const refreshStreak = useCallback(async () => {
    if (!user) return;
    const s = await getOrCreateStreak(user.id);
    setStreak(s);
  }, [user]);

  useEffect(() => {
    if (user) {
      refreshStreak().finally(() => setLoading(false));
    } else {
      setStreak(null);
      setLoading(false);
    }
  }, [user, refreshStreak]);

  const handleConfirmDay = async () => {
    if (!user || !streak) return;
    const updated = await confirmDay(user.id, streak);
    if (updated) {
      setStreak(updated);
      // Check for milestone
      const milestone = await checkAndAwardMilestone(user.id, updated.currentStreak);
      if (milestone) setNewMilestone(milestone);
    }
  };

  const handleRelapse = async () => {
    if (!user || !streak) return;
    const updated = await recordRelapse(user.id, streak);
    if (updated) setStreak(updated);
  };

  const handleRestoreStreak = async (): Promise<boolean> => {
    if (!user || !streak) return false;
    const updated = await restoreStreak(user.id, streak);
    if (updated) {
      setStreak(updated);
      return true;
    }
    return false;
  };

  return (
    <StreakContext.Provider
      value={{
        streak,
        loading,
        confirmedToday: hasConfirmedToday(streak),
        streakCold: isStreakCold(streak),
        restoresRemaining: getRestoresRemaining(streak),
        newMilestone,
        dismissMilestone: () => setNewMilestone(null),
        handleConfirmDay,
        handleRelapse,
        handleRestoreStreak,
        refreshStreak,
      }}
    >
      {children}
    </StreakContext.Provider>
  );
}

export const useStreak = () => useContext(StreakContext);
