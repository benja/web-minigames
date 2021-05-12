import { createContext, Dispatch, SetStateAction } from 'react';

export type ThemeOptions = 'dark' | 'light';
interface ThemeContext {
  state: ThemeOptions;
  dispatch: Dispatch<SetStateAction<ThemeOptions>>;
}
export const ThemeContext = createContext<ThemeContext>({} as ThemeContext);
