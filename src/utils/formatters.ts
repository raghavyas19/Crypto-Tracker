export const formatNumber = (num: number): string => {
  if (num >= 1000000000000) {
    return `$${(num / 1000000000000).toFixed(2)}T`;
  }
  if (num >= 1000000000) {
    return `$${(num / 1000000000).toFixed(2)}B`;
  }
  if (num >= 1000000) {
    return `$${(num / 1000000).toFixed(2)}M`;
  }
  if (num >= 1000) {
    return `$${(num / 1000).toFixed(2)}K`;
  }
  return `$${num.toFixed(2)}`;
};

export const formatPrice = (price: number): string => {
  if (price >= 1) {
    return `$${price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }
  return `$${price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 6 })}`;
};

export const formatPercentage = (percent: number): string => {
  const formattedPercent = percent.toFixed(2);
  if (percent > 0) {
    return `+${formattedPercent}%`;
  }
  return `${formattedPercent}%`;
};

export const formatSupply = (supply: number, symbol: string): string => {
  return `${supply.toFixed(2)}M ${symbol}`;
};

export const formatMarketCap = (marketCap: number): { short: string, full: string } => {
  return {
    short: formatNumber(marketCap),
    full: `$${marketCap.toLocaleString('en-US')}`
  };
};

export const formatVolume = (volume: number, symbol: string): { short: string, full: string, crypto: string } => {
  const cryptoAmount = volume / 1000000;
  return {
    short: formatNumber(volume),
    full: `$${volume.toLocaleString('en-US')}`,
    crypto: `${cryptoAmount.toFixed(2)}M ${symbol}`
  };
};