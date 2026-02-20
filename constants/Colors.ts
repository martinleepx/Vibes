/**
 * Color palette for Free app
 * Theme: Calming + welcoming with blues/greens (peace/renewal)
 */

export const Colors = {
  // Primary colors - blues and greens
  primary: '#4A90A4', // Calm blue
  primaryLight: '#6BAFC4',
  primaryDark: '#2E6B7D',

  secondary: '#68B68D', // Peaceful green
  secondaryLight: '#8FCCA8',
  secondaryDark: '#4A9B6E',

  // Neutral colors
  background: '#F8FBFC', // Very light blue-tinted white
  surface: '#FFFFFF',
  surfaceSecondary: '#E8F4F8',

  // Text colors
  text: '#1A3940', // Deep blue-gray
  textSecondary: '#5A7B84',
  textTertiary: '#8FA8B0',

  // Status colors
  success: '#68B68D',
  error: '#E07A7A',
  warning: '#F0B454',

  // UI elements
  border: '#D4E5EB',
  divider: '#E8F0F3',
  disabled: '#B8CDD4',

  // Special
  white: '#FFFFFF',
  black: '#000000',
  overlay: 'rgba(26, 57, 64, 0.5)',
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const BorderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
};

export const Typography = {
  h1: {
    fontSize: 32,
    fontWeight: '700' as const,
    lineHeight: 40,
  },
  h2: {
    fontSize: 24,
    fontWeight: '600' as const,
    lineHeight: 32,
  },
  h3: {
    fontSize: 20,
    fontWeight: '600' as const,
    lineHeight: 28,
  },
  body: {
    fontSize: 16,
    fontWeight: '400' as const,
    lineHeight: 24,
  },
  bodyLarge: {
    fontSize: 18,
    fontWeight: '400' as const,
    lineHeight: 28,
  },
  caption: {
    fontSize: 14,
    fontWeight: '400' as const,
    lineHeight: 20,
  },
  button: {
    fontSize: 16,
    fontWeight: '600' as const,
    lineHeight: 24,
  },
};
