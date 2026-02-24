import React from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { Colors, Spacing, BorderRadius, Typography } from '@/constants/Colors';
import { MILESTONE_BADGES } from '@/constants/Verses';
import type { Milestone } from '@/types';
import { Button } from './Button';

interface MilestoneModalProps {
  milestone: Milestone | null;
  onDismiss: () => void;
}

export function MilestoneModal({ milestone, onDismiss }: MilestoneModalProps) {
  if (!milestone) return null;

  const badge = MILESTONE_BADGES.find(b => b.days === milestone.days);
  if (!badge) return null;

  return (
    <Modal visible transparent animationType="fade" onRequestClose={onDismiss}>
      <View style={styles.overlay}>
        <View style={styles.card}>
          <Text style={styles.icon}>{badge.icon}</Text>
          <Text style={styles.congrats}>Milestone reached!</Text>
          <Text style={[styles.label, { color: badge.color }]}>{badge.label}</Text>
          <Text style={styles.description}>{badge.description}</Text>

          <View style={[styles.scriptureBox, { borderColor: badge.color + '40' }]}>
            <Text style={styles.scripture}>"{badge.scripture}"</Text>
            <Text style={[styles.scriptureRef, { color: badge.color }]}>
              — {badge.scriptureRef}
            </Text>
          </View>

          <Text style={styles.daysBadge}>{badge.days} days free</Text>

          <Button title="Thank you, God!" onPress={onDismiss} style={styles.btn} />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: Colors.overlay,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.lg,
  },
  card: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.xl,
    padding: Spacing.xl,
    alignItems: 'center',
    width: '100%',
    maxWidth: 360,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.2,
    shadowRadius: 32,
    elevation: 16,
  },
  icon: {
    fontSize: 72,
    marginBottom: Spacing.md,
  },
  congrats: {
    ...Typography.caption,
    color: Colors.textTertiary,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: Spacing.xs,
  },
  label: {
    ...Typography.h2,
    textAlign: 'center',
    marginBottom: Spacing.sm,
  },
  description: {
    ...Typography.body,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: Spacing.lg,
  },
  scriptureBox: {
    borderWidth: 1,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    width: '100%',
    marginBottom: Spacing.lg,
  },
  scripture: {
    ...Typography.body,
    fontStyle: 'italic',
    color: Colors.text,
    textAlign: 'center',
    marginBottom: Spacing.sm,
  },
  scriptureRef: {
    ...Typography.caption,
    fontWeight: '600',
    textAlign: 'center',
  },
  daysBadge: {
    ...Typography.caption,
    color: Colors.textTertiary,
    backgroundColor: Colors.surfaceSecondary,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.full,
    marginBottom: Spacing.lg,
    overflow: 'hidden',
  },
  btn: {
    width: '100%',
  },
});
