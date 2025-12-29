import React, { useState, useRef, useEffect } from 'react';
import { Shloka } from '../types';
import { getAudioUrl } from '../data/shlokaAudioDatabase';

interface ShlokaDetailViewProps {
  shloka: Shloka | null;
  onClose: () => void;
}

const ShlokaDetailView: React.FC<ShlokaDetailViewProps> = ({ shloka, onClose }) => {
  const [showAudioPlayer, setShowAudioPlayer] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const audioUrl = shloka ? getAudioUrl(shloka.text) : null;

  useEffect(() => {
    // Reset audio player when shloka changes
    setShowAudioPlayer(false);
    setIsPlaying(false);
    setCurrentTime(0);
    setDuration(0);
  }, [shloka]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.pause();
      audio.src = '';
    };
  }, [showAudioPlayer]);

  const handleGetAudio = () => {
    setShowAudioPlayer(true);
  };

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleAudioEnded = () => {
    setIsPlaying(false);
    setCurrentTime(0);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    setCurrentTime(time);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
  };

  const formatTime = (time: number): string => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

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

          {/* Audio Section */}
          {audioUrl && (
            <div className="bg-orange-50 rounded-xl p-5 border-2 border-orange-200">
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-3">
                🎵 ऑडियो (Audio)
              </h3>
              
              {!showAudioPlayer ? (
                <button
                  onClick={handleGetAudio}
                  className="w-full px-6 py-3 bg-saffron text-white rounded-lg font-bold shadow-lg hover:bg-orange-600 transition-all transform hover:scale-105 flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.37 4.37 0 0015 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z" />
                  </svg>
                  श्लोक सुनें (Get Audio)
                </button>
              ) : (
                <div className="space-y-4">
                  <audio
                    ref={audioRef}
                    src={audioUrl}
                    onEnded={handleAudioEnded}
                    className="hidden"
                  />
                  
                  <div className="flex items-center gap-4">
                    <button
                      onClick={togglePlayPause}
                      className="flex-shrink-0 w-12 h-12 rounded-full bg-saffron text-white shadow-lg hover:bg-orange-600 transition-all transform hover:scale-110 flex items-center justify-center"
                    >
                      {isPlaying ? (
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5 ml-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                        </svg>
                      )}
                    </button>
                    
                    <div className="flex-1">
                      <input
                        type="range"
                        min="0"
                        max={duration || 0}
                        value={currentTime}
                        onChange={handleSeek}
                        className="w-full h-2 bg-orange-200 rounded-lg appearance-none cursor-pointer accent-saffron"
                        style={{
                          background: `linear-gradient(to right, #ff6b35 0%, #ff6b35 ${(currentTime / duration) * 100}%, #fed7aa ${(currentTime / duration) * 100}%, #fed7aa 100%)`
                        }}
                      />
                      <div className="flex justify-between text-xs text-gray-600 mt-1">
                        <span>{formatTime(currentTime)}</span>
                        <span>{formatTime(duration)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

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
