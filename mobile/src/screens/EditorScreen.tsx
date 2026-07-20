import React from 'react';
import { View, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Text } from 'tamagui';
import { colors, spacing, radii, typography } from '@/constants/tokens';
import { Avatar } from '@/components/Avatar';

type EditorRow = {
  id: string;
  title: string;
  subtitle: string;
  gradient: readonly [string, string];
  editingBy?: string; // shown as a pill above the row while someone else edits it
  dragging?: boolean;
};

const ROWS: EditorRow[] = [
  {
    id: '1',
    title: 'Velvet Static',
    subtitle: 'Kova · added by you',
    gradient: ['#FF8A65', '#C2185B'],
  },
  {
    id: '2',
    title: 'Neon Tide',
    subtitle: 'AROIA · added by Maya',
    gradient: ['#4FACFE', '#7B2FF7'],
    editingBy: 'Maya is editing',
  },
  {
    id: '3',
    title: 'Gravity Lanes',
    subtitle: 'Bloom Reactor · added by Jordan',
    gradient: ['#A770EF', '#FDB99B'],
    dragging: true,
  },
  {
    id: '4',
    title: 'Lowlight',
    subtitle: 'Mara Vey · added by Sam',
    gradient: ['#FA709A', '#FEE140'],
  },
];

/** 07 · Collaborative Editor — live cursors / drag from multiple guests. */
export function EditorScreen({
  onBack,
  onAddTrack,
}: {
  onBack?: () => void;
  onAddTrack?: () => void;
}) {
  return (
    <View style={{ flex: 1, backgroundColor: colors.base }}>
      <SafeAreaView style={{ flex: 1 }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: spacing.xl,
            paddingVertical: spacing.md,
          }}
        >
          <Pressable onPress={onBack} hitSlop={12}>
            <Text style={{ ...typography.title, color: colors.textSecondary }}>‹</Text>
          </Pressable>
          <Text style={{ ...typography.title, fontSize: 16, color: colors.textPrimary }}>
            Edit Playlist
          </Text>
          <Pressable onPress={onBack} hitSlop={12}>
            <Text style={{ ...typography.label, color: colors.magenta }}>Done</Text>
          </Pressable>
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: spacing.sm,
            paddingHorizontal: spacing.xl,
            paddingBottom: spacing.md,
          }}
        >
          <View style={{ flexDirection: 'row' }}>
            <Avatar initial="M" size={28} gradient={['#0BA360', '#3CBA92']} />
            <View style={{ marginLeft: -8 }}>
              <Avatar initial="J" size={28} gradient={['#FF8A65', '#C2185B']} />
            </View>
            <View style={{ marginLeft: -8 }}>
              <Avatar initial="S" size={28} gradient={['#4FACFE', '#7B2FF7']} />
            </View>
          </View>
          <Text style={{ ...typography.label, color: colors.textTertiary }}>
            <Text style={{ color: colors.textPrimary }}>3 people</Text> editing now
          </Text>
        </View>

        <ScrollView
          contentContainerStyle={{
            paddingHorizontal: spacing.lg,
            gap: spacing.sm,
            paddingBottom: spacing.xxl,
          }}
        >
          {ROWS.map((row) => (
            <View
              key={row.id}
              style={{
                position: 'relative',
                flexDirection: 'row',
                alignItems: 'center',
                gap: spacing.sm,
                backgroundColor: colors.card,
                borderWidth: 1,
                borderColor: row.dragging
                  ? colors.borderAccent
                  : row.editingBy
                    ? colors.online
                    : colors.borderSubtle,
                borderRadius: radii.md,
                padding: spacing.sm,
              }}
            >
              {row.editingBy ? (
                <View
                  style={{
                    position: 'absolute',
                    top: -10,
                    right: 14,
                    backgroundColor: colors.online,
                    borderRadius: radii.pill,
                    paddingVertical: 3,
                    paddingHorizontal: 8,
                  }}
                >
                  <Text style={{ ...typography.micro, fontSize: 9, color: '#fff' }}>
                    {row.editingBy}
                  </Text>
                </View>
              ) : null}
              {row.dragging ? (
                <View
                  style={{
                    position: 'absolute',
                    top: -10,
                    left: 14,
                    backgroundColor: colors.magenta,
                    borderRadius: radii.pill,
                    paddingVertical: 3,
                    paddingHorizontal: 8,
                  }}
                >
                  <Text style={{ ...typography.micro, fontSize: 9, color: '#fff' }}>
                    Jordan is dragging
                  </Text>
                </View>
              ) : null}
              <Text
                style={{ color: row.dragging ? colors.magenta : colors.textDisabled, fontSize: 16 }}
              >
                ☰
              </Text>
              <LinearGradient
                colors={row.gradient}
                style={{ width: 44, height: 44, borderRadius: radii.sm }}
              />
              <View style={{ flex: 1, minWidth: 0 }}>
                <Text
                  style={{ ...typography.title, fontSize: 14, color: colors.textPrimary }}
                  numberOfLines={1}
                >
                  {row.title}
                </Text>
                <Text
                  style={{ ...typography.caption, color: colors.textTertiary, marginTop: 2 }}
                  numberOfLines={1}
                >
                  {row.subtitle}
                </Text>
              </View>
              <Text style={{ color: colors.textDisabled, fontSize: 16 }}>✕</Text>
            </View>
          ))}

          <Pressable
            onPress={onAddTrack}
            style={{
              borderWidth: 1,
              borderStyle: 'dashed',
              borderColor: colors.borderStrong,
              borderRadius: radii.md,
              paddingVertical: 13,
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'center',
              gap: spacing.sm,
            }}
          >
            <Text style={{ color: colors.textTertiary }}>＋</Text>
            <Text style={{ ...typography.label, color: colors.textTertiary }}>Add a track</Text>
          </Pressable>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
