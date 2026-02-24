/**
 * Mock journal service for prototype
 * All functions return empty/mock data for UI preview
 */
import type { JournalEntry } from '@/types';

export async function getJournalEntries(userId: string): Promise<JournalEntry[]> {
  console.log('Mock: getJournalEntries (disabled in prototype)');
  return [];
}

export async function createJournalEntry(
  userId: string,
  prompt: string,
  content: string,
  streakDay: number
): Promise<JournalEntry | null> {
  console.log('Mock: createJournalEntry (disabled in prototype)');
  // Return mock entry so the UI works
  return {
    id: `mock-${Date.now()}`,
    userId,
    prompt,
    content,
    streakDay,
    createdAt: new Date().toISOString(),
  };
}

export async function deleteJournalEntry(id: string): Promise<boolean> {
  console.log('Mock: deleteJournalEntry (disabled in prototype)');
  return true;
}
