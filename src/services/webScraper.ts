import { commonWords } from '../data/dictionary';

interface ScrapedWord {
  banglish: string;
  bangla: string;
  source: string;
  confidence: number;
}

export class WebScraper {
  private static instance: WebScraper;
  private scrapedWords: ScrapedWord[] = [];

  private constructor() {}

  static getInstance(): WebScraper {
    if (!WebScraper.instance) {
      WebScraper.instance = new WebScraper();
    }
    return WebScraper.instance;
  }

  async scrapeFacebook(url: string): Promise<ScrapedWord[]> {
    // Note: This is a mock implementation since we can't actually scrape Facebook
    // In a real implementation, this would use Facebook's Graph API or a web scraping library
    console.log('Scraping Facebook posts for Banglish words...');
    return this.scrapedWords;
  }

  async processPost(text: string): Promise<void> {
    // Process text to identify potential Banglish words
    const words = text.toLowerCase().split(/\s+/);
    
    words.forEach(word => {
      if (!commonWords[word] && this.isBanglishCandidate(word)) {
        this.scrapedWords.push({
          banglish: word,
          bangla: '', // To be filled by community verification
          source: 'facebook',
          confidence: this.calculateConfidence(word)
        });
      }
    });
  }

  private isBanglishCandidate(word: string): boolean {
    // Basic heuristic to identify potential Banglish words
    const banglishPattern = /^[a-z]+$/i;
    return banglishPattern.test(word) && word.length > 2;
  }

  private calculateConfidence(word: string): number {
    // Simple confidence score based on word characteristics
    let score = 0.5;
    if (word.includes('sh') || word.includes('ch') || word.includes('th')) score += 0.2;
    if (word.includes('aa') || word.includes('ee') || word.includes('oo')) score += 0.1;
    return Math.min(score, 1);
  }
}