/**
 * Music Room — design system constants.
 * Single source of truth for every color, type size, radius, spacing
 * and shadow used across screens. Import from here — never hardcode
 * a hex value or px size directly in a screen/component.
 */

export const colors = {
  // surfaces
  base: '#07070B',
  surface: '#14141B',
  elevated: '#1C1C26',
  surfaceAlt: '#101015',
  card: '#15151D',
  cardAlt: '#121219',
  glassFill: 'rgba(255,255,255,0.07)',
  glassBorder: 'rgba(255,255,255,0.14)',

  // accent — magenta → violet
  magenta: '#FF2BD6',
  violet: '#7C4DFF',
  accentGradient: ['#FF2BD6', '#7C4DFF'] as const,
  accentGlow: 'rgba(255,43,214,0.30)',
  accentGlowStrong: 'rgba(124,77,255,0.44)',

  // status
  online: '#2BE8A5',
  warn: '#FFB020',
  danger: '#FF6B6B',
  downvoteBg: '#2E2A4A',
  downvoteText: '#B9B6FF',
  spotifyGreen: '#1DB954',

  // text
  textPrimary: '#F4F2F8',
  textSecondary: '#C9C6D6',
  textTertiary: '#8E8B9A',
  textQuaternary: '#6A6776',
  textDisabled: '#46434F',

  // borders
  borderSubtle: 'rgba(255,255,255,0.07)',
  borderMedium: 'rgba(255,255,255,0.1)',
  borderStrong: 'rgba(255,255,255,0.14)',
  borderAccent: 'rgba(255,43,214,0.5)',
  borderViolet: 'rgba(124,77,255,0.5)',
} as const;

export const gradients = {
  accent: { colors: colors.accentGradient, start: { x: 0, y: 0 }, end: { x: 1, y: 0.4 } },
  albumCovers: [
    ['#FF8A65', '#C2185B'],
    ['#4FACFE', '#7B2FF7'],
    ['#23D5AB', '#1F3B8C'],
    ['#6A11CB', '#2575FC'],
    ['#A770EF', '#FDB99B'],
    ['#FA709A', '#FEE140'],
    ['#0BA360', '#3CBA92'],
    ['#FBAB7E', '#F7CE68'],
    ['#F093FB', '#F5576C'],
  ] as const,
} as const;

export const fontFamily = {
  sora: 'Sora_400Regular',
  soraMedium: 'Sora_500Medium',
  soraSemiBold: 'Sora_600SemiBold',
  soraBold: 'Sora_700Bold',
  soraExtraBold: 'Sora_800ExtraBold',
} as const;

export const typography = {
  display: {
    fontFamily: fontFamily.soraExtraBold,
    fontSize: 30,
    lineHeight: 34,
    letterSpacing: -0.6,
  },
  h1: { fontFamily: fontFamily.soraExtraBold, fontSize: 26, lineHeight: 30, letterSpacing: -0.5 },
  h2: { fontFamily: fontFamily.soraBold, fontSize: 22, lineHeight: 27, letterSpacing: -0.4 },
  title: { fontFamily: fontFamily.soraBold, fontSize: 20, lineHeight: 26, letterSpacing: -0.3 },
  body: { fontFamily: fontFamily.sora, fontSize: 15, lineHeight: 22 },
  bodyMedium: { fontFamily: fontFamily.soraMedium, fontSize: 15, lineHeight: 22 },
  label: { fontFamily: fontFamily.soraSemiBold, fontSize: 13, lineHeight: 18 },
  caption: { fontFamily: fontFamily.soraMedium, fontSize: 12, lineHeight: 16 },
  micro: { fontFamily: fontFamily.soraBold, fontSize: 11, lineHeight: 14, letterSpacing: 0.6 },
  tabularNums: { fontVariant: ['tabular-nums'] as const },
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
} as const;

export const radii = {
  sm: 10,
  md: 14,
  lg: 18,
  xl: 22,
  xxl: 28,
  pill: 30,
  circle: 999,
} as const;

export const shadows = {
  elevated: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 14 },
    shadowOpacity: 0.35,
    shadowRadius: 30,
    elevation: 10,
  },
  accentGlow: {
    shadowColor: colors.magenta,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.45,
    shadowRadius: 18,
    elevation: 8,
  },
  violetGlow: {
    shadowColor: colors.violet,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 22,
    elevation: 8,
  },
} as const;

export const layout = {
  screenPadding: spacing.xl,
  avatarSm: 30,
  avatarMd: 42,
  avatarLg: 84,
  albumSm: 46,
  albumLg: 228,
  voteControlWidth: 40,
} as const;
