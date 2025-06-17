import { Token } from '../types';

export interface SwapValidationResult {
  isValid: boolean;
  errors: string[];
}

export const validateSwapForm = (
  fromToken: Token | null,
  toToken: Token | null,
  amount: string
): SwapValidationResult => {
  const errors: string[] = [];

  if (!fromToken) {
    errors.push('Please select a token to swap from');
  }

  if (!toToken) {
    errors.push('Please select a token to swap to');
  }

  if (!amount || amount.trim() === '') {
    errors.push('Please enter an amount');
  } else if (isNaN(Number(amount)) || Number(amount) <= 0) {
    errors.push('Please enter a valid positive number');
  }

  if (fromToken && toToken && fromToken.currency === toToken.currency) {
    errors.push('Cannot swap the same currency');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

export const validateAmount = (amount: string): boolean => {
  if (!amount || amount.trim() === '') return false;
  const numAmount = Number(amount);
  return !isNaN(numAmount) && numAmount > 0 && isFinite(numAmount);
};

export const formatValidationErrors = (errors: string[]): string => {
  return errors.join(', ');
}; 