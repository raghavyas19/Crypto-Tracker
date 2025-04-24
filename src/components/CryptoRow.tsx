import React, { useEffect, useRef, useState } from 'react';
import { Star } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { toggleFavorite } from '../store/cryptoSlice';
import { formatPrice, formatMarketCap, formatVolume, formatSupply } from '../utils/formatters';
import PercentageChange from './PercentageChange';
import PriceChart from './PriceChart';
import InfoTooltip from './InfoTooltip';
import type { CryptoAsset } from '../store/cryptoSlice';
import { coinImageMap } from '../utils/coinImageMap';

interface CryptoRowProps {
  asset: CryptoAsset;
}

const CryptoRow: React.FC<CryptoRowProps> = ({ asset }) => {
  const dispatch = useDispatch();
  const prevPriceRef = useRef(asset.price);
  const [priceChanged, setPriceChanged] = useState(false);
  const [priceIncreased, setPriceIncreased] = useState(false);

  useEffect(() => {
    console.log('Logo URL:', asset.logo);
  }, []);


  useEffect(() => {
    if (prevPriceRef.current !== asset.price) {
      setPriceChanged(true);
      setPriceIncreased(asset.price > prevPriceRef.current);

      const timer = setTimeout(() => {
        setPriceChanged(false);
      }, 1000);

      prevPriceRef.current = asset.price;

      return () => clearTimeout(timer);
    }
  }, [asset.price]);

  const handleToggleFavorite = () => {
    dispatch(toggleFavorite(asset.id));
  };

  const marketCapInfo = formatMarketCap(asset.marketCap);
  const volumeInfo = formatVolume(asset.volume24h, asset.symbol);

  return (
    <tr className="border-b border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/30">
      <td className="py-4 pl-4 pr-3 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
        <div className="flex items-center">
          <button
            onClick={handleToggleFavorite}
            className="mr-3 focus:outline-none"
            aria-label={asset.favorite ? "Remove from favorites" : "Add to favorites"}
          >
            <Star
              className={`h-4 w-4 ${asset.favorite ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300 dark:text-gray-600'}`}
            />
          </button>
          <span>{asset.rank}</span>
        </div>
      </td>

      <td className="py-4 px-3 whitespace-nowrap text-sm">
        <div className="flex items-center">
          <img
            src={coinImageMap[asset.symbol.toLowerCase()] || 'https://via.placeholder.com/24/CCCCCC/FFFFFF?text=NA'}
            alt={`${asset.name} logo`}
            className="h-6 w-6 mr-2 rounded-full"
          />
          <div>
            <div className="font-medium text-gray-900 dark:text-white">{asset.name}</div>
            <div className="text-gray-500 dark:text-gray-400">{asset.symbol}</div>
          </div>
        </div>
      </td>

      <td
        className={`py-4 px-3 whitespace-nowrap text-sm font-medium ${priceChanged
            ? priceIncreased
              ? 'text-green-600 dark:text-green-400'
              : 'text-red-600 dark:text-red-400'
            : 'text-gray-900 dark:text-white'
          } transition-colors duration-500`}
      >
        {formatPrice(asset.price)}
      </td>

      <td className="py-4 px-3 whitespace-nowrap text-sm">
        <PercentageChange value={asset.percentChange1h} />
      </td>

      <td className="py-4 px-3 whitespace-nowrap text-sm">
        <PercentageChange value={asset.percentChange24h} />
      </td>

      <td className="py-4 px-3 whitespace-nowrap text-sm">
        <PercentageChange value={asset.percentChange7d} />
      </td>

      <td className="py-4 px-3 whitespace-nowrap text-sm text-gray-900 dark:text-white">
        <div className="flex items-center">
          <span>{marketCapInfo.short}</span>
          <InfoTooltip content={marketCapInfo.full} />
        </div>
      </td>

      <td className="py-4 px-3 whitespace-nowrap text-sm text-gray-900 dark:text-white">
        <div className="flex items-center">
          <span>{volumeInfo.short}</span>
          <InfoTooltip
            content={
              <div>
                <div>{volumeInfo.full}</div>
                <div className="text-gray-500 dark:text-gray-400 text-xs mt-1">{volumeInfo.crypto}</div>
              </div>
            }
          />
        </div>
      </td>

      <td className="py-4 px-3 whitespace-nowrap text-sm text-gray-900 dark:text-white">
        <div className="flex items-center">
          <span>{formatSupply(asset.circulatingSupply, asset.symbol)}</span>
          {asset.maxSupply && (
            <InfoTooltip
              content={
                <div>
                  <div>Max supply: {asset.maxSupply}M {asset.symbol}</div>
                  <div className="mt-1 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                    <div
                      className="bg-indigo-600 dark:bg-indigo-500 h-1.5 rounded-full"
                      style={{ width: `${(asset.circulatingSupply / asset.maxSupply) * 100}%` }}
                    ></div>
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {((asset.circulatingSupply / asset.maxSupply) * 100).toFixed(1)}% of max supply
                  </div>
                </div>
              }
            />
          )}
        </div>
      </td>

      <td className="py-4 px-3 whitespace-nowrap align-middle">
        <div className="w-40 h-14">
          <PriceChart data={asset.chartData} isPositive={asset.percentChange7d > 0} />
        </div>
      </td>
    </tr>
  );
};

export default CryptoRow;