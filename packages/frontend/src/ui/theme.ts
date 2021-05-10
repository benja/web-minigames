export const themes = {
  light: {
    backgroundPrimary: 'white',
    backgroundSecondary: 'white',
    textPrimary: 'black',
  },
  dark: {
    backgroundPrimary: '#202225',
    backgroundSecondary: '#36393f',
    textPrimary: '#dcddde',
  },
} as const;

export type Theme = typeof themes.dark;
