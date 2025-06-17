export const parseTokenPrice = (price: number | string, defaultValue: number = 0): number => {
  try {
    const parsedPrice = parseFloat(price.toString());
    
    // Check if the result is a valid number
    if (isNaN(parsedPrice) || !isFinite(parsedPrice)) {
      console.warn(`Invalid price value: ${price}, using default value: ${defaultValue}`);
      return defaultValue;
    }
    
    return parsedPrice;
  } catch (error) {
    console.warn(`Error parsing price: ${price}, using default value: ${defaultValue}`, error);
    return defaultValue;
  }
}; 