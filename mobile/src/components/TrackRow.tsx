import React from 'react';
import { View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Text } from 'tamagui';
import { colors, radii, spacing, typography, layout } from '@/constants/tokens';
import { VoteControl, VoteState } from './VoteControl';

type Props = {
  title: string;
  subtitle: string;
  coverGradient: readonly [string, string];
  voteState: VoteState;
  voteCount: number;
  lockedReason?: string;
  highlighted?: boolean; // e.g. "moving up" / actively dragged
  highlightLabel?: string;
};

/** Standard track row — used in queue, editor, search results. */
export function TrackRow({
  title,
  subtitle,
  coverGradient,
  voteState,
  voteCount,
  lockedReason,
  highlighted,
  highlightLabel,
}: Props) {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.md,
        backgroundColor: colors.card,
        borderWidth: 1,
        borderColor: highlighted ? colors.borderAccent : colors.borderSubtle,
        borderRadius: radii.lg,
        padding: spacing.md,
      }}
    >
      {highlighted && highlightLabel ? (
        <View
          style={{
            position: 'absolute',
            top: -11,
            left: spacing.md,
            backgroundColor: colors.magenta,
            paddingVertical: 3,
            paddingHorizontal: 8,
            borderRadius: radii.pill,
          }}
        >
          <Text style={{ ...typography.micro, fontSize: 9, color: '#fff' }}>{highlightLabel}</Text>
        </View>
      ) : null}
      <LinearGradient
        colors={coverGradient}
        style={{ width: layout.albumSm, height: layout.albumSm, borderRadius: radii.sm }}
      />
      <View style={{ flex: 1, minWidth: 0 }}>
        <Text
          style={{ ...typography.title, fontSize: 14, color: colors.textPrimary }}
          numberOfLines={1}
        >
          {title}
        </Text>
        <Text
          style={{ ...typography.caption, color: colors.textTertiary, marginTop: 2 }}
          numberOfLines={1}
        >
          {subtitle}
        </Text>
      </View>
      <VoteControl state={voteState} count={voteCount} lockedReason={lockedReason} size="sm" />
    </View>
  );
}
