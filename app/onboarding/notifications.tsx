import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Platform,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Button } from '@/components/Button';
import { Colors, Spacing, BorderRadius, Typography } from '@/constants/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MORNING_TIMES = ['6:00 AM', '7:00 AM', '8:00 AM', '9:00 AM'];
const EVENING_TIMES = ['7:00 PM', '8:00 PM', '9:00 PM', '10:00 PM'];

export default function NotificationsScreen() {
  const router = useRouter();
  const [morningTime, setMorningTime] = useState('8:00 AM');
  const [eveningTime, setEveningTime] = useState('9:00 PM');
  const [loading, setLoading] = useState(false);

  const handleContinue = async () => {
    setLoading(true);
    try {
      await AsyncStorage.setItem('@free/morning_time', morningTime);
      await AsyncStorage.setItem('@free/evening_time', eveningTime);
      await AsyncStorage.setItem('@free/notifications_enabled', 'true');
      router.push('/onboarding/partner');
    } finally {
      setLoading(false);
    }
  };

  const handleSkip = async () => {
    await AsyncStorage.setItem('@free/notifications_enabled', 'false');
    router.push('/onboarding/partner');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.stepLabel}>Step 2 of 3</Text>
          <Text style={styles.icon}>🔔</Text>
          <Text style={styles.title}>Daily encouragement</Text>
          <Text style={styles.subtitle}>
            We'll send you scripture and encouragement twice a day to keep you anchored. When
            do you want to hear from us?
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>☀️ Morning encouragement</Text>
          <View style={styles.timeGrid}>
            {MORNING_TIMES.map(t => (
              <TouchableOpacity
                key={t}
                style={[styles.timeChip, morningTime === t && styles.timeChipSelected]}
                onPress={() => setMorningTime(t)}
                activeOpacity={0.7}
              >
                <Text
                  style={[styles.timeChipText, morningTime === t && styles.timeChipTextSelected]}
                >
                  {t}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🌙 Evening check-in</Text>
          <View style={styles.timeGrid}>
            {EVENING_TIMES.map(t => (
              <TouchableOpacity
                key={t}
                style={[styles.timeChip, eveningTime === t && styles.timeChipSelected]}
                onPress={() => setEveningTime(t)}
                activeOpacity={0.7}
              >
                <Text
                  style={[styles.timeChipText, eveningTime === t && styles.timeChipTextSelected]}
                >
                  {t}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.previewBox}>
          <Text style={styles.previewLabel}>Preview notification</Text>
          <View style={styles.notifPreview}>
            <Text style={styles.notifApp}>Free</Text>
            <Text style={styles.notifTitle}>Good morning, warrior 🌅</Text>
            <Text style={styles.notifBody}>
              "The steadfast love of the Lord never ceases; his mercies never come to an end."
              — Lamentations 3:22
            </Text>
          </View>
        </View>

        <View style={styles.footer}>
          <Button
            title="Set reminders"
            onPress={handleContinue}
            loading={loading}
          />
          <TouchableOpacity onPress={handleSkip} style={styles.skipBtn} activeOpacity={0.7}>
            <Text style={styles.skipText}>Skip for now</Text>
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
  section: { marginBottom: Spacing.lg },
  sectionTitle: { ...Typography.body, color: Colors.text, fontWeight: '600', marginBottom: Spacing.sm },
  timeGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.sm },
  timeChip: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.surface,
    borderWidth: 2,
    borderColor: Colors.border,
  },
  timeChipSelected: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  timeChipText: { ...Typography.caption, color: Colors.textSecondary, fontWeight: '500' },
  timeChipTextSelected: { color: Colors.white, fontWeight: '600' },
  previewBox: {
    backgroundColor: Colors.surfaceSecondary,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.xl,
  },
  previewLabel: { ...Typography.caption, color: Colors.textTertiary, marginBottom: Spacing.sm },
  notifPreview: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    gap: 4,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  notifApp: { ...Typography.caption, color: Colors.textTertiary, fontWeight: '600' },
  notifTitle: { ...Typography.body, color: Colors.text, fontWeight: '600' },
  notifBody: { ...Typography.caption, color: Colors.textSecondary, lineHeight: 18 },
  footer: { gap: Spacing.sm },
  skipBtn: { alignItems: 'center', paddingVertical: Spacing.sm },
  skipText: { ...Typography.body, color: Colors.textTertiary },
});
