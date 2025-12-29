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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white border-2 border-orange-200 rounded-xl p-5">
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-3">अगला अक्षर (Next Character)</h3>
              <div className="flex items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-saffron text-white flex items-center justify-center shadow-lg">
                  <span className="devanagari text-4xl font-bold">{shloka.nextChar}</span>
                </div>
              </div>
            </div>

            {shloka.index !== undefined && (
              <div className="bg-white border-2 border-orange-200 rounded-xl p-5">
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-3">डेटाबेस स्थिति (Database Position)</h3>
                <div className="text-center">
                  <p className="text-3xl font-bold text-saffron">#{shloka.index + 1}</p>
                  <p className="text-xs text-gray-500 mt-1">of 10,534 shlokas</p>
                </div>
              </div>
            )}
          </div>

          {/* Info Card */}
          <div className="bg-blue-50 rounded-xl p-5 border border-blue-200">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h4 className="font-bold text-blue-900 mb-1">जानकारी (Information)</h4>
                <p className="text-sm text-blue-800">
                  यह श्लोक संस्कृत साहित्य के विविध स्रोतों से संग्रहीत है। अगला अक्षर श्लोक की अंतिम ध्वनि को दर्शाता है।
                </p>
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
