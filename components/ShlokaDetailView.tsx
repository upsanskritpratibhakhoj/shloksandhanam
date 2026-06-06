import React, { useEffect, useRef, useState } from 'react';
import { getAudioUrl } from '../data/shlokaAudioDatabase';
import { Shloka } from '../types';

interface ShlokaDetailViewProps {
  shloka: Shloka | null;
  onClose: () => void;
}

const ShlokaDetailView: React.FC<ShlokaDetailViewProps> = ({ shloka, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const audioUrl = shloka ? getAudioUrl(shloka.text) : null;

  useEffect(() => {
    setIsPlaying(false);
    setCurrentTime(0);
    setDuration(0);

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }, [shloka]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(Number.isFinite(audio.duration) ? audio.duration : 0);
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('durationchange', updateDuration);
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('durationchange', updateDuration);
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('ended', handleEnded);
      audio.pause();
    };
  }, [audioUrl]);

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      void audio.play();
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    setCurrentTime(time);

    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
  };

  const handleSkip = (seconds: number) => {
    const audio = audioRef.current;
    if (!audio) return;

    const nextTime = Math.min(Math.max(audio.currentTime + seconds, 0), duration || 0);
    audio.currentTime = nextTime;
    setCurrentTime(nextTime);
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

  const progress = duration ? (currentTime / duration) * 100 : 0;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black bg-opacity-50 p-4 pt-8 animate-fadeIn">
      <div className="my-auto max-h-[85vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
        <div className="sticky top-0 rounded-t-2xl bg-gradient-to-r from-saffron to-orange-600 p-6 text-white">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="mb-2 text-2xl font-bold">Shloka Details</h2>
              <p className="text-sm opacity-90">Detailed view</p>
            </div>
            <button
              onClick={onClose}
              className="rounded-full p-2 text-white transition-all hover:bg-white hover:bg-opacity-20"
              aria-label="Close"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div className="space-y-6 p-6">
          <div className="rounded-xl border-l-4 border-saffron bg-orange-50 p-6">
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wide text-gray-600">Full Shloka</h3>
            <div className="devanagari text-center text-xl leading-relaxed text-gray-800 whitespace-pre-line md:text-2xl">
              {shloka.text}
            </div>
          </div>

          <div className="rounded-2xl border border-orange-100 bg-white p-5 shadow-[0_10px_30px_rgba(249,115,22,0.08)]">
            <div className="mb-5 flex items-center gap-3 border-b border-orange-100 pb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-50 text-saffron">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.37 4.37 0 0015 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z" />
                </svg>
              </div>
              <div>
                <h3 className="text-sm font-extrabold uppercase tracking-[0.16em] text-slate-700">
                  Listen to Shloka
                </h3>
                <p className="text-xs text-slate-500">Audio recitation</p>
              </div>
            </div>

            {audioUrl ? (
              <div className="space-y-4">
                <audio ref={audioRef} src={audioUrl} preload="metadata" className="hidden" />

                <div className="flex flex-wrap items-center gap-3 sm:flex-nowrap sm:gap-4">
                  <button
                    type="button"
                    onClick={() => handleSkip(-10)}
                    className="flex h-10 w-10 items-center justify-center rounded-full text-slate-500 transition hover:bg-orange-50 hover:text-saffron"
                    aria-label="Replay 10 seconds"
                  >
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19L2 12l9-7v14zm11 0l-9-7 9-7v14z" />
                    </svg>
                  </button>

                  <button
                    type="button"
                    onClick={togglePlayPause}
                    className="flex h-14 w-14 items-center justify-center rounded-full bg-orange-100 text-saffron shadow-[0_10px_25px_rgba(249,115,22,0.2)] transition hover:scale-105 hover:bg-orange-200"
                    aria-label={isPlaying ? 'Pause audio' : 'Play audio'}
                  >
                    {isPlaying ? (
                      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <svg className="ml-0.5 h-6 w-6" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                      </svg>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => handleSkip(10)}
                    className="flex h-10 w-10 items-center justify-center rounded-full text-slate-500 transition hover:bg-orange-50 hover:text-saffron"
                    aria-label="Forward 10 seconds"
                  >
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l9 7-9 7V5zM2 5l9 7-9 7V5z" />
                    </svg>
                  </button>

                  <div className="min-w-[3rem] text-sm font-medium tabular-nums text-slate-500">
                    {formatTime(currentTime)}
                  </div>

                  <div className="flex-1">
                    <input
                      type="range"
                      min="0"
                      max={duration || 0}
                      value={currentTime}
                      onChange={handleSeek}
                      className="h-2 w-full cursor-pointer appearance-none rounded-full bg-slate-200 accent-saffron"
                      style={{
                        background: `linear-gradient(to right, #f97316 0%, #f97316 ${progress}%, #e2e8f0 ${progress}%, #e2e8f0 100%)`,
                      }}
                    />
                  </div>

                  <div className="min-w-[3rem] text-right text-sm font-medium tabular-nums text-slate-500">
                    {formatTime(duration)}
                  </div>
                </div>
              </div>
            ) : (
              <div className="rounded-xl bg-slate-50 px-4 py-3 text-sm text-slate-500">
                Audio is not available for this shloka yet.
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 gap-4">
            <div className="rounded-xl border-2 border-orange-200 bg-white p-5">
              <h3 className="mb-3 text-xs font-bold uppercase tracking-wide text-gray-500">Next Character</h3>
              <div className="flex items-center justify-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-saffron text-white shadow-lg">
                  <span className="devanagari text-4xl font-bold">{shloka.nextChar}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              onClick={onClose}
              className="flex-1 rounded-xl bg-saffron px-6 py-3 font-bold text-white shadow-lg transition-all hover:bg-orange-600"
            >
              Search New
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShlokaDetailView;
