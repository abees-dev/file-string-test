import { alpha, Box, GlobalStyles, Theme, useTheme } from '@mui/material';
import { SnackbarProvider } from 'notistack';
import { ReactNode } from 'react';
import Iconify from './Iconify';
// import { IPropsTypes } from '../types/props';

function SnackBarStyle() {
  const theme = useTheme();

  const isLight = theme.palette.mode === 'light';
  return (
    <GlobalStyles
      styles={{
        '#root': {
          '& .SnackbarContent-root': {
            width: '100%',
            padding: theme.spacing(1),
            margin: theme.spacing(0.25, 0),
            boxShadow: theme.customShadows.z24,
            borderRadius: theme.shape.borderRadius,
            color: theme.palette.grey[isLight ? 50 : 800],
            backgroundColor: theme.palette.grey[isLight ? 900 : 50],
            position: 'relative',
            overflow: 'hidden',
            '&.SnackbarItem-variantSuccess, &.SnackbarItem-variantError, &.SnackbarItem-variantWarning, &.SnackbarItem-variantInfo':
              {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.background.paper,
              },
            [theme.breakpoints.up('md')]: {
              minWidth: 240,
            },
          },
          '& .SnackbarItem-message': {
            padding: '0 !important',
            fontWeight: theme.typography.fontWeightMedium,
          },
          '& .SnackbarItem-action': {
            marginRight: 0,
            color: theme.palette.action.active,
            '& svg': { width: 20, height: 20 },
          },
        },
      }}
    />
  );
}

export default function NotistackProvider({ children }: { children: ReactNode }) {
  return (
    <>
      <SnackBarStyle />
      <SnackbarProvider
        maxSnack={5}
        preventDuplicate
        autoHideDuration={1500}
        anchorOrigin={{
          horizontal: 'right',
          vertical: 'top',
        }}
        variant="success"
        dense
        iconVariant={{
          info: <SnackbarIcon icon={'eva:info-fill'} color="info" />,
          success: <SnackbarIcon icon={'eva:checkmark-circle-2-fill'} color="success" />,
          warning: <SnackbarIcon icon={'eva:alert-triangle-fill'} color="warning" />,
          error: <SnackbarIcon icon={'eva:alert-circle-fill'} color="error" />,
        }}
      >
        {children}
      </SnackbarProvider>
    </>
  );
}

type Color = 'info' | 'success' | 'warning' | 'error';

interface ISnackbarIcon {
  icon: string;
  color: Color;
}

function SnackbarIcon({ icon, color }: ISnackbarIcon) {
  return (
    <>
      <Box sx={{ bgcolor: (theme: Theme) => alpha(theme.palette[color].main, 0.1), position: 'absolute', inset: 0 }} />
      <Box
        component="span"
        sx={{
          mr: 1.5,
          width: 40,
          height: 40,
          borderRadius: 1.5,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: `${color}.main`,
          bgcolor: (theme: Theme) => alpha(theme.palette[color].main, 0.26),
        }}
      >
        <Iconify icon={icon} width={24} height={24} />
      </Box>
    </>
  );
}
