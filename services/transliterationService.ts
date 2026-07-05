import Sanscript from '@indic-transliteration/sanscript';
import { normalizePhonetic } from '../utils/phoneticNormalizer';

/**
 * Transliterates English phonetic input to Devanagari using Sanscript and phonetic normalization
 * @param input - English phonetic input
 * @returns Devanagari text
 */
export const transliterateToDevanagari = (input: string): string => {
  if (!input) return '';
  try {
    // First normalize the phonetic input to ITRANS-compatible format
    const normalized = normalizePhonetic(input);
    
    // Then transliterate using Sanscript
    const devanagari = Sanscript.t(normalized, 'itrans', 'devanagari');
    
    return devanagari;
  } catch (error) {
    console.error('Transliteration error:', error);
    return input; // Fallback to original input
  }
};
