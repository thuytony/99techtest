import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import moment from 'moment';
import { fetchTokenPrices } from '@/utils/api';
import { parseTokenPrice } from '@/utils/currency';
import { Token, SwapFormHook } from '@/types';
import { TIMING_CONFIG, UI_CONFIG } from '@/constants';

export const useSwapForm = (): SwapFormHook => {
  const [tokens, setTokens] = useState<Token[]>([]);
  const [fromToken, setFromToken] = useState<Token | null>(null);
  const [toToken, setToToken] = useState<Token | null>(null);
  const [amount, setAmount] = useState<string>('');
  const [outputAmount, setOutputAmount] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [priceRefreshing, setPriceRefreshing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  // Swap popup states
  const [isSwapPopupOpen, setIsSwapPopupOpen] = useState<boolean>(false);
  const [countdown, setCountdown] = useState<number>(TIMING_CONFIG.COUNTDOWN_DURATION);
  const [confirmDisabled, setConfirmDisabled] = useState<boolean>(false);
  
  // Refs for intervals and API calls
  const refreshIntervalRef = useRef<number | null>(null);
  const countdownIntervalRef = useRef<number | null>(null);
  const isRefreshingRef = useRef<boolean>(false);

  // Memoized function to deduplicate tokens - keep earliest update time, then highest price if times are same
  const deduplicateTokens = useMemo(() => (tokenList: Token[]): Token[] => {
    const tokenMap = new Map<string, Token>();
    
    tokenList.forEach(token => {
      const existing = tokenMap.get(token.currency);
      if (!existing) {
        tokenMap.set(token.currency, token);
      } else {
        const existingMoment = moment(existing.date);
        const tokenMoment = moment(token.date);
        
        // Compare dates with millisecond precision
        if (tokenMoment.isBefore(existingMoment)) {
          // Token has earlier date, replace existing
          tokenMap.set(token.currency, token);
        } else if (tokenMoment.isSame(existingMoment)) {
          // Same date, keep the one with higher price
          if (parseTokenPrice(token.price) > parseTokenPrice(existing.price)) {
            tokenMap.set(token.currency, token);
          }
        }
        // If token date is after existing date, keep existing (do nothing)
      }
    });
    
    return Array.from(tokenMap.values());
  }, []);

  // Function to fetch and update token prices
  const refreshTokenPrices = useCallback(async (): Promise<void> => {
    if (isRefreshingRef.current) return; // Prevent concurrent requests
    
    try {
      isRefreshingRef.current = true;
      setPriceRefreshing(true);
      const prices = await fetchTokenPrices();
      const uniqueTokens = deduplicateTokens(prices);
      setTokens(uniqueTokens);
      
      // Update selected tokens with new prices if they exist
      if (fromToken) {
        const updatedFromToken = uniqueTokens.find(t => t.currency === fromToken.currency);
        if (updatedFromToken) setFromToken(updatedFromToken);
      }
      if (toToken) {
        const updatedToToken = uniqueTokens.find(t => t.currency === toToken.currency);
        if (updatedToToken) setToToken(updatedToToken);
      }
      
      setError(null);
    } catch (err) {
      setError('Failed to refresh token prices');
    } finally {
      isRefreshingRef.current = false;
      setPriceRefreshing(false);
    }
  }, [fromToken, toToken, deduplicateTokens]);

  // Initial load on mount
  useEffect(() => {
    const loadTokens = async (): Promise<void> => {
      try {
        setLoading(true);
        const prices = await fetchTokenPrices();
        const uniqueTokens = deduplicateTokens(prices);
        setTokens(uniqueTokens);
        setError(null);
      } catch (err) {
        console.error('Error loading tokens:', err);
        setError('Failed to load token prices');
      } finally {
        setLoading(false);
      }
    };
    loadTokens();
  }, [deduplicateTokens]);

  // Auto-refresh pricing every 10 seconds when conversion is possible
  useEffect(() => {
    const shouldAutoRefresh = fromToken && toToken && amount && parseTokenPrice(amount) > 0;
    
    if (shouldAutoRefresh) {
      // Clear any existing interval
      if (refreshIntervalRef.current) {
        clearInterval(refreshIntervalRef.current);
      }
      
      // Set up new interval
      refreshIntervalRef.current = setInterval(() => {
        refreshTokenPrices();
      }, TIMING_CONFIG.PRICE_REFRESH_INTERVAL);
    } else {
      // Clear interval if conditions not met
      if (refreshIntervalRef.current) {
        clearInterval(refreshIntervalRef.current);
        refreshIntervalRef.current = null;
      }
    }

    return () => {
      if (refreshIntervalRef.current) {
        clearInterval(refreshIntervalRef.current);
      }
    };
  }, [fromToken, toToken, amount, refreshTokenPrices]);

  // Memoized calculation of output amount
  const calculateOutputAmount = useMemo((): string => {
    if (!fromToken || !toToken || !amount) {
      return '';
    }

    const fromPrice = parseTokenPrice(fromToken.price);
    const toPrice = parseTokenPrice(toToken.price);
    const inputAmount = parseTokenPrice(amount);
    
    if (fromPrice === 0 || toPrice === 0) {
      return '';
    }
    
    const calculatedAmount = (inputAmount * fromPrice) / toPrice;
    return calculatedAmount.toFixed(UI_CONFIG.PRICE_DECIMAL_PLACES);
  }, [fromToken, toToken, amount]);

  // Update output amount when calculation changes
  useEffect(() => {
    setOutputAmount(calculateOutputAmount);
  }, [calculateOutputAmount]);

  // Countdown timer for swap confirmation
  const startCountdown = useCallback(() => {
    setCountdown(TIMING_CONFIG.COUNTDOWN_DURATION);
    setConfirmDisabled(false);
    
    if (countdownIntervalRef.current) {
      clearInterval(countdownIntervalRef.current);
    }
    
    countdownIntervalRef.current = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          // Countdown finished, disable confirm and refresh prices
          setConfirmDisabled(true);
          refreshTokenPrices().then(() => {
            // After price refresh, restart countdown
            setTimeout(() => startCountdown(), TIMING_CONFIG.COUNTDOWN_RESTART_DELAY);
          });
          return TIMING_CONFIG.COUNTDOWN_DURATION;
        }
        return prev - 1;
      });
    }, 1000);
  }, [refreshTokenPrices]);

  // Stop countdown timer
  const stopCountdown = useCallback(() => {
    if (countdownIntervalRef.current) {
      clearInterval(countdownIntervalRef.current);
      countdownIntervalRef.current = null;
    }
  }, []);

  const handleSwap = useCallback(async (): Promise<void> => {
    if (!fromToken || !toToken || !amount || !outputAmount) return;
    
    setIsSwapPopupOpen(true);
    startCountdown();
  }, [fromToken, toToken, amount, outputAmount, startCountdown]);

  const handleConfirm = useCallback(async (): Promise<void> => {
    setLoading(true);
    stopCountdown();
    
    try {
      // Simulate API call for actual swap
      await new Promise(resolve => setTimeout(resolve, TIMING_CONFIG.SWAP_SIMULATION_DELAY));
      
      // Reset form after successful swap
      setAmount('');
      setOutputAmount('');
      setIsSwapPopupOpen(false);
      setError(null);
    } catch (err) {
      console.error('Swap error:', err);
      setError('Swap failed');
    } finally {
      setLoading(false);
    }
  }, [stopCountdown]);

  const handleCancelSwap = useCallback((): void => {
    stopCountdown();
    setIsSwapPopupOpen(false);
    setConfirmDisabled(false);
    setCountdown(TIMING_CONFIG.COUNTDOWN_DURATION);
  }, [stopCountdown]);

  // Cleanup intervals on unmount
  useEffect(() => {
    return () => {
      if (refreshIntervalRef.current) {
        clearInterval(refreshIntervalRef.current);
      }
      if (countdownIntervalRef.current) {
        clearInterval(countdownIntervalRef.current);
      }
    };
  }, []);

  return {
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
    handleCancelSwap
  };
}; 