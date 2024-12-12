export const SCRAPING_CONFIG = {
  BATCH_SIZE: 20,
  MIN_CONFIDENCE: 0.3,
  MAX_RETRIES: 3,
  RETRY_DELAY: 5000, // 5 seconds
};

export const WORD_PATTERNS = {
  CONSONANT_CLUSTERS: /(sh|ch|th|gh|kh|bh|dh|ph|rh)/g,
  VOWEL_PATTERNS: /(aa|ee|oo|ou|oi)/g,
  COMMON_ENDINGS: /(ta|ti|te|to|na|ni|ne|no|er|re)$/,
  MIN_WORD_LENGTH: 2,
};