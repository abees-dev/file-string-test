import { Icon } from '@iconify/react';
import { Box, BoxProps } from '@mui/material';

interface IIconify extends BoxProps {
  icon: string;
}

export default function Iconify({ icon, sx, ...other }: IIconify) {
  return (
    <Box
      component={Icon}
      icon={icon}
      sx={{
        ...sx,
      }}
      {...other}
    />
  );
}
