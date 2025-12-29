// Database mapping shlokas to their audio CDN links
export const shlokaAudioDatabase: Record<string, string> = {
  // Example entry - add more mappings as needed
  // The key should be the exact shloka text (first line or unique identifier)
  "अनाघ्रातं पुष्पं किसलयमलूनं कररुहैरनाविद्धं रत्नं मधु नवमनास्वादितरसम् । अखण्डं पुष्यानां फलमिव च तद्रूपमनघं न जाने भोक्तारं कमिह समुपस्थास्यति विधिः": "https://raw.githubusercontent.com/upsanskritpratibhakhoj/shlokas_audio/main/audio/anaghra.mp3",
  
  // Add more shloka-to-audio mappings here
  // "shloka text": "CDN_URL",
};

/**
 * Get audio URL for a given shloka text
 * @param shlokaText - The shloka text to search for
 * @returns The CDN URL if found, null otherwise
 */
export const getAudioUrl = (shlokaText: string): string | null => {
  // Try exact match first
  if (shlokaAudioDatabase[shlokaText]) {
    return shlokaAudioDatabase[shlokaText];
  }
  
  // Try to match by first line
  const firstLine = shlokaText.split('\n')[0].trim();
  if (shlokaAudioDatabase[firstLine]) {
    return shlokaAudioDatabase[firstLine];
  }
  
  // Try to find a partial match
  for (const key in shlokaAudioDatabase) {
    if (shlokaText.includes(key) || key.includes(firstLine)) {
      return shlokaAudioDatabase[key];
    }
  }
  
  return null;
};

/**
 * Check if audio exists for a given shloka
 * @param shlokaText - The shloka text to check
 * @returns true if audio exists, false otherwise
 */
export const hasAudio = (shlokaText: string): boolean => {
  return getAudioUrl(shlokaText) !== null;
};
