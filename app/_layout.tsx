import { Stack } from 'expo-router';
import { AuthProvider } from '@/context/AuthContext';
import { StreakProvider } from '@/context/StreakContext';
import { Colors } from '@/constants/Colors';

export default function RootLayout() {
  return (
    <AuthProvider>
      <StreakProvider>
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: Colors.background },
          }}
        >
          <Stack.Screen name="index" />
          <Stack.Screen name="(tabs)" />
          <Stack.Screen
            name="crisis"
            options={{
              presentation: 'modal',
              animation: 'slide_from_bottom',
            }}
          />
        </Stack>
      </StreakProvider>
    </AuthProvider>
  );
}
