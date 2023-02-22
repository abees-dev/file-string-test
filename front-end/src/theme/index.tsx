import { createTheme, CssBaseline, ThemeOptions, ThemeProvider as MUIThemeProvider } from '@mui/material';
import { ReactElement, ReactNode, useMemo } from 'react';
import breakpoints from './breakpoint';
import paletteMode from './pallette';
import typography from './typography';
import { customShadows } from './customshadow';

interface ThemeProviderProps {
  children: ReactNode;
}

export default function ThemeProvider({ children }: ThemeProviderProps): ReactElement {
  const isLight = true;

  const themeOption: ThemeOptions = useMemo(
    () => ({
      palette: paletteMode.light,
      breakpoints: breakpoints,
      typography: typography,
      shape: {
        borderRadius: 8,
      },
      customShadows: customShadows.light,
    }),
    [isLight]
  );

  const theme = createTheme(themeOption);
  return (
    <>
      <MUIThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MUIThemeProvider>
    </>
  );
}
