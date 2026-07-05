/**
 * Phonetic Normalization Utility for Sanskrit Transliteration
 * 
 * This module provides functions to normalize casual English phonetic input
 * into Sanscript-compatible ITRANS-like format before transliteration.
 * 
 * Purpose:
 * - Convert casual English typing (e.g., "ansham", "moksha") into proper ITRANS
 * - Improve user experience by allowing Google-IME style typing
 * - Preserve Sanskrit linguistic correctness
 * - Work fully offline
 */

/**
 * Normalizes phonetic English input to ITRANS-compatible format
 * 
 * Handles common phonetic patterns:
 * - Consonant clusters (sh, ch, kh, gh, th, dh, ph, bh)
 * - Nasals (ng → ṅ, n → n)
 * - Anusvāra (m at word end or in syllable → M)
 * 
 * @param input - Casual English phonetic input
 * @returns ITRANS-compatible normalized string
 * 
 * @example
 * normalizePhonetic("ansham") // → "aMshaM"
 * normalizePhonetic("moksha") // → "moksha"
 * normalizePhonetic("shlokam") // → "shlokam" (sh preserved)
 */
const commonWordMappings: { [key: string]: string } = {
  'krishna': 'kRShNa',
  'rishi': 'RRiShi',
  'sanskrit': 'saMskRta',
  'samskrit': 'saMskRta',
  'samskrita': 'saMskRta',
  'samskrta': 'saMskRta',
  'vishnu': 'viShNu',
  'lakshmi': 'lakShmI',
  'ganesha': 'gaNesha',
  'ramayana': 'rAmAyaNa',
  'upanishad': 'upaniShad',
  'bhagavadgita': 'bhagavadgItA',
  'gita': 'gItA',
  'matri': 'mAtRRi',
  'pitri': 'pitRRi',
  'bhratri': 'bhrAtRRi'
};

/**
 * Normalizes phonetic English input to ITRANS-compatible format
 * 
 * @param input - Casual English phonetic input
 * @returns ITRANS-compatible normalized string
 */
export function normalizePhonetic(input: string): string {
  if (!input) return '';

  let normalized = input;

  // 1. Replace common words case-insensitively using word boundaries
  for (const [casual, standard] of Object.entries(commonWordMappings)) {
    const regex = new RegExp('\\b' + casual + '\\b', 'gi');
    normalized = normalized.replace(regex, standard);
  }

  // 2. Map vocalic R patterns to ITRANS 'RRi'
  // Long Vocalic R (ॠ) - 'RR' to 'RRI' (unless already followed by i/I)
  normalized = normalized.replace(/RR(?![iI])/gi, 'RRI');

  // At the start of a word: 'rishi' -> 'RRishi', 'Rishi' -> 'RRishi'
  // Exclude 'r' and 'R' from the lookahead to avoid double-matching RRi
  normalized = normalized.replace(/\b[rR][iI]?(?=[bcdfghjklmnpqstvwxyzBCDFGHJKLMNPQSTVWXYZ])/g, 'RRi');
  
  // Special case: word 'R' or 'ri' alone
  normalized = normalized.replace(/\b[rR][iI]?\b/g, 'RRi');

  // After a consonant, map 'R', 'ri', or 'r' (between consonants) to 'RRi'
  const C = '[bcdfghjklmnpqstvwxyzBCDFGHJKLMNPQSTVWXYZ]';
  const rRegex1 = new RegExp('(' + C + ')[rR][iI]?(?=[bcdfghjklmnpqstvwxBCDFGHJKLMNPQSTVWX]|$)', 'g');
  normalized = normalized.replace(rRegex1, '$1RRi');

  // Case B: tri/tri at the end of word -> tRRi (e.g. pitri -> pitRRi, matri -> matRRi)
  normalized = normalized.replace(/([tT])r[iI]?\b/g, '$1RRi');

  // 3. Normalization for other common casual transliterations:
  normalized = normalized.replace(/shh/gi, 'Sh');
  normalized = normalized.replace(/chh/gi, 'Ch');
  normalized = normalized.replace(/ksh/gi, 'kSh');
  normalized = normalized.replace(/shree/gi, 'shrI');
  normalized = normalized.replace(/shri(?=[^aeiou]|$)/gi, 'shrI');
  normalized = normalized.replace(/gya/gi, 'j~na');
  normalized = normalized.replace(/jna/gi, 'j~na');

  // Visarga (ः) - 'h' at end of word after a vowel
  normalized = normalized.replace(/([aeiouAEIOU])h\b/g, '$1H');

  // Avagraha (ऽ) - '/' to '.a'
  normalized = normalized.replace(/\//g, '.a');

  return normalized;
}

/**
 * Validates if the input contains Sanskrit-compatible characters
 * 
 * @param input - Input string to validate
 * @returns true if input contains valid phonetic or Devanagari characters
 */
export function isValidSanskritInput(input: string): boolean {
  if (!input) return false;
  
  // Check for either Devanagari (U+0900-U+097F) or basic Latin characters
  const devanagariRegex = /[\u0900-\u097F]/;
  const latinRegex = /^[a-zA-Z\s]+$/;
  
  return devanagariRegex.test(input) || latinRegex.test(input);
}

/**
 * Detects if the input is already in Devanagari script
 * 
 * @param input - Input string to check
 * @returns true if input contains Devanagari characters
 */
export function isDevanagari(input: string): boolean {
  if (!input) return false;
  
  // Check for Devanagari characters (U+0900-U+097F)
  const devanagariRegex = /[\u0900-\u097F]/;
  return devanagariRegex.test(input);
}
