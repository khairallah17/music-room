import React from 'react';
import { View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Text } from 'tamagui';
import { colors, radii, typography } from '@/constants/tokens';

type Kind = 'live' | 'public' | 'private' | 'host' | 'venue' | 'online' | 'neutral';

const KIND_CONFIG: Record<
  Kind,
  { label: string; bg: string; border: string; text: string; dot?: boolean }
> = {
  live: {
    label: 'LIVE',
    bg: 'rgba(255,43,214,0.16)',
    border: colors.borderAccent,
    text: '#fff',
    dot: true,
  },
  public: {
    label: 'PUBLIC',
    bg: 'rgba(255,255,255,0.06)',
    border: colors.borderStrong,
    text: colors.textSecondary,
  },
  private: {
    label: 'PRIVATE',
    bg: 'rgba(255,255,255,0.06)',
    border: colors.borderStrong,
    text: colors.textSecondary,
  },
  host: { label: 'HOST', bg: '', border: '', text: '#0B0B10' },
  venue: {
    label: 'AT VENUE',
    bg: 'rgba(43,232,165,0.12)',
    border: 'rgba(43,232,165,0.4)',
    text: colors.online,
  },
  online: {
    label: 'ONLINE',
    bg: 'rgba(43,232,165,0.14)',
    border: 'rgba(43,232,165,0.4)',
    text: colors.online,
  },
  neutral: {
    label: '',
    bg: 'rgba(255,255,255,0.06)',
    border: colors.borderStrong,
    text: colors.textSecondary,
  },
};

type Props = {
  kind: Kind;
  label?: string; // overrides default label
};

/** Small pill badge — LIVE / PUBLIC / PRIVATE / HOST / AT VENUE etc. */
export function Badge({ kind, label }: Props) {
  const cfg = KIND_CONFIG[kind];
  const text = label ?? cfg.label;

  if (kind === 'host') {
    return (
      <LinearGradient
        colors={colors.accentGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0.5 }}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 6,
          paddingVertical: 6,
          paddingHorizontal: 11,
          borderRadius: radii.pill,
        }}
      >
        <Text style={{ ...typography.micro, color: cfg.text }}>{text}</Text>
      </LinearGradient>
    );
  }

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        paddingVertical: 6,
        paddingHorizontal: 11,
        borderRadius: radii.pill,
        backgroundColor: cfg.bg,
        borderWidth: 1,
        borderColor: cfg.border,
      }}
    >
      {cfg.dot ? (
        <View style={{ width: 7, height: 7, borderRadius: 4, backgroundColor: colors.magenta }} />
      ) : null}
      <Text style={{ ...typography.micro, color: cfg.text }}>{text}</Text>
    </View>
  );
}
