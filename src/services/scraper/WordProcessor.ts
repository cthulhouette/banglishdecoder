import { ScrapedWord } from '../facebook/types';
import { extractWords, isValidBanglishCandidate, calculateConfidence } from './utils';

export class WordProcessor {
  processPosts(posts: { message: string; id: string; created_time: string }[]): ScrapedWord[] {
    const scrapedWords: ScrapedWord[] = [];

    posts.forEach(post => {
      const words = extractWords(post.message);
      
      words.forEach(word => {
        if (isValidBanglishCandidate(word)) {
          scrapedWords.push({
            banglish: word,
            bangla: '',
            source: `facebook_post_${post.id}`,
            confidence: calculateConfidence(word),
            postId: post.id,
            createdAt: post.created_time
          });
        }
      });
    });

    return this.removeDuplicates(scrapedWords);
  }

  private removeDuplicates(words: ScrapedWord[]): ScrapedWord[] {
    const seen = new Set<string>();
    return words.filter(word => {
      if (seen.has(word.banglish)) {
        return false;
      }
      seen.add(word.banglish);
      return true;
    });
  }
}