'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function NotificationPopup() {
  const [isVisible, setIsVisible] = useState(true);
  const [isExiting, setIsExiting] = useState(false);

  const handleClose = () => {
    setIsExiting(true); // Trigger the reverse animation
    // Wait for the animation to complete before removing from DOM
    setTimeout(() => {
      setIsVisible(false);
    }, 800); 
  };

  // Auto-close after 30 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      handleClose();
    }, 15000);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div 
      className={`fixed bottom-4 left-4 right-4 sm:left-auto sm:right-8 sm:bottom-8 z-50 sm:w-[22rem] bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-orange-100 p-5 pointer-events-auto ${
        isExiting ? 'animate-popupSwoopOut' : 'animate-popupSwoop'
      }`}
    >
      
      {/* Close Button */}
      <button 
        onClick={handleClose}
        className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 hover:bg-orange-50 rounded-full p-1.5 transition-colors"
        aria-label="Close notification"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <div className="flex gap-4 items-start pt-1">
        <div className="text-3xl shrink-0 drop-shadow-sm animate-bounce" style={{ animationDuration: '3s' }}>
          📢
        </div>
        
        <div className="space-y-2.5 pr-2">
          <p className="text-slate-700 text-sm sm:text-base font-medium leading-snug">
            श्लोकसंधानम् अभ्यास के लिए है। अभ्यास पूर्ण होने पर <span className="text-saffron font-semibold">"श्लोक चक्र"</span> पर जाकर श्लोकान्त्याक्षरी खेलें।
          </p>
          <p className="text-slate-500 text-xs sm:text-sm font-normal border-l-2 border-orange-200 pl-3">
            आगे श्लोक चक्र पर जाएँ और अपनी स्मरणशक्ति का परीक्षण करें।
          </p>
          
          <div className="pt-2">
            <Link 
              href="/shlok-chakra" 
              className="block w-full text-center bg-saffron text-white font-medium py-2.5 px-4 rounded-xl shadow-md hover:shadow-lg hover:bg-[#dd6b20] transition-all duration-200 text-sm tracking-wide"
            >
              श्लोक चक्र खेलें →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}