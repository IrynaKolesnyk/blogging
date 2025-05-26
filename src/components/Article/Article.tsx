import type { FC } from 'react';
import type { ArticleProps } from '../../shared/types';
import logo from '../../assets/logo.png';

import styles from './Article.module.scss';
import { Link } from 'react-router-dom';

type Props = ArticleProps & {
  imageUrl?: string;
};

const Article: FC<Props> = ({ title, perex, createdAt, imageUrl }) => {
  const formattedDate = new Date(createdAt).toLocaleDateString();

  return (
    <div className={styles.article}>
      <div className={styles.imageWrapper}>
        <img
          src={imageUrl || logo}
          alt="Article image"
          width="272"
          height="244"
          onError={(e) => (e.currentTarget.src = logo)}
        />
      </div>
      <div className={styles.contentWrapper}>
        <h2 className={styles.title}>{title || 'Untitled article'}</h2>
        <div className={styles.meta}>
          <p className={styles.author}>Elisabeth Strain</p>
          <span className={styles.separator}>•</span>
          <p className={styles.date}>{formattedDate}</p>
        </div>
        <p className={styles.description}>
          {perex || 'No description available.'}
        </p>
        <div className={styles.actions}>
          <Link to="/" className={styles.readMore}>
            Read whole article
          </Link>
          <p className={styles.commentCount}>4 comments</p>
        </div>
      </div>
    </div>
  );
};

export default Article;
