import React from 'react';
import { View, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Text } from 'tamagui';
import { colors, spacing, radii, typography, shadows } from '@/constants/tokens';
import { Badge } from '@/components/Badge';
import { Avatar } from '@/components/Avatar';

type Room = {
  id: string;
  name: string;
  host: string;
  hostInitial: string;
  hostGradient: readonly [string, string];
  nowPlaying: string;
  listeners: number;
  visibility: 'public' | 'private';
  covers: (readonly [string, string])[];
};

const ROOMS: Room[] = [
  {
    id: '1',
    name: 'Rooftop Sessions',
    host: 'Devon',
    hostInitial: 'D',
    hostGradient: colors.accentGradient,
    nowPlaying: 'Velvet Static — Kova',
    listeners: 128,
    visibility: 'public',
    covers: [
      ['#FF8A65', '#C2185B'],
      ['#4FACFE', '#7B2FF7'],
      ['#23D5AB', '#1F3B8C'],
      ['#6A11CB', '#2575FC'],
    ],
  },
  {
    id: '2',
    name: 'Kitchen Party',
    host: 'Maya',
    hostInitial: 'M',
    hostGradient: ['#0BA360', '#3CBA92'],
    nowPlaying: 'Glass Avenue — Tycoon Park',
    listeners: 23,
    visibility: 'private',
    covers: [
      ['#A770EF', '#FDB99B'],
      ['#0BA360', '#3CBA92'],
      ['#F093FB', '#F5576C'],
      ['#FBAB7E', '#F7CE68'],
    ],
  },
];

function RoomCard({ room, height, onPress }: { room: Room; height: number; onPress?: () => void }) {
  return (
    <Pressable
      onPress={onPress}
      style={{
        borderRadius: radii.xl,
        overflow: 'hidden',
        backgroundColor: colors.surface,
        borderWidth: 1,
        borderColor: colors.borderSubtle,
      }}
    >
      <View style={{ height }}>
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            flexDirection: 'row',
            flexWrap: 'wrap',
          }}
        >
          {room.covers.map((c, i) => (
            <LinearGradient key={i} colors={c} style={{ width: '50%', height: '50%' }} />
          ))}
        </View>
        <LinearGradient
          colors={['rgba(8,8,12,0.1)', 'rgba(8,8,12,0.92)']}
          style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
        />
        <View style={{ position: 'absolute', top: 13, left: 13 }}>
          <Badge kind="live" />
        </View>
        <View style={{ position: 'absolute', top: 13, right: 13 }}>
          <Badge kind={room.visibility} />
        </View>
        <View
          style={{
            position: 'absolute',
            left: 14,
            right: 14,
            bottom: 12,
            flexDirection: 'row',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
          }}
        >
          <Text style={{ ...typography.h1, fontSize: 22, color: '#fff' }}>{room.name}</Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 6,
              backgroundColor: 'rgba(8,8,12,0.55)',
              borderWidth: 1,
              borderColor: colors.borderStrong,
              paddingVertical: 5,
              paddingHorizontal: 10,
              borderRadius: radii.pill,
            }}
          >
            <View
              style={{ width: 7, height: 7, borderRadius: 4, backgroundColor: colors.online }}
            />
            <Text style={{ ...typography.label, color: '#fff' }}>{room.listeners}</Text>
          </View>
        </View>
      </View>
      <View
        style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.md, padding: spacing.md }}
      >
        <Avatar initial={room.hostInitial} size={30} gradient={room.hostGradient} />
        <View style={{ flex: 1, minWidth: 0 }}>
          <Text style={{ ...typography.caption, color: colors.textTertiary }}>
            hosted by {room.host}
          </Text>
          <Text
            style={{ ...typography.label, color: colors.textPrimary, marginTop: 2 }}
            numberOfLines={1}
          >
            {room.nowPlaying}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

/** 02 · Home / Rooms — nearby live rooms feed. */
export function HomeScreen({
  onOpenRoom,
  onCreate,
  onOpenProfile,
}: {
  onOpenRoom?: (id: string) => void;
  onCreate?: () => void;
  onOpenProfile?: () => void;
}) {
  return (
    <View style={{ flex: 1, backgroundColor: colors.base }}>
      <SafeAreaView style={{ flex: 1 }}>
        <View
          style={{
            paddingHorizontal: spacing.xl,
            paddingTop: spacing.md,
            paddingBottom: spacing.sm,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <View>
            <Text style={{ ...typography.h1, fontSize: 27, color: colors.textPrimary }}>Rooms</Text>
            <Text style={{ ...typography.label, color: colors.textTertiary, marginTop: 4 }}>
              Mission District · 4 rooms nearby
            </Text>
          </View>
          <Pressable onPress={onOpenProfile}>
            <Avatar initial="J" size={40} gradient={['#6A11CB', '#2575FC']} />
          </Pressable>
        </View>

        <View
          style={{
            flexDirection: 'row',
            gap: spacing.sm,
            paddingHorizontal: spacing.xl,
            paddingVertical: spacing.sm,
          }}
        >
          <LinearGradient
            colors={colors.accentGradient}
            style={{ paddingVertical: 9, paddingHorizontal: 16, borderRadius: radii.pill }}
          >
            <Text style={{ ...typography.label, color: '#0B0B10' }}>Nearby</Text>
          </LinearGradient>
          <View
            style={{
              paddingVertical: 9,
              paddingHorizontal: 16,
              borderRadius: radii.pill,
              backgroundColor: colors.surface,
              borderWidth: 1,
              borderColor: colors.borderSubtle,
            }}
          >
            <Text style={{ ...typography.label, color: colors.textSecondary }}>My rooms</Text>
          </View>
          <View
            style={{
              paddingVertical: 9,
              paddingHorizontal: 16,
              borderRadius: radii.pill,
              backgroundColor: colors.surface,
              borderWidth: 1,
              borderColor: colors.borderSubtle,
            }}
          >
            <Text style={{ ...typography.label, color: colors.textSecondary }}>Joined</Text>
          </View>
        </View>

        <ScrollView
          contentContainerStyle={{
            paddingHorizontal: spacing.xl,
            paddingBottom: 110,
            gap: spacing.lg,
          }}
          showsVerticalScrollIndicator={false}
        >
          <RoomCard room={ROOMS[0]} height={152} onPress={() => onOpenRoom?.(ROOMS[0].id)} />
          <RoomCard room={ROOMS[1]} height={128} onPress={() => onOpenRoom?.(ROOMS[1].id)} />
        </ScrollView>

        <Pressable
          onPress={onCreate}
          style={{
            position: 'absolute',
            right: spacing.xl,
            bottom: 100,
            borderRadius: radii.pill,
            overflow: 'hidden',
            ...shadows.violetGlow,
          }}
        >
          <LinearGradient
            colors={colors.accentGradient}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: spacing.sm,
              paddingVertical: 14,
              paddingHorizontal: 20,
            }}
          >
            <Text style={{ color: '#fff', fontSize: 18 }}>＋</Text>
            <Text style={{ ...typography.title, fontSize: 14, color: '#fff' }}>Create</Text>
          </LinearGradient>
        </Pressable>
      </SafeAreaView>
    </View>
  );
}
