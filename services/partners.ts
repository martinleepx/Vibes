import { supabase } from './supabase';
import type { AccountabilityPartner } from '@/types';

function generateCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  return Array.from({ length: 6 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
}

function rowToPartner(row: any): AccountabilityPartner {
  return {
    id: row.id,
    userId: row.user_id,
    partnerId: row.partner_id,
    connectionCode: row.connection_code,
    status: row.status,
    partnerProfile: row.partner_profile
      ? {
          id: row.partner_profile.id,
          displayName: row.partner_profile.display_name,
          avatarUrl: row.partner_profile.avatar_url,
        }
      : undefined,
    createdAt: row.created_at,
  };
}

export async function getOrCreateMyCode(userId: string): Promise<AccountabilityPartner | null> {
  try {
    const { data, error } = await supabase
      .from('accountability_partners')
      .select('*')
      .eq('user_id', userId)
      .eq('status', 'pending')
      .is('partner_id', null)
      .single();

    if (error && error.code === 'PGRST116') {
      const code = generateCode();
      const { data: newRow, error: insertError } = await supabase
        .from('accountability_partners')
        .insert({ user_id: userId, connection_code: code })
        .select()
        .single();

      if (insertError) throw insertError;
      return rowToPartner(newRow);
    }

    if (error) throw error;
    return rowToPartner(data);
  } catch (err) {
    console.error('getOrCreateMyCode error:', err);
    return null;
  }
}

export async function joinWithCode(
  userId: string,
  code: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const { data, error } = await supabase
      .from('accountability_partners')
      .select('*')
      .eq('connection_code', code.toUpperCase())
      .eq('status', 'pending')
      .is('partner_id', null)
      .single();

    if (error || !data) {
      return { success: false, error: 'Code not found. Check the code and try again.' };
    }

    if (data.user_id === userId) {
      return { success: false, error: "That's your own code! Share it with someone else." };
    }

    const { error: updateError } = await supabase
      .from('accountability_partners')
      .update({ partner_id: userId, status: 'accepted' })
      .eq('id', data.id);

    if (updateError) throw updateError;
    return { success: true };
  } catch (err) {
    console.error('joinWithCode error:', err);
    return { success: false, error: 'Something went wrong. Please try again.' };
  }
}

export async function getPartners(userId: string): Promise<AccountabilityPartner[]> {
  try {
    const { data, error } = await supabase
      .from('accountability_partners')
      .select(`
        *,
        partner_profile:profiles!accountability_partners_partner_id_fkey(id, display_name, avatar_url)
      `)
      .eq('user_id', userId)
      .eq('status', 'accepted');

    if (error) throw error;
    return (data || []).map(rowToPartner);
  } catch (err) {
    console.error('getPartners error:', err);
    return [];
  }
}
