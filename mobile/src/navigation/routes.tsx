import React from 'react';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { OnboardingScreen } from '@/screens/OnboardingScreen';
import { HomeScreen } from '@/screens/HomeScreen';
import { CreateRoomScreen } from '@/screens/CreateRoomScreen';
import { NowPlayingScreen } from '@/screens/NowPlayingScreen';
import { TrackVoteScreen } from '@/screens/TrackVoteScreen';
import { EmptyQueueScreen } from '@/screens/EmptyQueueScreen';
import { SearchScreen } from '@/screens/SearchScreen';
import { EditorScreen } from '@/screens/EditorScreen';
import { DelegationScreen } from '@/screens/DelegationScreen';
import { ProfileScreen } from '@/screens/ProfileScreen';
import type { RootStackParamList } from './types';

/**
 * One route component per screen, each mapping the presentational screen's
 * callback props to real navigation calls. Screens stay navigation-agnostic
 * (no react-navigation imports, easy to preview/test in isolation) — all
 * the wiring lives here.
 */

export function OnboardingRoute({
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'Onboarding'>) {
  return (
    <OnboardingScreen
      onContinue={() => navigation.replace('Home')}
      onGuest={() => navigation.replace('Home')}
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
      onOpenDelegation={() => navigation.navigate('Delegation')}
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
}: NativeStackScreenProps<RootStackParamList, 'EmptyQueue'>) {
  return <EmptyQueueScreen onAddTrack={() => navigation.navigate('Search')} />;
}

export function SearchRoute({ navigation }: NativeStackScreenProps<RootStackParamList, 'Search'>) {
  return <SearchScreen onCancel={() => navigation.goBack()} />;
}

export function EditorRoute({ navigation }: NativeStackScreenProps<RootStackParamList, 'Editor'>) {
  return (
    <EditorScreen
      onBack={() => navigation.goBack()}
      onAddTrack={() => navigation.navigate('Search')}
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
  return (
    <ProfileScreen
      onSignOut={() => navigation.reset({ index: 0, routes: [{ name: 'Onboarding' }] })}
    />
  );
}
