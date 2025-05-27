import type { FC, ReactElement } from 'react';
import styles from './RelatedArticles.module.scss';
import type { ArticleProps } from '../../shared/types';
import { Link } from 'react-router-dom';

type Props = { articles: ArticleProps[] };

const RelatedArticles: FC<Props> = ({ articles }): ReactElement => {
  return (
    <aside className={styles.sidebar}>
      <h4 className={styles.relatedTitle}>Related articles</h4>
      <ul className={styles.relatedList}>
        {articles.map((article) => (
          <li>
            <Link to={`/articles/${article.articleId}`}>{article.title}</Link>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default RelatedArticles;
