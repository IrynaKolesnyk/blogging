import { useEffect, type ReactElement } from 'react';
import { useAppDispatch, useAppSelector } from '../store/storeHooks';
import { fetchArticles } from '../store/slices/articleListSlice';
import Article from '../components/Article/Article';

const ArticlesPage = (): ReactElement => {
  const dispatch = useAppDispatch();
  const { articles, loading, error } = useAppSelector(
    (state) => state.articleList,
  );
  const imageMap = useAppSelector((state) => state.images.imageMap);

  useEffect(() => {
    dispatch(fetchArticles());
  }, [dispatch]);

  return (
    <div>
      <h1>Articles Page</h1>
      {loading && <p>Loading articles...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {articles.map((article) => {
        const imageUrl = imageMap[article.imageId];
        return (
          <Article key={article.articleId} {...article} imageUrl={imageUrl} />
        );
      })}
    </div>
  );
};

export default ArticlesPage;
