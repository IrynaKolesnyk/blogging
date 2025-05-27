import { useEffect, type ReactElement } from 'react';
import { useAppDispatch, useAppSelector } from '../store/storeHooks';
import Article from '../components/Article/Article';
import { fetchEnrichedArticles } from '../store/slices/articleListSlice';

const ArticlesPage = (): ReactElement => {
  const dispatch = useAppDispatch();
  const { enrichedArticles, loading, error } = useAppSelector(
    (state) => state.articleList,
  );
  const username = useAppSelector((state) => state.auth.username);

  useEffect(() => {
    dispatch(fetchEnrichedArticles());
  }, [dispatch]);

  return (
    <div>
      <h1>Articles Page</h1>
      {loading && <p>Loading articles...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {enrichedArticles.map((article) => (
        <Article
          key={article.articleId}
          {...article}
          imageUrl={article.imageUrl ?? ''}
          name={username || 'unknown author'}
        />
      ))}
    </div>
  );
};

export default ArticlesPage;
