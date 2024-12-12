import { AutoScraper } from './scraper/AutoScraper';
import { DatabaseService } from './database/DatabaseService';
import { facebookConfig } from '../config/facebook';

// Initialize services
const database = new DatabaseService();
const autoScraper = new AutoScraper(facebookConfig, database);

// Export initialized instances
export { database, autoScraper };