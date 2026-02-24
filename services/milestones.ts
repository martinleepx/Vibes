import { supabase } from './supabase';
import type { Milestone } from '@/types';
import { MILESTONE_BADGES } from '@/constants/Verses';

function rowToMilestone(row: any): Milestone {
  return {
    id: row.id,
    userId: row.user_id,
    days: row.days,
    achievedAt: row.achieved_at,
  };
}

export async function getMilestones(userId: string): Promise<Milestone[]> {
  try {
    const { data, error } = await supabase
      .from('milestones')
      .select('*')
      .eq('user_id', userId)
      .order('days', { ascending: true });

    if (error) throw error;
    return (data || []).map(rowToMilestone);
  } catch (err) {
    console.error('getMilestones error:', err);
    return [];
  }
}

export async function checkAndAwardMilestone(
  userId: string,
  currentStreak: number
): Promise<Milestone | null> {
  try {
    const badgeDays = MILESTONE_BADGES.map(b => b.days);
    if (!badgeDays.includes(currentStreak)) return null;

    // Check if already awarded
    const { data: existing } = await supabase
      .from('milestones')
      .select('id')
      .eq('user_id', userId)
      .eq('days', currentStreak)
      .single();

    if (existing) return null;

    const { data, error } = await supabase
      .from('milestones')
      .insert({ user_id: userId, days: currentStreak })
      .select()
      .single();

    if (error) throw error;
    return rowToMilestone(data);
  } catch (err) {
    console.error('checkAndAwardMilestone error:', err);
    return null;
  }
}
