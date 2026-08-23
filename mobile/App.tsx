import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { TamaguiProvider } from 'tamagui';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
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
import { store } from '@/store/store';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { bootstrapSession, hydrateAuth, selectIsHydrated } from '@/store/authSlice';
import { loadApiUrlOverride } from '@/store/configSlice';

SplashScreen.preventAutoHideAsync().catch(() => {});

// Split out from App() because useAppSelector/useAppDispatch need to run
// inside <Provider store={store}>, which App() itself renders.
function AppContent() {
  const [fontsLoaded] = useFonts({
    Sora_300Light,
    Sora_400Regular,
    Sora_500Medium,
    Sora_600SemiBold,
    Sora_700Bold,
    Sora_800ExtraBold,
  });
  const dispatch = useAppDispatch();
  const isHydrated = useAppSelector(selectIsHydrated);

  useEffect(() => {
    dispatch(loadApiUrlOverride());
    dispatch(hydrateAuth()).then(() => {
      dispatch(bootstrapSession());
    });
  }, [dispatch]);

  useEffect(() => {
    if (fontsLoaded && isHydrated) {
      SplashScreen.hideAsync().catch(() => {});
    }
  }, [fontsLoaded, isHydrated]);

  if (!fontsLoaded || !isHydrated) {
    return <View style={{ flex: 1, backgroundColor: colors.base }} />;
  }

  return (
    <TamaguiProvider config={tamaguiConfig} defaultTheme="dark">
      <StatusBar style="light" />
      <RootNavigator />
    </TamaguiProvider>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}
