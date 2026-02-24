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
import { MILESTONE_BADGES } from '@/constants/Verses';
import { useAuth } from './AuthContext';

// ─── Dev-mode mock streak (persists only in memory) ──────────────────────────
const makeDevStreak = (): Streak => ({
  id: 'dev-streak',
  userId: 'dev-preview-user',
  currentStreak: 7,
  longestStreak: 14,
  totalSoberDays: 21,
  lastConfirmedAt: null,          // not confirmed today → shows the button
  restoresUsedThisMonth: 1,
  restoreMonth: new Date().getMonth(),
  startDate: new Date(Date.now() - 21 * 86400000).toISOString(),
});
// ─────────────────────────────────────────────────────────────────────────────

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
  const { user, isDevMode } = useAuth();
  const [streak, setStreak] = useState<Streak | null>(null);
  const [loading, setLoading] = useState(true);
  const [newMilestone, setNewMilestone] = useState<Milestone | null>(null);

  const refreshStreak = useCallback(async () => {
    if (!user) return;
    if (isDevMode) {
      setStreak(prev => prev ?? makeDevStreak());
      return;
    }
    const s = await getOrCreateStreak(user.id);
    setStreak(s);
  }, [user, isDevMode]);

  useEffect(() => {
    if (user) {
      if (isDevMode) {
        setStreak(makeDevStreak());
        setLoading(false);
      } else {
        refreshStreak().finally(() => setLoading(false));
      }
    } else {
      setStreak(null);
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, isDevMode]);

  // ── Dev-mode in-memory streak mutations ────────────────────────────────────
  const devConfirmDay = async () => {
    setStreak(prev => {
      if (!prev) return prev;
      const newStreak = prev.currentStreak + 1;
      const badge = MILESTONE_BADGES.find(b => b.days === newStreak);
      if (badge) {
        setNewMilestone({
          id: 'dev-milestone',
          userId: 'dev-preview-user',
          days: newStreak,
          achievedAt: new Date().toISOString(),
        });
      }
      return {
        ...prev,
        currentStreak: newStreak,
        longestStreak: Math.max(newStreak, prev.longestStreak),
        totalSoberDays: prev.totalSoberDays + 1,
        lastConfirmedAt: new Date().toISOString(),
      };
    });
  };

  const devRelapse = async () => {
    setStreak(prev => prev ? { ...prev, currentStreak: 0, lastConfirmedAt: null } : prev);
  };

  const devRestore = async (): Promise<boolean> => {
    if ((streak?.restoresUsedThisMonth ?? 0) >= 3) return false;
    setStreak(prev => prev ? {
      ...prev,
      currentStreak: prev.currentStreak + 1,
      lastConfirmedAt: new Date().toISOString(),
      restoresUsedThisMonth: prev.restoresUsedThisMonth + 1,
    } : prev);
    return true;
  };
  // ──────────────────────────────────────────────────────────────────────────

  const handleConfirmDay = async () => {
    if (isDevMode) return devConfirmDay();
    if (!user || !streak) return;
    const updated = await confirmDay(user.id, streak);
    if (updated) {
      setStreak(updated);
      const milestone = await checkAndAwardMilestone(user.id, updated.currentStreak);
      if (milestone) setNewMilestone(milestone);
    }
  };

  const handleRelapse = async () => {
    if (isDevMode) return devRelapse();
    if (!user || !streak) return;
    const updated = await recordRelapse(user.id, streak);
    if (updated) setStreak(updated);
  };

  const handleRestoreStreak = async (): Promise<boolean> => {
    if (isDevMode) return devRestore();
    if (!user || !streak) return false;
    const updated = await restoreStreak(user.id, streak);
    if (updated) { setStreak(updated); return true; }
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
