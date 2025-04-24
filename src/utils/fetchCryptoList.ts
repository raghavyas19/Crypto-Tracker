export interface CryptoInfo {
    id: string;
    symbol: string;
    name: string;
    logo: string;
    marketCap: number;
    circulatingSupply: number;
    maxSupply?: number;
  }
  
  export const fetchCryptoList = async (): Promise<CryptoInfo[]> => {
    try {
      const response = await fetch(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false'
      );
      const data = await response.json();
  
      return data.map((coin: any) => ({
        id: coin.id,
        symbol: coin.symbol.toUpperCase(),
        name: coin.name,
        logo: coin.image,
        marketCap: coin.market_cap,
        circulatingSupply: coin.circulating_supply / 1_000_000,
        maxSupply: coin.max_supply ? coin.max_supply / 1_000_000 : undefined,
      }));
    } catch (error) {
      console.error('Error fetching crypto list from CoinGecko:', error);
      return [];
    }
  };