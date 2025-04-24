export const generateMockChartData = (days: number, minPrice: number, maxPrice: number) => {
  const data = [];
  const now = new Date();
  
  for (let i = days; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    
    // Generate a price within the range that follows a trend
    const randomFactor = 0.2 + Math.random() * 0.6; // 0.2 to 0.8 to avoid extremes
    const price = minPrice + (maxPrice - minPrice) * randomFactor;
    
    data.push({
      date: date.toISOString().split('T')[0],
      price: parseFloat(price.toFixed(2))
    });
  }
  
  return data;
};

// Generate random percentage change within a realistic range
export const generateRandomPercentChange = (min: number, max: number) => {
  return parseFloat((min + Math.random() * (max - min)).toFixed(2));
};

// Generate realistic price change based on percentage
export const calculatePriceChange = (currentPrice: number, percentChange: number) => {
  return currentPrice * (1 + percentChange / 100);
};

// Generate realistic volume change
export const generateVolumeChange = (currentVolume: number) => {
  const percentChange = generateRandomPercentChange(-5, 5);
  return currentVolume * (1 + percentChange / 100);
};