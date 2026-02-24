import { supabase } from './supabase';
import type { Streak } from '@/types';

function rowToStreak(row: any): Streak {
  return {
    id: row.id,
    userId: row.user_id,
    currentStreak: row.current_streak,
    longestStreak: row.longest_streak,
    totalSoberDays: row.total_sober_days,
    lastConfirmedAt: row.last_confirmed_at,
    restoresUsedThisMonth: row.restores_used_this_month,
    restoreMonth: row.restore_month,
    startDate: row.created_at,
  };
}

export async function getOrCreateStreak(userId: string): Promise<Streak | null> {
  try {
    const { data, error } = await supabase
      .from('streaks')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error && error.code === 'PGRST116') {
      // No streak found, create one
      const { data: newStreak, error: createError } = await supabase
        .from('streaks')
        .insert({ user_id: userId })
        .select()
        .single();
      if (createError) throw createError;
      return rowToStreak(newStreak);
    }

    if (error) throw error;
    return rowToStreak(data);
  } catch (err) {
    console.error('getOrCreateStreak error:', err);
    return null;
  }
}

export async function confirmDay(userId: string, streak: Streak): Promise<Streak | null> {
  try {
    const now = new Date();
    const today = now.toDateString();

    // Already confirmed today
    if (streak.lastConfirmedAt) {
      const lastDate = new Date(streak.lastConfirmedAt).toDateString();
      if (lastDate === today) return streak;
    }

    const newCurrentStreak = streak.currentStreak + 1;
    const newLongest = Math.max(newCurrentStreak, streak.longestStreak);
    const newTotal = streak.totalSoberDays + 1;

    const { data, error } = await supabase
      .from('streaks')
      .update({
        current_streak: newCurrentStreak,
        longest_streak: newLongest,
        total_sober_days: newTotal,
        last_confirmed_at: now.toISOString(),
      })
      .eq('user_id', userId)
      .select()
      .single();

    if (error) throw error;
    return rowToStreak(data);
  } catch (err) {
    console.error('confirmDay error:', err);
    return null;
  }
}

export async function recordRelapse(userId: string, streak: Streak): Promise<Streak | null> {
  try {
    const { data, error } = await supabase
      .from('streaks')
      .update({
        current_streak: 0,
        last_confirmed_at: null,
      })
      .eq('user_id', userId)
      .select()
      .single();

    if (error) throw error;
    return rowToStreak(data);
  } catch (err) {
    console.error('recordRelapse error:', err);
    return null;
  }
}

export async function restoreStreak(userId: string, streak: Streak): Promise<Streak | null> {
  try {
    const now = new Date();
    const currentMonth = now.getMonth();

    // Reset counter if new month
    const isNewMonth = streak.restoreMonth !== currentMonth;
    const restoresUsed = isNewMonth ? 0 : streak.restoresUsedThisMonth;

    if (restoresUsed >= 3) {
      return null; // No restores left
    }

    const { data, error } = await supabase
      .from('streaks')
      .update({
        current_streak: streak.currentStreak + 1,
        last_confirmed_at: now.toISOString(),
        restores_used_this_month: restoresUsed + 1,
        restore_month: currentMonth,
      })
      .eq('user_id', userId)
      .select()
      .single();

    if (error) throw error;
    return rowToStreak(data);
  } catch (err) {
    console.error('restoreStreak error:', err);
    return null;
  }
}

export function hasConfirmedToday(streak: Streak | null): boolean {
  if (!streak?.lastConfirmedAt) return false;
  const today = new Date().toDateString();
  const lastDate = new Date(streak.lastConfirmedAt).toDateString();
  return today === lastDate;
}

export function isStreakCold(streak: Streak | null): boolean {
  if (!streak) return false;
  if (streak.currentStreak === 0) return false;
  if (!streak.lastConfirmedAt) return streak.currentStreak > 0;

  const now = new Date();
  const last = new Date(streak.lastConfirmedAt);
  const diffDays = Math.floor((now.getTime() - last.getTime()) / 86400000);
  return diffDays >= 1 && now.toDateString() !== last.toDateString();
}

export function getRestoresRemaining(streak: Streak | null): number {
  if (!streak) return 3;
  const now = new Date();
  const isNewMonth = streak.restoreMonth !== now.getMonth();
  if (isNewMonth) return 3;
  return Math.max(0, 3 - streak.restoresUsedThisMonth);
}
