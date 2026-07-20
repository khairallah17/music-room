import React, { useState } from 'react';
import { View, ScrollView, Switch, TextInput, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Text } from 'tamagui';
import { colors, spacing, radii, typography } from '@/constants/tokens';
import { GradientButton } from '@/components/GradientButton';

function ToggleRow({
  title,
  subtitle,
  value,
  onValueChange,
}: {
  title: string;
  subtitle: string;
  value: boolean;
  onValueChange: (v: boolean) => void;
}) {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: spacing.md,
      }}
    >
      <View style={{ flex: 1 }}>
        <Text style={{ ...typography.title, fontSize: 13, color: colors.textPrimary }}>
          {title}
        </Text>
        <Text style={{ ...typography.caption, color: colors.textTertiary, marginTop: 2 }}>
          {subtitle}
        </Text>
      </View>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ true: colors.violet, false: colors.elevated }}
        thumbColor="#fff"
      />
    </View>
  );
}

/** 03 · Create Room — name, visibility, playback control, restrictions. */
export function CreateRoomScreen({
  onBack,
  onCreate,
}: {
  onBack?: () => void;
  onCreate?: () => void;
}) {
  const [name, setName] = useState('Rooftop Sessions');
  const [isPrivate, setIsPrivate] = useState(true);
  const [votingWindow, setVotingWindow] = useState(true);
  const [venueOnly, setVenueOnly] = useState(true);

  return (
    <View style={{ flex: 1, backgroundColor: colors.base }}>
      <SafeAreaView style={{ flex: 1 }}>
        <View
          style={{
            paddingHorizontal: spacing.xl,
            paddingVertical: spacing.md,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Pressable onPress={onBack} hitSlop={12}>
            <Text style={{ ...typography.title, color: colors.textSecondary }}>‹</Text>
          </Pressable>
          <Text style={{ ...typography.title, fontSize: 16, color: colors.textPrimary }}>
            Create Room
          </Text>
          <Text style={{ ...typography.label, color: colors.textDisabled }}>Next</Text>
        </View>

        <ScrollView
          contentContainerStyle={{ padding: spacing.xl, gap: spacing.xl }}
          showsVerticalScrollIndicator={false}
        >
          <View style={{ flexDirection: 'row', gap: spacing.md, alignItems: 'center' }}>
            <LinearGradient
              colors={colors.accentGradient}
              style={{
                width: 74,
                height: 74,
                borderRadius: radii.lg,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Text style={{ fontSize: 26 }}>🎧</Text>
            </LinearGradient>
            <View
              style={{
                flex: 1,
                backgroundColor: colors.surfaceAlt,
                borderWidth: 1,
                borderColor: colors.borderViolet,
                borderRadius: radii.md,
                padding: spacing.md,
              }}
            >
              <Text style={{ ...typography.micro, color: colors.textQuaternary, marginBottom: 4 }}>
                ROOM NAME
              </Text>
              <TextInput
                value={name}
                onChangeText={setName}
                style={{ ...typography.title, fontSize: 17, color: colors.textPrimary, padding: 0 }}
                placeholderTextColor={colors.textTertiary}
              />
            </View>
          </View>

          <View>
            <View
              style={{
                flexDirection: 'row',
                backgroundColor: colors.surfaceAlt,
                borderWidth: 1,
                borderColor: colors.borderSubtle,
                borderRadius: radii.md,
                padding: 5,
              }}
            >
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  paddingVertical: 10,
                  borderRadius: radii.sm,
                  backgroundColor: isPrivate ? 'transparent' : colors.elevated,
                }}
                onTouchEnd={() => setIsPrivate(false)}
              >
                <Text
                  style={{
                    ...typography.label,
                    color: isPrivate ? colors.textTertiary : colors.textPrimary,
                  }}
                >
                  Public
                </Text>
              </View>
              <View
                style={{ flex: 1, borderRadius: radii.sm, overflow: 'hidden' }}
                onTouchEnd={() => setIsPrivate(true)}
              >
                {isPrivate ? (
                  <LinearGradient
                    colors={colors.accentGradient}
                    style={{ paddingVertical: 10, alignItems: 'center' }}
                  >
                    <Text style={{ ...typography.label, color: '#fff' }}>Private</Text>
                  </LinearGradient>
                ) : (
                  <View style={{ paddingVertical: 10, alignItems: 'center' }}>
                    <Text style={{ ...typography.label, color: colors.textTertiary }}>Private</Text>
                  </View>
                )}
              </View>
            </View>

            {isPrivate ? (
              <View
                style={{
                  marginTop: spacing.sm,
                  backgroundColor: colors.surfaceAlt,
                  borderWidth: 1,
                  borderStyle: 'dashed',
                  borderColor: colors.borderViolet,
                  borderRadius: radii.md,
                  padding: spacing.md,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <View>
                  <Text style={{ ...typography.micro, color: colors.textQuaternary }}>
                    INVITE CODE
                  </Text>
                  <Text
                    style={{
                      ...typography.h2,
                      fontSize: 18,
                      color: colors.textPrimary,
                      letterSpacing: 2,
                    }}
                  >
                    RF-9KQ2
                  </Text>
                </View>
                <View
                  style={{
                    backgroundColor: colors.elevated,
                    borderWidth: 1,
                    borderColor: colors.borderMedium,
                    borderRadius: radii.pill,
                    paddingVertical: 9,
                    paddingHorizontal: 14,
                  }}
                >
                  <Text style={{ ...typography.label, color: colors.textPrimary }}>Copy link</Text>
                </View>
              </View>
            ) : null}
          </View>

          <View
            style={{
              backgroundColor: colors.surfaceAlt,
              borderWidth: 1,
              borderColor: colors.borderSubtle,
              borderRadius: radii.lg,
              padding: spacing.lg,
            }}
          >
            <Text
              style={{
                ...typography.micro,
                color: colors.textQuaternary,
                marginBottom: spacing.md,
              }}
            >
              RESTRICTIONS
            </Text>
            <ToggleRow
              title="Voting window"
              subtitle="9:00 PM – 1:00 AM"
              value={votingWindow}
              onValueChange={setVotingWindow}
            />
            <ToggleRow
              title="Only people at the venue"
              subtitle="200 m radius"
              value={venueOnly}
              onValueChange={setVenueOnly}
            />
          </View>
        </ScrollView>

        <View style={{ padding: spacing.xl }}>
          <GradientButton label="Create Room" onPress={onCreate} />
        </View>
      </SafeAreaView>
    </View>
  );
}
