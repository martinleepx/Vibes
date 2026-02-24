/**
 * Mock streaks service for prototype
 * All functions disabled - StreakContext handles dev mode directly
 */
import type { Streak } from '@/types';

export async function getOrCreateStreak(userId: string): Promise<Streak | null> {
  console.log('Mock: getOrCreateStreak (disabled in prototype)');
  return null;
}

export async function confirmDay(userId: string, streak: Streak): Promise<Streak | null> {
  console.log('Mock: confirmDay (disabled in prototype)');
  return null;
}

export async function recordRelapse(userId: string, streak: Streak): Promise<Streak | null> {
  console.log('Mock: recordRelapse (disabled in prototype)');
  return null;
}

export async function restoreStreak(userId: string, streak: Streak): Promise<Streak | null> {
  console.log('Mock: restoreStreak (disabled in prototype)');
  return null;
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
