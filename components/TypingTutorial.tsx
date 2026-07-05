'use client';

import React, { useState, useMemo } from 'react';
import { transliterateToDevanagari } from '../services/transliterationService';

interface TypingTutorialProps {
  isModal?: boolean;
  onClose?: () => void;
}

interface CharacterMapping {
  hindi: string;
  english: string[];
  name: string;
  example?: string;
  exampleHindi?: string;
}

const TypingTutorial: React.FC<TypingTutorialProps> = ({ isModal = false, onClose }) => {
  const [sandboxInput, setSandboxInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'vowels' | 'consonants' | 'signs' | 'examples'>('all');

  // Live transliteration preview
  const sandboxOutput = useMemo(() => {
    return transliterateToDevanagari(sandboxInput);
  }, [sandboxInput]);

  // Vowels (स्वर)
  const vowels: CharacterMapping[] = [
    { hindi: 'अ', english: ['a'], name: 'Swar A', example: 'akaara', exampleHindi: 'अकार' },
    { hindi: 'आ', english: ['aa', 'A'], name: 'Swar AA', example: 'aakaara / Akaara', exampleHindi: 'आकार' },
    { hindi: 'इ', english: ['i'], name: 'Swar I', example: 'iti', exampleHindi: 'इति' },
    { hindi: 'ई', english: ['ii', 'I'], name: 'Swar II', example: 'iishvara / Ishvara', exampleHindi: 'ईश्वर' },
    { hindi: 'उ', english: ['u'], name: 'Swar U', example: 'upadesha', exampleHindi: 'उपदेश' },
    { hindi: 'ऊ', english: ['uu', 'U'], name: 'Swar UU', example: 'uurja / Urja', exampleHindi: 'ऊर्जा' },
    { hindi: 'ऋ', english: ['ri', 'R'], name: 'Swar Vocalic R', example: 'rishi / Rishi', exampleHindi: 'ऋषि' },
    { hindi: 'ॠ', english: ['RR'], name: 'Swar Long Vocalic R', example: 'pitRRInaam', exampleHindi: 'पितॄणाम' },
    { hindi: 'ऌ', english: ['LLi'], name: 'Swar Vocalic L', example: 'LLikaara', exampleHindi: 'ऌकार' },
    { hindi: 'ॡ', english: ['LLI'], name: 'Swar Long Vocalic L', example: 'LLIkaara', exampleHindi: 'ॡकार' },
    { hindi: 'ए', english: ['e'], name: 'Swar E', example: 'eka', exampleHindi: 'एक' },
    { hindi: 'ऐ', english: ['ai'], name: 'Swar AI', example: 'aikya', exampleHindi: 'ऐक्य' },
    { hindi: 'ओ', english: ['o'], name: 'Swar O', example: 'oshtha', exampleHindi: 'ओष्ठ' },
    { hindi: 'औ', english: ['au'], name: 'Swar AU', example: 'aushadha', exampleHindi: 'औषध' },
  ];

  // Consonants (व्यंजन)
  const consonants: { category: string; list: CharacterMapping[] }[] = [
    {
      category: 'क-वर्ग (Gutturals)',
      list: [
        { hindi: 'क', english: ['ka', 'k'], name: 'ka' },
        { hindi: 'ख', english: ['kha', 'kh'], name: 'kha' },
        { hindi: 'ग', english: ['ga', 'g'], name: 'ga' },
        { hindi: 'घ', english: ['gha', 'gh'], name: 'gha' },
        { hindi: 'ङ', english: ['~Na'], name: 'nga (nasal)' },
      ]
    },
    {
      category: 'च-वर्ग (Palatals)',
      list: [
        { hindi: 'च', english: ['cha', 'ch'], name: 'cha' },
        { hindi: 'छ', english: ['chha', 'chh', 'Ch'], name: 'chha' },
        { hindi: 'ज', english: ['ja', 'j'], name: 'ja' },
        { hindi: 'झ', english: ['jha', 'jh'], name: 'jha' },
        { hindi: 'ञ', english: ['~na'], name: 'nya (nasal)' },
      ]
    },
    {
      category: 'ट-वर्ग (Retroflex)',
      list: [
        { hindi: 'ट', english: ['Ta', 'T'], name: 'Ta' },
        { hindi: 'ठ', english: ['Tha', 'Th'], name: 'Tha' },
        { hindi: 'ड', english: ['Da', 'D'], name: 'Da' },
        { hindi: 'ढ', english: ['Dha', 'Dh'], name: 'Dha' },
        { hindi: 'ण', english: ['Na', 'N'], name: 'Na' },
      ]
    },
    {
      category: 'त-वर्ग (Dentals)',
      list: [
        { hindi: 'त', english: ['ta', 't'], name: 'ta' },
        { hindi: 'थ', english: ['tha', 'th'], name: 'tha' },
        { hindi: 'द', english: ['da', 'd'], name: 'da' },
        { hindi: 'ध', english: ['dha', 'dh'], name: 'dha' },
        { hindi: 'न', english: ['na', 'n'], name: 'na' },
      ]
    },
    {
      category: 'प-वर्ग (Labials)',
      list: [
        { hindi: 'प', english: ['pa', 'p'], name: 'pa' },
        { hindi: 'फ', english: ['pha', 'ph', 'f'], name: 'pha' },
        { hindi: 'ब', english: ['ba', 'b'], name: 'ba' },
        { hindi: 'भ', english: ['bha', 'bh'], name: 'bha' },
        { hindi: 'म', english: ['ma', 'm'], name: 'ma' },
      ]
    },
    {
      category: 'अन्तस्थ (Semivowels)',
      list: [
        { hindi: 'य', english: ['ya', 'y'], name: 'ya' },
        { hindi: 'र', english: ['ra', 'r'], name: 'ra' },
        { hindi: 'ल', english: ['la', 'l'], name: 'la' },
        { hindi: 'व', english: ['va', 'v', 'w'], name: 'va' },
      ]
    },
    {
      category: 'ऊष्म (Sibilants & Aspirate)',
      list: [
        { hindi: 'श', english: ['sha', 'sh'], name: 'sha (talavya)' },
        { hindi: 'ष', english: ['Sha', 'Sh', 'shh'], name: 'Sha (murdhanya)' },
        { hindi: 'स', english: ['sa', 's'], name: 'sa (dantya)' },
        { hindi: 'ह', english: ['ha', 'h'], name: 'ha' },
      ]
    },
    {
      category: 'संयुक्त व्यंजन (Conjuncts)',
      list: [
        { hindi: 'क्ष', english: ['ksha', 'ksh'], name: 'ksha', example: 'moksha / moksh', exampleHindi: 'मोक्ष' },
        { hindi: 'त्र', english: ['tra', 'tr'], name: 'tra', example: 'mitra', exampleHindi: 'मित्र' },
        { hindi: 'ज्ञ', english: ['gya', 'jna', 'j~na'], name: 'gyana / jnana', example: 'gyanam', exampleHindi: 'ज्ञानम्' },
        { hindi: 'श्र', english: ['shra', 'shr'], name: 'shra', example: 'shree', exampleHindi: 'श्री' },
      ]
    }
  ];

  // Special signs, vowel modifiers
  const modifiers: CharacterMapping[] = [
    { hindi: 'ं', english: ['M', 'am'], name: 'Anusvara (बिन्दु)', example: 'saMskRta / samskrta', exampleHindi: 'संस्कृत' },
    { hindi: 'ः', english: ['H', 'ah'], name: 'Visarga (द्विबिन्दु)', example: 'namaH / namah', exampleHindi: 'नमः' },
    { hindi: 'ँ', english: ['~N', 'a~N'], name: 'Chandrabindu (अर्धचन्द्र बिन्दु)', example: 'ha~Nsa', exampleHindi: 'हँस' },
    { hindi: '्', english: ['.h', 'consonant alone'], name: 'Halant / Virama (स्वर रहित)', example: 'shat.h / shat', exampleHindi: 'शत्' },
    { hindi: 'ऽ', english: ['/'], name: 'Avagraha (खण्डाकार अ)', example: 'so/ham', exampleHindi: 'सोऽहम्' },
    { hindi: 'ॐ', english: ['OM', 'AUM'], name: 'Omkara (प्रणव मंत्र)' },
  ];

  // Matras (vowel signs) - how they modify consonants
  const matras: { hindi: string; matra: string; english: string; example: string; exampleHindi: string }[] = [
    { hindi: 'अ', matra: 'क (no sign)', english: 'ka', example: 'kama', exampleHindi: 'कम' },
    { hindi: 'आ', matra: 'का', english: 'kaa / kA', example: 'kaala / kAla', exampleHindi: 'काल' },
    { hindi: 'इ', matra: 'कि', english: 'ki', example: 'kintu', exampleHindi: 'किन्तु' },
    { hindi: 'ई', matra: 'की', english: 'kii / kI', example: 'kiirtana / kIrtana', exampleHindi: 'कीर्तन' },
    { hindi: 'उ', matra: 'कु', english: 'ku', example: 'kumara', exampleHindi: 'कुमार' },
    { hindi: 'ऊ', matra: 'कू', english: 'kuu / kU', example: 'kuupa / kUpa', exampleHindi: 'कूप' },
    { hindi: 'ऋ', matra: 'कृ', english: 'kR / kri', example: 'kRShNa / krishna', exampleHindi: 'कृष्ण' },
    { hindi: 'ए', matra: 'के', english: 'ke', example: 'keshava', exampleHindi: 'केशव' },
    { hindi: 'ऐ', matra: 'कै', english: 'kai', example: 'kailaasha', exampleHindi: 'कैलाश' },
    { hindi: 'ओ', matra: 'को', english: 'ko', example: 'kopa', exampleHindi: 'कोप' },
    { hindi: 'औ', matra: 'कौ', english: 'kau', example: 'kaurava', exampleHindi: 'कौरव' },
  ];

  // Common Examples and Typing Tips
  const commonExamples = [
    { english: 'raama', devanagari: 'राम', note: 'Single vowel "a" is short (अ), while double "aa" or capital "A" creates long (आ)' },
    { english: 'hari', devanagari: 'हरि', note: 'Short vowel "i" at the end' },
    { english: 'shree / shrI', devanagari: 'श्री', note: 'Use "ee" or capital "I" for long "ee" sound' },
    { english: 'krishna / kRShNa', devanagari: 'कृष्ण', note: 'Common words like "krishna", "rishi", "sanskrit", "vishnu" are automatically corrected. For other words, standard ITRANS cases apply.' },
    { english: 'shloka', devanagari: 'श्लोक', note: 'Consonants automatically merge into conjuncts if typed together without a vowel (s-h-l-o-k-a)' },
    { english: 'moksha / mokSh', devanagari: 'मोक्ष', note: '"ksh" or capital "kSh" translates to क्ष' },
    { english: 'jnana / gyana', devanagari: 'ज्ञान', note: '"gya" or "jna" translates to ज्ञ' },
    { english: 'saMskRta / samskrta', devanagari: 'संस्कृत', note: 'Use capital "M" or "m" before consonants for anusvara (ं)' },
    { english: 'namaH / namah', devanagari: 'नमः', note: 'Use capital "H" or word-ending "h" after a vowel for visarga (ः)' },
    { english: 'OM / AUM', devanagari: 'ॐ', note: 'Capital "OM" or "AUM" prints the sacred symbol ॐ' }
  ];

  // Search filtering logic
  const filteredVowels = useMemo(() => {
    if (!searchQuery) return vowels;
    const query = searchQuery.toLowerCase();
    return vowels.filter(v => 
      v.hindi.includes(query) || 
      v.english.some(e => e.toLowerCase().includes(query)) ||
      v.name.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  const filteredConsonants = useMemo(() => {
    return consonants.map(group => {
      const list = group.list.filter(c => 
        c.hindi.includes(searchQuery) || 
        c.english.some(e => e.toLowerCase().includes(searchQuery)) ||
        c.name.toLowerCase().includes(searchQuery)
      );
      return { ...group, list };
    }).filter(group => group.list.length > 0);
  }, [searchQuery]);

  const filteredModifiers = useMemo(() => {
    if (!searchQuery) return modifiers;
    const query = searchQuery.toLowerCase();
    return modifiers.filter(m => 
      m.hindi.includes(query) || 
      m.english.some(e => e.toLowerCase().includes(query)) ||
      m.name.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  const filteredMatras = useMemo(() => {
    if (!searchQuery) return matras;
    const query = searchQuery.toLowerCase();
    return matras.filter(m => 
      m.hindi.includes(query) || 
      m.matra.includes(query) ||
      m.english.toLowerCase().includes(query) ||
      m.example.toLowerCase().includes(query) ||
      m.exampleHindi.includes(query)
    );
  }, [searchQuery]);

  return (
    <div className={`flex flex-col bg-white rounded-2xl shadow-xl border border-orange-100 max-w-4xl mx-auto overflow-hidden animate-fadeIn ${isModal ? 'h-[85vh] sm:h-[80vh]' : 'pb-8'}`}>
      
      {/* Title Header */}
      <div className="bg-gradient-to-r from-orange-400 to-saffron px-6 py-4 flex justify-between items-center text-white shadow-md">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold devanagari">
            संस्कृत/हिंदी टाइपिंग गाइड (Typing Guide)
          </h2>
          <p className="text-xs text-orange-50 font-medium">Learn to type Sanskrit using your English keyboard</p>
        </div>
        {isModal && onClose && (
          <button 
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors text-white shadow-sm"
            aria-label="Close guide"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
        
        {/* Interactive Typing Sandbox */}
        <div className="bg-orange-50/50 p-4 sm:p-5 rounded-2xl border border-orange-100 space-y-3">
          <h3 className="text-base sm:text-lg font-bold text-gray-800">
            लाइव टाइपिंग प्रैक्टिस (Interactive Sandbox)
          </h3>
          <p className="text-xs sm:text-sm text-gray-600">
            नीचे अंग्रेज़ी में लिखकर जाँचें कि वह संस्कृत में कैसा दिखेगा। (Type in English below to test phonetic transliteration)
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">English Keyboard Input</label>
              <textarea
                value={sandboxInput}
                onChange={(e) => setSandboxInput(e.target.value)}
                placeholder="Type phonetic English here (e.g. raama, krishna, shloka, namah)..."
                rows={3}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-400 focus:outline-none font-bold text-orange-600 placeholder-gray-400 text-base sm:text-lg shadow-inner resize-none font-mono"
              />
            </div>
            <div className="space-y-1 flex flex-col">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Devanagari Sanskrit Output</label>
              <div className="flex-1 p-4 rounded-xl border border-orange-200 bg-white font-semibold text-xl sm:text-3xl text-saffron devanagari min-h-[5.5rem] flex items-center justify-start overflow-auto shadow-sm">
                {sandboxOutput ? sandboxOutput : <span className="text-gray-300 font-normal text-sm">संस्कृत अनुवाद यहाँ दिखेगा...</span>}
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs and Search */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 pb-2">
            <div className="flex flex-wrap gap-1">
              {[
                { id: 'all', label: 'सभी (All)' },
                { id: 'vowels', label: 'स्वर (Vowels)' },
                { id: 'consonants', label: 'व्यंजन (Consonants)' },
                { id: 'signs', label: 'मात्राएँ & चिह्न' },
                { id: 'examples', label: 'उदाहरण (Examples)' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-bold transition-all ${
                    activeTab === tab.id 
                      ? 'bg-saffron text-white shadow-sm' 
                      : 'text-gray-600 hover:bg-orange-50'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            <div className="relative w-full sm:w-60">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="खोजें / Search alphabet..."
                className="w-full px-3 py-1.5 pl-9 rounded-lg border border-gray-200 focus:ring-2 focus:ring-orange-400 focus:outline-none text-xs sm:text-sm"
              />
              <svg className="absolute left-2.5 top-2 h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2 top-2 text-gray-400 hover:text-gray-600 text-xs font-bold"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* VOWELS SECTION */}
          {(activeTab === 'all' || activeTab === 'vowels') && filteredVowels.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-base font-bold text-gray-800 border-l-4 border-saffron pl-2">
                स्वर (Vowels) — कुल {filteredVowels.length}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredVowels.map((v, i) => (
                  <div key={i} className="p-4 bg-white border border-gray-100 rounded-xl hover:border-orange-200 transition-colors shadow-sm flex items-center justify-between">
                    <div className="devanagari text-3xl sm:text-4xl font-extrabold text-gray-900">{v.hindi}</div>
                    <div className="text-right flex flex-col items-end gap-1.5">
                      <div className="flex gap-1 justify-end flex-wrap">
                        {v.english.map((eng, idx) => (
                          <kbd key={idx} className="bg-orange-50 border border-orange-200 rounded px-2.5 py-1 text-base sm:text-lg font-mono font-bold text-orange-600 shadow-sm">{eng}</kbd>
                        ))}
                      </div>
                      <div className="text-[10px] text-gray-400 font-semibold uppercase">{v.name}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* MATRAS SECTION */}
          {(activeTab === 'all' || activeTab === 'signs') && filteredMatras.length > 0 && (
            <div className="space-y-3 pt-2">
              <h4 className="text-base font-bold text-gray-800 border-l-4 border-saffron pl-2">
                मात्राएँ (Vowel Signs with consonant 'क')
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredMatras.map((m, i) => (
                  <div key={i} className="p-4 bg-white border border-gray-100 rounded-xl hover:border-orange-200 transition-colors shadow-sm flex flex-col justify-between space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-semibold text-gray-400">स्वर: {m.hindi}</span>
                      <kbd className="bg-orange-50 border border-orange-200 rounded px-2.5 py-1 text-base sm:text-lg font-mono font-bold text-orange-600 shadow-sm">{m.english}</kbd>
                    </div>
                    <div className="devanagari text-3xl sm:text-4xl font-extrabold text-orange-700 text-center bg-orange-50/50 py-2.5 rounded-xl border border-orange-100 shadow-inner">{m.matra}</div>
                    <div className="text-xs text-gray-500 text-center border-t border-gray-50 pt-2">
                      ex: <span className="font-mono font-semibold">{m.example}</span> → <span className="devanagari font-bold text-gray-700">{m.exampleHindi}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CONSONANTS SECTION */}
          {(activeTab === 'all' || activeTab === 'consonants') && filteredConsonants.length > 0 && (
            <div className="space-y-4 pt-2">
              <h4 className="text-base font-bold text-gray-800 border-l-4 border-saffron pl-2">
                व्यंजन (Consonants)
              </h4>
              <div className="space-y-4">
                {filteredConsonants.map((group, groupIdx) => (
                  <div key={groupIdx} className="bg-gray-50/50 p-4 sm:p-5 rounded-xl border border-gray-100 space-y-3">
                    <h5 className="text-xs font-bold text-gray-500 uppercase tracking-wider">{group.category}</h5>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                      {group.list.map((c, i) => (
                        <div key={i} className="p-3.5 bg-white border border-gray-100 rounded-xl hover:border-orange-200 transition-colors shadow-sm flex items-center justify-between">
                          <div className="devanagari text-2xl sm:text-3xl font-extrabold text-gray-900">{c.hindi}</div>
                          <div className="text-right flex flex-col items-end gap-1">
                            <div className="flex gap-1 justify-end flex-wrap">
                              {c.english.map((eng, idx) => (
                                <kbd key={idx} className="bg-orange-50 border border-orange-200 rounded px-2 py-0.5 text-sm sm:text-base font-mono font-bold text-orange-600 shadow-sm">{eng}</kbd>
                              ))}
                            </div>
                            {c.example && (
                              <div className="text-[10px] text-gray-400 font-medium">
                                ex: <span className="font-mono">{c.example}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* MODIFIERS SECTION */}
          {(activeTab === 'all' || activeTab === 'signs') && filteredModifiers.length > 0 && (
            <div className="space-y-3 pt-2">
              <h4 className="text-base font-bold text-gray-800 border-l-4 border-saffron pl-2">
                विशेष चिह्न और संकेतक (Modifiers & Marks)
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredModifiers.map((m, i) => (
                  <div key={i} className="p-4 bg-white border border-gray-100 rounded-xl hover:border-orange-200 transition-colors shadow-sm flex flex-col justify-between space-y-3">
                    <div className="flex items-center justify-between border-b border-gray-50 pb-2">
                      <div className="devanagari text-3xl sm:text-4xl font-extrabold text-saffron bg-orange-50 w-14 h-14 rounded-xl flex items-center justify-center border border-orange-100 shadow-inner">{m.hindi}</div>
                      <div className="flex gap-1 flex-wrap justify-end">
                        {m.english.map((eng, idx) => (
                          <kbd key={idx} className="bg-orange-50 border border-orange-200 rounded px-2.5 py-1 text-base sm:text-lg font-mono font-bold text-orange-600 shadow-sm">{eng}</kbd>
                        ))}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm font-bold text-gray-800">{m.name}</div>
                      {m.example && (
                        <div className="text-xs text-gray-500 mt-1">
                          जैसे: <span className="font-mono font-semibold text-gray-600">{m.example}</span> → <span className="devanagari font-bold text-gray-800">{m.exampleHindi}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* EXAMPLES SECTION */}
          {(activeTab === 'all' || activeTab === 'examples') && (
            <div className="space-y-3 pt-2">
              <h4 className="text-base font-bold text-gray-800 border-l-4 border-saffron pl-2">
                सामान्य शब्द उदाहरण (Common Word Examples)
              </h4>
              <div className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden">
                <table className="w-full text-left text-xs sm:text-sm border-collapse">
                  <thead>
                    <tr className="bg-orange-50 border-b border-orange-100 text-gray-700 font-bold">
                      <th className="p-3">English Keys Typed</th>
                      <th className="p-3">Sanskrit Output</th>
                      <th className="p-3 hidden sm:table-cell">Rule / Explanation</th>
                    </tr>
                  </thead>
                  <tbody>
                    {commonExamples.map((ex, idx) => (
                      <tr key={idx} className="border-b border-gray-50 hover:bg-orange-50/20 transition-colors">
                        <td className="p-3 font-mono font-bold text-base sm:text-lg text-orange-600">{ex.english}</td>
                        <td className="p-3 font-extrabold text-lg sm:text-xl text-gray-900 devanagari">{ex.devanagari}</td>
                        <td className="p-3 text-xs sm:text-sm text-gray-500 hidden sm:table-cell">{ex.note}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Help Tip Footer */}
      <div className="bg-gray-50 p-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500">
        <div className="flex-1"><strong>सुझाव (Tip):</strong> किसी भी स्वर को दीर्घ करने के लिए कुंजी को दो बार दबाएँ या कैपिटल अक्षर लिखें (जैसे: a ➔ अ, aa/A ➔ आ)।</div>
        {isModal && onClose && (
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-saffron text-white rounded-lg font-bold text-xs sm:text-sm hover:opacity-90 transition-opacity shadow-sm self-end sm:self-auto"
          >
            Close / बंद करें
          </button>
        )}
      </div>
    </div>
  );
};

export default TypingTutorial;
