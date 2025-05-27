import { useEffect, type ReactElement } from 'react';
import { useAppDispatch, useAppSelector } from '../store/storeHooks';
import ArticleDetail from '../components/ArticleDetails/ArticleDetails';
import { useParams } from 'react-router-dom';
import { fetchEnrichedArticles } from '../store/slices/articleListSlice';
import RelatedArticles from '../components/RelatedArticles/RelatedArticles';

const ArticleDetailPage = (): ReactElement => {
  const { articleId } = useParams<{ articleId: string }>();
  const dispatch = useAppDispatch();
  const username = useAppSelector((state) => state.auth.username);
  const { enrichedArticles, loading, error } = useAppSelector(
    (state) => state.articleList,
  );
  useEffect(() => {
    dispatch(fetchEnrichedArticles());
  }, [dispatch]);

  const articleDetail = enrichedArticles.find(
    (element) => element.articleId === articleId,
  );

  if (loading) return <p>Loading article...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!articleDetail) return <p>Article not found.</p>;
  return (
    <div style={{ display: 'flex' }}>
      <ArticleDetail
        userName={username || 'unknown author'}
        article={articleDetail}
      />
      <RelatedArticles articles={enrichedArticles} />
    </div>
  );
};

export default ArticleDetailPage;
