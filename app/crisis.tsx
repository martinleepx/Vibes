import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Modal,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Colors, Spacing, BorderRadius, Typography } from '@/constants/Colors';
import { VerseCard } from '@/components/VerseCard';
import { Button } from '@/components/Button';
import { CRISIS_VERSES, PHYSICAL_CHALLENGES, getRandomCrisisVerse } from '@/constants/Verses';

type CrisisMode = 'main' | 'verse' | 'meditation' | 'challenge';

const MEDITATION_STEPS = [
  {
    step: 1,
    title: 'Read slowly',
    instruction: 'Read the verse aloud or in your heart. Let each word land.',
    duration: 30,
  },
  {
    step: 2,
    title: 'Reflect',
    instruction: 'What word or phrase stands out to you? Why might God be showing you this right now?',
    duration: 60,
  },
  {
    step: 3,
    title: 'Respond',
    instruction: 'Speak or whisper a short prayer to God. Be honest. Tell him what you need.',
    duration: 60,
  },
  {
    step: 4,
    title: 'Rest',
    instruction: 'Breathe deeply. In for 4 counts, hold for 4, out for 4. Repeat 3 times. You are not alone.',
    duration: 45,
  },
];

export default function CrisisScreen() {
  const router = useRouter();
  const [mode, setMode] = useState<CrisisMode>('main');
  const [verse, setVerse] = useState(getRandomCrisisVerse());
  const [meditationStep, setMeditationStep] = useState(0);
  const [selectedChallenge, setSelectedChallenge] = useState<string | null>(null);
  const [challengeStarted, setChallengeStarted] = useState(false);
  const [showFirstTime, setShowFirstTime] = useState(false);

  const handleRefreshVerse = () => {
    let next = getRandomCrisisVerse();
    while (next.id === verse.id) next = getRandomCrisisVerse();
    setVerse(next);
  };

  const handleNextMeditationStep = () => {
    if (meditationStep < MEDITATION_STEPS.length - 1) {
      setMeditationStep(prev => prev + 1);
    } else {
      setMode('main');
      setMeditationStep(0);
      Alert.alert(
        'Well done 🙏',
        "You paused, you prayed, you chose wisely. That's what it means to walk in freedom.",
        [{ text: 'Thank you, God', style: 'default' }]
      );
    }
  };

  const handleSurvivedCrisis = () => {
    Alert.alert(
      'You made it through 💪',
      "That was a real moment, and you chose freedom. God sees your faithfulness right now.",
      [{ text: 'Back to home', onPress: () => router.back() }]
    );
  };

  if (mode === 'meditation') {
    const step = MEDITATION_STEPS[meditationStep];
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.meditationContainer}>
          <TouchableOpacity onPress={() => { setMode('verse'); setMeditationStep(0); }} style={styles.backBtn}>
            <Text style={styles.backText}>← Back</Text>
          </TouchableOpacity>

          <View style={styles.stepIndicator}>
            {MEDITATION_STEPS.map((_, i) => (
              <View
                key={i}
                style={[styles.stepDot, i === meditationStep && styles.stepDotActive, i < meditationStep && styles.stepDotDone]}
              />
            ))}
          </View>

          <View style={styles.meditationCard}>
            <Text style={styles.meditationStepNum}>Step {step.step} of {MEDITATION_STEPS.length}</Text>
            <Text style={styles.meditationTitle}>{step.title}</Text>
            <Text style={styles.meditationInstruction}>{step.instruction}</Text>
          </View>

          <View style={styles.verseInline}>
            <Text style={styles.verseInlineText}>"{verse.text}"</Text>
            <Text style={styles.verseInlineRef}>— {verse.reference} ({verse.translation})</Text>
          </View>

          <Button
            title={meditationStep < MEDITATION_STEPS.length - 1 ? 'Next step →' : "I'm done 🙏"}
            onPress={handleNextMeditationStep}
          />
        </View>
      </SafeAreaView>
    );
  }

  if (mode === 'challenge') {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.content}>
          <TouchableOpacity onPress={() => setMode('main')} style={styles.backBtn}>
            <Text style={styles.backText}>← Back</Text>
          </TouchableOpacity>

          <Text style={styles.challengeTitle}>Choose your challenge</Text>
          <Text style={styles.challengeSubtitle}>
            Physical action breaks the mental pattern. Pick one and go do it right now.
          </Text>

          <View style={styles.challengeList}>
            {PHYSICAL_CHALLENGES.map(c => (
              <TouchableOpacity
                key={c.id}
                style={[styles.challengeCard, selectedChallenge === c.id && styles.challengeCardSelected]}
                onPress={() => setSelectedChallenge(c.id)}
                activeOpacity={0.7}
              >
                <View>
                  <Text style={[styles.challengeLabel, selectedChallenge === c.id && styles.challengeLabelSelected]}>
                    {c.label}
                  </Text>
                  <Text style={styles.challengeDesc}>{c.description}</Text>
                </View>
                {selectedChallenge === c.id && <Text style={styles.checkmark}>✓</Text>}
              </TouchableOpacity>
            ))}
          </View>

          {selectedChallenge && !challengeStarted && (
            <Button
              title="I'll do it now →"
              onPress={() => {
                setChallengeStarted(true);
                Alert.alert(
                  'Go! 💪',
                  `Put the phone down and do your challenge. Come back when you're done.`,
                  [{ text: "Let's go", style: 'default' }]
                );
              }}
            />
          )}

          {challengeStarted && (
            <View style={styles.doneSection}>
              <Text style={styles.doneTitle}>Back already? Great!</Text>
              <Button title="I completed my challenge ✓" onPress={handleSurvivedCrisis} />
              <TouchableOpacity onPress={() => setMode('main')} style={styles.skipLink}>
                <Text style={styles.skipText}>I need something else</Text>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    );
  }

  if (mode === 'verse') {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.content}>
          <TouchableOpacity onPress={() => setMode('main')} style={styles.backBtn}>
            <Text style={styles.backText}>← Back</Text>
          </TouchableOpacity>

          <Text style={styles.versePageTitle}>Hold on to this.</Text>
          <Text style={styles.versePageSubtitle}>Read it slowly. More than once.</Text>

          <VerseCard verse={verse} onRefresh={handleRefreshVerse} size="large" />

          <View style={styles.verseActions}>
            <Button
              title="Meditate on this verse →"
              onPress={() => setMode('meditation')}
              style={styles.meditateBtn}
            />
            <Button
              title="I survived the moment ✓"
              onPress={handleSurvivedCrisis}
              variant="outline"
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  // Main crisis screen
  return (
    <SafeAreaView style={[styles.container, styles.mainContainer]}>
      <ScrollView contentContainerStyle={styles.content}>
        <TouchableOpacity onPress={() => router.back()} style={styles.closeBtn}>
          <Text style={styles.closeText}>✕</Text>
        </TouchableOpacity>

        <View style={styles.mainHeader}>
          <Text style={styles.mainIcon}>🛡️</Text>
          <Text style={styles.mainTitle}>You've got this.</Text>
          <Text style={styles.mainSubtitle}>
            This moment will pass. You are not alone. Choose your next step.
          </Text>
        </View>

        <View style={styles.options}>
          {/* Free: Verse */}
          <TouchableOpacity
            style={[styles.optionCard, styles.optionCardPrimary]}
            onPress={() => setMode('verse')}
            activeOpacity={0.7}
          >
            <Text style={styles.optionIcon}>📖</Text>
            <View style={styles.optionText}>
              <Text style={styles.optionTitle}>Show me a verse</Text>
              <Text style={styles.optionDesc}>Scripture to hold onto right now</Text>
            </View>
            <Text style={styles.optionArrow}>→</Text>
          </TouchableOpacity>

          {/* Premium: Guided meditation */}
          <TouchableOpacity
            style={styles.optionCard}
            onPress={() => setMode('meditation')}
            activeOpacity={0.7}
          >
            <Text style={styles.optionIcon}>🧘</Text>
            <View style={styles.optionText}>
              <Text style={styles.optionTitle}>Guided meditation</Text>
              <Text style={styles.optionDesc}>2-minute verse meditation to redirect your mind</Text>
            </View>
            <Text style={styles.optionArrow}>→</Text>
          </TouchableOpacity>

          {/* Premium: Physical challenge */}
          <TouchableOpacity
            style={styles.optionCard}
            onPress={() => setMode('challenge')}
            activeOpacity={0.7}
          >
            <Text style={styles.optionIcon}>💪</Text>
            <View style={styles.optionText}>
              <Text style={styles.optionTitle}>Physical challenge</Text>
              <Text style={styles.optionDesc}>Break the mental pattern with physical action</Text>
            </View>
            <Text style={styles.optionArrow}>→</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.survivedSection}>
          <Text style={styles.survivedLabel}>Already through it?</Text>
          <TouchableOpacity onPress={handleSurvivedCrisis} activeOpacity={0.7}>
            <Text style={styles.survivedLink}>I made it through ✓</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.scriptureFooter}>
          <Text style={styles.scriptureFooterText}>
            "No temptation has overtaken you that is not common to man. God is faithful, and he will
            not let you be tempted beyond your ability."
          </Text>
          <Text style={styles.scriptureFooterRef}>— 1 Corinthians 10:13</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  mainContainer: { backgroundColor: Colors.primary },
  content: { paddingHorizontal: Spacing.lg, paddingTop: Spacing.lg, paddingBottom: Spacing.xxl },
  closeBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.lg,
    alignSelf: 'flex-end',
  },
  closeText: { fontSize: 18, color: Colors.white, fontWeight: '600' },
  backBtn: { marginBottom: Spacing.lg },
  backText: { ...Typography.body, color: Colors.primary, fontWeight: '600' },
  mainHeader: { alignItems: 'center', marginBottom: Spacing.xl, gap: Spacing.sm },
  mainIcon: { fontSize: 64, marginBottom: Spacing.sm },
  mainTitle: { ...Typography.h1, color: Colors.white, textAlign: 'center' },
  mainSubtitle: { ...Typography.body, color: 'rgba(255,255,255,0.85)', textAlign: 'center', lineHeight: 24 },
  options: { gap: Spacing.md, marginBottom: Spacing.xl },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    gap: Spacing.md,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  optionCardPrimary: {
    backgroundColor: Colors.white,
    borderWidth: 2,
    borderColor: Colors.secondary,
  },
  optionIcon: { fontSize: 28 },
  optionText: { flex: 1 },
  optionTitle: { ...Typography.body, color: Colors.text, fontWeight: '600' },
  optionDesc: { ...Typography.caption, color: Colors.textSecondary, marginTop: 2 },
  optionArrow: { ...Typography.body, color: Colors.primary, fontWeight: '700' },
  survivedSection: { alignItems: 'center', gap: Spacing.sm, marginBottom: Spacing.xl },
  survivedLabel: { ...Typography.caption, color: 'rgba(255,255,255,0.7)' },
  survivedLink: { ...Typography.body, color: Colors.white, fontWeight: '600', textDecorationLine: 'underline' },
  scriptureFooter: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    gap: Spacing.sm,
  },
  scriptureFooterText: { ...Typography.caption, color: 'rgba(255,255,255,0.9)', fontStyle: 'italic', lineHeight: 20 },
  scriptureFooterRef: { ...Typography.caption, color: 'rgba(255,255,255,0.7)', fontWeight: '600' },
  // Verse mode
  versePageTitle: { ...Typography.h2, color: Colors.text, marginBottom: Spacing.xs },
  versePageSubtitle: { ...Typography.body, color: Colors.textSecondary, marginBottom: Spacing.xl },
  verseActions: { gap: Spacing.md, marginTop: Spacing.xl },
  meditateBtn: {},
  // Meditation mode
  meditationContainer: { flex: 1, padding: Spacing.lg, justifyContent: 'space-between' },
  stepIndicator: { flexDirection: 'row', gap: Spacing.sm, justifyContent: 'center', marginVertical: Spacing.lg },
  stepDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: Colors.border },
  stepDotActive: { backgroundColor: Colors.primary, width: 24 },
  stepDotDone: { backgroundColor: Colors.secondary },
  meditationCard: {
    backgroundColor: Colors.surfaceSecondary,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    gap: Spacing.sm,
    flex: 1,
    marginVertical: Spacing.lg,
  },
  meditationStepNum: { ...Typography.caption, color: Colors.textTertiary, fontWeight: '600' },
  meditationTitle: { ...Typography.h2, color: Colors.text },
  meditationInstruction: { ...Typography.bodyLarge, color: Colors.textSecondary, lineHeight: 28 },
  verseInline: {
    backgroundColor: Colors.primary + '15',
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    marginBottom: Spacing.lg,
    borderLeftWidth: 3,
    borderLeftColor: Colors.primary,
  },
  verseInlineText: { ...Typography.body, color: Colors.text, fontStyle: 'italic', lineHeight: 24, marginBottom: Spacing.sm },
  verseInlineRef: { ...Typography.caption, color: Colors.primary, fontWeight: '600' },
  // Challenge mode
  challengeTitle: { ...Typography.h2, color: Colors.text, marginBottom: Spacing.sm },
  challengeSubtitle: { ...Typography.body, color: Colors.textSecondary, marginBottom: Spacing.xl, lineHeight: 24 },
  challengeList: { gap: Spacing.md, marginBottom: Spacing.xl },
  challengeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    borderWidth: 2,
    borderColor: Colors.border,
    justifyContent: 'space-between',
  },
  challengeCardSelected: {
    borderColor: Colors.primary,
    backgroundColor: Colors.surfaceSecondary,
  },
  challengeLabel: { ...Typography.body, color: Colors.text, fontWeight: '600' },
  challengeLabelSelected: { color: Colors.primary },
  challengeDesc: { ...Typography.caption, color: Colors.textSecondary, marginTop: 2 },
  checkmark: { fontSize: 20, color: Colors.primary, fontWeight: '700' },
  doneSection: { gap: Spacing.md, marginTop: Spacing.lg },
  doneTitle: { ...Typography.h3, color: Colors.text, textAlign: 'center', marginBottom: Spacing.sm },
  skipLink: { alignItems: 'center', paddingVertical: Spacing.sm },
  skipText: { ...Typography.body, color: Colors.textTertiary },
});
