import React from 'react';
import { View, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from 'tamagui';
import { colors, spacing, radii, typography } from '@/constants/tokens';
import { TrackRow } from '@/components/TrackRow';

/** 05 · Track Vote — every VoteControl state in queue context. */
export function TrackVoteScreen({ onBack }: { onBack?: () => void }) {
  return (
    <View style={{ flex: 1, backgroundColor: colors.base }}>
      <SafeAreaView style={{ flex: 1 }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: spacing.sm,
            paddingHorizontal: spacing.xl,
            paddingTop: spacing.md,
          }}
        >
          <Pressable onPress={onBack} hitSlop={12}>
            <Text style={{ ...typography.title, color: colors.textSecondary }}>‹</Text>
          </Pressable>
          <Text style={{ ...typography.h1, fontSize: 24, color: colors.textPrimary }}>
            Up Next · Vote
          </Text>
        </View>

        <View
          style={{
            margin: spacing.xl,
            marginTop: spacing.md,
            flexDirection: 'row',
            alignItems: 'center',
            gap: spacing.sm,
            backgroundColor: 'rgba(43,232,165,0.1)',
            borderWidth: 1,
            borderColor: 'rgba(43,232,165,0.32)',
            borderRadius: radii.md,
            padding: spacing.md,
          }}
        >
          <Text style={{ fontSize: 16 }}>📍</Text>
          <View>
            <Text style={{ ...typography.label, color: colors.online }}>
              Voting open · you're at the venue
            </Text>
            <Text style={{ ...typography.caption, color: colors.textTertiary }}>
              Window closes 1:00 AM
            </Text>
          </View>
        </View>

        <ScrollView
          contentContainerStyle={{
            paddingHorizontal: spacing.xl,
            gap: spacing.sm,
            paddingBottom: spacing.xxl,
          }}
        >
          <TrackRow
            title="Neon Tide"
            subtitle="AROIA · added by you"
            coverGradient={['#4FACFE', '#7B2FF7']}
            voteState="up"
            voteCount={18}
          />
          <Text style={{ ...typography.micro, color: colors.magenta, paddingLeft: 4 }}>
            UPVOTED
          </Text>

          <TrackRow
            title="Lowlight"
            subtitle="Mara Vey · added by Sam"
            coverGradient={['#FA709A', '#FEE140']}
            voteState="none"
            voteCount={11}
          />
          <Text style={{ ...typography.micro, color: colors.textTertiary, paddingLeft: 4 }}>
            NOT VOTED
          </Text>

          <TrackRow
            title="Saudade"
            subtitle="Lux Mira · added by Devon"
            coverGradient={['#FBAB7E', '#F7CE68']}
            voteState="down"
            voteCount={6}
          />
          <Text style={{ ...typography.micro, color: colors.downvoteText, paddingLeft: 4 }}>
            DOWNVOTED
          </Text>

          <TrackRow
            title="Glass Avenue"
            subtitle="Tycoon Park · host pick"
            coverGradient={['#23D5AB', '#1F3B8C']}
            voteState="locked"
            voteCount={0}
            lockedReason="Host locked this track from voting"
          />
          <Text style={{ ...typography.micro, color: colors.textQuaternary, paddingLeft: 4 }}>
            VOTE-LOCKED · with tooltip
          </Text>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
