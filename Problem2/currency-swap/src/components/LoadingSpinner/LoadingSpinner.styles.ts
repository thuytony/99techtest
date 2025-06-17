import { SxProps, Theme } from '@mui/material/styles';

export const loadingSpinnerStyles = {
  // Inline loading (horizontal layout)
  inlineContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: 1,
  } as SxProps<Theme>,

  // Block loading (vertical layout)
  blockContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 2,
  } as SxProps<Theme>,
} as const; 