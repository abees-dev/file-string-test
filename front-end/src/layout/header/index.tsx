import { AppBar, Box, IconButton, Stack, Toolbar, Typography, alpha, styled } from '@mui/material';
import AccountPopover from './AccountPopover';
import MenuIcon from '@mui/icons-material/Menu';
import { useAppSelector } from 'src/redux/hook';

const AppBarStyled = styled(AppBar)(({ theme }) => ({
  transition: theme.transitions.create(['width', 'height'], {
    duration: theme.transitions.duration.shorter,
  }),
  boxShadow: theme.customShadows.z1,
  backgroundImage: 'none',
  backgroundColor: alpha(theme.palette.background.default, 0.8),
  height: 88,
}));

export default function Header() {
  const user = useAppSelector((state) => state.auth.user);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBarStyled position="fixed">
        <Toolbar sx={{ height: 1 }}>
          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            justifyContent={'space-between'}
            sx={{
              width: '100%',
            }}
          >
            <Stack direction="row" justifyContent="center" alignItems="center" spacing={2}>
              <IconButton>
                <MenuIcon />
              </IconButton>
              <Typography component="span" variant="h5" noWrap color="primary">
                Hi,
                <Typography ml={1} component="span" variant="subtitle1">
                  {user?.full_name}
                </Typography>
              </Typography>
            </Stack>
            <Box>
              <AccountPopover />
            </Box>
          </Stack>
        </Toolbar>
      </AppBarStyled>
    </Box>
  );
}
