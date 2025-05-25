export interface ArticleData {
  title: string;
  content: string;
  imageId: string;
}

export interface Comment {
  commentId: string;
  articleId: string;
  author: string;
  content: string;
  postedAt: string;
  score: number;
}

export interface ArticleResponse {
  articleId: string;
  title: string;
  perex: string | null;
  content: string;
  imageId: string | null;
  createdAt: string;
  lastUpdatedAt: string;
  comments: Comment[];
}

export interface ArticleState {
  article: ArticleResponse | null;
  loading: boolean;
  error: string | null;
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
