export interface FacebookPost {
  id: string;
  message: string;
  created_time: string;
}

export interface ScrapedWord {
  banglish: string;
  bangla: string;
  source: string;
  confidence: number;
  postId: string;
  createdAt: string;
}

export interface FacebookConfig {
  pageId: string;
  accessToken: string;
  scrapeInterval: number; // in minutes
}