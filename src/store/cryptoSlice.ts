import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './index';
import { generateMockChartData } from '../utils/mockData';

export interface CryptoAsset {
  id: string;
  rank: number;
  name: string;
  symbol: string;
  logo: string;
  price: number;
  percentChange1h: number;
  percentChange24h: number;
  percentChange7d: number;
  marketCap: number;
  volume24h: number;
  circulatingSupply: number;
  maxSupply: number | null;
  chartData: Array<{ date: string; price: number }>;
  favorite: boolean;
}

interface CryptoState {
  assets: CryptoAsset[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: CryptoState = {
  assets: [
    {
      id: 'bitcoin',
      rank: 1,
      name: 'Bitcoin',
      symbol: 'BTC',
      logo: 'https://cryptologos.cc/logos/bitcoin-btc-logo.png',
      price: 93759.48,
      percentChange1h: 0.43,
      percentChange24h: 0.93,
      percentChange7d: 11.11,
      marketCap: 1861618902186,
      volume24h: 43874950947,
      circulatingSupply: 19.85,
      maxSupply: 21,
      chartData: generateMockChartData(7, 90000, 95000),
      favorite: false
    },
    {
      id: 'ethereum',
      rank: 2,
      name: 'Ethereum',
      symbol: 'ETH',
      logo: 'https://cryptologos.cc/logos/ethereum-eth-logo.png',
      price: 1802.46,
      percentChange1h: 0.60,
      percentChange24h: 3.21,
      percentChange7d: 13.68,
      marketCap: 217581279327,
      volume24h: 23547469307,
      circulatingSupply: 120.71,
      maxSupply: null,
      chartData: generateMockChartData(7, 1700, 1850),
      favorite: false
    },
    {
      id: 'tether',
      rank: 3,
      name: 'Tether',
      symbol: 'USDT',
      logo: 'https://cryptologos.cc/logos/tether-usdt-logo.png',
      price: 1.00,
      percentChange1h: 0.00,
      percentChange24h: 0.00,
      percentChange7d: 0.04,
      marketCap: 145320022085,
      volume24h: 92288882007,
      circulatingSupply: 145.27,
      maxSupply: null,
      chartData: generateMockChartData(7, 0.99, 1.01),
      favorite: false
    },
    {
      id: 'xrp',
      rank: 4,
      name: 'XRP',
      symbol: 'XRP',
      logo: 'https://cryptologos.cc/logos/xrp-xrp-logo.png',
      price: 2.22,
      percentChange1h: 0.46,
      percentChange24h: 0.54,
      percentChange7d: 6.18,
      marketCap: 130073814966,
      volume24h: 5131481491,
      circulatingSupply: 58.39,
      maxSupply: 100,
      chartData: generateMockChartData(7, 2.00, 2.30),
      favorite: false
    },
    {
      id: 'bnb',
      rank: 5,
      name: 'BNB',
      symbol: 'BNB',
      logo: 'https://cryptologos.cc/logos/bnb-bnb-logo.png',
      price: 606.65,
      percentChange1h: 0.09,
      percentChange24h: -1.20,
      percentChange7d: 3.73,
      marketCap: 85471956947,
      volume24h: 1874281784,
      circulatingSupply: 140.89,
      maxSupply: 200,
      chartData: generateMockChartData(7, 580, 620),
      favorite: false
    },
    {
      id: 'solana',
      rank: 6,
      name: 'Solana',
      symbol: 'SOL',
      logo: 'https://cryptologos.cc/logos/solana-sol-logo.png',
      price: 151.51,
      percentChange1h: 0.53,
      percentChange24h: 1.26,
      percentChange7d: 14.74,
      marketCap: 78381958631,
      volume24h: 4881674486,
      circulatingSupply: 517.31,
      maxSupply: null,
      chartData: generateMockChartData(7, 140, 160),
      favorite: false
    }
  ],
  status: 'idle',
  error: null
};

export const cryptoSlice = createSlice({
  name: 'crypto',
  initialState,
  reducers: {
    updatePrices: (state, action: PayloadAction<Partial<CryptoAsset>[]>) => {
      action.payload.forEach(update => {
        const assetIndex = state.assets.findIndex(asset => asset.id === update.id);
        if (assetIndex !== -1) {
          state.assets[assetIndex] = {
            ...state.assets[assetIndex],
            ...update
          };
        }
      });
    },
    toggleFavorite: (state, action: PayloadAction<string>) => {
      const assetIndex = state.assets.findIndex(asset => asset.id === action.payload);
      if (assetIndex !== -1) {
        state.assets[assetIndex].favorite = !state.assets[assetIndex].favorite;
      }
    }
  }
});

export const { updatePrices, toggleFavorite } = cryptoSlice.actions;

// Selectors
export const selectAllAssets = (state: RootState) => state.crypto.assets;
export const selectAssetById = (state: RootState, id: string) => 
  state.crypto.assets.find(asset => asset.id === id);

export default cryptoSlice.reducer;