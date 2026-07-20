export type RootStackParamList = {
  Onboarding: undefined;
  Home: undefined;
  CreateRoom: undefined;
  NowPlaying: { roomId: string };
  TrackVote: { roomId?: string };
  EmptyQueue: undefined;
  Search: undefined;
  Editor: undefined;
  Delegation: { targetGuest?: string } | undefined;
  Profile: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
