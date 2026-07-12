import React from 'react';
import { View, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Text } from 'tamagui';
import { colors, spacing, radii, typography, layout } from '@/constants/tokens';
import { Avatar } from '@/components/Avatar';
import { TrackRow } from '@/components/TrackRow';

/** 04 · Now Playing — hero screen with live queue underneath. */
export function NowPlayingScreen({
  onBack,
  onOpenQueue,
  onOpenDelegation,
}: {
  onBack?: () => void;
  onOpenQueue?: () => void;
  onOpenDelegation?: () => void;
}) {
  return (
    <View style={{ flex: 1, backgroundColor: colors.base }}>
      <LinearGradient
        colors={['rgba(255,107,107,0.34)', 'rgba(194,24,91,0.2)', colors.base]}
        style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 480 }}
      />
      <SafeAreaView style={{ flex: 1 }}>
        <View
          style={{
            paddingHorizontal: spacing.xl,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Pressable onPress={onBack} hitSlop={12}>
            <Text style={{ ...typography.title, color: colors.textPrimary }}>⌄</Text>
          </Pressable>
          <View style={{ alignItems: 'center' }}>
            <Text style={{ ...typography.micro, color: colors.textSecondary }}>NOW PLAYING IN</Text>
            <Text style={{ ...typography.title, fontSize: 14, color: '#fff' }}>
              Rooftop Sessions
            </Text>
          </View>
          <Pressable onPress={onOpenDelegation} hitSlop={12}>
            <Text style={{ ...typography.title, color: colors.textPrimary }}>⋯</Text>
          </Pressable>
        </View>

        <View style={{ alignItems: 'center', paddingVertical: spacing.lg }}>
          <LinearGradient
            colors={['#FF8A65', '#C2185B']}
            style={{ width: layout.albumLg, height: layout.albumLg, borderRadius: radii.xl }}
          />
        </View>

        <View style={{ alignItems: 'center', paddingHorizontal: spacing.xxl }}>
          <Text style={{ ...typography.h1, fontSize: 26, color: colors.textPrimary }}>
            Velvet Static
          </Text>
          <Text style={{ ...typography.body, color: colors.textSecondary, marginTop: 4 }}>
            Kova
          </Text>
        </View>

        <View style={{ paddingHorizontal: spacing.xxl, marginTop: spacing.lg }}>
          <View style={{ height: 5, borderRadius: 3, backgroundColor: 'rgba(255,255,255,0.14)' }}>
            <LinearGradient
              colors={colors.accentGradient}
              style={{
                position: 'absolute',
                left: 0,
                top: 0,
                bottom: 0,
                width: '42%',
                borderRadius: 3,
              }}
            />
          </View>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: spacing.sm }}
          >
            <Text style={{ ...typography.caption, color: colors.textTertiary }}>1:28</Text>
            <Text style={{ ...typography.caption, color: colors.textTertiary }}>-2:01</Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: spacing.xl,
            paddingVertical: spacing.lg,
          }}
        >
          <Text style={{ fontSize: 20, color: colors.textTertiary }}>🔀</Text>
          <Text style={{ fontSize: 26, color: colors.textPrimary }}>⏮</Text>
          <LinearGradient
            colors={colors.accentGradient}
            style={{
              width: 72,
              height: 72,
              borderRadius: 36,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text style={{ fontSize: 26, color: '#fff' }}>❚❚</Text>
          </LinearGradient>
          <Text style={{ fontSize: 26, color: colors.textPrimary }}>⏭</Text>
          <Text style={{ fontSize: 20, color: colors.textTertiary }}>🔁</Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: spacing.xl,
            paddingBottom: spacing.md,
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 7,
              backgroundColor: 'rgba(43,232,165,0.12)',
              borderWidth: 1,
              borderColor: 'rgba(43,232,165,0.35)',
              borderRadius: radii.pill,
              paddingVertical: 6,
              paddingHorizontal: 11,
            }}
          >
            <Text style={{ fontSize: 12 }}>📡</Text>
            <Text style={{ ...typography.label, fontSize: 11, color: colors.online }}>
              You're in control
            </Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.sm }}>
            <View style={{ flexDirection: 'row' }}>
              <Avatar initial="D" size={26} gradient={colors.accentGradient} />
              <View style={{ marginLeft: -9 }}>
                <Avatar initial="M" size={26} gradient={['#0BA360', '#3CBA92']} />
              </View>
              <View style={{ marginLeft: -9 }}>
                <Avatar initial="S" size={26} gradient={['#FA709A', '#FEE140']} />
              </View>
            </View>
            <Text style={{ ...typography.label, color: colors.textPrimary }}>128 here</Text>
          </View>
        </View>

        <View
          style={{
            flex: 1,
            backgroundColor: colors.cardAlt,
            borderTopWidth: 1,
            borderColor: colors.borderSubtle,
            borderTopLeftRadius: radii.xl,
            borderTopRightRadius: radii.xl,
            paddingHorizontal: spacing.lg,
            paddingTop: spacing.lg,
          }}
        >
          <Pressable
            onPress={onOpenQueue}
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: spacing.md,
            }}
          >
            <Text style={{ ...typography.title, fontSize: 15, color: colors.textPrimary }}>
              Up Next · Vote
            </Text>
            <Text style={{ ...typography.label, color: colors.textTertiary }}>12 in queue</Text>
          </Pressable>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ gap: spacing.sm, paddingBottom: spacing.xl }}
          >
            <TrackRow
              title="Neon Tide"
              subtitle="AROIA · added by you"
              coverGradient={['#4FACFE', '#7B2FF7']}
              voteState="up"
              voteCount={18}
            />
            <TrackRow
              title="Gravity Lanes"
              subtitle="Bloom Reactor · added by Maya"
              coverGradient={['#A770EF', '#FDB99B']}
              voteState="none"
              voteCount={16}
              highlighted
              highlightLabel="▲ MOVING UP"
            />
            <TrackRow
              title="Lowlight"
              subtitle="Mara Vey · added by Sam"
              coverGradient={['#FA709A', '#FEE140']}
              voteState="none"
              voteCount={11}
            />
          </ScrollView>
        </View>
      </SafeAreaView>
    </View>
  );
}
