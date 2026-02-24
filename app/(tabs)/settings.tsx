import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Colors, Spacing, BorderRadius, Typography } from '@/constants/Colors';
import { useAuth } from '@/context/AuthContext';
import { useStreak } from '@/context/StreakContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SettingsScreen() {
  const router = useRouter();
  const { user, signOut } = useAuth();
  const { streak, restoresRemaining } = useStreak();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [morningTime, setMorningTime] = useState('8:00 AM');
  const [eveningTime, setEveningTime] = useState('9:00 PM');
  const [translation, setTranslation] = useState<'ESV' | 'NIV'>('ESV');
  const [biometricEnabled, setBiometricEnabled] = useState(false);

  useEffect(() => {
    loadPreferences();
  }, []);

  const loadPreferences = async () => {
    const [notif, morning, evening, trans, bio] = await Promise.all([
      AsyncStorage.getItem('@free/notifications_enabled'),
      AsyncStorage.getItem('@free/morning_time'),
      AsyncStorage.getItem('@free/evening_time'),
      AsyncStorage.getItem('@free/translation'),
      AsyncStorage.getItem('@free/biometric_enabled'),
    ]);
    if (notif !== null) setNotificationsEnabled(notif === 'true');
    if (morning) setMorningTime(morning);
    if (evening) setEveningTime(evening);
    if (trans === 'NIV' || trans === 'ESV') setTranslation(trans);
    if (bio !== null) setBiometricEnabled(bio === 'true');
  };

  const savePreference = async (key: string, value: string) => {
    await AsyncStorage.setItem(key, value);
  };

  const handleSignOut = () => {
    Alert.alert('Sign out', 'Are you sure you want to sign out?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Sign out', style: 'destructive', onPress: signOut },
    ]);
  };

  const handleResetStreak = () => {
    Alert.alert(
      'Reset streak',
      'Are you sure? This will set your current streak back to 0. This cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Reset', style: 'destructive', onPress: () => {} },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Settings</Text>

        {/* Profile */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>ACCOUNT</Text>
          <View style={styles.card}>
            <View style={styles.profileRow}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>
                  {user?.displayName?.[0]?.toUpperCase() || '?'}
                </Text>
              </View>
              <View style={styles.profileInfo}>
                <Text style={styles.profileName}>{user?.displayName || 'Friend'}</Text>
                <Text style={styles.profileEmail}>{user?.email || ''}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Stats */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>PROGRESS</Text>
          <View style={styles.card}>
            <SettingRow
              label="Current streak"
              value={`${streak?.currentStreak ?? 0} days`}
              noChevron
            />
            <Divider />
            <SettingRow
              label="Longest streak"
              value={`${streak?.longestStreak ?? 0} days`}
              noChevron
            />
            <Divider />
            <SettingRow
              label="Total sober days"
              value={`${streak?.totalSoberDays ?? 0}`}
              noChevron
            />
            <Divider />
            <SettingRow
              label="Streak restores left"
              value={`${restoresRemaining}/3 this month`}
              noChevron
            />
          </View>
        </View>

        {/* Notifications */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>NOTIFICATIONS</Text>
          <View style={styles.card}>
            <View style={styles.switchRow}>
              <Text style={styles.rowLabel}>Daily encouragement</Text>
              <Switch
                value={notificationsEnabled}
                onValueChange={v => {
                  setNotificationsEnabled(v);
                  savePreference('@free/notifications_enabled', String(v));
                }}
                trackColor={{ false: Colors.border, true: Colors.primary }}
                thumbColor={Colors.white}
              />
            </View>
            {notificationsEnabled && (
              <>
                <Divider />
                <TouchableOpacity
                  style={styles.row}
                  onPress={() =>
                    Alert.alert(
                      'Morning time',
                      'Select your morning reminder time',
                      ['6:00 AM', '7:00 AM', '8:00 AM', '9:00 AM'].map(t => ({
                        text: t,
                        onPress: () => {
                          setMorningTime(t);
                          savePreference('@free/morning_time', t);
                        },
                      }))
                    )
                  }
                >
                  <Text style={styles.rowLabel}>Morning reminder</Text>
                  <View style={styles.rowRight}>
                    <Text style={styles.rowValue}>{morningTime}</Text>
                    <Text style={styles.chevron}>›</Text>
                  </View>
                </TouchableOpacity>
                <Divider />
                <TouchableOpacity
                  style={styles.row}
                  onPress={() =>
                    Alert.alert(
                      'Evening time',
                      'Select your evening reminder time',
                      ['7:00 PM', '8:00 PM', '9:00 PM', '10:00 PM'].map(t => ({
                        text: t,
                        onPress: () => {
                          setEveningTime(t);
                          savePreference('@free/evening_time', t);
                        },
                      }))
                    )
                  }
                >
                  <Text style={styles.rowLabel}>Evening check-in</Text>
                  <View style={styles.rowRight}>
                    <Text style={styles.rowValue}>{eveningTime}</Text>
                    <Text style={styles.chevron}>›</Text>
                  </View>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>

        {/* Preferences */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>PREFERENCES</Text>
          <View style={styles.card}>
            <TouchableOpacity
              style={styles.row}
              onPress={() =>
                Alert.alert('Bible translation', 'Choose your preferred translation', [
                  {
                    text: 'ESV',
                    onPress: () => {
                      setTranslation('ESV');
                      savePreference('@free/translation', 'ESV');
                    },
                  },
                  {
                    text: 'NIV',
                    onPress: () => {
                      setTranslation('NIV');
                      savePreference('@free/translation', 'NIV');
                    },
                  },
                ])
              }
            >
              <Text style={styles.rowLabel}>Bible translation</Text>
              <View style={styles.rowRight}>
                <Text style={styles.rowValue}>{translation}</Text>
                <Text style={styles.chevron}>›</Text>
              </View>
            </TouchableOpacity>
            <Divider />
            <View style={styles.switchRow}>
              <Text style={styles.rowLabel}>Biometric app lock</Text>
              <Switch
                value={biometricEnabled}
                onValueChange={v => {
                  setBiometricEnabled(v);
                  savePreference('@free/biometric_enabled', String(v));
                }}
                trackColor={{ false: Colors.border, true: Colors.primary }}
                thumbColor={Colors.white}
              />
            </View>
          </View>
        </View>

        {/* Danger zone */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>ACCOUNT ACTIONS</Text>
          <View style={styles.card}>
            <TouchableOpacity style={styles.row} onPress={handleSignOut}>
              <Text style={[styles.rowLabel, styles.destructive]}>Sign out</Text>
              <Text style={[styles.chevron, styles.destructive]}>›</Text>
            </TouchableOpacity>
            <Divider />
            <TouchableOpacity style={styles.row} onPress={handleResetStreak}>
              <Text style={[styles.rowLabel, styles.destructive]}>Reset streak</Text>
              <Text style={[styles.chevron, styles.destructive]}>›</Text>
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.version}>Free v1.0.0 • Made with faith and purpose</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

function SettingRow({
  label,
  value,
  onPress,
  noChevron,
}: {
  label: string;
  value?: string;
  onPress?: () => void;
  noChevron?: boolean;
}) {
  return (
    <TouchableOpacity style={styles.row} onPress={onPress} disabled={!onPress} activeOpacity={0.7}>
      <Text style={styles.rowLabel}>{label}</Text>
      <View style={styles.rowRight}>
        {value && <Text style={styles.rowValue}>{value}</Text>}
        {!noChevron && <Text style={styles.chevron}>›</Text>}
      </View>
    </TouchableOpacity>
  );
}

function Divider() {
  return <View style={styles.divider} />;
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  content: { paddingHorizontal: Spacing.lg, paddingTop: Spacing.lg, paddingBottom: Spacing.xxl },
  title: { ...Typography.h2, color: Colors.text, marginBottom: Spacing.xl },
  section: { marginBottom: Spacing.lg },
  sectionLabel: {
    ...Typography.caption,
    color: Colors.textTertiary,
    fontWeight: '600',
    letterSpacing: 0.8,
    marginBottom: Spacing.sm,
    paddingLeft: Spacing.xs,
  },
  card: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
    shadowColor: Colors.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.md,
    paddingVertical: 14,
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.md,
    paddingVertical: 10,
  },
  rowLabel: { ...Typography.body, color: Colors.text },
  rowRight: { flexDirection: 'row', alignItems: 'center', gap: Spacing.xs },
  rowValue: { ...Typography.body, color: Colors.textTertiary },
  chevron: { fontSize: 18, color: Colors.textTertiary, lineHeight: 24 },
  divider: { height: 1, backgroundColor: Colors.divider, marginHorizontal: Spacing.md },
  destructive: { color: Colors.error },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.md,
    gap: Spacing.md,
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: { fontSize: 22, fontWeight: '700', color: Colors.white },
  profileInfo: { flex: 1 },
  profileName: { ...Typography.body, color: Colors.text, fontWeight: '600' },
  profileEmail: { ...Typography.caption, color: Colors.textTertiary, marginTop: 2 },
  version: {
    ...Typography.caption,
    color: Colors.textTertiary,
    textAlign: 'center',
    marginTop: Spacing.md,
  },
});
