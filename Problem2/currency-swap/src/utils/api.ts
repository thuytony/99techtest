import axios, { AxiosError } from 'axios';
import { Token } from '@/types';
import { API_CONFIG } from '@/constants';

// Create axios instance with default config
const apiClient = axios.create({
  timeout: API_CONFIG.TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Custom error class for API errors
export class ApiError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public originalError?: AxiosError
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export const fetchTokenPrices = async (): Promise<Token[]> => {
  try {
    const response = await apiClient.get<Token[]>(API_CONFIG.BASE_URL);
    
    // Validate response data
    if (!Array.isArray(response.data)) {
      throw new ApiError('Invalid response format: expected array of tokens');
    }
    
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    
    // Log error for debugging
    console.error('Error fetching token prices:', error);
    
    // Throw custom error with better context
    if (axiosError.code === 'ECONNABORTED') {
      throw new ApiError('Request timeout - please try again', 408, axiosError);
    }
    
    if (axiosError.response) {
      throw new ApiError(
        `Server error: ${axiosError.response.status}`,
        axiosError.response.status,
        axiosError
      );
    }
    
    if (axiosError.request) {
      throw new ApiError('Network error - please check your connection', 0, axiosError);
    }
    
    throw new ApiError('Unknown error occurred', 500, axiosError);
  }
}; 