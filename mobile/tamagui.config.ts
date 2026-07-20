import { createTamagui, createTokens } from 'tamagui';
import { createInterFont } from '@tamagui/font-inter';
import { colors, radii, spacing } from './src/constants/tokens';

// Sora is loaded at runtime via @expo-google-fonts/sora (see App.tsx).
// We register it here as the tamagui heading/body font so components
// created with tamagui primitives (Button, Text, Input) pick it up.
const soraFont = createInterFont({
  family: 'Sora_400Regular',
  face: {
    300: { normal: 'Sora_300Light' },
    400: { normal: 'Sora_400Regular' },
    500: { normal: 'Sora_500Medium' },
    600: { normal: 'Sora_600SemiBold' },
    700: { normal: 'Sora_700Bold' },
    800: { normal: 'Sora_800ExtraBold' },
  },
});

const tokens = createTokens({
  color: {
    base: colors.base,
    surface: colors.surface,
    elevated: colors.elevated,
    card: colors.card,
    magenta: colors.magenta,
    violet: colors.violet,
    online: colors.online,
    warn: colors.warn,
    danger: colors.danger,
    textPrimary: colors.textPrimary,
    textSecondary: colors.textSecondary,
    textTertiary: colors.textTertiary,
  },
  space: {
    xs: spacing.xs,
    sm: spacing.sm,
    md: spacing.md,
    lg: spacing.lg,
    xl: spacing.xl,
    xxl: spacing.xxl,
    true: spacing.md,
  },
  size: {
    xs: spacing.xs,
    sm: spacing.sm,
    md: spacing.md,
    lg: spacing.lg,
    xl: spacing.xl,
    xxl: spacing.xxl,
    true: spacing.md,
  },
  radius: {
    sm: radii.sm,
    md: radii.md,
    lg: radii.lg,
    xl: radii.xl,
    pill: radii.pill,
    true: radii.md,
  },
  zIndex: { true: 0 },
});

const darkTheme = {
  background: colors.base,
  backgroundHover: colors.surface,
  backgroundPress: colors.elevated,
  color: colors.textPrimary,
  colorHover: colors.textPrimary,
  borderColor: colors.borderMedium ?? 'rgba(255,255,255,0.1)',
  placeholderColor: colors.textTertiary,
};

const config = createTamagui({
  fonts: { heading: soraFont, body: soraFont },
  tokens,
  themes: { dark: darkTheme, light: darkTheme }, // app is dark-first/only
  shorthands: {
    px: 'paddingHorizontal',
    py: 'paddingVertical',
    mx: 'marginHorizontal',
    my: 'marginVertical',
  } as const,
  defaultTheme: 'dark',
});

export type AppConfig = typeof config;
declare module 'tamagui' {
  interface TamaguiCustomConfig extends AppConfig {}
}

export default config;
