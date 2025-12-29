import React from 'react';
import { Shloka } from '../types';

interface ShlokaDetailViewProps {
  shloka: Shloka | null;
  onClose: () => void;
}

const ShlokaDetailView: React.FC<ShlokaDetailViewProps> = ({ shloka, onClose }) => {
  if (!shloka) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center p-4 z-50 animate-fadeIn overflow-y-auto pt-8">
      <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[85vh] overflow-y-auto my-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-saffron to-orange-600 text-white p-6 rounded-t-2xl">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold mb-2">श्लोक विवरण</h2>
              <p className="text-sm opacity-90">Shloka Details</p>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition-all"
              aria-label="Close"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Full Shloka Text */}
          <div className="bg-orange-50 rounded-xl p-6 border-l-4 border-saffron">
            <h3 className="text-sm font-bold text-gray-600 uppercase tracking-wide mb-4">पूर्ण श्लोक (Full Shloka)</h3>
            <div className="devanagari text-xl md:text-2xl text-gray-800 leading-relaxed whitespace-pre-line text-center">
              {shloka.text}
            </div>
          </div>

          {/* Next Character Info */}
          <div className="grid grid-cols-1 gap-4">
            <div className="bg-white border-2 border-orange-200 rounded-xl p-5">
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-3">अगला अक्षर (Next Character)</h3>
              <div className="flex items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-saffron text-white flex items-center justify-center shadow-lg">
                  <span className="devanagari text-4xl font-bold">{shloka.nextChar}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              onClick={onClose}
              className="flex-1 px-6 py-3 bg-saffron text-white rounded-xl font-bold shadow-lg hover:bg-orange-600 transition-all"
            >
              नया खोजें (Search New)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShlokaDetailView;
