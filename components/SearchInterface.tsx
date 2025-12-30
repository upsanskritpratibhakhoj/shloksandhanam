import React, { useState, useEffect, useRef } from 'react';
import { searchShlokas, ShlokaSearchResult, getTotalShlokaCount } from '../services/shlokaSearchService';
import ShlokaDropdown from './ShlokaDropdown';
import ShlokaDetailView from './ShlokaDetailView';
import { Shloka } from '../types';
import Sanscript from '@indic-transliteration/sanscript';
import { normalizePhonetic, isDevanagari } from '../utils/phoneticNormalizer';

const SearchInterface: React.FC = () => {
  const [searchInput, setSearchInput] = useState('');
  const [searchResults, setSearchResults] = useState<ShlokaSearchResult[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedShloka, setSelectedShloka] = useState<Shloka | null>(null);
  const [transliteratedPreview, setTransliteratedPreview] = useState('');
  const searchRef = useRef<HTMLDivElement>(null);
  const totalCount = getTotalShlokaCount();

  // Handle search input changes
  useEffect(() => {
    if (searchInput.trim().length > 0) {
      const results = searchShlokas(searchInput, 50);
      setSearchResults(results);
      setShowDropdown(true);
      
      // Generate transliteration preview for English input
      if (!isDevanagari(searchInput)) {
        try {
          const normalized = normalizePhonetic(searchInput.trim());
          const preview = Sanscript.t(normalized, 'itrans', 'devanagari');
          setTransliteratedPreview(preview);
        } catch (error) {
          setTransliteratedPreview('');
        }
      } else {
        setTransliteratedPreview('');
      }
    } else {
      setSearchResults([]);
      setShowDropdown(false);
      setTransliteratedPreview('');
    }
  }, [searchInput]);

  // Handle clicks outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleShlokaSelect = (result: ShlokaSearchResult) => {
    setSelectedShloka({
      text: result.text,
      nextChar: result.nextChar,
      index: result.index
    });
    setShowDropdown(false);
  };

  const handleCloseDetail = () => {
    setSelectedShloka(null);
    setSearchInput('');
    setSearchResults([]);
    setTransliteratedPreview('');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn">
      {/* Header Section */}
      <div className="text-center space-y-4 py-8">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
          श्लोक खोजें
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          {totalCount.toLocaleString('hi-IN')} श्लोकों के संग्रह में खोजें
        </p>
        <p className="text-sm text-gray-500">
          Search through {totalCount.toLocaleString('en-US')} shlokas from Sanskrit literature
        </p>
      </div>

      {/* Search Box */}
      <div ref={searchRef} className="relative">
        <div className="relative">
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="श्लोक का आरंभ लिखें... या Type in English (e.g., 'raghuvamsham', 'ansham')"
            className="w-full pl-14 pr-6 py-5 text-lg border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-saffron focus:ring-4 focus:ring-orange-100 transition-all shadow-sm devanagari"
          />
          
          {searchInput && (
            <button
              onClick={() => {
                setSearchInput('');
                setSearchResults([]);
                setShowDropdown(false);
                setTransliteratedPreview('');
              }}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* Transliteration Preview */}
        {transliteratedPreview && !isDevanagari(searchInput) && (
          <div className="mt-2 text-sm text-gray-500 bg-orange-50 px-3 py-2 rounded-md">
            <span className="text-gray-400">Searching for: </span>
            <span className="devanagari font-semibold text-saffron">{transliteratedPreview}</span>
          </div>
        )}

        {/* Dropdown Results */}
        <ShlokaDropdown
          results={searchResults}
          onSelect={handleShlokaSelect}
          isVisible={showDropdown}
        />
      </div>

      {/* Instructions */}
      {!searchInput && (
        <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-8 space-y-6">
          <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
            <span className="text-saffron">📖</span>
            उपयोग निर्देश (How to Use)
          </h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-saffron text-white flex items-center justify-center font-bold">
                  1
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 mb-2">देवनागरी या English में टाइप करें</h4>
                  <p className="text-sm text-gray-600">
                    देवनागरी में या English अक्षरों में श्लोक का आरंभिक भाग लिखें (जैसे: "raghuvamsham" या "रघुवंशम्")
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-saffron text-white flex items-center justify-center font-bold">
                  2
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 mb-2">परिणाम देखें</h4>
                  <p className="text-sm text-gray-600">
                    मिलान करने वाले श्लोक ड्रॉपडाउन में दिखाई देंगे
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-saffron text-white flex items-center justify-center font-bold">
                  3
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 mb-2">श्लोक चुनें</h4>
                  <p className="text-sm text-gray-600">
                    किसी भी श्लोक पर क्लिक करके पूर्ण विवरण देखें
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-saffron text-white flex items-center justify-center font-bold">
                  4
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 mb-2">विस्तृत जानकारी</h4>
                  <p className="text-sm text-gray-600">
                    पूर्ण श्लोक और अगला अक्षर देखें
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 border-l-4 border-saffron">
            <h4 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
              <span>💡</span> सुझाव (Tips)
            </h4>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>• बेहतर परिणाम के लिए रघुवंशम्, कुमारसंभवम्, मेघदूतम्, नैषधीयचरितम्, किरातार्जुनीयम् जैसे प्रसिद्ध ग्रंथों के श्लोक खोजें।</li>
              <li>• English में टाइप करें जैसे: "raghuvamsham", "ansham", "moksha"</li>
              <li>• System will automatically convert to देवनागरी</li>
            </ul>
          </div>
        </div>
      )}

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100 text-center">
          <div className="text-3xl font-bold text-saffron">{totalCount.toLocaleString('en-US')}</div>
          <div className="text-sm text-gray-600 mt-2">कुल श्लोक (Total Shlokas)</div>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100 text-center">
          <div className="text-3xl font-bold text-saffron">15+</div>
          <div className="text-sm text-gray-600 mt-2">संस्कृत ग्रंथ (Sanskrit Texts)</div>
        </div>
      </div>

      {/* Detail View Modal */}
      <ShlokaDetailView
        shloka={selectedShloka}
        onClose={handleCloseDetail}
      />
    </div>
  );
};

export default SearchInterface;
