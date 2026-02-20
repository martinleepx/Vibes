import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { Colors, Spacing, Typography } from '@/constants/Colors';
import { Button } from '@/components/Button';
import { useRouter } from 'expo-router';

/**
 * Placeholder onboarding screen
 * Will be built out in next phase
 */
export default function OnboardingScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Welcome to Free!</Text>
        <Text style={styles.description}>
          Let's set up your account and get you started on your journey.
        </Text>

        <Text style={styles.placeholder}>
          📱 Onboarding screens coming next...
        </Text>

        <Button
          title="Continue"
          onPress={() => {
            // TODO: Navigate to home screen after onboarding complete
            alert('Onboarding flow coming next!');
          }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    flex: 1,
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.xxl,
    gap: Spacing.lg,
  },
  title: {
    ...Typography.h1,
    color: Colors.text,
    textAlign: 'center',
  },
  description: {
    ...Typography.body,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  placeholder: {
    ...Typography.bodyLarge,
    color: Colors.textTertiary,
    textAlign: 'center',
    marginVertical: Spacing.xl,
  },
});
