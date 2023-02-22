/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line no-unused-vars
import { Theme, Palette } from '@mui/material';

declare module '@emoji-mart/react' {
  export const Picker = any;
}
export interface ICustomShadows {
  z1: string;
  z8: string;
  z12: string;
  z16: string;
  z20: string;
  z24: string;
  //
  primary: string;
  info: string;
  secondary: string;
  success: string;
  warning: string;
  error: string;
  //
  card: string;
  dialog: string;
  dropdown: string;
}
declare module '@mui/material/styles' {
  interface Palette {
    neutral: Palette['primary'];
  }

  interface PaletteOptions {
    neutral?: PaletteOptions['primary'];
  }

  interface Theme {
    customShadows: ICustomShadows;
  }

  interface ThemeOptions {
    customShadows?: ICustomShadows;
  }
}
