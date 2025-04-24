import React, { useState, useRef, useEffect } from 'react';
import { HelpCircle } from 'lucide-react';

interface InfoTooltipProps {
  content: string | React.ReactNode;
}

const InfoTooltip: React.FC<InfoTooltipProps> = ({ content }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        tooltipRef.current &&
        !tooltipRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setShowTooltip(false);
      }
    };

    if (showTooltip) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showTooltip]);

  return (
    <div className="relative inline-block">
      <button
        type="button"
        ref={buttonRef}
        className="text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400 focus:outline-none"
        onClick={() => setShowTooltip((prev) => !prev)}
        aria-label="More information"
      >
        <HelpCircle className="h-4 w-4" />
      </button>

      {showTooltip && (
        <div
          ref={tooltipRef}
          className="absolute z-10 w-64 p-3 text-sm text-gray-700 bg-white border border-gray-200 rounded-lg shadow-lg dark:text-gray-300 dark:bg-gray-800 dark:border-gray-700"
          style={{
            top: 'calc(100% + 5px)',
            left: '50%',
            transform: 'translateX(-50%)',
          }}
        >
          <div className="relative">
            <div className="absolute w-3 h-3 bg-white dark:bg-gray-800 transform rotate-45 -top-5 left-1/2 -ml-1.5 border-t border-l border-gray-200 dark:border-gray-700"></div>
            <div className="relative z-10">{content}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InfoTooltip;