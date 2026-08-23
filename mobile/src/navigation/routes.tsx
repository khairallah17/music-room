import React from 'react';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { OnboardingScreen } from '@/screens/OnboardingScreen';
import { DevSettingsScreen } from '@/screens/DevSettingsScreen';
import { LoginScreen } from '@/screens/auth/LoginScreen';
import { SignupScreen } from '@/screens/auth/SignupScreen';
import { ForgotPasswordScreen } from '@/screens/auth/ForgotPasswordScreen';
import { ResetPasswordScreen } from '@/screens/auth/ResetPasswordScreen';
import { VerifyEmailPendingScreen } from '@/screens/auth/VerifyEmailPendingScreen';
import { HomeScreen } from '@/screens/HomeScreen';
import { CreateRoomScreen } from '@/screens/CreateRoomScreen';
import { NowPlayingScreen } from '@/screens/NowPlayingScreen';
import { TrackVoteScreen } from '@/screens/TrackVoteScreen';
import { EmptyQueueScreen } from '@/screens/EmptyQueueScreen';
import { SearchScreen } from '@/screens/SearchScreen';
import { EditorScreen } from '@/screens/EditorScreen';
import { DelegationScreen } from '@/screens/DelegationScreen';
import { ProfileScreen } from '@/screens/ProfileScreen';
import { useOAuth } from '@/hooks/useOAuth';
import {
  useLoginMutation,
  useSignupMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useVerifyEmailMutation,
  useResendVerificationMutation,
  useLogoutMutation,
} from '@/api/apiSlice';
import { selectRefreshToken, signOut } from '@/store/authSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import type { RootStackParamList } from './types';

/**
 * One route component per screen, each mapping the presentational screen's
 * callback props to real navigation calls (and, for auth, RTK Query's
 * generated hooks + useOAuth.ts for the session side-effects). Screens stay
 * navigation-agnostic — all the wiring lives here.
 */

