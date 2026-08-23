import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import {
  OnboardingRoute,
  DevSettingsRoute,
  LoginRoute,
  SignupRoute,
  ForgotPasswordRoute,
  ResetPasswordRoute,
  VerifyEmailPendingRoute,
  HomeRoute,
  CreateRoomRoute,
  NowPlayingRoute,
  TrackVoteRoute,
  EmptyQueueRoute,
  SearchRoute,
  EditorRoute,
  DelegationRoute,
  ProfileRoute,
} from './routes';
import { linking } from './linking';
import { navigationRef } from './navigationRef';
import type { RootStackParamList } from './types';
import { colors } from '@/constants/tokens';
import { selectIsAuthenticated } from '@/store/authSlice';
import { useAppSelector } from '@/store/hooks';

export type { RootStackParamList };

const Stack = createNativeStackNavigator<RootStackParamList>();

/**
 * Every screen is a plain presentational component (see src/screens) with
 * no react-navigation knowledge of its own. The route components in
 * ./routes.tsx map their callback props to real navigation calls, so this
 * stack just declares the routes and their params.
 */
export function RootNavigator() {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  return (
    <NavigationContainer ref={navigationRef} linking={linking}>
      <Stack.Navigator
        initialRouteName={isAuthenticated ? 'Home' : 'Onboarding'}
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: colors.base },
        }}
      >
        <Stack.Screen name="Onboarding" component={OnboardingRoute} />
        <Stack.Screen name="Login" component={LoginRoute} />
        <Stack.Screen name="Signup" component={SignupRoute} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordRoute} />
        <Stack.Screen name="ResetPassword" component={ResetPasswordRoute} />
        <Stack.Screen name="VerifyEmailPending" component={VerifyEmailPendingRoute} />
        <Stack.Screen name="DevSettings" component={DevSettingsRoute} />
        <Stack.Screen name="Home" component={HomeRoute} />
        <Stack.Screen name="CreateRoom" component={CreateRoomRoute} />
        <Stack.Screen name="NowPlaying" component={NowPlayingRoute} />
        <Stack.Screen name="TrackVote" component={TrackVoteRoute} />
        <Stack.Screen name="EmptyQueue" component={EmptyQueueRoute} />
        <Stack.Screen name="Search" component={SearchRoute} />
        <Stack.Screen name="Editor" component={EditorRoute} />
        <Stack.Screen name="Delegation" component={DelegationRoute} />
        <Stack.Screen name="Profile" component={ProfileRoute} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
