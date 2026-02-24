import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Spacing, BorderRadius, Typography } from '@/constants/Colors';

interface StreakCounterProps {
  currentStreak: number;
  longestStreak: number;
  totalSoberDays: number;
  isCold?: boolean;
}

export function StreakCounter({
  currentStreak,
  longestStreak,
  totalSoberDays,
  isCold = false,
}: StreakCounterProps) {
  return (
    <View style={styles.container}>
      {/* Main streak */}
      <View style={[styles.mainBadge, isCold && styles.mainBadgeCold]}>
        <Text style={[styles.streakNumber, isCold && styles.streakNumberCold]}>
          {currentStreak}
        </Text>
        <Text style={[styles.streakLabel, isCold && styles.streakLabelCold]}>
          {currentStreak === 1 ? 'day free' : 'days free'}
        </Text>
        {isCold && <Text style={styles.coldBadge}>❄️ Streak at risk</Text>}
      </View>

      {/* Stats row */}
      <View style={styles.statsRow}>
        <View style={styles.stat}>
          <Text style={styles.statNumber}>{longestStreak}</Text>
          <Text style={styles.statLabel}>Best streak</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.stat}>
          <Text style={styles.statNumber}>{totalSoberDays}</Text>
          <Text style={styles.statLabel}>Total days</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.stat}>
          <Text style={styles.statNumber}>
            {totalSoberDays > 0
              ? Math.round((totalSoberDays / Math.max(totalSoberDays + currentStreak, 1)) * 100) + '%'
              : '—'}
          </Text>
          <Text style={styles.statLabel}>Success rate</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: Spacing.lg,
  },
  mainBadge: {
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  mainBadgeCold: {
    backgroundColor: Colors.textTertiary,
    shadowColor: Colors.textTertiary,
  },
  streakNumber: {
    fontSize: 64,
    fontWeight: '700',
    color: Colors.white,
    lineHeight: 72,
  },
  streakNumberCold: {
    fontSize: 52,
  },
  streakLabel: {
    ...Typography.body,
    color: 'rgba(255,255,255,0.85)',
    fontWeight: '500',
  },
  streakLabelCold: {
    color: 'rgba(255,255,255,0.7)',
  },
  coldBadge: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.8)',
    marginTop: Spacing.xs,
  },
  statsRow: {
    flexDirection: 'row',
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    width: '100%',
    shadowColor: Colors.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  stat: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    ...Typography.h3,
    color: Colors.primary,
  },
  statLabel: {
    ...Typography.caption,
    color: Colors.textTertiary,
    marginTop: 2,
  },
  divider: {
    width: 1,
    backgroundColor: Colors.divider,
    marginVertical: 4,
  },
});
