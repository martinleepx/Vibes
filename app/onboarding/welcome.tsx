import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Button } from '@/components/Button';
import { Colors, Spacing, BorderRadius, Typography } from '@/constants/Colors';

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Text style={styles.logoText}>Free</Text>
          </View>
          <Text style={styles.stepLabel}>Step 1 of 3</Text>
        </View>

        <View style={styles.body}>
          <Text style={styles.title}>Welcome to your safe space.</Text>
          <Text style={styles.subtitle}>
            Whatever brought you here — whether it's day one of trying or day one hundred of
            fighting — we're glad you're here.
          </Text>

          <View style={styles.featureList}>
            <FeatureItem
              icon="📊"
              title="Track your streak"
              description="Celebrate every day of freedom. Each day matters."
            />
            <FeatureItem
              icon="🛡️"
              title="Crisis support"
              description="When temptation hits hard, we're here with scripture and tools."
            />
            <FeatureItem
              icon="📖"
              title="Daily encouragement"
              description="Scripture and devotional content to keep you rooted."
            />
            <FeatureItem
              icon="🤝"
              title="Accountability"
              description="Connect with a partner who walks this road with you."
            />
          </View>

          <View style={styles.scriptureBox}>
            <Text style={styles.scripture}>
              "So if the Son sets you free, you will be free indeed."
            </Text>
            <Text style={styles.scriptureRef}>— John 8:36</Text>
          </View>
        </View>

        <View style={styles.footer}>
          <Button
            title="Let's begin →"
            onPress={() => router.push('/onboarding/notifications')}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function FeatureItem({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <View style={featureStyles.item}>
      <Text style={featureStyles.icon}>{icon}</Text>
      <View style={featureStyles.text}>
        <Text style={featureStyles.title}>{title}</Text>
        <Text style={featureStyles.description}>{description}</Text>
      </View>
    </View>
  );
}

const featureStyles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.md,
    paddingVertical: Spacing.sm,
  },
  icon: { fontSize: 28, lineHeight: 36 },
  text: { flex: 1 },
  title: { ...Typography.body, color: Colors.text, fontWeight: '600' },
  description: { ...Typography.caption, color: Colors.textSecondary, marginTop: 2 },
});

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  content: { paddingHorizontal: Spacing.lg, paddingTop: Spacing.xl, paddingBottom: Spacing.xl },
  header: { alignItems: 'center', marginBottom: Spacing.xl },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: BorderRadius.lg,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.sm,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
  logoText: { fontSize: 28, fontWeight: '700', color: Colors.white },
  stepLabel: { ...Typography.caption, color: Colors.textTertiary },
  body: { gap: Spacing.lg },
  title: { ...Typography.h2, color: Colors.text },
  subtitle: { ...Typography.body, color: Colors.textSecondary, lineHeight: 26 },
  featureList: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    gap: Spacing.xs,
    shadowColor: Colors.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  scriptureBox: {
    backgroundColor: Colors.surfaceSecondary,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    borderLeftWidth: 4,
    borderLeftColor: Colors.secondary,
  },
  scripture: { ...Typography.body, fontStyle: 'italic', color: Colors.text },
  scriptureRef: { ...Typography.caption, color: Colors.secondary, fontWeight: '600', marginTop: Spacing.sm },
  footer: { marginTop: Spacing.xl },
});
