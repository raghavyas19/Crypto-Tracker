import { store } from '../store';
import { updatePrices } from '../store/cryptoSlice';

class BinanceWebSocket {
  private socket: WebSocket | null = null;
  private symbols: string[] = ['btcusdt', 'ethusdt', 'usdtusdt', 'xrpusdt', 'bnbusdt', 'solusdt'];

  constructor() {
    this.connect();
  }

  connect() {
    if (!this.socket) {
      const streams = this.symbols.map(symbol => `${symbol}@trade`).join('/');
      this.socket = new WebSocket(`wss://stream.binance.com:9443/ws/${streams}`);

      this.socket.onopen = () => {
        console.log('Binance WebSocket connected');
      };

      this.socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        this.handlePriceUpdate(data);
      };

      this.socket.onclose = () => {
        console.log('Binance WebSocket disconnected');
        this.socket = null;
        setTimeout(() => this.connect(), 5000);
      };

      this.socket.onerror = (error) => {
        console.error('Binance WebSocket error:', error);
      };
    }
  }

  disconnect() {
    if (this.socket) {
      this.socket.close();
      this.socket = null;
      console.log('Binance WebSocket manually disconnected');
    }
  }

  private handlePriceUpdate(data: any) {
    const assets = store.getState().crypto.assets;
    const symbolToId: { [key: string]: string } = {
      btcusdt: 'bitcoin',
      ethusdt: 'ethereum',
      usdtusdt: 'tether',
      xrpusdt: 'xrp',
      bnbusdt: 'bnb',
      solusdt: 'solana',
    };

    const assetId = symbolToId[data.s.toLowerCase()];
    if (!assetId) return;

    const asset = assets.find(a => a.id === assetId);
    if (!asset) return;

    const newPrice = parseFloat(data.p);
    const percentChange1h = asset.percentChange1h || 0;
    const percentChange24h = asset.percentChange24h || 0;
    const volume24h = asset.volume24h || 0;

    const lastChartPoint = asset.chartData[asset.chartData.length - 1];
    const chartData = [...asset.chartData];
    if (Math.random() > 0.7) {
      chartData[chartData.length - 1] = {
        ...lastChartPoint,
        price: newPrice,
      };
    }

    const update = {
      id: assetId,
      price: parseFloat(newPrice.toFixed(2)),
      percentChange1h,
      percentChange24h,
      volume24h,
      chartData,
    };

    store.dispatch(updatePrices([update]));
  }
}

export default BinanceWebSocket;