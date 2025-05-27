import type { FC } from 'react';
import type { EnrichedArticle } from '../../shared/types';
import defaultImg from '../../assets/logo.png';

import styles from './ArticleDetails.module.scss';

type Props = {
  article: EnrichedArticle;
  userName: string;
};

const ArticleDetail: FC<Props> = ({ article, userName }) => {
  const { title, createdAt, content, comments, imageUrl } = article;
  const formattedDate = new Date(createdAt).toLocaleDateString();

  return (
    <div className={styles.wrapper}>
      <div className={styles.main}>
        <h1 className={styles.title}>{title}</h1>
        <div className={styles.meta}>
          <span className={styles.author}>{userName}</span>
          <span className={styles.separator}>•</span>
          <span className={styles.date}>{formattedDate}</span>
        </div>
        {imageUrl && (
          <div className={styles.imageWrapper}>
            <img
              src={imageUrl}
              alt="Article image"
              onError={(e) => (e.currentTarget.src = defaultImg)}
            />
          </div>
        )}
        <div
          className={styles.content}
          dangerouslySetInnerHTML={{ __html: content }}
        />
        <div className={styles.commentsBlock}>
          <h3 className={styles.commentsTitle}>Comments ({comments.length})</h3>
          {comments.map((comment) => (
            <div key={comment.commentId} className={styles.comment}>
              <div className={styles.commentHeader}>
                <span className={styles.commentAuthor}>{comment.author}</span>
                <span className={styles.commentDate}>
                  {new Date(comment.postedAt).toLocaleDateString()}
                </span>
              </div>
              <p className={styles.commentContent}>{comment.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArticleDetail;
