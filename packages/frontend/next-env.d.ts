/// <reference types="next" />
/// <reference types="next/types/global" />
import 'styled-components';
import { Theme } from './src/ui/theme';

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}
