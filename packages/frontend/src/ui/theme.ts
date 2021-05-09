export const themes = {
  light: {},
  dark: {
    backgroundPrimary: '#202225',
    backgroundSecondary: '#36393f',
    textPrimary: '#dcddde',
  },
} as const;

export type Theme = typeof themes.dark;
