export interface Comment {
  commentId: string;
  articleId: string;
  author: string;
  content: string;
  postedAt: string;
  score: number;
}

export interface ArticleData {
  title: string;
  content: string;
  imageId: string;
}

export interface ArticleProps {
  articleId: string;
  title: string;
  perex?: string | null;
  imageId?: string | null;
  createdAt: string;
  lastUpdatedAt: string;
}

export interface ArticleResponse {
  articleId: string;
  title: string;
  perex?: string | null;
  content: string;
  imageId?: string | null;
  createdAt: string;
  lastUpdatedAt: string;
  comments: Comment[];
}

export interface ArticleListResponse {
  pagination: Pagination;
  items: ArticleProps[];
}

export interface ArticleDetail extends ArticleProps {
  content: string;
  comments: Comment[];
}

export interface EnrichedArticle extends ArticleDetail {
  imageUrl: string | null;
}

export interface ArticleState {
  article: ArticleResponse | null;
  loading: boolean;
  error: string | null;
}

export interface ArticlesState {
  articles: ArticleProps[];
  loading: boolean;
  error: string | null;
  enrichedArticles: EnrichedArticle[];
}

export interface ImageData {
  imageId: string;
  name: string;
}

export interface ImageState {
  images: ImageData[];
  loading: boolean;
  error: string | null;
}

export interface Pagination {
  offset: number;
  limit: number;
  total: number;
}

export interface AuthState {
  accessToken: string | null;
  username: string | null;
  isLoading: boolean;
  error: string | null;
}
