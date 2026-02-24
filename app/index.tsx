import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { Colors } from '@/constants/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DEV_MODE_KEY } from '@/context/AuthContext';

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    skipToApp();
  }, []);

  const skipToApp = async () => {
    try {
      // Enable dev mode for UI preview
      await AsyncStorage.setItem(DEV_MODE_KEY, 'true');
      await AsyncStorage.setItem('@free/onboarding_complete', 'true');

      // Go straight to the main app
      router.replace('/(tabs)');
    } catch (error) {
      console.error('Navigation error:', error);
      router.replace('/(tabs)');
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
