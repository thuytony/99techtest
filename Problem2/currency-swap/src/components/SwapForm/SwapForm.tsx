import React, { FormEvent, useCallback } from 'react';
import {
  Box,
  Button,
  TextField,
  Stack,
  Typography,
  IconButton,
  Paper,
  Alert,
  Snackbar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
} from '@mui/material';
import { SwapVert, Refresh, TrendingUp } from '@mui/icons-material';
import { useSwapForm } from '@/hooks/useSwapForm';
import { useSnackbar } from '@/hooks/useSnackbar';
import { TokenSelect, LoadingSpinner } from '@/components';
import { validateSwapForm } from '@/utils/validation';
import { UI_CONFIG } from '@/constants';
import { swapFormStyles } from './SwapForm.styles';

const SwapForm: React.FC = () => {
  const { snackbar, showSnackbar, hideSnackbar } = useSnackbar();
  
  const {
    tokens,
    fromToken,
    setFromToken,
    toToken,
    setToToken,
    amount,
    setAmount,
    outputAmount,
    loading,
    priceRefreshing,
    error,
    isSwapPopupOpen,
    countdown,
    confirmDisabled,
    handleSwap,
    handleConfirm,
    handleCancelSwap,
  } = useSwapForm();

  const handleSubmit = useCallback(async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    
    const validation = validateSwapForm(fromToken, toToken, amount);
    if (!validation.isValid) {
      showSnackbar(validation.errors[0], 'error');
      return;
    }
    
    await handleSwap();
  }, [fromToken, toToken, amount, handleSwap, showSnackbar]);

  const handleConfirmSwap = useCallback(async (): Promise<void> => {
    await handleConfirm();
    showSnackbar('Swap completed successfully! 🎉', 'success');
  }, [handleConfirm, showSnackbar]);

  const swapTokens = useCallback((): void => {
    const temp = fromToken;
    setFromToken(toToken);
    setToToken(temp);
  }, [fromToken, toToken, setFromToken, setToToken]);

  return (
    <>
      <Paper elevation={0} sx={swapFormStyles.paper}>
        <Box component="form" onSubmit={handleSubmit}>
          <Stack spacing={2}>
            {/* From Token Section */}
            <Box sx={swapFormStyles.tokenSelectContainer}>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2, fontWeight: 600 }}>
                From
              </Typography>
              <TokenSelect
                tokens={tokens}
                selectedToken={fromToken}
                onChange={setFromToken}
                label=""
              />
            </Box>

            {/* Swap Button */}
            <Box sx={swapFormStyles.swapButtonContainer}>
              <IconButton
                onClick={swapTokens}
                aria-label="Swap tokens"
                sx={swapFormStyles.swapButton}
              >
                <SwapVert />
              </IconButton>
            </Box>

            {/* To Token Section */}
            <Box sx={swapFormStyles.tokenSelectContainer}>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2, fontWeight: 600 }}>
                To
              </Typography>
              <TokenSelect
                tokens={tokens}
                selectedToken={toToken}
                onChange={setToToken}
                label=""
              />
            </Box>

            {/* Amount Input */}
            <Box>
              <Typography variant="body2" color="text.secondary" sx={swapFormStyles.amountLabel}>
                You pay
              </Typography>
              <TextField
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                fullWidth
                variant="outlined"
                sx={swapFormStyles.amountInput}
                InputProps={{
                  endAdornment: fromToken && (
                    <Typography variant="body1" color="text.secondary" sx={{ ml: 1 }}>
                      {fromToken.currency}
                    </Typography>
                  ),
                }}
              />
            </Box>

            {/* Output Display */}
            {outputAmount && (
              <Box sx={swapFormStyles.outputContainer}>
                <Box sx={swapFormStyles.outputHeader}>
                  <Typography variant="body2" color="text.secondary">
                    You receive
                  </Typography>
                  {priceRefreshing && (
                    <LoadingSpinner 
                      size={UI_CONFIG.CIRCULAR_PROGRESS_SIZE} 
                      message="Updating..." 
                      inline 
                    />
                  )}
                </Box>
                <Box display="flex" alignItems="center" justifyContent="space-between">
                  <Typography variant="h5" sx={swapFormStyles.outputAmount}>
                    {outputAmount}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {toToken?.currency}
                  </Typography>
                </Box>
                
                {/* Price Info */}
                {fromToken && toToken && (
                  <Box sx={swapFormStyles.priceDisplay}>
                    <Box display="flex" alignItems="center">
                      <TrendingUp sx={{ fontSize: 16, mr: 1, color: '#F0B90B' }} />
                      <Typography variant="body2" color="text.secondary">
                        1 {fromToken.currency} = {(parseFloat(outputAmount) / parseFloat(amount || '1')).toFixed(6)} {toToken.currency}
                      </Typography>
                    </Box>
                  </Box>
                )}
              </Box>
            )}

            {/* Error Display */}
            {error && (
              <Alert severity="error" sx={swapFormStyles.errorAlert}>
                {error}
              </Alert>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              variant="contained"
              size="large"
              fullWidth
              disabled={loading || !fromToken || !toToken || !amount}
              sx={swapFormStyles.submitButton}
            >
              {loading ? (
                <>
                  <LoadingSpinner size={20} inline />
                  Processing...
                </>
              ) : (
                'Swap Now'
              )}
            </Button>
          </Stack>
        </Box>
      </Paper>

      {/* Swap Confirmation Dialog */}
      <Dialog
        open={isSwapPopupOpen}
        onClose={handleCancelSwap}
        maxWidth="sm"
        fullWidth
        disableEscapeKeyDown
        slotProps={{
          paper: {
            sx: {
              background: 'linear-gradient(145deg, #1E2329 0%, #252930 100%)',
              border: '1px solid #2B3139',
              borderRadius: 3,
            },
          },
        }}
      >
        <DialogTitle sx={swapFormStyles.dialogTitle}>
          <Typography variant="h4" component="div" gutterBottom>
            🔄 Confirm Swap
          </Typography>
          <Chip
            label={confirmDisabled ? `Refreshing prices...` : `Confirm in ${countdown}s`}
            color={confirmDisabled ? "warning" : "primary"}
            sx={swapFormStyles.dialogChip}
            icon={confirmDisabled ? <Refresh /> : undefined}
          />
        </DialogTitle>
        
        <DialogContent sx={swapFormStyles.dialogContent}>
          <Stack spacing={3}>
            <Box sx={swapFormStyles.swapInfoBox}>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                You pay
              </Typography>
              <Typography variant="h5" fontWeight="bold">
                {amount} {fromToken?.currency}
              </Typography>
            </Box>

            <Box sx={swapFormStyles.swapIconContainer}>
              <SwapVert />
            </Box>

            <Box sx={swapFormStyles.swapInfoBox}>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                You receive
              </Typography>
              <Typography variant="h5" fontWeight="bold" sx={{ color: '#00D4AA' }}>
                {outputAmount} {toToken?.currency}
              </Typography>
            </Box>
          </Stack>
        </DialogContent>

        <DialogActions sx={swapFormStyles.dialogActions}>
          <Button onClick={handleCancelSwap} variant="outlined" size="large">
            Cancel
          </Button>
          <Button
            onClick={handleConfirmSwap}
            variant="contained"
            size="large"
            disabled={confirmDisabled}
            sx={swapFormStyles.confirmButtonSpacer}
          >
            {confirmDisabled ? 'Updating...' : 'Confirm Swap'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={hideSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert 
          onClose={hideSnackbar} 
          severity={snackbar.severity} 
          sx={swapFormStyles.snackbarAlert}
          variant="filled"
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export { SwapForm }; 