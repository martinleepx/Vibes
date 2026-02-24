import React, { useState, useEffect } from 'react';
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
import { Colors, Spacing, BorderRadius, Typography } from '@/constants/Colors';
import { Button } from '@/components/Button';
import { useAuth } from '@/context/AuthContext';
import { useStreak } from '@/context/StreakContext';
import { getOrCreateMyCode, joinWithCode, getPartners } from '@/services/partners';
import type { AccountabilityPartner } from '@/types';

export default function PartnerScreen() {
  const { user } = useAuth();
  const { streak } = useStreak();
  const [myCode, setMyCode] = useState('');
  const [partners, setPartners] = useState<AccountabilityPartner[]>([]);
  const [joinCode, setJoinCode] = useState('');
  const [loading, setLoading] = useState(true);
  const [joining, setJoining] = useState(false);
  const [showJoinInput, setShowJoinInput] = useState(false);

  useEffect(() => {
    if (user) loadData();
  }, [user]);

  const loadData = async () => {
    if (!user) return;
    setLoading(true);
    const [codeData, partnerData] = await Promise.all([
      getOrCreateMyCode(user.id),
      getPartners(user.id),
    ]);
    if (codeData) setMyCode(codeData.connectionCode);
    setPartners(partnerData);
    setLoading(false);
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Join me on Free — a faith-based accountability app. Use my code: ${myCode}`,
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleJoin = async () => {
    if (!user || joinCode.length < 6) return;
    setJoining(true);
    const result = await joinWithCode(user.id, joinCode);
    if (result.success) {
      Alert.alert('Connected! 🙏', "You're now accountability partners.", [
        { text: 'Great!', onPress: () => { setJoinCode(''); setShowJoinInput(false); loadData(); } },
      ]);
    } else {
      Alert.alert('Not found', result.error || 'Please check the code and try again.');
    }
    setJoining(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Accountability</Text>

        {/* My code */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your connection code</Text>
          <Text style={styles.sectionSubtitle}>
            Share this with someone you trust. They'll use it to connect with you in the app.
          </Text>
          <View style={styles.codeBox}>
            <Text style={styles.codeText}>{myCode || '———'}</Text>
          </View>
          <Button title="Share your code" onPress={handleShare} disabled={!myCode} />
        </View>

        {/* Join with code */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Connect with a partner</Text>
          {showJoinInput ? (
            <View style={styles.joinForm}>
              <TextInput
                style={styles.codeInput}
                value={joinCode}
                onChangeText={t => setJoinCode(t.toUpperCase())}
                placeholder="Enter 6-character code"
                placeholderTextColor={Colors.textTertiary}
                maxLength={6}
                autoCapitalize="characters"
                autoCorrect={false}
                autoFocus
              />
              <View style={styles.joinActions}>
                <Button
                  title="Connect"
                  onPress={handleJoin}
                  loading={joining}
                  disabled={joinCode.length < 6}
                  style={styles.joinBtn}
                />
                <Button
                  title="Cancel"
                  onPress={() => { setShowJoinInput(false); setJoinCode(''); }}
                  variant="outline"
                  style={styles.joinBtn}
                />
              </View>
            </View>
          ) : (
            <Button
              title="Enter a partner's code"
              onPress={() => setShowJoinInput(true)}
              variant="outline"
            />
          )}
        </View>

        {/* Current partners */}
        {partners.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Your partners</Text>
            {partners.map(p => (
              <View key={p.id} style={styles.partnerCard}>
                <View style={styles.partnerAvatar}>
                  <Text style={styles.partnerAvatarText}>
                    {p.partnerProfile?.displayName?.[0]?.toUpperCase() || '?'}
                  </Text>
                </View>
                <View style={styles.partnerInfo}>
                  <Text style={styles.partnerName}>
                    {p.partnerProfile?.displayName || 'Your partner'}
                  </Text>
                  <Text style={styles.partnerStatus}>Connected • Watching your journey</Text>
                </View>
                <View style={[styles.statusDot, { backgroundColor: Colors.secondary }]} />
              </View>
            ))}
          </View>
        )}

        {/* Your streak for partner */}
        {streak && (
          <View style={styles.streakShareBox}>
            <Text style={styles.streakShareTitle}>Your streak to share</Text>
            <View style={styles.streakShareRow}>
              <View style={styles.streakShareStat}>
                <Text style={styles.streakShareNum}>{streak.currentStreak}</Text>
                <Text style={styles.streakShareLabel}>Current</Text>
              </View>
              <View style={styles.streakShareStat}>
                <Text style={styles.streakShareNum}>{streak.longestStreak}</Text>
                <Text style={styles.streakShareLabel}>Best</Text>
              </View>
              <View style={styles.streakShareStat}>
                <Text style={styles.streakShareNum}>{streak.totalSoberDays}</Text>
                <Text style={styles.streakShareLabel}>Total days</Text>
              </View>
            </View>
          </View>
        )}

        {/* Info box */}
        {partners.length === 0 && !loading && (
          <View style={styles.infoBox}>
            <Text style={styles.infoIcon}>🤝</Text>
            <Text style={styles.infoTitle}>Accountability changes everything</Text>
            <Text style={styles.infoBody}>
              Studies show people are 65% more likely to succeed with an accountability partner.
              Your partner sees your streak and can send encouragement.
            </Text>
            <Text style={styles.infoScripture}>
              "Two are better than one... For if they fall, one will lift up his fellow."
            </Text>
            <Text style={styles.infoRef}>— Ecclesiastes 4:9-10</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  content: { paddingHorizontal: Spacing.lg, paddingTop: Spacing.lg, paddingBottom: Spacing.xxl },
  title: { ...Typography.h2, color: Colors.text, marginBottom: Spacing.xl },
  section: {
    marginBottom: Spacing.xl,
    gap: Spacing.md,
  },
  sectionTitle: { ...Typography.h3, color: Colors.text },
  sectionSubtitle: { ...Typography.caption, color: Colors.textSecondary, lineHeight: 20 },
  codeBox: {
    backgroundColor: Colors.primary,
    borderRadius: BorderRadius.lg,
    paddingVertical: Spacing.lg,
    alignItems: 'center',
  },
  codeText: {
    fontSize: 40,
    fontWeight: '700',
    color: Colors.white,
    letterSpacing: 8,
  },
  joinForm: { gap: Spacing.md },
  codeInput: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.md,
    borderWidth: 2,
    borderColor: Colors.primary,
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
    paddingVertical: Spacing.md,
    color: Colors.text,
    letterSpacing: 6,
  },
  joinActions: { flexDirection: 'row', gap: Spacing.sm },
  joinBtn: { flex: 1 },
  partnerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    gap: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  partnerAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  partnerAvatarText: { fontSize: 18, fontWeight: '700', color: Colors.white },
  partnerInfo: { flex: 1 },
  partnerName: { ...Typography.body, color: Colors.text, fontWeight: '600' },
  partnerStatus: { ...Typography.caption, color: Colors.secondary },
  statusDot: { width: 10, height: 10, borderRadius: 5 },
  streakShareBox: {
    backgroundColor: Colors.surfaceSecondary,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.xl,
  },
  streakShareTitle: { ...Typography.caption, color: Colors.textTertiary, fontWeight: '600', marginBottom: Spacing.md },
  streakShareRow: { flexDirection: 'row', justifyContent: 'space-around' },
  streakShareStat: { alignItems: 'center' },
  streakShareNum: { ...Typography.h2, color: Colors.primary },
  streakShareLabel: { ...Typography.caption, color: Colors.textTertiary },
  infoBox: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    alignItems: 'center',
    gap: Spacing.sm,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  infoIcon: { fontSize: 40 },
  infoTitle: { ...Typography.h3, color: Colors.text, textAlign: 'center' },
  infoBody: { ...Typography.body, color: Colors.textSecondary, textAlign: 'center', lineHeight: 24 },
  infoScripture: { ...Typography.body, fontStyle: 'italic', color: Colors.text, textAlign: 'center', marginTop: Spacing.sm },
  infoRef: { ...Typography.caption, color: Colors.secondary, fontWeight: '600' },
});
