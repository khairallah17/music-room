import React from 'react';
import { Pressable, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Text } from 'tamagui';
import { colors, radii, spacing, typography, shadows } from '@/constants/tokens';

type Props = {
  label: string;
  onPress?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost' | 'spotify';
  icon?: React.ReactNode;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
};

/** Primary CTA used across onboarding, create-room, modals, etc. */
export function GradientButton({
  label,
  onPress,
  variant = 'primary',
  icon,
  disabled,
  loading,
  fullWidth = true,
}: Props) {
  const content = (
    <>
      {loading ? (
        <ActivityIndicator
          color={variant === 'secondary' || variant === 'ghost' ? colors.textPrimary : '#fff'}
        />
      ) : (
        <>
          {icon}
          <Text
            style={{
              ...typography.bodyMedium,
              fontFamily: typography.title.fontFamily,
              fontSize: 15,
              color:
                variant === 'primary' || variant === 'spotify'
                  ? '#fff'
                  : variant === 'ghost'
                    ? colors.textSecondary
                    : colors.textPrimary,
            }}
          >
            {label}
          </Text>
        </>
      )}
    </>
  );

  const rowStyle = {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    gap: spacing.sm,
    paddingVertical: 16,
    paddingHorizontal: spacing.xxl,
    borderRadius: radii.pill,
    opacity: disabled ? 0.5 : 1,
    width: fullWidth ? ('100%' as const) : undefined,
  };

  if (variant === 'primary') {
    return (
      <Pressable
        onPress={onPress}
        disabled={disabled || loading}
        style={{ width: fullWidth ? '100%' : undefined }}
      >
        <LinearGradient
          colors={colors.accentGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0.5 }}
          style={[rowStyle, shadows.violetGlow]}
        >
          {content}
        </LinearGradient>
      </Pressable>
    );
  }

  if (variant === 'spotify') {
    return (
      <Pressable
        onPress={onPress}
        disabled={disabled || loading}
        style={[rowStyle, { backgroundColor: colors.spotifyGreen }, shadows.elevated]}
      >
        {content}
      </Pressable>
    );
  }

  if (variant === 'secondary') {
    return (
      <Pressable
        onPress={onPress}
        disabled={disabled || loading}
        style={[
          rowStyle,
          { backgroundColor: colors.elevated, borderWidth: 1, borderColor: colors.borderMedium },
        ]}
      >
        {content}
      </Pressable>
    );
  }

  // ghost
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      style={[
        rowStyle,
        { backgroundColor: 'transparent', borderWidth: 1, borderColor: colors.borderStrong },
      ]}
    >
      {content}
    </Pressable>
  );
}
