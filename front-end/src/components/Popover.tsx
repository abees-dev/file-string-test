import { Box, Popover as PopoverMUI, PopoverProps } from '@mui/material';

interface PopoverType extends PopoverProps {
  anchorEl: HTMLElement | null;
  onClose: () => void;
  width?: number;
  vertical?: number | 'bottom' | 'top' | 'center';
  horizontal?: number | 'center' | 'left' | 'right';
}

const Popover = ({ anchorEl, onClose, width = 420, vertical, horizontal, sx, children, ...other }: PopoverType) => (
  <PopoverMUI
    anchorEl={anchorEl}
    onClose={onClose}
    anchorOrigin={{
      vertical: vertical || 'bottom',
      horizontal: horizontal || 'right',
    }}
    transformOrigin={{
      vertical: -8,
      horizontal: 'right',
    }}
    sx={{ ...sx }}
    {...other}
  >
    <Box sx={{ width: width }}>{children}</Box>
  </PopoverMUI>
);

export default Popover;
