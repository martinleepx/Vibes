/**
 * Mock milestones service for prototype
 * All functions disabled - StreakContext handles milestones in dev mode
 */
import type { Milestone } from '@/types';

export async function getMilestones(userId: string): Promise<Milestone[]> {
  console.log('Mock: getMilestones (disabled in prototype)');
  return [];
}

export async function checkAndAwardMilestone(
  userId: string,
  currentStreak: number
): Promise<Milestone | null> {
  console.log('Mock: checkAndAwardMilestone (disabled in prototype)');
  return null;
}
