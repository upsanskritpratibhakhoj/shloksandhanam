import { Metadata } from 'next';
import TypingTutorial from '@/components/TypingTutorial';

export const metadata: Metadata = {
  title: 'Sanskrit Typing Guide | श्लोकसंधानम्',
  description: 'Learn how to type Sanskrit in Devanagari using an English keyboard. Detailed character mappings, matras, sibilants, conjuncts, and live practice sandbox.',
  keywords: ['Sanskrit typing', 'Devanagari keyboard', 'phonetic transliteration', 'Sanskrit input guide', 'Sanscript'],
};

export default function TypingGuidePage() {
  return (
    <div className="py-6 sm:py-10 animate-fadeIn">
      <h1 className="sr-only">Sanskrit/Hindi Typing Guide</h1>
      <TypingTutorial />
    </div>
  );
}
