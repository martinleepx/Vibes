import React, { createContext, useContext, useEffect, useState } from 'react';
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
  loading: boolean;
  isDevMode: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue>({
  user: null,
  loading: true,
  isDevMode: true,
  signOut: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Always use dev mode for prototype
    AsyncStorage.setItem(DEV_MODE_KEY, 'true').then(() => {
      setUser(DEV_USER);
      setLoading(false);
    });
  }, []);

  const handleSignOut = async () => {
    await AsyncStorage.removeItem(DEV_MODE_KEY);
    await AsyncStorage.removeItem('@free/onboarding_complete');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, isDevMode: true, signOut: handleSignOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
