import { SHLOKA_DATABASE } from '../data/shlokaDatabase';
import Sanscript from '@indic-transliteration/sanscript';
import { normalizePhonetic, isDevanagari } from '../utils/phoneticNormalizer';

export interface ShlokaSearchResult {
  text: string;
  nextChar: string;
  index: number;
}

/**
 * Transliterates English phonetic input to Devanagari
 * @param input - English phonetic input
 * @returns Devanagari text
 */
const transliterateToDevanagari = (input: string): string => {
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

/**
 * Searches for shlokas that start with the given input text
 * Supports both Devanagari and English phonetic input
 * @param input - The search query (can be partial text in Devanagari or English)
 * @param limit - Maximum number of results to return (default: 50)
 * @returns Array of matching shlokas
 */
export const searchShlokas = (input: string, limit: number = 50): ShlokaSearchResult[] => {
  if (!input || input.trim() === '') {
    return [];
  }

  const trimmedInput = input.trim();
  
  // Determine search terms based on input type
  let searchTerms: string[] = [];
  
  if (isDevanagari(trimmedInput)) {
    // If input is already in Devanagari, use it directly
    searchTerms = [trimmedInput.toLowerCase()];
  } else {
    // If input is in English, transliterate it to Devanagari
    const transliterated = transliterateToDevanagari(trimmedInput);
    searchTerms = [transliterated.toLowerCase()];
    
    // Also keep the original English input as fallback
    // (in case database has romanized entries)
    searchTerms.push(trimmedInput.toLowerCase());
  }

  const results: ShlokaSearchResult[] = [];
  const seenIndices = new Set<number>(); // Prevent duplicates

  // Search with each search term
  for (const searchTerm of searchTerms) {
    for (let i = 0; i < SHLOKA_DATABASE.length && results.length < limit; i++) {
      // Skip if already added
      if (seenIndices.has(i)) continue;
      
      const shloka = SHLOKA_DATABASE[i];
      const shlokaText = shloka.text.toLowerCase();
      
      if (shlokaText.startsWith(searchTerm)) {
        results.push({
          text: shloka.text,
          nextChar: shloka.nextChar,
          index: i
        });
        seenIndices.add(i);
      }
    }
  }

  return results;
};

/**
 * Gets a shloka by its index in the database
 * @param index - The index of the shloka in the database
 * @returns The shloka or null if not found
 */
export const getShlokaByIndex = (index: number): ShlokaSearchResult | null => {
  if (index < 0 || index >= SHLOKA_DATABASE.length) {
    return null;
  }

  const shloka = SHLOKA_DATABASE[index];
  return {
    text: shloka.text,
    nextChar: shloka.nextChar,
    index
  };
};

/**
 * Gets the total count of shlokas in the database
 */
export const getTotalShlokaCount = (): number => {
  return SHLOKA_DATABASE.length;
};
