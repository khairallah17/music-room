import React from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Text } from 'tamagui';
import { colors, spacing, radii, typography, shadows } from '@/constants/tokens';
import { GradientButton } from '@/components/GradientButton';
import { VoteControl } from '@/components/VoteControl';

/** 01 · Onboarding — Spotify auth + guest fallback. */
export function OnboardingScreen({
  onContinue,
  onGuest,
}: {
  onContinue?: () => void;
  onGuest?: () => void;
}) {
  return (
    <View style={{ flex: 1, backgroundColor: colors.base }}>
      <LinearGradient
        colors={['rgba(124,77,255,0.32)', 'rgba(255,43,214,0.14)', colors.base]}
        style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 420 }}
      />
      <SafeAreaView
        style={{ flex: 1, paddingHorizontal: spacing.xxl, justifyContent: 'space-between' }}
      >
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <LinearGradient
            colors={colors.accentGradient}
            style={{
              width: 90,
              height: 90,
              borderRadius: radii.xl,
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: spacing.xxl,
              ...shadows.violetGlow,
            }}
          >
            <Text style={{ fontSize: 34 }}>🎵</Text>
          </LinearGradient>

          <Text style={{ ...typography.h1, fontSize: 32, color: colors.textPrimary }}>
            Music Room
          </Text>
          <Text style={{ ...typography.body, color: colors.textTertiary, marginTop: spacing.sm }}>
            Control the room. Together.
          </Text>

          <View
            style={{
              width: '100%',
              marginTop: spacing.xxl,
              backgroundColor: colors.glassFill,
              borderWidth: 1,
              borderColor: colors.borderMedium,
              borderRadius: radii.xl,
              padding: spacing.lg,
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: spacing.md,
                marginBottom: spacing.md,
              }}
            >
              <LinearGradient
                colors={['#4FACFE', '#7B2FF7']}
                style={{ width: 40, height: 40, borderRadius: radii.sm }}
              />
              <View style={{ flex: 1 }}>
                <Text style={{ ...typography.title, fontSize: 13, color: colors.textPrimary }}>
                  Neon Tide
                </Text>
                <Text style={{ ...typography.caption, color: colors.textTertiary }}>AROIA</Text>
              </View>
              <VoteControl state="up" count={9} size="sm" />
            </View>
            <Text style={{ ...typography.label, color: colors.textSecondary }}>
              Everyone votes. The queue reorders live.
            </Text>
          </View>
        </View>

        <View style={{ gap: spacing.sm, paddingBottom: spacing.xl }}>
          <GradientButton label="Continue with Spotify" variant="spotify" onPress={onContinue} />
          <GradientButton label="Continue as a guest" variant="ghost" onPress={onGuest} />
        </View>
      </SafeAreaView>
    </View>
  );
}
