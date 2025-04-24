import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { formatPercentage } from '../utils/formatters';

interface PercentageChangeProps {
  value: number;
  animated?: boolean;
}

const PercentageChange: React.FC<PercentageChangeProps> = ({ value, animated = false }) => {
  const isPositive = value > 0;
  const isNeutral = value === 0;
  
  const colorClass = isPositive 
    ? 'text-green-500 dark:text-green-400' 
    : isNeutral 
      ? 'text-gray-500 dark:text-gray-400' 
      : 'text-red-500 dark:text-red-400';
      
  const bgClass = animated 
    ? isPositive 
      ? 'bg-green-100 dark:bg-green-900 dark:bg-opacity-20' 
      : isNeutral 
        ? '' 
        : 'bg-red-100 dark:bg-red-900 dark:bg-opacity-20'
    : '';
  
  const renderIcon = () => {
    if (isPositive) {
      return <TrendingUp className="h-3.5 w-3.5 mr-1" />;
    } else if (isNeutral) {
      return <Minus className="h-3.5 w-3.5 mr-1" />;
    } else {
      return <TrendingDown className="h-3.5 w-3.5 mr-1" />;
    }
  };
  
  return (
    <div className={`inline-flex items-center rounded px-1.5 py-0.5 text-sm font-medium ${colorClass} ${bgClass} ${animated ? 'transition-all duration-500' : ''}`}>
      {renderIcon()}
      {formatPercentage(value)}
    </div>
  );
};

export default PercentageChange;