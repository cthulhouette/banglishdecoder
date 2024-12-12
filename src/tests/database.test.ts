import { describe, test, expect, beforeEach } from 'vitest';
import { DatabaseService } from '../services/database/DatabaseService';

describe('Database Service Tests', () => {
  let database: DatabaseService;
  
  beforeEach(() => {
    database = new DatabaseService();
  });

  test('saves and retrieves scraped words', async () => {
    const testWord = {
      banglish: 'kamon',
      bangla: 'কেমন',
      source: 'test',
      confidence: 0.8,
      postId: '123',
      createdAt: '2024-03-14T12:00:00Z'
    };

    await database.saveScrapedWords([testWord]);
    const existingWords = await database.getExistingBanglishWords(['kamon']);
    
    expect(existingWords).toContain('kamon');
  });

  test('handles duplicate submissions', async () => {
    const testWords = [
      {
        banglish: 'kamon',
        bangla: 'কেমন',
        source: 'test1',
        confidence: 0.8,
        postId: '123',
        createdAt: '2024-03-14T12:00:00Z'
      },
      {
        banglish: 'kamon',
        bangla: 'কেমন',
        source: 'test2',
        confidence: 0.9,
        postId: '124',
        createdAt: '2024-03-14T12:01:00Z'
      }
    ];

    await database.saveScrapedWords(testWords);
    const pendingWords = await database.getPendingWords();
    
    expect(pendingWords).toHaveLength(1);
  });
});