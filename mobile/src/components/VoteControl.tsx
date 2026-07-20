import React from 'react';
import { View, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Text } from 'tamagui';
import { colors, radii, typography, layout } from '@/constants/tokens';

export type VoteState = 'none' | 'up' | 'down' | 'locked';

type Props = {
  count: number;
  state: VoteState;
  lockedReason?: string;
  onUpvote?: () => void;
  onDownvote?: () => void;
  size?: 'sm' | 'md';
};

const ChevronUp = ({ color }: { color: string }) => (
  <Text style={{ color, fontSize: 14, fontWeight: '900', lineHeight: 14 }}>︿</Text>
);
const ChevronDown = ({ color }: { color: string }) => (
  <Text style={{ color, fontSize: 14, fontWeight: '900', lineHeight: 14 }}>﹀</Text>
);

/**
 * The room's vote control — appears on every track row.
 * States are distinguished by fill + icon treatment, never color alone,
 * so they read correctly for color-blind users too.
 */
export function VoteControl({
  count,
  state,
  lockedReason,
  onUpvote,
  onDownvote,
  size = 'md',
}: Props) {
  const w = size === 'sm' ? 34 : layout.voteControlWidth;
  const h = size === 'sm' ? 27 : 34;

  if (state === 'locked') {
    return (
      <View style={{ alignItems: 'center' }}>
        {lockedReason ? (
          <View
            style={{
              position: 'absolute',
              top: -28,
              backgroundColor: colors.warn,
              paddingVertical: 5,
              paddingHorizontal: 9,
              borderRadius: 8,
              zIndex: 5,
              width: 150,
            }}
          >
            <Text
              style={{ ...typography.micro, color: '#0B0B10', letterSpacing: 0, fontSize: 10 }}
              numberOfLines={2}
            >
              {lockedReason}
            </Text>
          </View>
        ) : null}
        <View
          style={{
            alignItems: 'center',
            backgroundColor: '#101015',
            borderWidth: 1,
            borderColor: colors.borderSubtle,
            borderRadius: radii.xl,
            padding: 4,
            opacity: 0.55,
          }}
        >
          <View style={{ width: w, height: h, alignItems: 'center', justifyContent: 'center' }}>
            <ChevronUp color={colors.textDisabled} />
          </View>
          <Text style={{ ...typography.label, color: colors.textQuaternary }}>lock</Text>
          <View style={{ width: w, height: h, alignItems: 'center', justifyContent: 'center' }}>
            <ChevronDown color={colors.textDisabled} />
          </View>
        </View>
      </View>
    );
  }

  return (
    <View
      style={{
        alignItems: 'center',
        backgroundColor: '#16161F',
        borderWidth: 1,
        borderColor:
          state === 'up'
            ? colors.borderAccent
            : state === 'down'
              ? colors.borderViolet
              : colors.borderMedium,
        borderRadius: radii.xl,
        padding: 4,
      }}
    >
      <Pressable
        onPress={onUpvote}
        style={{
          width: w,
          height: h,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: radii.lg,
          overflow: 'hidden',
        }}
      >
        {state === 'up' ? (
          <LinearGradient colors={colors.accentGradient} style={{ ...StyleFill }}>
            <ChevronUp color="#fff" />
          </LinearGradient>
        ) : (
          <ChevronUp color={colors.textTertiary} />
        )}
      </Pressable>
      <Text
        style={{
          ...typography.label,
          color:
            state === 'up'
              ? colors.magenta
              : state === 'down'
                ? colors.textTertiary
                : colors.textPrimary,
          fontVariant: ['tabular-nums'],
        }}
      >
        {count}
      </Text>
      <Pressable
        onPress={onDownvote}
        style={{
          width: w,
          height: h,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: radii.lg,
          overflow: 'hidden',
        }}
      >
        {state === 'down' ? (
          <View style={{ ...StyleFill, backgroundColor: colors.downvoteBg }}>
            <ChevronDown color={colors.downvoteText} />
          </View>
        ) : (
          <ChevronDown color={colors.textTertiary} />
        )}
      </Pressable>
    </View>
  );
}

const StyleFill = {
  width: '100%' as const,
  height: '100%' as const,
  alignItems: 'center' as const,
  justifyContent: 'center' as const,
};
