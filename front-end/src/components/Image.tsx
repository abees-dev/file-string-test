/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { LazyLoadImage, Effect, LazyLoadImageProps } from 'react-lazy-load-image-component';
// @mui
import { Box, styled, SxProps } from '@mui/material';

// ----------------------------------------------------------------------

const LazyLoadImageStyle = styled(LazyLoadImage)(() => ({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  border: 'none',
})) as typeof LazyLoadImage;

type Ratio = '4/3' | '3/4' | '6/4' | '4/6' | '16/9' | '9/16' | '21/9' | '9/21' | '1/1';

interface IImage {
  ratio?: Ratio;
  disabledEffect?: boolean;
  effect?: Effect;
  sx?: SxProps;
}

type ImageType = IImage & LazyLoadImageProps;

export default function Image({ ratio, disabledEffect = false, effect = 'blur', sx, ...other }: ImageType) {
  if (ratio) {
    return (
      <Box
        component="span"
        sx={{
          width: 1,
          lineHeight: 0,
          display: 'block',
          overflow: 'hidden',
          position: 'relative',
          pt: getRatio(ratio),
          '& .wrapper': {
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            lineHeight: 0,
            position: 'absolute',
            backgroundSize: 'cover !important',
          },
          ...sx,
        }}
      >
        <LazyLoadImageStyle wrapperClassName="wrapper" effect={'blur'} {...other} alt="" />
      </Box>
    );
  }

  return (
    <Box
      component="span"
      sx={{
        lineHeight: 0,
        display: 'block',
        overflow: 'hidden',
        '& .wrapper': { width: 1, height: 1, backgroundSize: 'cover !important' },
        ...sx,
      }}
    >
      <LazyLoadImageStyle wrapperClassName="wrapper" effect={'blur'} {...other} />
    </Box>
  );
}

// ----------------------------------------------------------------------

function getRatio(ratio: Ratio = '1/1') {
  return {
    '4/3': 'calc(100% / 4 * 3)',
    '3/4': 'calc(100% / 3 * 4)',
    '6/4': 'calc(100% / 6 * 4)',
    '4/6': 'calc(100% / 4 * 6)',
    '16/9': 'calc(100% / 16 * 9)',
    '9/16': 'calc(100% / 9 * 16)',
    '21/9': 'calc(100% / 21 * 9)',
    '9/21': 'calc(100% / 9 * 21)',
    '1/1': '100%',
  }[ratio];
}
