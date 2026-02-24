export interface User {
  id: string;
  email?: string;
  displayName?: string;
  avatarUrl?: string;
  createdAt: string;
}

export interface Streak {
  id: string;
  userId: string;
  currentStreak: number;
  longestStreak: number;
  totalSoberDays: number;
  lastConfirmedAt: string | null;
  restoresUsedThisMonth: number;
  restoreMonth: number | null;
  startDate: string;
}

export interface JournalEntry {
  id: string;
  userId: string;
  prompt: string;
  content: string;
  streakDay: number;
  createdAt: string;
}

export interface Milestone {
  id: string;
  userId: string;
  days: number;
  achievedAt: string;
}

export interface AccountabilityPartner {
  id: string;
  userId: string;
  partnerId: string | null;
  connectionCode: string;
  status: 'pending' | 'accepted';
  partnerProfile?: PartnerProfile;
  createdAt: string;
}

export interface PartnerProfile {
  id: string;
  displayName: string;
  avatarUrl?: string;
}

export interface Verse {
  id: string;
  reference: string;
  text: string;
  translation: 'ESV' | 'NIV';
  theme: string;
}

export interface JournalPrompt {
  id: string;
  text: string;
  category: 'trigger' | 'gratitude' | 'growth' | 'reflection';
}

export interface Badge {
  days: number;
  label: string;
  description: string;
  scripture: string;
  scriptureRef: string;
  icon: string;
  color: string;
}

export type AuthProvider = 'google' | 'apple';

export type OnboardingStep = 'welcome' | 'notifications' | 'partner' | 'commit';
