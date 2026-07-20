import React from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Text } from 'tamagui';
import { colors, spacing, radii, typography, shadows } from '@/constants/tokens';
import { GradientButton } from '@/components/GradientButton';

/** 05b · Empty queue state. */
export function EmptyQueueScreen({ onAddTrack }: { onAddTrack?: () => void }) {
  return (
    <View style={{ flex: 1, backgroundColor: colors.base }}>
      <SafeAreaView style={{ flex: 1, justifyContent: 'space-between' }}>
        <Text
          style={{
            ...typography.h1,
            fontSize: 24,
            color: colors.textPrimary,
            paddingHorizontal: spacing.xl,
            paddingTop: spacing.md,
          }}
        >
          Up Next · Vote
        </Text>

        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: spacing.xxl,
          }}
        >
          <View
            style={{
              width: 78,
              height: 78,
              borderRadius: 39,
              backgroundColor: colors.card,
              borderWidth: 1,
              borderColor: colors.borderSubtle,
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: spacing.xl,
            }}
          >
            <Text style={{ fontSize: 30 }}>🎶</Text>
          </View>
          <Text style={{ ...typography.h1, fontSize: 22, color: colors.textPrimary }}>
            Queue's empty
          </Text>
          <Text
            style={{
              ...typography.body,
              color: colors.textTertiary,
              textAlign: 'center',
              marginTop: spacing.sm,
            }}
          >
            Be the first to add a track — everyone in the room votes it up from here.
          </Text>
          <View style={{ marginTop: spacing.xl }}>
            <GradientButton
              label="＋  Add the first track"
              onPress={onAddTrack}
              fullWidth={false}
            />
          </View>
        </View>

        <View
          style={{
            margin: spacing.lg,
            backgroundColor: colors.glassFill,
            borderWidth: 1,
            borderColor: colors.borderMedium,
            borderRadius: radii.lg,
            padding: spacing.md,
            flexDirection: 'row',
            alignItems: 'center',
            gap: spacing.md,
          }}
        >
          <LinearGradient
            colors={['#FF8A65', '#C2185B']}
            style={{ width: 44, height: 44, borderRadius: radii.sm }}
          />
          <View style={{ flex: 1 }}>
            <Text style={{ ...typography.title, fontSize: 13, color: colors.textPrimary }}>
              Velvet Static
            </Text>
            <Text style={{ ...typography.caption, color: colors.magenta, marginTop: 2 }}>
              Kova · now playing
            </Text>
          </View>
          <LinearGradient
            colors={colors.accentGradient}
            style={{
              width: 42,
              height: 42,
              borderRadius: 21,
              alignItems: 'center',
              justifyContent: 'center',
              ...shadows.accentGlow,
            }}
          >
            <Text style={{ color: '#fff' }}>❚❚</Text>
          </LinearGradient>
        </View>
      </SafeAreaView>
    </View>
  );
}
