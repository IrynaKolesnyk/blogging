import type { EnrichedArticle } from './types';

export const mockArticle: EnrichedArticle = {
  articleId: '123',
  title: 'Title',
  content: '<p>This is a <strong>test</strong> content.</p>',
  createdAt: '2024-01-01T00:00:00Z',
  lastUpdatedAt: '2024-01-02T00:00:00Z',
  imageId: 'img123',
  imageUrl: 'http://imageurl.com/url',
  comments: [
    {
      commentId: 'c123',
      author: 'Test Author',
      content: 'Test comment1',
      postedAt: '2024-01-05T00:00:00Z',
      articleId: '123',
      score: 2,
    },
    {
      commentId: 'c1234',
      author: 'Test Author2',
      content: 'Test comment',
      postedAt: '2024-01-06T00:00:00Z',
      articleId: '123',
      score: 2,
    },
  ],
};