export function OnboardingRoute({
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'Onboarding'>) {
  const google = useOAuth('google');

  const afterOAuthSuccess = () => navigation.reset({ index: 0, routes: [{ name: 'Home' }] });

  return (
    <OnboardingScreen
      onLogin={() => navigation.navigate('Login')}
      onSignup={() => navigation.navigate('Signup')}
      onContinueWithGoogle={() => google.start().then(afterOAuthSuccess)}
      onOpenDevSettings={() => navigation.navigate('DevSettings')}
    />
  );
}

export function DevSettingsRoute({
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'DevSettings'>) {
  return <DevSettingsScreen onBack={() => navigation.goBack()} />;
}

export function LoginRoute({ navigation }: NativeStackScreenProps<RootStackParamList, 'Login'>) {
  const [login] = useLoginMutation();
  return (
    <LoginScreen
      onSubmit={async (email, password) => {
        await login({ email, password }).unwrap();
        navigation.reset({ index: 0, routes: [{ name: 'Home' }] });
      }}
      onForgotPassword={() => navigation.navigate('ForgotPassword')}
      onGoToSignup={() => navigation.replace('Signup')}
      onBack={() => navigation.goBack()}
    />
  );
}

export function SignupRoute({ navigation }: NativeStackScreenProps<RootStackParamList, 'Signup'>) {
  const [signup] = useSignupMutation();
  return (
    <SignupScreen
      onSubmit={async (email, password) => {
        await signup({ email, password }).unwrap();
        navigation.replace('VerifyEmailPending', { email });
      }}
      onGoToLogin={() => navigation.replace('Login')}
      onBack={() => navigation.goBack()}
    />
  );
}

export function ForgotPasswordRoute({
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'ForgotPassword'>) {
  const [forgotPassword] = useForgotPasswordMutation();
  return (
    <ForgotPasswordScreen
      onSubmit={async (email) => {
        await forgotPassword(email).unwrap();
      }}
      onBack={() => navigation.goBack()}
    />
  );
}

export function ResetPasswordRoute({
  navigation,
  route,
}: NativeStackScreenProps<RootStackParamList, 'ResetPassword'>) {
  const [resetPassword] = useResetPasswordMutation();
  return (
    <ResetPasswordScreen
      token={route.params?.token}
      onSubmit={async (token, newPassword) => {
        await resetPassword({ token, newPassword }).unwrap();
      }}
      onBack={() => navigation.reset({ index: 0, routes: [{ name: 'Login' }] })}
    />
  );
}

export function VerifyEmailPendingRoute({
  navigation,
  route,
}: NativeStackScreenProps<RootStackParamList, 'VerifyEmailPending'>) {
  const [verifyEmail] = useVerifyEmailMutation();
  const [resendVerification] = useResendVerificationMutation();
  return (
    <VerifyEmailPendingScreen
      email={route.params?.email}
      token={route.params?.token}
      onVerify={async (token) => {
        await verifyEmail(token).unwrap();
      }}
      onResend={async (email) => {
        await resendVerification(email).unwrap();
      }}
      onDone={() => navigation.reset({ index: 0, routes: [{ name: 'Login' }] })}
      onBack={() => navigation.reset({ index: 0, routes: [{ name: 'Onboarding' }] })}
    />
  );
}

export function HomeRoute({ navigation }: NativeStackScreenProps<RootStackParamList, 'Home'>) {
  return (
    <HomeScreen
      onOpenRoom={(roomId) => navigation.navigate('NowPlaying', { roomId })}
      onCreate={() => navigation.navigate('CreateRoom')}
      onOpenProfile={() => navigation.navigate('Profile')}
    />
  );
}

export function CreateRoomRoute({
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'CreateRoom'>) {
  return (
    <CreateRoomScreen
      onBack={() => navigation.goBack()}
      onCreate={() => navigation.navigate('NowPlaying', { roomId: 'new-room' })}
    />
  );
}

export function NowPlayingRoute({
  navigation,
  route,
}: NativeStackScreenProps<RootStackParamList, 'NowPlaying'>) {
  return (
    <NowPlayingScreen
      onBack={() => navigation.goBack()}
      onOpenQueue={() => navigation.navigate('TrackVote', { roomId: route.params.roomId })}
      onOpenDelegation={() => navigation.navigate('Delegation', { roomId: route.params.roomId })}
    />
  );
}

export function TrackVoteRoute({
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'TrackVote'>) {
  return <TrackVoteScreen onBack={() => navigation.goBack()} />;
}

export function EmptyQueueRoute({
  navigation,
  route,
}: NativeStackScreenProps<RootStackParamList, 'EmptyQueue'>) {
  return (
    <EmptyQueueScreen
      onAddTrack={() => navigation.navigate('Search', { roomId: route.params?.roomId })}
    />
  );
}

export function SearchRoute({ navigation }: NativeStackScreenProps<RootStackParamList, 'Search'>) {
  return <SearchScreen onCancel={() => navigation.goBack()} />;
}

export function EditorRoute({
  navigation,
  route,
}: NativeStackScreenProps<RootStackParamList, 'Editor'>) {
  return (
    <EditorScreen
      onBack={() => navigation.goBack()}
      onAddTrack={() => navigation.navigate('Search', { playlistId: route.params.playlistId })}
    />
  );
}

export function DelegationRoute({
  navigation,
  route,
}: NativeStackScreenProps<RootStackParamList, 'Delegation'>) {
  return (
    <DelegationScreen
      targetGuest={route.params?.targetGuest}
      onCancel={() => navigation.goBack()}
      onGrant={() => navigation.goBack()}
    />
  );
}

export function ProfileRoute({
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'Profile'>) {
  const dispatch = useAppDispatch();
  const refreshToken = useAppSelector(selectRefreshToken);
  const [logout] = useLogoutMutation();

  return (
    <ProfileScreen
      onSignOut={async () => {
        if (refreshToken) {
          // logout's onQueryStarted dispatches signOut() regardless of the server response
          await logout({ refreshToken }).unwrap().catch(() => {});
        } else {
          await dispatch(signOut());
        }
        navigation.reset({ index: 0, routes: [{ name: 'Onboarding' }] });
      }}
    />
  );
}
