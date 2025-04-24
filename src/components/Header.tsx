import React from 'react';
import { RefreshCcw, Moon, Sun, Search } from 'lucide-react';
import { useSelector } from 'react-redux';
import { selectAllAssets } from '../store/cryptoSlice';

interface HeaderProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({ darkMode, toggleDarkMode, searchQuery, setSearchQuery }) => {
  const assets = useSelector(selectAllAssets);
  const totalMarketCap = assets.reduce((sum, asset) => sum + asset.marketCap, 0);

  return (
    <header className="sticky top-0 z-10 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div className="flex items-center mr-2">
              <RefreshCcw className="text-indigo-600 dark:text-indigo-400 h-5 w-5 mr-2" />
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">CryptoTracker</h1>
            </div>

            <div className="hidden md:flex items-center text-xs text-gray-500 dark:text-gray-400 ml-4">
              <span>Global Market Cap: {new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                notation: 'compact',
                compactDisplay: 'short',
                maximumFractionDigits: 2
              }).format(totalMarketCap)}</span>
            </div>
          </div>

          <div className="flex items-center">
            <div className="relative hidden md:block mr-4">
              <input
                type="text"
                placeholder="Search crypto..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-600 text-sm w-full max-w-xs"
              />
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
            </div>

            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {darkMode ? (
                <Sun className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              ) : (
                <Moon className="h-5 w-5 text-gray-500" />
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;