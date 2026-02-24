/**
 * Mock partners service for prototype
 * All functions return mock data for UI preview
 */
import type { AccountabilityPartner } from '@/types';

function generateCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  return Array.from({ length: 6 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
}

export async function getOrCreateMyCode(userId: string): Promise<AccountabilityPartner | null> {
  console.log('Mock: getOrCreateMyCode (disabled in prototype)');
  return {
    id: 'mock-partner-code',
    userId,
    partnerId: null,
    connectionCode: generateCode(),
    status: 'pending',
    createdAt: new Date().toISOString(),
  };
}

export async function joinWithCode(
  userId: string,
  code: string
): Promise<{ success: boolean; error?: string }> {
  console.log('Mock: joinWithCode (disabled in prototype)');
  return { success: false, error: 'Partner connections are disabled in prototype mode.' };
}

export async function getPartners(userId: string): Promise<AccountabilityPartner[]> {
  console.log('Mock: getPartners (disabled in prototype)');
  return [];
}
