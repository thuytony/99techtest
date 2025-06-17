export const API_CONFIG = {
    BASE_URL: import.meta.env.VITE_API_BASE_URL,
    TOKEN_ICONS_BASE_URL: 'https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/',
    TIMEOUT: 5000,
} as const;
  
export const TIMING_CONFIG = {
    PRICE_REFRESH_INTERVAL: 10000,
    SWAP_SIMULATION_DELAY: 1500,
    COUNTDOWN_DURATION: 10,
    COUNTDOWN_RESTART_DELAY: 100,
} as const;
  
export const UI_CONFIG = {
    SNACKBAR_DURATION: 3000,
    PRICE_DECIMAL_PLACES: 6,
    CIRCULAR_PROGRESS_SIZE: 16,
} as const;