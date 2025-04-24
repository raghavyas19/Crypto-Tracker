import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectAllAssets, CryptoAsset } from '../store/cryptoSlice';
import CryptoRow from './CryptoRow';
import { ArrowUpDown, Info } from 'lucide-react';

interface CryptoTableProps {
  searchQuery: string;
}

const CryptoTable: React.FC<CryptoTableProps> = ({ searchQuery }) => {
  const assets = useSelector(selectAllAssets) as CryptoAsset[];
  const [sortConfig, setSortConfig] = useState<{ key: keyof CryptoAsset | null; direction: 'asc' | 'desc' }>({
    key: null,
    direction: 'asc',
  });

  const sortAssets = (assets: CryptoAsset[]): CryptoAsset[] => {
    if (!sortConfig.key) return assets;

    const sortedAssets = [...assets];
    const key = sortConfig.key;

    sortedAssets.sort((a, b) => {
      const aValue = a[key];
      const bValue = b[key];

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortConfig.direction === 'asc' ? aValue - bValue : bValue - aValue;
      } else if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortConfig.direction === 'asc'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      return 0;
    });

    return sortedAssets;
  };

  const handleSort = (key: keyof CryptoAsset) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  const sortedAssets = sortAssets(assets);
  const filteredAssets = sortedAssets.filter((asset) =>
    asset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    asset.symbol.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto divide-y divide-gray-200 dark:divide-gray-800">
        <thead className="bg-gray-50 dark:bg-gray-800/50">
          <tr>
            <th
              scope="col"
              className="py-3 pl-4 pr-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider whitespace-nowrap w-12"
            >
              <span className="flex items-center">#</span>
            </th>
            <th
              scope="col"
              className="py-3 px-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider whitespace-nowrap w-32 cursor-pointer"
              onClick={() => handleSort('name')}
            >
              <span className="flex items-center">
                Name <ArrowUpDown className="ml-1 h-3 w-3" />
              </span>
            </th>
            <th
              scope="col"
              className="py-3 px-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider whitespace-nowrap w-24 cursor-pointer"
              onClick={() => handleSort('price')}
            >
              <span className="flex items-center">
                Price <ArrowUpDown className="ml-1 h-3 w-3" />
              </span>
            </th>
            <th
              scope="col"
              className="py-3 px-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider whitespace-nowrap w-20 cursor-pointer"
              onClick={() => handleSort('percentChange1h')}
            >
              <span className="flex items-center">
                1h % <ArrowUpDown className="ml-1 h-3 w-3" />
              </span>
            </th>
            <th
              scope="col"
              className="py-3 px-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider whitespace-nowrap w-20 cursor-pointer"
              onClick={() => handleSort('percentChange24h')}
            >
              <span className="flex items-center">
                24h % <ArrowUpDown className="ml-1 h-3 w-3" />
              </span>
            </th>
            <th
              scope="col"
              className="py-3 px-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider whitespace-nowrap w-20 cursor-pointer"
              onClick={() => handleSort('percentChange7d')}
            >
              <span className="flex items-center">
                7d % <ArrowUpDown className="ml-1 h-3 w-3" />
              </span>
            </th>
            <th
              scope="col"
              className="py-3 px-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider whitespace-nowrap w-32 cursor-pointer"
              onClick={() => handleSort('marketCap')}
            >
              <span className="flex items-center">
                Market Cap
                <Info className="ml-1 h-3 w-3" />
                <ArrowUpDown className="ml-1 h-3 w-3" />
              </span>
            </th>
            <th
              scope="col"
              className="py-3 px-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider whitespace-nowrap w-32 cursor-pointer"
              onClick={() => handleSort('volume24h')}
            >
              <span className="flex items-center">
                Volume(24h)
                <Info className="ml-1 h-3 w-3" />
                <ArrowUpDown className="ml-1 h-3 w-3" />
              </span>
            </th>
            <th
              scope="col"
              className="py-3 px-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider whitespace-nowrap w-40"
            >
              <span className="flex items-center">
                Circulating Supply
                <Info className="ml-1 h-3 w-3" />
              </span>
            </th>
            <th scope="col" className="py-3 px-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider w-48">
              Last 7 Days
            </th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800">
          {filteredAssets.map((asset) => (
            <CryptoRow key={asset.id} asset={asset} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CryptoTable;