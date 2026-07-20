import React from 'react';
import { View, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '@/constants/tokens';

/** Circular avatar with initial, used for hosts/guests across the app. */
export function Avatar({
  initial,
  size = 42,
  gradient = colors.accentGradient,
}: {
  initial: string;
  size?: number;
  gradient?: readonly [string, string];
}) {
  return (
    <LinearGradient
      colors={gradient}
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <View>
        {/* Text kept plain RN Text to avoid tamagui font load ordering issues on avatars */}
        <ThemedInitial initial={initial} size={size} />
      </View>
    </LinearGradient>
  );
}

function ThemedInitial({ initial, size }: { initial: string; size: number }) {
  return <Text style={{ color: '#fff', fontWeight: '700', fontSize: size * 0.36 }}>{initial}</Text>;
}
