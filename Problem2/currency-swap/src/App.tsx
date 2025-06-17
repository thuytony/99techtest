import React from 'react';
import { Container, Typography, Stack, CssBaseline, ThemeProvider, Box } from '@mui/material';
import { SwapForm, ErrorBoundary } from './components';
import { theme } from './constants';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ErrorBoundary>
        <Box
          sx={{
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #0B0E11 0%, #1E2329 100%)',
            py: 4,
          }}
        >
          <Container maxWidth="sm">
            <Stack spacing={4} alignItems="center">
              <Box textAlign="center">
                <Typography variant="h3" component="h1" gutterBottom>
                  ⚡ Swap
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Trade tokens in an instant
                </Typography>
              </Box>
              <SwapForm />
            </Stack>
          </Container>
        </Box>
      </ErrorBoundary>
    </ThemeProvider>
  );
};

export default App;