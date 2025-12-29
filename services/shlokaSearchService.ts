import { SHLOKA_DATABASE } from '../data/shlokaDatabase';

export interface ShlokaSearchResult {
  text: string;
  nextChar: string;
  index: number;
}

/**
 * Searches for shlokas that start with the given input text
 * @param input - The search query (can be partial text)
 * @param limit - Maximum number of results to return (default: 50)
 * @returns Array of matching shlokas
 */
export const searchShlokas = (input: string, limit: number = 50): ShlokaSearchResult[] => {
  if (!input || input.trim() === '') {
    return [];
  }

  const searchTerm = input.trim().toLowerCase();
  const results: ShlokaSearchResult[] = [];

  for (let i = 0; i < SHLOKA_DATABASE.length && results.length < limit; i++) {
    const shloka = SHLOKA_DATABASE[i];
    const shlokaText = shloka.text.toLowerCase();
    
    if (shlokaText.startsWith(searchTerm)) {
      results.push({
        text: shloka.text,
        nextChar: shloka.nextChar,
        index: i
      });
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
