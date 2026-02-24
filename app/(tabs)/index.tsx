import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Colors, Spacing, BorderRadius, Typography } from '@/constants/Colors';
import { StreakCounter } from '@/components/StreakCounter';
import { VerseCard } from '@/components/VerseCard';
import { Button } from '@/components/Button';
import { MilestoneModal } from '@/components/MilestoneModal';
import { useAuth } from '@/context/AuthContext';
import { useStreak } from '@/context/StreakContext';
import { getDailyVerse, getRandomCrisisVerse } from '@/constants/Verses';

export default function HomeScreen() {
  const router = useRouter();
  const { user } = useAuth();
  const {
    streak,
    loading,
    confirmedToday,
    streakCold,
    restoresRemaining,
    newMilestone,
    dismissMilestone,
    handleConfirmDay,
    handleRelapse,
    handleRestoreStreak,
  } = useStreak();

  const [confirmLoading, setConfirmLoading] = useState(false);
  const [dailyVerse] = useState(getDailyVerse());

  const onConfirmDay = async () => {
    setConfirmLoading(true);
    await handleConfirmDay();
    setConfirmLoading(false);
  };

  const onRelapse = () => {
    Alert.alert(
      'Record a setback',
      'This is a safe space. Recording setbacks honestly is part of healing. Your streak will reset, but your progress and growth remain.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Record setback',
          style: 'destructive',
          onPress: handleRelapse,
        },
      ]
    );
  };

  const onRestoreStreak = async () => {
    if (restoresRemaining <= 0) {
      Alert.alert(
        'No restores left',
        "You've used all 3 streak restores this month. They reset on the 1st of next month.",
        [{ text: 'OK' }]
      );
      return;
    }
    const success = await handleRestoreStreak();
    if (!success) {
      Alert.alert('Could not restore', 'Something went wrong. Please try again.');
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading your journey...</Text>
        </View>
      </SafeAreaView>
    );
  }

  const firstName = user?.displayName?.split(' ')[0] || 'Friend';
  const currentStreak = streak?.currentStreak ?? 0;
  const longestStreak = streak?.longestStreak ?? 0;
  const totalSoberDays = streak?.totalSoberDays ?? 0;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>
              {getGreeting()}, {firstName}
            </Text>
            <Text style={styles.date}>{formatDate()}</Text>
          </View>
          <TouchableOpacity
            style={styles.crisisBtn}
            onPress={() => router.push('/crisis')}
            activeOpacity={0.7}
          >
            <Text style={styles.crisisBtnText}>🛡️</Text>
          </TouchableOpacity>
        </View>

        {/* Streak counter */}
        <View style={styles.streakSection}>
          <StreakCounter
            currentStreak={currentStreak}
            longestStreak={longestStreak}
            totalSoberDays={totalSoberDays}
            isCold={streakCold}
          />
        </View>

        {/* Action area */}
        {!confirmedToday ? (
          <View style={styles.actionSection}>
            {streakCold && currentStreak > 0 && (
              <View style={styles.coldWarning}>
                <Text style={styles.coldWarningText}>
                  ❄️ Your streak is at risk — confirm today to keep it alive
                </Text>
                <TouchableOpacity onPress={onRestoreStreak} activeOpacity={0.7}>
                  <Text style={styles.restoreLink}>
                    Or restore streak ({restoresRemaining}/3 left this month)
                  </Text>
                </TouchableOpacity>
              </View>
            )}
            <Button
              title={`✓  I stayed free today`}
              onPress={onConfirmDay}
              loading={confirmLoading}
              style={styles.confirmBtn}
            />
            <TouchableOpacity onPress={onRelapse} style={styles.relapseBtn} activeOpacity={0.7}>
              <Text style={styles.relapseText}>I need to record a setback</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.confirmedSection}>
            <View style={styles.confirmedBadge}>
              <Text style={styles.confirmedIcon}>✓</Text>
              <Text style={styles.confirmedText}>Day confirmed — well done.</Text>
            </View>
            <Text style={styles.confirmedSub}>See you tomorrow, {firstName}.</Text>
          </View>
        )}

        {/* Daily verse */}
        <View style={styles.verseSection}>
          <Text style={styles.sectionTitle}>Today's word</Text>
          <VerseCard verse={dailyVerse} />
        </View>

        {/* Quick links */}
        <View style={styles.quickLinks}>
          <QuickLink
            icon="📖"
            label="Write in journal"
            onPress={() => router.push('/(tabs)/journal')}
          />
          <QuickLink
            icon="🛡️"
            label="Crisis support"
            onPress={() => router.push('/crisis')}
            accent
          />
        </View>
      </ScrollView>

      <MilestoneModal milestone={newMilestone} onDismiss={dismissMilestone} />
    </SafeAreaView>
  );
}

function QuickLink({
  icon,
  label,
  onPress,
  accent = false,
}: {
  icon: string;
  label: string;
  onPress: () => void;
  accent?: boolean;
}) {
  return (
    <TouchableOpacity
      style={[quickStyles.card, accent && quickStyles.cardAccent]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={quickStyles.icon}>{icon}</Text>
      <Text style={[quickStyles.label, accent && quickStyles.labelAccent]}>{label}</Text>
    </TouchableOpacity>
  );
}

const quickStyles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    alignItems: 'center',
    gap: Spacing.xs,
    shadowColor: Colors.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  cardAccent: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  icon: { fontSize: 24 },
  label: { ...Typography.caption, color: Colors.text, fontWeight: '600', textAlign: 'center' },
  labelAccent: { color: Colors.white },
});

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
}

function formatDate() {
  return new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  content: { paddingHorizontal: Spacing.lg, paddingTop: Spacing.lg, paddingBottom: Spacing.xxl },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  loadingText: { ...Typography.body, color: Colors.textTertiary },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Spacing.xl,
  },
  greeting: { ...Typography.h3, color: Colors.text },
  date: { ...Typography.caption, color: Colors.textTertiary, marginTop: 2 },
  crisisBtn: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.surfaceSecondary,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.border,
  },
  crisisBtnText: { fontSize: 22 },
  streakSection: { alignItems: 'center', marginBottom: Spacing.xl },
  actionSection: { gap: Spacing.sm, marginBottom: Spacing.xl },
  coldWarning: {
    backgroundColor: '#FFF4E5',
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    gap: Spacing.xs,
  },
  coldWarningText: { ...Typography.caption, color: '#B07D2A', fontWeight: '500' },
  restoreLink: { ...Typography.caption, color: Colors.primary, fontWeight: '600', textDecorationLine: 'underline' },
  confirmBtn: { minHeight: 60 },
  relapseBtn: { alignItems: 'center', paddingVertical: Spacing.sm },
  relapseText: { ...Typography.caption, color: Colors.textTertiary, textDecorationLine: 'underline' },
  confirmedSection: { alignItems: 'center', gap: Spacing.xs, marginBottom: Spacing.xl },
  confirmedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    backgroundColor: Colors.secondary + '20',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.full,
  },
  confirmedIcon: { fontSize: 20, color: Colors.secondary, fontWeight: '700' },
  confirmedText: { ...Typography.body, color: Colors.secondary, fontWeight: '600' },
  confirmedSub: { ...Typography.caption, color: Colors.textTertiary },
  verseSection: { marginBottom: Spacing.lg },
  sectionTitle: { ...Typography.body, color: Colors.text, fontWeight: '600', marginBottom: Spacing.sm },
  quickLinks: { flexDirection: 'row', gap: Spacing.md },
});
