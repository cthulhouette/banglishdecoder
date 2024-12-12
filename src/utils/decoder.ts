import { commonWords, phoneticPatterns, specialCases } from '../data/dictionary';
import { basicLibrary } from '../data/basicLibrary';

// Merge dictionaries
const allWords = { ...commonWords, ...basicLibrary };

export function decodeBanglish(text: string): string {
  let decoded = text.toLowerCase();

  // First handle special cases
  Object.entries(specialCases).forEach(([eng, ban]) => {
    decoded = decoded.replace(new RegExp(`\\b${eng}\\b`, 'g'), ban);
  });

  // Then handle all words from combined dictionary
  Object.entries(allWords).forEach(([eng, ban]) => {
    decoded = decoded.replace(new RegExp(`\\b${eng}\\b`, 'g'), ban);
  });

  // Apply phonetic patterns
  phoneticPatterns.forEach(([pattern, replacement]) => {
    decoded = decoded.replace(pattern, replacement);
  });

  return decoded;
}

export function getSuggestions(word: string): string[] {
  const suggestions: string[] = [];
  const wordLower = word.toLowerCase();
  
  // Find similar words using basic string matching from both dictionaries
  Object.entries(allWords).forEach(([eng, ban]) => {
    if (eng.includes(wordLower) || wordLower.includes(eng)) {
      suggestions.push(`${eng} (${ban})`);
    }
  });

  return suggestions
    .sort((a, b) => {
      // Prioritize exact matches and starts-with matches
      const aMatch = a.toLowerCase().startsWith(wordLower);
      const bMatch = b.toLowerCase().startsWith(wordLower);
      if (aMatch && !bMatch) return -1;
      if (!aMatch && bMatch) return 1;
      return 0;
    })
    .slice(0, 5); // Return top 5 suggestions
}