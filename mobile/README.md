# Music Room — React Native app (screens only)

TypeScript + Expo + **Tamagui** implementation of the Music Room screens,
matching the "Music room design" Design Component 1:1 (colors, type scale,
radii, gradients pulled into `src/constants/tokens.ts` as the single source
of truth).

## Setup

```bash
npm install
npx expo start
```

Requires Expo Go (or a dev client) on a phone/simulator — this uses
`expo-linear-gradient` and `expo-blur` for the accent gradients / modal blur,
and `@expo-google-fonts/sora` for the Sora typeface.

## Structure

- `src/constants/tokens.ts` — every color, gradient, font size, radius,
  spacing value and shadow used anywhere in the app. Nothing is hardcoded
  in a screen; everything reads from here.
- `tamagui.config.ts` — Tamagui theme wired to the same tokens, so any
  future Tamagui-native components (`Button`, `Input`, `Switch`) stay
  on-system automatically.
- `src/components/` — shared pieces used across screens: `GradientButton`,
  `Badge` (LIVE/PUBLIC/PRIVATE/HOST/AT VENUE), `VoteControl` (all 4 states:
  not-voted / upvoted / downvoted / locked), `TrackRow`, `Avatar`.
- `src/screens/` — the 10 screens, each a plain component taking simple
  callback props (no business logic/state management wired — that's for
  the real data layer):
  1. `OnboardingScreen` — Spotify auth + guest fallback
  2. `HomeScreen` — nearby live rooms feed
  3. `CreateRoomScreen` — name, visibility, playback control, restrictions
  4. `NowPlayingScreen` — hero player + live vote queue
  5. `TrackVoteScreen` — all vote states in queue context
     5b. `EmptyQueueScreen` — empty state
  6. `SearchScreen` — add tracks from Spotify catalog
  7. `EditorScreen` — collaborative playlist editing (live cursors/drag)
  8. `DelegationScreen` — host grants playback control (modal)
  9. `ProfileScreen` — profile & preferences
- `src/navigation/RootNavigator.tsx` — a native-stack route per screen so
  every screen is reachable; wire real navigation params/state as you
  build out the flows.

## Notes / next steps

- Album art uses gradient placeholders — swap `LinearGradient` covers for
  real `<Image>` sources once you have artwork.
- No backend/state wiring (Spotify auth, realtime queue, voting) — screens
  are presentation-only, ready to connect to your data layer.
- Icons are emoji/glyph placeholders in a couple of spots (now-playing
  transport controls, nav icons) — swap for an icon set (e.g.
  `@expo/vector-icons` or a custom SVG set) when available.
