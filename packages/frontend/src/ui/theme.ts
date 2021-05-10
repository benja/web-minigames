export const themes = {
  light: {
    backgroundPrimary: '#e8e8e8',
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
