import React from 'react';
import { View, ScrollView, Modal, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { Text } from 'tamagui';
import { colors, spacing, radii, typography, shadows } from '@/constants/tokens';
import { Avatar } from '@/components/Avatar';
import { GradientButton } from '@/components/GradientButton';

type Guest = {
  id: string;
  name: string;
  initial: string;
  gradient: readonly [string, string];
  role: string;
  controlling?: boolean;
};

const GUESTS: Guest[] = [
  {
    id: 'you',
    name: 'Jordan',
    initial: 'J',
    gradient: colors.accentGradient,
    role: 'Full control',
    controlling: true,
  },
  {
    id: '1',
    name: 'Maya',
    initial: 'M',
    gradient: ['#0BA360', '#3CBA92'],
    role: 'Guest · can vote',
  },
  {
    id: '2',
    name: 'Sam',
    initial: 'S',
    gradient: ['#FA709A', '#FEE140'],
    role: 'Guest · can vote',
  },
  {
    id: '3',
    name: 'Devon',
    initial: 'D',
    gradient: ['#FF8A65', '#C2185B'],
    role: 'Guest · can vote',
  },
];

/** 08 · Delegation — host grants playback control to a guest via modal. */
export function DelegationScreen({
  modalVisible = true,
  targetGuest = 'Maya',
  onCancel,
  onGrant,
}: {
  modalVisible?: boolean;
  targetGuest?: string;
  onCancel?: () => void;
  onGrant?: () => void;
}) {
  return (
    <View style={{ flex: 1, backgroundColor: colors.base }}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ paddingHorizontal: spacing.xl, paddingTop: spacing.md }}>
          <Text style={{ ...typography.micro, color: colors.magenta }}>
            HOST · ROOFTOP SESSIONS
          </Text>
          <Text style={{ ...typography.h1, fontSize: 24, color: colors.textPrimary, marginTop: 6 }}>
            Playback Control
          </Text>
        </View>

        <LinearGradient
          colors={['rgba(255,43,214,0.14)', 'rgba(124,77,255,0.14)']}
          style={{
            margin: spacing.xl,
            borderRadius: radii.lg,
            borderWidth: 1,
            borderColor: colors.borderViolet,
            padding: spacing.lg,
            flexDirection: 'row',
            alignItems: 'center',
            gap: spacing.md,
          }}
        >
          <View
            style={{
              width: 46,
              height: 46,
              borderRadius: radii.md,
              backgroundColor: colors.surfaceAlt,
              borderWidth: 1,
              borderColor: colors.borderMedium,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text style={{ color: colors.magenta, fontSize: 18 }}>▤</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ ...typography.title, fontSize: 14, color: colors.textPrimary }}>
              Living Room speakers
            </Text>
            <Text style={{ ...typography.label, color: colors.textTertiary }}>
              Player device · iPad
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 5,
              backgroundColor: 'rgba(43,232,165,0.14)',
              borderWidth: 1,
              borderColor: 'rgba(43,232,165,0.4)',
              borderRadius: radii.pill,
              paddingVertical: 5,
              paddingHorizontal: 9,
            }}
          >
            <View
              style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: colors.online }}
            />
            <Text style={{ ...typography.micro, fontSize: 10, color: colors.online }}>OUTPUT</Text>
          </View>
        </LinearGradient>

        <Text
          style={{
            ...typography.micro,
            color: colors.textQuaternary,
            paddingHorizontal: spacing.xl,
            marginBottom: spacing.sm,
          }}
        >
          IN THE ROOM · {GUESTS.length}
        </Text>

        <ScrollView contentContainerStyle={{ paddingHorizontal: spacing.xl, gap: spacing.md }}>
          {GUESTS.map((g) => (
            <View
              key={g.id}
              style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.md }}
            >
              <Avatar initial={g.initial} size={42} gradient={g.gradient} />
              <View style={{ flex: 1 }}>
                <Text style={{ ...typography.title, fontSize: 14, color: colors.textPrimary }}>
                  {g.name}
                  {g.id === 'you' ? (
                    <Text style={{ ...typography.micro, fontSize: 9, color: '#0B0B10' }}>
                      {' '}
                      HOST · YOU
                    </Text>
                  ) : null}
                </Text>
                <Text style={{ ...typography.label, color: colors.textTertiary }}>{g.role}</Text>
              </View>
              {g.controlling ? (
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 6,
                    backgroundColor: 'rgba(43,232,165,0.12)',
                    borderWidth: 1,
                    borderColor: 'rgba(43,232,165,0.36)',
                    borderRadius: radii.pill,
                    paddingVertical: 8,
                    paddingHorizontal: 12,
                  }}
                >
                  <Text style={{ ...typography.label, color: colors.online }}>✓ Controlling</Text>
                </View>
              ) : (
                <View
                  style={{
                    backgroundColor: colors.elevated,
                    borderWidth: 1,
                    borderColor: colors.borderMedium,
                    borderRadius: radii.pill,
                    paddingVertical: 9,
                    paddingHorizontal: 15,
                  }}
                >
                  <Text style={{ ...typography.label, color: colors.textPrimary }}>
                    Grant control
                  </Text>
                </View>
              )}
            </View>
          ))}
        </ScrollView>
      </SafeAreaView>

      <Modal visible={modalVisible} transparent animationType="fade" onRequestClose={onCancel}>
        <BlurView intensity={40} tint="dark" style={{ flex: 1, justifyContent: 'flex-end' }}>
          <View
            style={{
              margin: spacing.md,
              marginBottom: spacing.xl,
              backgroundColor: 'rgba(20,20,28,0.98)',
              borderWidth: 1,
              borderColor: colors.borderStrong,
              borderRadius: radii.xxl,
              padding: spacing.xxl,
              ...shadows.violetGlow,
            }}
          >
            <View style={{ alignItems: 'center', marginBottom: spacing.lg }}>
              <View style={{ width: 74, height: 74 }}>
                <Avatar initial="M" size={74} gradient={['#0BA360', '#3CBA92']} />
                <LinearGradient
                  colors={colors.accentGradient}
                  style={{
                    position: 'absolute',
                    bottom: -4,
                    right: -4,
                    width: 30,
                    height: 30,
                    borderRadius: 15,
                    borderWidth: 3,
                    borderColor: '#181820',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Text style={{ color: '#fff', fontSize: 13 }}>▤</Text>
                </LinearGradient>
              </View>
            </View>
            <Text
              style={{
                ...typography.h2,
                fontSize: 21,
                color: colors.textPrimary,
                textAlign: 'center',
              }}
            >
              Grant control to {targetGuest}?
            </Text>
            <Text
              style={{
                ...typography.body,
                fontSize: 13,
                color: colors.textSecondary,
                textAlign: 'center',
                marginTop: spacing.sm,
              }}
            >
              {targetGuest} will be able to play, pause, skip and reorder the queue on the Living
              Room speakers. You can revoke anytime.
            </Text>
            <View style={{ flexDirection: 'row', gap: spacing.md, marginTop: spacing.xl }}>
              <Pressable
                onPress={onCancel}
                style={{
                  flex: 1,
                  backgroundColor: colors.glassFill,
                  borderWidth: 1,
                  borderColor: colors.borderMedium,
                  borderRadius: radii.pill,
                  paddingVertical: 14,
                  alignItems: 'center',
                }}
              >
                <Text style={{ ...typography.title, fontSize: 14, color: colors.textPrimary }}>
                  Cancel
                </Text>
              </Pressable>
              <View style={{ flex: 1.4 }}>
                <GradientButton label="Grant control" onPress={onGrant} />
              </View>
            </View>
          </View>
        </BlurView>
      </Modal>
    </View>
  );
}
