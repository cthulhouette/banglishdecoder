import { FacebookPost, FacebookConfig } from './types';

export class FacebookAPI {
  private config: FacebookConfig;

  constructor(config: FacebookConfig) {
    this.config = config;
  }

  async fetchPagePosts(limit: number = 10): Promise<FacebookPost[]> {
    try {
      const response = await fetch(
        `https://graph.facebook.com/v19.0/${this.config.pageId}/posts?` +
        `fields=message,created_time&limit=${limit}&access_token=${this.config.accessToken}`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch posts');
      }

      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error('Error fetching Facebook posts:', error);
      return [];
    }
  }
}