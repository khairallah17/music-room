import React from 'react';
import { TamaguiProvider } from 'tamagui';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import {
  Sora_300Light,
  Sora_400Regular,
  Sora_500Medium,
  Sora_600SemiBold,
  Sora_700Bold,
  Sora_800ExtraBold,
} from '@expo-google-fonts/sora';
import { View } from 'react-native';

import tamaguiConfig from './tamagui.config';
import { RootNavigator } from '@/navigation/RootNavigator';
import { colors } from '@/constants/tokens';

export default function App() {
  const [fontsLoaded] = useFonts({
    Sora_300Light,
    Sora_400Regular,
    Sora_500Medium,
    Sora_600SemiBold,
    Sora_700Bold,
    Sora_800ExtraBold,
  });

  if (!fontsLoaded) {
    return <View style={{ flex: 1, backgroundColor: colors.base }} />;
  }

  return (
    <TamaguiProvider config={tamaguiConfig} defaultTheme="dark">
      <StatusBar style="light" />
      <RootNavigator />
    </TamaguiProvider>
  );
}
