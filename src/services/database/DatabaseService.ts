import { ScrapedWord } from '../facebook/types';

export class DatabaseService {
  private scrapedWords: Map<string, ScrapedWord> = new Map();
  private verifiedTranslations: Map<string, string> = new Map();

  async saveScrapedWords(words: ScrapedWord[]): Promise<void> {
    words.forEach(word => {
      this.scrapedWords.set(word.banglish, word);
    });
  }

  async getExistingBanglishWords(banglishWords: string[]): Promise<string[]> {
    return banglishWords.filter(word => 
      this.scrapedWords.has(word) || this.verifiedTranslations.has(word)
    );
  }

  async addVerifiedTranslation(banglish: string, bangla: string): Promise<void> {
    this.verifiedTranslations.set(banglish, bangla);
    // Remove from scraped words if it exists
    this.scrapedWords.delete(banglish);
  }

  async getPendingWords(): Promise<ScrapedWord[]> {
    return Array.from(this.scrapedWords.values())
      .filter(word => !word.bangla)
      .sort((a, b) => b.confidence - a.confidence);
  }
}