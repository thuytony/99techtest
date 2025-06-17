import { createTheme, Theme } from '@mui/material';

export const theme: Theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#F0B90B',
      dark: '#D9A441',
      light: '#F3C73B',
    },
    secondary: {
      main: '#1E2329',
    },
    background: {
      default: '#0B0E11', 
      paper: '#1E2329',
    },
    text: {
      primary: '#EAECEF',
      secondary: '#B7BDC6',
    },
    divider: '#2B3139',
  },
  typography: {
    fontFamily: '"SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    h3: {
      fontWeight: 700,
      color: '#EAECEF',
    },
    h4: {
      fontWeight: 600,
      color: '#EAECEF',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 600,
        },
        contained: {
          background: 'linear-gradient(90deg, #F0B90B 0%, #F3C73B 100%)',
          color: '#000',
          '&:hover': {
            background: 'linear-gradient(90deg, #D9A441 0%, #F0B90B 100%)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: '#1E2329',
          border: '1px solid #2B3139',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            backgroundColor: '#2B3139',
            borderRadius: 8,
            '& fieldset': {
              borderColor: '#474D57',
            },
            '&:hover fieldset': {
              borderColor: '#F0B90B',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#F0B90B',
            },
          },
        },
      },
    },
  },
}); 