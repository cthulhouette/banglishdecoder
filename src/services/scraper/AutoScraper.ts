import { FacebookAPI } from '../facebook/api';
import { WordProcessor } from './WordProcessor';
import { FacebookConfig, ScrapedWord } from '../facebook/types';
import { DatabaseService } from '../database/DatabaseService';
import { SCRAPING_CONFIG } from './constants';

export class AutoScraper {
  private facebookAPI: FacebookAPI;
  private wordProcessor: WordProcessor;
  private database: DatabaseService;
  private config: FacebookConfig;
  private isRunning: boolean = false;
  private intervalId?: NodeJS.Timeout;
  private retryCount: number = 0;

  constructor(config: FacebookConfig, database: DatabaseService) {
    this.config = config;
    this.facebookAPI = new FacebookAPI(config);
    this.wordProcessor = new WordProcessor();
    this.database = database;
  }

  start(): void {
    if (this.isRunning) return;
    
    this.isRunning = true;
    this.scheduleScraping();
    console.log('AutoScraper started');
  }

  stop(): void {
    if (!this.isRunning) return;
    
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
    this.isRunning = false;
    console.log('AutoScraper stopped');
  }

  private async scheduleScraping(): Promise<void> {
    await this.scrape(); // Initial scrape
    
    this.intervalId = setInterval(
      () => this.scrape(),
      this.config.scrapeInterval * 60 * 1000
    );
  }

  private async scrape(): Promise<void> {
    try {
      const posts = await this.facebookAPI.fetchPagePosts(SCRAPING_CONFIG.BATCH_SIZE);
      
      if (!posts.length && this.retryCount < SCRAPING_CONFIG.MAX_RETRIES) {
        this.retryCount++;
        setTimeout(() => this.scrape(), SCRAPING_CONFIG.RETRY_DELAY);
        return;
      }

      this.retryCount = 0; // Reset retry count on successful fetch
      const scrapedWords = this.wordProcessor.processPosts(posts);
      const newWords = await this.filterExistingWords(scrapedWords);
      
      if (newWords.length > 0) {
        await this.database.saveScrapedWords(newWords);
        console.log(`Scraped and saved ${newWords.length} new words`);
      }
    } catch (error) {
      console.error('Error during scraping:', error);
      if (this.retryCount < SCRAPING_CONFIG.MAX_RETRIES) {
        this.retryCount++;
        setTimeout(() => this.scrape(), SCRAPING_CONFIG.RETRY_DELAY);
      }
    }
  }

  private async filterExistingWords(words: ScrapedWord[]): Promise<ScrapedWord[]> {
    const existingWords = await this.database.getExistingBanglishWords(
      words.map(w => w.banglish)
    );
    const existingSet = new Set(existingWords);
    
    return words.filter(word => !existingSet.has(word.banglish));
  }
}