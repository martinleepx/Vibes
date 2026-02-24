import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors, Spacing, BorderRadius, Typography } from '@/constants/Colors';
import type { Verse } from '@/types';

interface VerseCardProps {
  verse: Verse;
  onRefresh?: () => void;
  size?: 'large' | 'compact';
}

export function VerseCard({ verse, onRefresh, size = 'large' }: VerseCardProps) {
  return (
    <View style={[styles.card, size === 'compact' && styles.cardCompact]}>
      <Text style={[styles.text, size === 'compact' && styles.textCompact]}>
        "{verse.text}"
      </Text>
      <View style={styles.footer}>
        <View>
          <Text style={styles.reference}>{verse.reference}</Text>
          <Text style={styles.translation}>{verse.translation}</Text>
        </View>
        {onRefresh && (
          <TouchableOpacity onPress={onRefresh} style={styles.refreshBtn} activeOpacity={0.7}>
            <Text style={styles.refreshText}>↻</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surfaceSecondary,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    borderLeftWidth: 4,
    borderLeftColor: Colors.primary,
  },
  cardCompact: {
    padding: Spacing.md,
  },
  text: {
    ...Typography.bodyLarge,
    color: Colors.text,
    fontStyle: 'italic',
    lineHeight: 28,
    marginBottom: Spacing.md,
  },
  textCompact: {
    fontSize: 15,
    lineHeight: 22,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  reference: {
    ...Typography.caption,
    color: Colors.primary,
    fontWeight: '600',
  },
  translation: {
    ...Typography.caption,
    color: Colors.textTertiary,
    fontSize: 11,
    marginTop: 2,
  },
  refreshBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  refreshText: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: '600',
  },
});
