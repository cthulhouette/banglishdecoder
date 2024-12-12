import { WORD_PATTERNS } from './constants';
import { commonWords } from '../../data/dictionary';
import { basicLibrary } from '../../data/basicLibrary';

const knownWords = new Set([
  ...Object.keys(commonWords),
  ...Object.keys(basicLibrary)
]);

export function extractWords(text: string): string[] {
  return text.toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .split(/\s+/)
    .filter(word => word.length >= WORD_PATTERNS.MIN_WORD_LENGTH);
}

export function isValidBanglishCandidate(word: string): boolean {
  return (
    /^[a-z]+$/i.test(word) &&
    !knownWords.has(word) &&
    word.length >= WORD_PATTERNS.MIN_WORD_LENGTH
  );
}

export function calculateConfidence(word: string): number {
  let score = 0.3; // Base score
  
  const consonantMatches = (word.match(WORD_PATTERNS.CONSONANT_CLUSTERS) || []).length;
  score += consonantMatches * 0.15;

  const vowelMatches = (word.match(WORD_PATTERNS.VOWEL_PATTERNS) || []).length;
  score += vowelMatches * 0.1;

  if (WORD_PATTERNS.COMMON_ENDINGS.test(word)) {
    score += 0.15;
  }

  return Math.min(score, 1);
}