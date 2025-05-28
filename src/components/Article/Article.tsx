// Article.tsx
import type { FC } from 'react';
import { Link } from 'react-router-dom';
import type { ArticleResponse } from '../../shared/types';
import logo from '../../assets/logo.png';
import styles from './Article.module.scss';

type Props = ArticleResponse & {
  imageUrl?: string;
  name: string;
};

const Article: FC<Props> = ({
  title,
  createdAt,
  imageUrl,
  content,
  name,
  comments,
  articleId,
}) => {
  const formattedDate = new Date(createdAt).toLocaleDateString();

  return (
    <div className={styles.article} data-testid="article">
      <div className={styles.imageWrapper}>
        <img
          data-testid="article-image"
          src={imageUrl || logo}
          alt="Article image"
          onError={(e) => (e.currentTarget.src = logo)}
        />
      </div>
      <div className={styles.contentWrapper}>
        <h2 className={styles.title} data-testid="article-title">
          {title || 'Untitled article'}
        </h2>
        <div className={styles.meta}>
          <p className={styles.author} data-testid="article-author">
            {name}
          </p>
          <span className={styles.separator}>•</span>
          <p className={styles.date} data-testid="article-date">
            {formattedDate}
          </p>
        </div>
        <div
          className={styles.description}
          data-testid="article-description"
          dangerouslySetInnerHTML={{
            __html:
              content.slice(0, 300) + '…' || '<p>No description available.</p>',
          }}
        />
        <div className={styles.actions}>
          <Link
            to={`/articles/${articleId}`}
            className={styles.readMore}
            data-testid="article-link"
          >
            Read whole article
          </Link>
          <p className={styles.commentCount} data-testid="article-comments">
            {comments.length} comments
          </p>
        </div>
      </div>
    </div>
  );
};

export default Article;
