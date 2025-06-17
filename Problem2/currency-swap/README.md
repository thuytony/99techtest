# Currency Swap Application

A modern React application for currency swapping with real-time price updates and Binance-inspired UI design. Built with Vite and TypeScript for optimal performance and developer experience.

## 🚀 Project Overview

This currency swap application was developed to meet the requirements of a senior ReactJS position test. It demonstrates advanced frontend development skills with modern React patterns, TypeScript integration, and professional UI/UX design inspired by Binance's trading interface.

## ✨ Key Features & Requirements Fulfillment

### ✅ Core Requirements Met:
- **Currency Swap Form**: Complete form implementation with token selection and amount input
- **Input Validation**: Comprehensive validation with user-friendly error messages
- **Visual Excellence**: Binance-inspired dark theme with modern Material-UI components
- **Token Icons**: Integration with Switcheo token icons repository
- **Real-time Pricing**: Live price data from interview.switcheo.com/prices.json
- **Vite Build System**: Lightning-fast development and build process

### 🎯 Advanced Features:
- **10-Second Price Refresh**: Automatic price updates every 10 seconds during active trading
- **10-Second Confirmation Window**: Price-locked confirmation flow with countdown timer
- **Binance-Inspired Design**: Professional trading interface with golden accents (#F0B90B)
- **Smart Price Management**: Automatic price refresh after confirmation timeout
- **Loading States**: Smooth loading indicators and progress feedback
- **Error Boundaries**: Graceful error handling with user-friendly messages
- **Responsive Design**: Optimized for all screen sizes

## 🏗️ Code Organization & Architecture

### Project Structure
```
src/
├── components/                # Reusable components
│   ├── ErrorBoundary/         # Error handling wrapper
│   ├── LoadingSpinner/        # Reusable loading component
│   ├── SwapForm/              # Main swap form component
│   ├── TokenSelect/           # Token selection dropdown
│   └── index.ts               # Component exports
├── hooks/                     # Custom React hooks
│   ├── useSnackbar.ts         # Notification management
│   └── useSwapForm.ts         # Main swap logic and state
├── utils/                     # Utility functions
│   ├── api.ts                 # API client and error handling
│   ├── currency.ts            # Currency formatting utilities
│   └── validation.ts          # Form validation logic
├── constants/                 # Configuration constants
│   ├── config.ts               # API URLs, timing, UI config
│   └── theme.ts               # Material-UI theme configuration
├── types/                     # TypeScript definitions
│   └── index.ts               # Interface definitions
├── assets/                    # Static assets
└── App.tsx                    # Main application component
```

### Design Patterns Used:
- **Custom Hooks**: Separation of concerns with reusable state logic
- **Component Composition**: Modular, reusable components
- **Centralized Configuration**: Constants for easy maintenance
- **Type Safety**: Comprehensive TypeScript interfaces
- **Error Boundaries**: Graceful error handling
- **Memoization**: Performance optimization with useMemo/useCallback

## 🎨 UI/UX Design Philosophy

### Binance-Inspired Design System
- **Color Palette**: 
  - Primary: #F0B90B (Binance Gold)
  - Background: #0B0E11 (Deep Dark)
  - Surface: #1E2329 (Card Background)
  - Text: #EAECEF (Primary Text)
- **Typography**: SF Pro Display font family for modern appeal
- **Spacing**: Consistent 8px grid system
- **Components**: Material-UI with custom Binance styling

### Theme Configuration
The application's theme is centrally managed in `src/constants/theme.ts` for easy maintenance and consistency:

**Theme Features:**
- **Consistent Branding**: Unified color scheme across all components
- **Dark Mode Optimized**: Carefully selected colors for optimal dark mode experience
- **Material-UI Integration**: Custom theme that extends Material-UI's design system
- **Centralized Management**: Single source of truth for all styling constants
- **Component Overrides**: Custom styling for buttons, text fields, and papers

### Price Update Strategy
- **Auto-refresh**: Prices update every 10 seconds when both tokens selected
- **Confirmation Flow**: 10-second window to confirm at locked price
- **Smart Refresh**: Automatic price refresh if confirmation expires
- **Visual Feedback**: Loading indicators during price updates

## 🛡️ Input Validation & Error Handling

### Validation Rules
- **Token Selection**: Both from/to tokens must be selected
- **Amount Validation**: Positive numbers only, no empty values
- **Same Currency**: Prevents swapping same currency
- **Numeric Format**: Validates decimal inputs

### Error Handling Strategy
- **API Errors**: Graceful handling with user-friendly messages
- **Network Issues**: Retry logic and offline detection
- **Validation Errors**: Real-time feedback with clear instructions
- **Error Boundaries**: Prevents application crashes

## 🚦 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn package manager

### Installation & Setup
```bash
# Clone the repository
git clone <repository-url>
cd currency-swap

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env and set VITE_API_BASE_URL=https://interview.switcheo.com/prices.json

# Start development server
npm run dev
```

### Environment Configuration
Create a `.env` file in the root directory:
```env
VITE_API_BASE_URL=https://interview.switcheo.com/prices.json
```

## 🧪 Technical Implementation Highlights

### Performance Optimizations
- **Memoization**: useMemo for expensive calculations
- **Callback Optimization**: useCallback for event handlers
- **Bundle Optimization**: Tree shaking and code splitting
- **API Efficiency**: Request deduplication and caching

### State Management
- **Custom Hooks**: Centralized state logic in useSwapForm
- **Local State**: React useState for component-specific state
- **Effect Management**: Proper cleanup of intervals and listeners
- **Memoized Selectors**: Optimized re-render prevention

## 🔧 Development Features

- **Hot Module Replacement**: Instant updates during development
- **Path Aliases**: Clean imports with @ prefix
- **TypeScript**: Full type safety and IntelliSense
- **Modern Build**: Vite for lightning-fast builds
- **Code Splitting**: Automatic optimization

## 📱 Responsive Design

- **Mobile First**: Optimized for mobile devices
- **Tablet Support**: Adaptive layouts for tablets
- **Desktop**: Full-featured desktop experience

---

**Using React, TypeScript, and Vite**