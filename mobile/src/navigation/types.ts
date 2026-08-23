export type RootStackParamList = {
  Onboarding: undefined;
  Login: undefined;
  Signup: undefined;
  ForgotPassword: undefined;
  ResetPassword: { token?: string } | undefined;
  VerifyEmailPending: { email?: string; token?: string } | undefined;
  DevSettings: undefined;
  Home: undefined;
  CreateRoom: undefined;
  NowPlaying: { roomId: string };
  TrackVote: { roomId?: string };
  EmptyQueue: { roomId?: string } | undefined;
  Search: { roomId?: string; playlistId?: string } | undefined;
  Editor: { playlistId: string };
  Delegation: { roomId: string; targetGuest?: string };
  Profile: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
