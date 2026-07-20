import React, { useState } from 'react';
import { View, ScrollView, TextInput, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Text } from 'tamagui';
import { colors, spacing, radii, typography } from '@/constants/tokens';

type Result = {
  id: string;
  title: string;
  subtitle: string;
  gradient: readonly [string, string];
  addedByYou?: boolean;
};

const RESULTS: Result[] = [
  {
    id: '1',
    title: 'Sunset Boulevard',
    subtitle: 'Hibiscus Theory · 3:42',
    gradient: ['#FF8A65', '#C2185B'],
  },
  {
    id: '2',
    title: 'Golden Hour',
    subtitle: '',
    gradient: ['#FBAB7E', '#F7CE68'],
    addedByYou: true,
  },
  {
    id: '3',
    title: 'After the Sun',
    subtitle: 'Odeon Park · 4:05',
    gradient: ['#6A11CB', '#2575FC'],
  },
  { id: '4', title: 'Dusk Signal', subtitle: 'Mara Vey · 2:58', gradient: ['#0BA360', '#3CBA92'] },
  { id: '5', title: 'Sunset Static', subtitle: 'Kova · 3:11', gradient: ['#F093FB', '#F5576C'] },
];

/** 06 · Add / Search — search Spotify catalog, add to queue. */
export function SearchScreen({
  onCancel,
  onAdd,
}: {
  onCancel?: () => void;
  onAdd?: (id: string) => void;
}) {
  const [query, setQuery] = useState('sunset');

  return (
    <View style={{ flex: 1, backgroundColor: colors.base }}>
      <SafeAreaView style={{ flex: 1 }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: spacing.md,
            paddingHorizontal: spacing.xl,
            paddingTop: spacing.md,
          }}
        >
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              gap: spacing.sm,
              backgroundColor: colors.surfaceAlt,
              borderWidth: 1,
              borderColor: colors.borderViolet,
              borderRadius: radii.md,
              paddingVertical: 13,
              paddingHorizontal: spacing.md,
            }}
          >
            <Text style={{ color: colors.magenta }}>⌕</Text>
            <TextInput
              value={query}
              onChangeText={setQuery}
              style={{ ...typography.bodyMedium, color: colors.textPrimary, flex: 1, padding: 0 }}
              placeholderTextColor={colors.textTertiary}
            />
          </View>
          <Pressable onPress={onCancel} hitSlop={12}>
            <Text style={{ ...typography.label, color: colors.textTertiary }}>Cancel</Text>
          </Pressable>
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: spacing.xl,
            paddingVertical: spacing.md,
          }}
        >
          <Text style={{ ...typography.label, color: colors.textTertiary }}>Results · Spotify</Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 6,
              backgroundColor: 'rgba(255,43,214,0.12)',
              borderWidth: 1,
              borderColor: 'rgba(255,43,214,0.35)',
              borderRadius: radii.pill,
              paddingVertical: 6,
              paddingHorizontal: 11,
            }}
          >
            <Text style={{ ...typography.micro, color: colors.magenta }}>
              ＋ Your additions · 3
            </Text>
          </View>
        </View>

        <ScrollView
          contentContainerStyle={{
            paddingHorizontal: spacing.lg,
            gap: spacing.xs,
            paddingBottom: spacing.xxl,
          }}
        >
          {RESULTS.map((r) => (
            <View
              key={r.id}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: spacing.md,
                padding: spacing.sm,
                borderRadius: radii.md,
                backgroundColor: r.addedByYou ? 'rgba(43,232,165,0.06)' : 'transparent',
                borderWidth: r.addedByYou ? 1 : 0,
                borderColor: 'rgba(43,232,165,0.22)',
              }}
            >
              <LinearGradient
                colors={r.gradient}
                style={{ width: 48, height: 48, borderRadius: radii.sm }}
              />
              <View style={{ flex: 1, minWidth: 0 }}>
                <Text
                  style={{ ...typography.title, fontSize: 14, color: colors.textPrimary }}
                  numberOfLines={1}
                >
                  {r.title}
                </Text>
                {r.addedByYou ? (
                  <Text style={{ ...typography.label, color: colors.online, marginTop: 2 }}>
                    ✓ Added by you
                  </Text>
                ) : (
                  <Text style={{ ...typography.caption, color: colors.textTertiary, marginTop: 2 }}>
                    {r.subtitle}
                  </Text>
                )}
              </View>
              <Pressable
                onPress={() => onAdd?.(r.id)}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: r.addedByYou ? 'rgba(43,232,165,0.16)' : colors.elevated,
                  borderWidth: 1,
                  borderColor: r.addedByYou ? 'rgba(43,232,165,0.4)' : colors.borderMedium,
                }}
              >
                <Text
                  style={{ color: r.addedByYou ? colors.online : colors.textPrimary, fontSize: 16 }}
                >
                  {r.addedByYou ? '✓' : '＋'}
                </Text>
              </Pressable>
            </View>
          ))}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
