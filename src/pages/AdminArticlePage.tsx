import { useEffect, type ReactElement } from 'react';
import { Link } from 'react-router-dom';
import styles from '../components/Admin/AdminTable.module.scss';
import { useAppDispatch, useAppSelector } from '../store/storeHooks';
import {
  deleteArticle,
  fetchEnrichedArticles,
} from '../store/slices/articleListSlice';
import AdminTable from '../components/Admin/AdminTable';

const AdminArticlePage = (): ReactElement => {
  const dispatch = useAppDispatch();
  const { enrichedArticles, loading, error } = useAppSelector(
    (state) => state.articleList,
  );
  const username = useAppSelector((state) => state.auth.username);

  useEffect(() => {
    dispatch(fetchEnrichedArticles());
  }, [dispatch]);

  const onEdit = (id: string): void => {
    console.log('onEdit', id);
  };

  const onDelete = async (id: string): Promise<void> => {
    try {
      await dispatch(deleteArticle(id)).unwrap();

      alert('Article successfully removed!');
    } catch (err) {
      console.error('Failed to remove article:', err);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h1 className={styles.title}>My articles</h1>
        <Link to="/create-article" className={styles.createBtn}>
          Create new article
        </Link>
      </div>

      {loading && <p>Loading articles...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <table className={styles.table}>
        <thead>
          <tr>
            <th>
              <input type="checkbox" />
            </th>
            <th>Article title</th>
            <th>Perex</th>
            <th>Author</th>
            <th># of comments</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {enrichedArticles.map((article) => (
            <AdminTable
              key={article.articleId}
              article={article}
              userName={username || 'unknown author'}
              onDelete={onDelete}
              onEdit={onEdit}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminArticlePage;
