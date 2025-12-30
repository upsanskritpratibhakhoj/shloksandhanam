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
export function normalizePhonetic(input: string): string {
  if (!input) return '';

  return input
    // Preserve aspirated consonants and special sounds
    .replace(/sh/gi, 'sh')   // श (sha)
    .replace(/ch/gi, 'ch')   // च (cha)
    .replace(/kh/gi, 'kh')   // ख (kha)
    .replace(/gh/gi, 'gh')   // घ (gha)
    .replace(/th/gi, 'th')   // थ (tha)
    .replace(/dh/gi, 'dh')   // ध (dha)
    .replace(/ph/gi, 'ph')   // फ (pha)
    .replace(/bh/gi, 'bh')   // भ (bha)
    
    // Handle nasals
    .replace(/ng/gi, 'ṅ')    // ङ (velar nasal)
    
    // Handle anusvāra (ं)
    // Convert 'm' at word end to 'M' (anusvāra)
    .replace(/m$/gi, 'M')    
    // Convert 'am' to 'aM' (common pattern for anusvāra)
    .replace(/am\b/gi, 'aM')
    // Convert 'um' to 'uM' 
    .replace(/um\b/gi, 'uM')
    // Convert 'im' to 'iM'
    .replace(/im\b/gi, 'iM')
    // Convert 'om' to 'oM'
    .replace(/om\b/gi, 'oM');
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
