import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  View,
} from 'react-native';
import { Colors, Spacing, BorderRadius, Typography } from '@/constants/Colors';

interface SocialButtonProps {
  provider: 'google' | 'apple';
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
}

export function SocialButton({
  provider,
  onPress,
  loading = false,
  disabled = false,
}: SocialButtonProps) {
  const config = {
    google: {
      title: 'Continue with Google',
      backgroundColor: Colors.white,
      textColor: Colors.text,
      borderColor: Colors.border,
      icon: '🔵', // Placeholder - replace with actual icon
    },
    apple: {
      title: 'Continue with Apple',
      backgroundColor: Colors.black,
      textColor: Colors.white,
      borderColor: Colors.black,
      icon: '', // Placeholder - replace with actual icon
    },
  };

  const { title, backgroundColor, textColor, borderColor, icon } =
    config[provider];

  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor, borderColor },
        disabled && styles.disabled,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator color={textColor} />
      ) : (
        <View style={styles.content}>
          <Text style={styles.icon}>{icon}</Text>
          <Text style={[styles.text, { color: textColor }]}>{title}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    minHeight: 56,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: 20,
    marginRight: Spacing.sm + 2,
  },
  text: {
    ...Typography.button,
    fontSize: 16,
  },
  disabled: {
    opacity: 0.5,
  },
});
