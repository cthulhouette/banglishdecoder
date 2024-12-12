// Common Banglish to Bengali word mappings
export const commonWords: Record<string, string> = {
  // Pronouns
  'ami': 'আমি',
  'tumi': 'তুমি',
  'apni': 'আপনি',
  'se': 'সে',
  'tini': 'তিনি',
  'amra': 'আমরা',
  'tomra': 'তোমরা',
  'tara': 'তারা',

  // Complex pronunciations
  'tome': 'তুমি',
  'kamon': 'কেমন',
  'keman': 'কেমন',
  'kaman': 'কেমন',
  'asan': 'আছেন',
  'aso': 'আছো',
  'aco': 'আছো',
  'asun': 'আসুন',
  'achhen': 'আছেন',
  'achen': 'আছেন',
  'kothay': 'কোথায়',
  'kothai': 'কোথায়',
  'ekhane': 'এখানে',
  'akhana': 'এখানে',
  'okhane': 'ওখানে',
  'khub': 'খুব',
  'khob': 'খুব',
  'kob': 'খুব',
  'khb': 'খুব',
  'kb': 'খুব',
  'beshi': 'বেশি',
  'base': 'বেশি',
  'beshi': 'বেশি',
  'shundor': 'সুন্দর',
  'sundor': 'সুন্দর',

  // Common phrases
  'bhalo': 'ভালো',
  'kharap': 'খারাপ',
  'bhalobasha': 'ভালোবাসা',
  'bhalobasha': 'ভালোবাসা',
  'dhonnobad': 'ধন্যবাদ',
  'donyobad': 'ধন্যবাদ',
};

// Phonetic patterns for more accurate conversion
export const phoneticPatterns: Array<[RegExp, string]> = [
  [/([^aeiou])h([^aeiou])/g, '$1্$2'], // Handle 'h' between consonants
  [/([^aeiou])y([^aeiou])/g, '$1্য$2'], // Handle 'y' between consonants
  [/aa/g, 'া'], // Long 'a' sound
  [/ee/g, 'ী'], // Long 'e' sound
  [/oo/g, 'ু'], // Long 'o' sound
];

// Special cases and exceptions
export const specialCases: Record<string, string> = {
  'ei': 'এই',
  'oi': 'ওই',
  'ki': 'কি',
  'ke': 'কে',
  'keno': 'কেন',
  'to': 'তো',
};