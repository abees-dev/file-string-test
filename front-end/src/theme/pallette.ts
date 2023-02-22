import { alpha, PaletteOptions } from '@mui/material';

interface IColor {
  lighter?: string;
  light: string;
  main: string;
  dark: string;
  darker?: string;
}

interface IPallette {
  light: PaletteOptions;
  dark: PaletteOptions;
}

export const primary: IColor = {
  lighter: '#C8FACD',
  light: '#5BE584',
  main: '#00AB55',
  dark: '#007B55',
  darker: '#005249',
};

export const secondary: IColor = {
  lighter: '#D6E4FF',
  light: '#84A9FF',
  main: '#3366FF',
  dark: '#1939B7',
  darker: '#091A7A',
};
export const info: IColor = {
  lighter: '#D0F2FF',
  light: '#74CAFF',
  main: '#1890FF',
  dark: '#0C53B7',
  darker: '#04297A',
};
export const success: IColor = {
  lighter: '#E9FCD4',
  light: '#AAF27F',
  main: '#54D62C',
  dark: '#229A16',
  darker: '#08660D',
};
export const warning: IColor = {
  lighter: '#FFF7CD',
  light: '#FFE16A',
  main: '#FFC107',
  dark: '#B78103',
  darker: '#7A4F01',
};
export const error: IColor = {
  lighter: '#FFE7D9',
  light: '#FFA48D',
  main: '#FF4842',
  dark: '#B72136',
  darker: '#7A0C2E',
};

export const grey = {
  0: '#FFFFFF',
  100: '#F9FAFB',
  200: '#F4F6F8',
  300: '#DFE3E8',
  400: '#C4CDD5',
  500: '#919EAB',
  600: '#637381',
  700: '#454F5B',
  800: '#212B36',
  900: '#161C24',
};

const palette: PaletteOptions = {
  common: {
    black: '#000',
    white: '#FFF',
  },
  primary: {
    ...primary,
    contrastText: '#FFF',
  },
  secondary: {
    ...secondary,
    contrastText: '#FFF',
  },
  success: {
    ...success,
    contrastText: grey[800],
  },
  error: {
    ...error,
    contrastText: grey[800],
  },
  warning: {
    ...warning,
    contrastText: '#FFF',
  },
  info: {
    ...info,
    contrastText: '#FFF',
  },
  grey: grey,
  divider: alpha(grey[500], 0.24),
  action: {
    hover: alpha(grey[500], 0.08),
    selected: alpha(grey[500], 0.16),
    disabled: alpha(grey[500], 0.8),
    disabledBackground: alpha(grey[500], 0.24),
    focus: alpha(grey[500], 0.24),
    hoverOpacity: 0.08,
    disabledOpacity: 0.48,
  },
};

const paletteMode: IPallette = {
  light: {
    ...palette,
    mode: 'light',
    text: { primary: grey[800], secondary: grey[600], disabled: grey[500] },
    background: { paper: '#fff', default: '#fff' },
    action: {
      ...palette.action,
      active: grey[600],
    },
  },
  dark: {
    ...palette,
    mode: 'dark',
    text: { primary: '#fff', secondary: grey[500], disabled: grey[600] },
    background: { paper: grey[800], default: grey[900] },
    action: {
      ...palette.action,
      active: grey[500],
    },
  },
};

export default paletteMode;
