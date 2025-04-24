import React from 'react';
import { AreaChart, Area, ResponsiveContainer, YAxis } from 'recharts';

interface PriceChartProps {
  data: Array<{ date: string; price: number }>;
  isPositive: boolean;
}

const PriceChart: React.FC<PriceChartProps> = ({ data, isPositive }) => {
  const chartColor = isPositive ? '#10b981' : '#ef4444'; // green for positive, red for negative

  return (
    <div className="h-14 w-40">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id={`colorPrice-${isPositive ? 'up' : 'down'}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={chartColor} stopOpacity={0.3} />
              <stop offset="95%" stopColor={chartColor} stopOpacity={0} />
            </linearGradient>
          </defs>
          <YAxis domain={['dataMin', 'dataMax']} hide />
          <Area
            type="monotone"
            dataKey="price"
            stroke={chartColor}
            strokeWidth={2}
            fillOpacity={1}
            fill={`url(#colorPrice-${isPositive ? 'up' : 'down'})`}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PriceChart;