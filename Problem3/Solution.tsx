import React, { useMemo } from 'react';

// Define proper interfaces with all required properties
interface WalletBalance {
  currency: string;
  amount: number;
  blockchain: string; // Missing property in original code
}

interface FormattedWalletBalance extends WalletBalance {
  formatted: string;
}

// Proper interface definition with children property
interface Props {
  children?: React.ReactNode;
  className?: string;
  [key: string]: any; // For other props spreading
}

// Mock components and hooks (these would normally come from your app)
interface BoxProps {
  className?: string;
  children?: React.ReactNode;
  [key: string]: any;
}

// Assuming these are custom hooks that would be imported
const useWalletBalances = (): WalletBalance[] => {
  // Mock implementation - in real app this would fetch wallet data
  return [];
};

const usePrices = (): Record<string, number> => {
  // Mock implementation - in real app this would fetch price data
  return {};
};

const WalletRow: React.FC<{
  className?: string;
  amount: number;
  usdValue: number;
  formattedAmount: string;
}> = ({ className, amount, usdValue, formattedAmount }) => {
  return (
    <div className={className}>
      <span>Amount: {formattedAmount}</span>
      <span>USD Value: ${usdValue.toFixed(2)}</span>
    </div>
  );
};

const classes = {
  row: 'wallet-row'
};

// Define blockchain priorities as a constant object for better maintainability
const BLOCKCHAIN_PRIORITIES: Record<string, number> = {
  'Osmosis': 100,
  'Ethereum': 50,
  'Arbitrum': 30,
  'Zilliqa': 20,
  'Neo': 20,
} as const;

const WalletPage: React.FC<Props> = (props: Props) => {
  const { children, ...rest } = props;
  const balances = useWalletBalances();
  const prices = usePrices();

  // Extract getPriority function outside of component to avoid recreation
  const getPriority = (blockchain: string): number => {
    return BLOCKCHAIN_PRIORITIES[blockchain] ?? -99; // Use nullish coalescing for cleaner code
  };

  // Combine filtering, sorting, and formatting in a single useMemo for better performance
  const processedBalances = useMemo(() => {
    return balances
      .filter((balance: WalletBalance) => {
        const balancePriority = getPriority(balance.blockchain);
        // Fixed logic: only include balances with valid priority AND positive amount
        return balancePriority > -99 && balance.amount > 0;
      })
      .sort((lhs: WalletBalance, rhs: WalletBalance) => {
        const leftPriority = getPriority(lhs.blockchain);
        const rightPriority = getPriority(rhs.blockchain);
        
        // Proper sorting with all cases handled
        if (leftPriority > rightPriority) {
          return -1;
        } else if (rightPriority > leftPriority) {
          return 1;
        }
        return 0; // Equal priorities
      })
      .map((balance: WalletBalance): FormattedWalletBalance => ({
        ...balance,
        formatted: balance.amount.toFixed(2), // Add decimal places for better formatting
      }));
  }, [balances]); // Removed prices from dependencies since it's not used in the computation

  // Create rows with proper key using unique identifier instead of index
  const rows = useMemo(() => {
    return processedBalances.map((balance: FormattedWalletBalance) => {
      const usdValue = prices[balance.currency] * balance.amount;
      return (
        <WalletRow 
          className={classes.row}
          key={`${balance.blockchain}-${balance.currency}`} // Use meaningful key instead of index
          amount={balance.amount}
          usdValue={usdValue}
          formattedAmount={balance.formatted}
        />
      );
    });
  }, [processedBalances, prices]);

  return (
    <div {...rest}>
      {rows}
    </div>
  );
};

export default WalletPage; 