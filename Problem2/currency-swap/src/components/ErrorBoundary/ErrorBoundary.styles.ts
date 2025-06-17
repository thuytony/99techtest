import { SxProps, Theme } from '@mui/material/styles';

export const errorBoundaryStyles = {
  // Main error container
  container: {
    p: 4,
    textAlign: 'center',
  } as SxProps<Theme>,

  // Error alert
  alert: {
    mb: 2,
  } as SxProps<Theme>,
} as const; 