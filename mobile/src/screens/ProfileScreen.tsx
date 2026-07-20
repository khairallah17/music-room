import React from 'react';
import { View, ScrollView, Switch, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Text } from 'tamagui';
import { colors, spacing, radii, typography } from '@/constants/tokens';
import { Avatar } from '@/components/Avatar';

function PrefRow({ icon, label, right }: { icon: string; label: string; right: React.ReactNode }) {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 15,
        paddingHorizontal: spacing.lg,
        borderBottomWidth: 1,
        borderColor: colors.borderSubtle,
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.md }}>
        <Text style={{ color: colors.textSecondary }}>{icon}</Text>
        <Text style={{ ...typography.bodyMedium, fontSize: 14, color: colors.textPrimary }}>
          {label}
        </Text>
      </View>
      {right}
    </View>
  );
}

/** 09 · Profile / Settings. */
export function ProfileScreen({ onSignOut }: { onSignOut?: () => void }) {
  return (
    <View style={{ flex: 1, backgroundColor: colors.base }}>
      <LinearGradient
        colors={['rgba(124,77,255,0.2)', colors.base]}
        style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 260 }}
      />
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ alignItems: 'center', paddingVertical: spacing.xl }}>
          <Avatar initial="J" size={84} gradient={['#6A11CB', '#2575FC']} />
          <Text
            style={{
              ...typography.h1,
              fontSize: 23,
              color: colors.textPrimary,
              marginTop: spacing.md,
            }}
          >
            Jordan Reyes
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 7,
              backgroundColor: colors.spotifyGreen,
              borderRadius: radii.pill,
              paddingVertical: 6,
              paddingHorizontal: 13,
              marginTop: spacing.sm,
            }}
          >
            <Text style={{ color: '#fff', fontSize: 12 }}>♪</Text>
            <Text style={{ ...typography.label, color: '#fff' }}>Spotify connected</Text>
          </View>
        </View>

        <ScrollView
          contentContainerStyle={{
            paddingHorizontal: spacing.xl,
            gap: spacing.xl,
            paddingBottom: spacing.xxl,
          }}
        >
          <View>
            <Text
              style={{
                ...typography.micro,
                color: colors.textQuaternary,
                marginBottom: spacing.sm,
              }}
            >
              YOUR ROOMS
            </Text>
            <View style={{ flexDirection: 'row', gap: spacing.sm }}>
              {[
                {
                  name: 'Rooftop Sessions',
                  meta: 'Hosted · live',
                  gradient: ['#FF8A65', '#C2185B'] as const,
                },
                {
                  name: 'Kitchen Party',
                  meta: 'Joined · 2d ago',
                  gradient: ['#0BA360', '#3CBA92'] as const,
                },
                {
                  name: 'Late Shift',
                  meta: 'Hosted · ended',
                  gradient: ['#6A11CB', '#2575FC'] as const,
                },
              ].map((r) => (
                <View key={r.name} style={{ flex: 1 }}>
                  <LinearGradient
                    colors={r.gradient}
                    style={{ height: 74, borderRadius: radii.md }}
                  />
                  <Text
                    style={{
                      ...typography.label,
                      fontSize: 12,
                      color: colors.textPrimary,
                      marginTop: 7,
                    }}
                    numberOfLines={1}
                  >
                    {r.name}
                  </Text>
                  <Text style={{ ...typography.caption, fontSize: 10, color: colors.textTertiary }}>
                    {r.meta}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          <View>
            <Text
              style={{
                ...typography.micro,
                color: colors.textQuaternary,
                marginBottom: spacing.sm,
              }}
            >
              PREFERENCES
            </Text>
            <View
              style={{
                backgroundColor: colors.cardAlt,
                borderWidth: 1,
                borderColor: colors.borderSubtle,
                borderRadius: radii.lg,
                overflow: 'hidden',
              }}
            >
              <PrefRow
                icon="◐"
                label="Theme"
                right={<Text style={{ ...typography.label, color: colors.magenta }}>Dark</Text>}
              />
              <PrefRow
                icon="🔔"
                label="Notifications"
                right={
                  <Switch
                    value
                    trackColor={{ true: colors.violet, false: colors.elevated }}
                    thumbColor="#fff"
                  />
                }
              />
              <View style={{ borderBottomWidth: 0 }}>
                <PrefRow
                  icon="📍"
                  label="Location · while using"
                  right={
                    <View
                      style={{
                        backgroundColor: 'rgba(43,232,165,0.12)',
                        borderWidth: 1,
                        borderColor: 'rgba(43,232,165,0.36)',
                        borderRadius: radii.pill,
                        paddingVertical: 5,
                        paddingHorizontal: 10,
                      }}
                    >
                      <Text style={{ ...typography.label, fontSize: 11, color: colors.online }}>
                        Allowed
                      </Text>
                    </View>
                  }
                />
              </View>
            </View>
          </View>

          <Pressable onPress={onSignOut}>
            <Text style={{ ...typography.title, fontSize: 14, color: colors.danger }}>
              Sign out
            </Text>
          </Pressable>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
