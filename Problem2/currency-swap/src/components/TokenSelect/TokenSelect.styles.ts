import { SxProps, Theme } from '@mui/material/styles';

export const tokenSelectStyles = {
  // Main select button
  selectButton: {
    height: 64,
    justifyContent: 'flex-start',
    textAlign: 'left',
    border: '1px solid #474D57',
    backgroundColor: 'transparent',
    borderRadius: 2,
    padding: 2,
    '&:hover': {
      borderColor: '#F0B90B',
      backgroundColor: 'rgba(240, 185, 11, 0.05)',
    },
    '& .MuiButton-endIcon': {
      marginLeft: 'auto',
      color: '#B7BDC6',
    },
  } as SxProps<Theme>,

  // Selected token content
  selectedTokenContent: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
  } as SxProps<Theme>,

  // Token info container
  tokenInfo: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    ml: 2,
    flex: 1,
  } as SxProps<Theme>,

  // Token avatar
  tokenAvatar: {
    width: 40,
    height: 40,
    backgroundColor: '#F0B90B',
    color: '#000',
    fontWeight: 'bold',
    fontSize: '1.2rem',
  } as SxProps<Theme>,

  // Token symbol
  tokenSymbol: {
    fontWeight: 700,
    color: '#EAECEF',
    lineHeight: 1.2,
  } as SxProps<Theme>,

  // Token price
  tokenPrice: {
    color: '#B7BDC6',
    lineHeight: 1,
  } as SxProps<Theme>,

  // Legacy price text (keeping for backwards compatibility)
  priceText: {
    color: '#B7BDC6',
  } as SxProps<Theme>,

  // Menu paper
  menuPaper: {
    background: 'linear-gradient(145deg, #1E2329 0%, #252930 100%)',
    border: '1px solid #2B3139',
    borderRadius: 2,
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
    backdropFilter: 'blur(10px)',
    maxHeight: 300,
    width: 300,
    mt: 1,
  } as SxProps<Theme>,

  // Menu item
  menuItem: {
    py: 2,
    px: 3,
    borderBottom: '1px solid #2B3139',
    '&:hover': {
      backgroundColor: 'rgba(240, 185, 11, 0.1)',
    },
    '&:last-child': {
      borderBottom: 'none',
    },
  } as SxProps<Theme>,

  // Menu token avatar
  menuTokenAvatar: {
    width: 32,
    height: 32,
    backgroundColor: '#F0B90B',
    color: '#000',
    fontWeight: 'bold',
    fontSize: '1rem',
  } as SxProps<Theme>,

  // Menu token symbol
  menuTokenSymbol: {
    fontWeight: 600,
    color: '#EAECEF',
  } as SxProps<Theme>,

  // Menu token price
  menuTokenPrice: {
    color: '#B7BDC6',
  } as SxProps<Theme>,

  // Popular chip
  popularChip: {
    backgroundColor: '#F0B90B',
    color: '#000',
    fontWeight: 600,
    fontSize: '0.7rem',
    height: 20,
    '& .MuiChip-label': {
      px: 1,
    },
  } as SxProps<Theme>,
} as const; 