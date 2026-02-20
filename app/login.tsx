import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SocialButton } from '@/components/SocialButton';
import { Colors, Spacing, BorderRadius, Typography } from '@/constants/Colors';
import { signInWithGoogle, signInWithApple } from '@/services/auth';

export default function LoginScreen() {
  const router = useRouter();
  const [googleLoading, setGoogleLoading] = useState(false);
  const [appleLoading, setAppleLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    try {
      setGoogleLoading(true);
      const result = await signInWithGoogle();

      if (result.success) {
        // Navigate to onboarding or home
        router.replace('/onboarding');
      } else {
        Alert.alert(
          'Sign In Failed',
          result.error || 'Unable to sign in with Google. Please try again.'
        );
      }
    } catch (error) {
      Alert.alert(
        'Sign In Failed',
        'An unexpected error occurred. Please try again.'
      );
    } finally {
      setGoogleLoading(false);
    }
  };

  const handleAppleSignIn = async () => {
    try {
      setAppleLoading(true);
      const result = await signInWithApple();

      if (result.success) {
        // Navigate to onboarding or home
        router.replace('/onboarding');
      } else {
        if (result.error !== 'Sign in was canceled') {
          Alert.alert(
            'Sign In Failed',
            result.error || 'Unable to sign in with Apple. Please try again.'
          );
        }
      }
    } catch (error) {
      Alert.alert(
        'Sign In Failed',
        'An unexpected error occurred. Please try again.'
      );
    } finally {
      setAppleLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Header Section */}
          <View style={styles.header}>
            <View style={styles.logoContainer}>
              <Text style={styles.logoText}>Free</Text>
            </View>
            <Text style={styles.tagline}>
              Your journey to freedom starts here
            </Text>
            <Text style={styles.description}>
              A safe, supportive space to break free from habits and grow in
              faith.
            </Text>
          </View>

          {/* Sign In Section */}
          <View style={styles.signInSection}>
            {Platform.OS === 'ios' && (
              <SocialButton
                provider="apple"
                onPress={handleAppleSignIn}
                loading={appleLoading}
                disabled={googleLoading}
              />
            )}

            <SocialButton
              provider="google"
              onPress={handleGoogleSignIn}
              loading={googleLoading}
              disabled={appleLoading}
            />
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.privacyText}>
              By continuing, you agree to our Terms of Service and Privacy
              Policy.
            </Text>
            <Text style={styles.footerNote}>
              Your data is private and secure. We're here to support you.
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.xxl,
    paddingBottom: Spacing.xl,
  },
  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.xxl,
  },
  logoContainer: {
    width: 120,
    height: 120,
    borderRadius: BorderRadius.xl,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.lg,
    // Subtle shadow
    shadowColor: Colors.primary,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  logoText: {
    ...Typography.h1,
    fontSize: 36,
    color: Colors.white,
    fontWeight: '700',
  },
  tagline: {
    ...Typography.h2,
    fontSize: 22,
    color: Colors.text,
    textAlign: 'center',
    marginBottom: Spacing.sm,
  },
  description: {
    ...Typography.body,
    color: Colors.textSecondary,
    textAlign: 'center',
    paddingHorizontal: Spacing.md,
    lineHeight: 24,
  },
  signInSection: {
    gap: Spacing.md,
    marginBottom: Spacing.xl,
  },
  footer: {
    alignItems: 'center',
    gap: Spacing.sm,
  },
  privacyText: {
    ...Typography.caption,
    color: Colors.textTertiary,
    textAlign: 'center',
    paddingHorizontal: Spacing.md,
  },
  footerNote: {
    ...Typography.caption,
    color: Colors.secondary,
    textAlign: 'center',
    fontWeight: '500',
    paddingHorizontal: Spacing.md,
  },
});
