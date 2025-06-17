import { SxProps, Theme } from '@mui/material/styles';

export const swapFormStyles = {
  // Main container
  paper: {
    maxWidth: 480,
    mx: 'auto',
    p: 4,
    borderRadius: 3,
    background: 'linear-gradient(145deg, #1E2329 0%, #252930 100%)',
    border: '1px solid #2B3139',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
    backdropFilter: 'blur(10px)',
  } as SxProps<Theme>,

  // Swap button container
  swapButtonContainer: {
    display: 'flex',
    justifyContent: 'center',
    position: 'relative',
    my: -1,
    zIndex: 1,
  } as SxProps<Theme>,

  // Swap button
  swapButton: {
    background: 'linear-gradient(135deg, #F0B90B 0%, #F3C73B 100%)',
    color: '#000',
    width: 48,
    height: 48,
    border: '3px solid #1E2329',
    boxShadow: '0 4px 12px rgba(240, 185, 11, 0.25)',
    '&:hover': {
      background: 'linear-gradient(135deg, #D9A441 0%, #F0B90B 100%)',
      transform: 'scale(1.05)',
      boxShadow: '0 6px 16px rgba(240, 185, 11, 0.35)',
    },
    transition: 'all 0.2s ease-in-out',
  } as SxProps<Theme>,

  // Token selection area
  tokenSelectContainer: {
    p: 3,
    backgroundColor: '#2B3139',
    borderRadius: 2,
    border: '1px solid #474D57',
    transition: 'all 0.2s ease-in-out',
    '&:hover': {
      borderColor: '#F0B90B',
      boxShadow: '0 0 0 1px rgba(240, 185, 11, 0.2)',
    },
  } as SxProps<Theme>,

  // Amount section
  amountLabel: {
    mb: 1,
    fontWeight: 600,
    color: '#B7BDC6',
  } as SxProps<Theme>,

  amountInput: {
    '& .MuiOutlinedInput-root': {
      fontSize: '1.5rem',
      fontWeight: 600,
      height: 60,
      '& input': {
        textAlign: 'right',
        color: '#EAECEF',
      },
    },
  } as SxProps<Theme>,

  // Output display
  outputContainer: {
    p: 3,
    background: 'linear-gradient(135deg, #2B3139 0%, #353A44 100%)',
    borderRadius: 2,
    border: '1px solid #474D57',
    position: 'relative',
    overflow: 'hidden',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: 2,
      background: 'linear-gradient(90deg, #F0B90B 0%, #F3C73B 100%)',
    },
  } as SxProps<Theme>,

  outputHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    mb: 2,
  } as SxProps<Theme>,

  outputAmount: {
    fontSize: '1.5rem',
    fontWeight: 700,
    color: '#00D4AA', // Binance green
  } as SxProps<Theme>,

  // Error and button
  errorAlert: {
    mt: 2,
    borderRadius: 2,
    backgroundColor: '#461922',
    border: '1px solid #F56565',
    '& .MuiAlert-message': {
      color: '#FED7D7',
    },
  } as SxProps<Theme>,

  submitButton: {
    mt: 3,
    height: 56,
    fontSize: '1.1rem',
    fontWeight: 700,
    borderRadius: 2,
    background: 'linear-gradient(90deg, #F0B90B 0%, #F3C73B 100%)',
    color: '#000',
    textTransform: 'uppercase',
    letterSpacing: 1,
    '&:hover': {
      background: 'linear-gradient(90deg, #D9A441 0%, #F0B90B 100%)',
      transform: 'translateY(-2px)',
      boxShadow: '0 8px 24px rgba(240, 185, 11, 0.3)',
    },
    '&:disabled': {
      background: '#474D57',
      color: '#B7BDC6',
    },
    transition: 'all 0.2s ease-in-out',
  } as SxProps<Theme>,

  // Dialog styles
  dialogTitle: {
    textAlign: 'center',
    pb: 2,
    background: 'linear-gradient(135deg, #1E2329 0%, #252930 100%)',
    borderBottom: '1px solid #2B3139',
  } as SxProps<Theme>,

  dialogChip: {
    mt: 2,
    backgroundColor: '#F0B90B',
    color: '#000',
    fontWeight: 600,
    '&.MuiChip-colorWarning': {
      backgroundColor: '#FF6B35',
      color: '#fff',
    },
  } as SxProps<Theme>,

  dialogContent: {
    pt: 3,
    background: 'linear-gradient(145deg, #1E2329 0%, #252930 100%)',
  } as SxProps<Theme>,

  dialogActions: {
    p: 3,
    pt: 2,
    background: 'linear-gradient(145deg, #1E2329 0%, #252930 100%)',
    borderTop: '1px solid #2B3139',
  } as SxProps<Theme>,

  // Swap info boxes in dialog
  swapInfoBox: {
    p: 3,
    background: 'linear-gradient(135deg, #2B3139 0%, #353A44 100%)',
    borderRadius: 2,
    border: '1px solid #474D57',
  } as SxProps<Theme>,

  swapIconContainer: {
    display: 'flex',
    justifyContent: 'center',
    '& svg': {
      fontSize: '2rem',
      color: '#F0B90B',
    },
  } as SxProps<Theme>,

  confirmButtonSpacer: {
    ml: 2,
  } as SxProps<Theme>,

  timeExpiredAlert: {
    mt: 2,
    borderRadius: 2,
    backgroundColor: '#461922',
    border: '1px solid #F56565',
  } as SxProps<Theme>,

  // Price display
  priceDisplay: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    mt: 2,
    p: 2,
    backgroundColor: 'rgba(240, 185, 11, 0.1)',
    borderRadius: 1,
    border: '1px solid rgba(240, 185, 11, 0.2)',
  } as SxProps<Theme>,

  // Loading states
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(30, 35, 41, 0.8)',
    borderRadius: 2,
    backdropFilter: 'blur(4px)',
  } as SxProps<Theme>,

  // Snackbar
  snackbarAlert: {
    width: '100%',
    borderRadius: 2,
  } as SxProps<Theme>,
} as const; 