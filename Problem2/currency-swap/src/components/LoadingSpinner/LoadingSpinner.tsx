import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import { loadingSpinnerStyles } from './LoadingSpinner.styles';

interface LoadingSpinnerProps {
  size?: number;
  message?: string;
  inline?: boolean;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 20, 
  message, 
  inline = false 
}) => {
  if (inline) {
    return (
      <Box sx={loadingSpinnerStyles.inlineContainer}>
        <CircularProgress size={size} />
        {message && (
          <Typography variant="caption" color="text.secondary">
            {message}
          </Typography>
        )}
      </Box>
    );
  }

  return (
    <Box sx={loadingSpinnerStyles.blockContainer}>
      <CircularProgress size={size} />
      {message && (
        <Typography variant="body2" color="text.secondary">
          {message}
        </Typography>
      )}
    </Box>
  );
};

export { LoadingSpinner }; 