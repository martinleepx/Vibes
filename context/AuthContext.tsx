import React, { createContext, useContext, useEffect, useState } from 'react';
import { Session } from '@supabase/supabase-js';
import { supabase } from '@/services/supabase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { User } from '@/types';

export const DEV_MODE_KEY = '@free/dev_mode';

const DEV_USER: User = {
  id: 'dev-preview-user',
  email: 'preview@free.app',
  displayName: 'Preview User',
  avatarUrl: undefined,
  createdAt: new Date().toISOString(),
};

interface AuthContextValue {
  user: User | null;
  session: Session | null;
  loading: boolean;
  isDevMode: boolean;
  signOut: () => Promise<void>;
  enterDevMode: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue>({
  user: null,
  session: null,
  loading: true,
  isDevMode: false,
  signOut: async () => {},
  enterDevMode: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isDevMode, setIsDevMode] = useState(false);

  useEffect(() => {
    // Check dev mode first
    AsyncStorage.getItem(DEV_MODE_KEY).then(val => {
      if (val === 'true') {
        setIsDevMode(true);
        setUser(DEV_USER);
        setLoading(false);
        return;
      }

      // Otherwise check real Supabase session
      supabase.auth.getSession().then(({ data: { session } }) => {
        setSession(session);
        if (session?.user) setUser(mapUser(session.user));
        setLoading(false);
      });

      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session);
        setUser(session?.user ? mapUser(session.user) : null);
        setLoading(false);
      });

      return () => subscription.unsubscribe();
    });
  }, []);

  const handleSignOut = async () => {
    await AsyncStorage.removeItem(DEV_MODE_KEY);
    await AsyncStorage.removeItem('@free/onboarding_complete');
    setIsDevMode(false);
    setUser(null);
    if (!isDevMode) await supabase.auth.signOut();
  };

  const enterDevMode = async () => {
    await AsyncStorage.setItem(DEV_MODE_KEY, 'true');
    setIsDevMode(true);
    setUser(DEV_USER);
  };

  return (
    <AuthContext.Provider value={{ user, session, loading, isDevMode, signOut: handleSignOut, enterDevMode }}>
      {children}
    </AuthContext.Provider>
  );
}

function mapUser(u: any): User {
  return {
    id: u.id,
    email: u.email,
    displayName:
      u.user_metadata?.display_name ||
      u.user_metadata?.full_name ||
      u.email?.split('@')[0] ||
      'Friend',
    avatarUrl: u.user_metadata?.avatar_url,
    createdAt: u.created_at,
  };
}

export const useAuth = () => useContext(AuthContext);
