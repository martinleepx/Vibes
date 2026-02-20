import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { supabase } from '@/services/supabase';
import { Colors } from '@/constants/Colors';

/**
 * Root index - handles initial navigation based on auth state
 */
export default function Index() {
  const router = useRouter();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session) {
        // User is logged in, check if onboarding is complete
        // For now, go to onboarding (we'll add home screen next)
        router.replace('/onboarding');
      } else {
        // No session, go to login
        router.replace('/login');
      }
    } catch (error) {
      console.error('Auth check error:', error);
      router.replace('/login');
    }
  };

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={Colors.primary} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background,
  },
});
