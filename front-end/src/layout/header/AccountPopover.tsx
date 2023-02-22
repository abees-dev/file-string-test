import { Box, Divider, Link as MUILink, List, ListItemButton, ListItemText, Typography, Avatar } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import { MouseEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { logoutUser } from 'src/api/auth.api';
import Popover from 'src/components/Popover';
import { useAppDispatch, useAppSelector } from 'src/redux/hook';
import { userLogout } from 'src/redux/slice/auth.slice';
import { IBaseResponse } from 'src/types/Reponse';
import { getAvatarUrl } from 'src/utils/getAvatarUrl';

export default function AccountPopover() {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const user = useAppSelector((state) => state.auth.user);

  const { enqueueSnackbar } = useSnackbar();

  const handleOpenPopover = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const dispatch = useAppDispatch();

  const { mutate } = useMutation(() => logoutUser(), {
    onSuccess: () => {
      dispatch(userLogout());
    },
    onError: (error: IBaseResponse) => {
      enqueueSnackbar(error.message, { variant: 'error' });
    },
  });

  const handleLogout = () => {
    mutate();
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Avatar src={getAvatarUrl(user?.avatar)} onClick={handleOpenPopover} sx={{ cursor: 'pointer' }} />
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClosePopover}
        width={240}
        sx={{ maxHeight: 400 }}
      >
        <List disablePadding>
          <Box p={1}>
            <MUILink component={Link} underline="none" to="#" color="text.primary">
              <ListItemButton dense sx={{ borderRadius: 1 }}>
                <ListItemText primary={<Typography variant="body2">Profile</Typography>} />
              </ListItemButton>
            </MUILink>
          </Box>

          <Divider sx={{ borderStyle: 'dashed' }} />
          <Box p={1}>
            <ListItemButton dense sx={{ borderRadius: 1 }} onClick={handleLogout}>
              <ListItemText primary={<Typography variant="body2">Logout</Typography>} />
            </ListItemButton>
          </Box>
        </List>
      </Popover>
    </div>
  );
}
