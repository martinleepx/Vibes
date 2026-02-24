import { supabase } from './supabase';
import type { JournalEntry } from '@/types';

function rowToEntry(row: any): JournalEntry {
  return {
    id: row.id,
    userId: row.user_id,
    prompt: row.prompt,
    content: row.content,
    streakDay: row.streak_day,
    createdAt: row.created_at,
  };
}

export async function getJournalEntries(userId: string): Promise<JournalEntry[]> {
  try {
    const { data, error } = await supabase
      .from('journal_entries')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return (data || []).map(rowToEntry);
  } catch (err) {
    console.error('getJournalEntries error:', err);
    return [];
  }
}

export async function createJournalEntry(
  userId: string,
  prompt: string,
  content: string,
  streakDay: number
): Promise<JournalEntry | null> {
  try {
    const { data, error } = await supabase
      .from('journal_entries')
      .insert({ user_id: userId, prompt, content, streak_day: streakDay })
      .select()
      .single();

    if (error) throw error;
    return rowToEntry(data);
  } catch (err) {
    console.error('createJournalEntry error:', err);
    return null;
  }
}

export async function deleteJournalEntry(id: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('journal_entries')
      .delete()
      .eq('id', id);
    if (error) throw error;
    return true;
  } catch (err) {
    console.error('deleteJournalEntry error:', err);
    return false;
  }
}
