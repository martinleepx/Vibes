import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  Share,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Button } from '@/components/Button';
import { Colors, Spacing, BorderRadius, Typography } from '@/constants/Colors';
import { useAuth } from '@/context/AuthContext';
import { getOrCreateMyCode, joinWithCode } from '@/services/partners';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function PartnerScreen() {
  const router = useRouter();
  const { user } = useAuth();
  const [mode, setMode] = useState<'choose' | 'share' | 'join'>('choose');
  const [myCode, setMyCode] = useState('');
  const [joinCode, setJoinCode] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGetMyCode = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const partner = await getOrCreateMyCode(user.id);
      if (partner) {
        setMyCode(partner.connectionCode);
        setMode('share');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleShareCode = async () => {
    try {
      await Share.share({
        message: `Join me on Free — a faith-based accountability app. Use my code: ${myCode}\n\nDownload Free to get started.`,
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleJoinWithCode = async () => {
    if (!user || joinCode.length < 6) return;
    setLoading(true);
    try {
      const result = await joinWithCode(user.id, joinCode);
      if (result.success) {
        Alert.alert('Connected!', "You're now connected with your accountability partner.", [
          { text: 'Continue', onPress: () => handleFinish() },
        ]);
      } else {
        Alert.alert('Not found', result.error || 'Code not found. Please check and try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleFinish = async () => {
    await AsyncStorage.setItem('@free/onboarding_complete', 'true');
    router.replace('/(tabs)');
  };

  const handleSkip = async () => {
    await AsyncStorage.setItem('@free/onboarding_complete', 'true');
    router.replace('/(tabs)');
  };

  if (mode === 'share') {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.content}>
          <View style={styles.header}>
            <Text style={styles.stepLabel}>Step 3 of 3</Text>
            <Text style={styles.icon}>🤝</Text>
            <Text style={styles.title}>Your connection code</Text>
            <Text style={styles.subtitle}>
              Share this code with your accountability partner. They'll enter it in the app to
              connect with you.
            </Text>
          </View>
          <View style={styles.codeDisplay}>
            <Text style={styles.codeText}>{myCode}</Text>
          </View>
          <View style={styles.footer}>
            <Button title="Share code" onPress={handleShareCode} variant="primary" />
            <Button title="Done, continue →" onPress={handleFinish} variant="outline" />
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  if (mode === 'join') {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.content}>
          <View style={styles.header}>
            <Text style={styles.stepLabel}>Step 3 of 3</Text>
            <Text style={styles.icon}>🔑</Text>
            <Text style={styles.title}>Enter partner's code</Text>
            <Text style={styles.subtitle}>
              Ask your partner for their 6-character code from the app, then enter it below.
            </Text>
          </View>
          <TextInput
            style={styles.codeInput}
            value={joinCode}
            onChangeText={t => setJoinCode(t.toUpperCase())}
            placeholder="ABC123"
            placeholderTextColor={Colors.textTertiary}
            maxLength={6}
            autoCapitalize="characters"
            autoCorrect={false}
          />
          <View style={styles.footer}>
            <Button
              title="Connect"
              onPress={handleJoinWithCode}
              loading={loading}
              disabled={joinCode.length < 6}
            />
            <TouchableOpacity onPress={() => setMode('choose')} style={styles.backBtn}>
              <Text style={styles.skipText}>← Back</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={styles.stepLabel}>Step 3 of 3</Text>
          <Text style={styles.icon}>🤝</Text>
          <Text style={styles.title}>Add an accountability partner</Text>
          <Text style={styles.subtitle}>
            Someone who can walk this road with you. They'll see your streak status and can
            send encouragement. This step is completely optional.
          </Text>
        </View>

        <View style={styles.optionsList}>
          <TouchableOpacity
            style={styles.optionCard}
            onPress={handleGetMyCode}
            activeOpacity={0.7}
          >
            <Text style={styles.optionIcon}>📤</Text>
            <View style={styles.optionText}>
              <Text style={styles.optionTitle}>Invite someone</Text>
              <Text style={styles.optionDescription}>
                Get a code to share with a friend or mentor
              </Text>
            </View>
            <Text style={styles.optionArrow}>→</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.optionCard}
            onPress={() => setMode('join')}
            activeOpacity={0.7}
          >
            <Text style={styles.optionIcon}>📥</Text>
            <View style={styles.optionText}>
              <Text style={styles.optionTitle}>Join with a code</Text>
              <Text style={styles.optionDescription}>
                Someone already shared their code with you
              </Text>
            </View>
            <Text style={styles.optionArrow}>→</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <TouchableOpacity onPress={handleSkip} style={styles.skipBtn}>
            <Text style={styles.skipText}>Skip — I'll add a partner later</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  content: { paddingHorizontal: Spacing.lg, paddingTop: Spacing.xl, paddingBottom: Spacing.xl },
  header: { alignItems: 'center', marginBottom: Spacing.xl, gap: Spacing.sm },
  stepLabel: { ...Typography.caption, color: Colors.textTertiary },
  icon: { fontSize: 48 },
  title: { ...Typography.h2, color: Colors.text, textAlign: 'center' },
  subtitle: { ...Typography.body, color: Colors.textSecondary, textAlign: 'center', lineHeight: 24 },
  optionsList: { gap: Spacing.md, marginBottom: Spacing.xl },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    gap: Spacing.md,
    shadowColor: Colors.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  optionIcon: { fontSize: 28 },
  optionText: { flex: 1 },
  optionTitle: { ...Typography.body, color: Colors.text, fontWeight: '600' },
  optionDescription: { ...Typography.caption, color: Colors.textSecondary, marginTop: 2 },
  optionArrow: { ...Typography.body, color: Colors.primary, fontWeight: '600' },
  codeDisplay: {
    backgroundColor: Colors.primary,
    borderRadius: BorderRadius.lg,
    paddingVertical: Spacing.xl,
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  codeText: {
    fontSize: 42,
    fontWeight: '700',
    color: Colors.white,
    letterSpacing: 8,
  },
  codeInput: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    borderWidth: 2,
    borderColor: Colors.border,
    fontSize: 36,
    fontWeight: '700',
    textAlign: 'center',
    paddingVertical: Spacing.lg,
    color: Colors.text,
    letterSpacing: 8,
    marginBottom: Spacing.xl,
  },
  footer: { gap: Spacing.sm },
  skipBtn: { alignItems: 'center', paddingVertical: Spacing.md },
  backBtn: { alignItems: 'center', paddingVertical: Spacing.sm },
  skipText: { ...Typography.body, color: Colors.textTertiary },
});
