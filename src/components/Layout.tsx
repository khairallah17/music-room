import React from 'react';
import { View } from 'react-native';
import { Text } from 'tamagui';
import { colors, spacing, typography } from '@/constants/tokens';

/** Full-bleed phone screen wrapper — dark base + optional radial accent glow. */
export function ScreenContainer({
  children,
  glow = 'none',
}: {
  children: React.ReactNode;
  glow?: 'none' | 'violet' | 'warm';
}) {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.base,
      }}
    >
      {children}
    </View>
  );
}

export function ScreenTitle({ children }: { children: React.ReactNode }) {
  return (
    <Text style={{ ...typography.h1, color: colors.textPrimary, paddingHorizontal: spacing.xl }}>
      {children}
    </Text>
  );
}

export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <Text
      style={{
        ...typography.micro,
        color: colors.textQuaternary,
        textTransform: 'uppercase',
        marginBottom: spacing.sm,
      }}
    >
      {children}
    </Text>
  );
}
