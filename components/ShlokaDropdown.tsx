import React from 'react';
import { ShlokaSearchResult } from '../services/shlokaSearchService';

interface ShlokaDropdownProps {
  results: ShlokaSearchResult[];
  onSelect: (shloka: ShlokaSearchResult) => void;
  isVisible: boolean;
}

const ShlokaDropdown: React.FC<ShlokaDropdownProps> = ({ results, onSelect, isVisible }) => {
  if (!isVisible || results.length === 0) {
    return null;
  }

  return (
    <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-gray-200 max-h-96 overflow-y-auto z-50 animate-slideDown">
      <div className="p-3 bg-orange-50 border-b border-orange-100 sticky top-0">
        <p className="text-xs font-semibold text-gray-600">
          {results.length} श्लोक मिले (Found {results.length} shlokas)
        </p>
      </div>
      
      <div className="divide-y divide-gray-100">
        {results.map((result, index) => (
          <button
            key={result.index}
            onClick={() => onSelect(result)}
            className="w-full px-4 py-3 text-left hover:bg-orange-50 transition-colors duration-150 focus:outline-none focus:bg-orange-100 group"
          >
            <div className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-saffron text-white text-xs font-bold flex items-center justify-center mt-1">
                {index + 1}
              </span>
              <div className="flex-1 min-w-0">
                <p className="devanagari text-lg text-gray-800 leading-relaxed line-clamp-2 group-hover:text-gray-900">
                  {result.text.split('\n')[0]}...
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[10px] text-gray-500 font-medium">
                    Next: <span className="devanagari text-saffron font-bold">{result.nextChar}</span>
                  </span>
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ShlokaDropdown;
