import type { FC } from 'react';
import { Link } from 'react-router-dom';
import type { ArticleResponse } from '../../shared/types';
import logo from '../../assets/logo.png';

import styles from './Article.module.scss';

type Props = ArticleResponse & {
  imageUrl?: string;
  name: string;
};

// improvement add sanitize-html to avoid XSS(<script>alert("hacked")</script>)
// dangerouslySetInnerHTML={{
//     __html: sanitizeHtml(content || '<p>No description available.</p>', {
//       allowedTags: ['b', 'i', 'em', 'strong', 'a', 'p', 'ul', 'ol', 'li', 'blockquote', 'code', 'pre', 'h1', 'h2', 'h3', 'br'],
//       allowedAttributes: {
//         a: ['href', 'target', 'rel'],
//       },
//       allowedSchemes: ['http', 'https', 'mailto'],
//     }),
//   }}

const Article: FC<Props> = (props) => {
  console.log('PROPS', props);
  const { title, createdAt, imageUrl, content, name, comments } = props;
  const formattedDate = new Date(createdAt).toLocaleDateString();

  return (
    <div className={styles.article}>
      <div className={styles.imageWrapper}>
        <img
          src={imageUrl || logo}
          alt="Article image"
          onError={(e) => (e.currentTarget.src = logo)}
        />
      </div>
      <div className={styles.contentWrapper}>
        <h2 className={styles.title}>{title || 'Untitled article'}</h2>
        <div className={styles.meta}>
          <p className={styles.author}>{name}</p>
          <span className={styles.separator}>•</span>
          <p className={styles.date}>{formattedDate}</p>
        </div>
        <div
          className={styles.description}
          dangerouslySetInnerHTML={{
            __html:
              content.slice(0, 300) + '…' || '<p>No description available.</p>',
          }}
        />
        <div className={styles.actions}>
          <Link to="/" className={styles.readMore}>
            Read whole article
          </Link>
          <p className={styles.commentCount}>{comments.length} comments</p>
        </div>
      </div>
    </div>
  );
};

export default Article;
