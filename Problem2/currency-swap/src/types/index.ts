export interface Token {
  currency: string;
  date: string;
  price: number;
}

export interface SwapFormData {
  fromToken: Token | null;
  toToken: Token | null;
  amount: string;
  outputAmount: string;
}

export interface SwapFormHook {
  tokens: Token[];
  fromToken: Token | null;
  setFromToken: (token: Token | null) => void;
  toToken: Token | null;
  setToToken: (token: Token | null) => void;
  amount: string;
  setAmount: (amount: string) => void;
  outputAmount: string;
  loading: boolean;
  priceRefreshing: boolean;
  error: string | null;
  isSwapPopupOpen: boolean;
  countdown: number;
  confirmDisabled: boolean;
  handleSwap: () => Promise<void>;
  handleConfirm: () => Promise<void>;
  handleCancelSwap: () => void;
}

export interface TokenSelectProps {
  tokens: Token[];
  selectedToken: Token | null;
  onChange: (token: Token | null) => void;
  label: string;
}

export interface SnackbarState {
  open: boolean;
  message: string;
  severity: 'success' | 'error' | 'warning' | 'info';
} 