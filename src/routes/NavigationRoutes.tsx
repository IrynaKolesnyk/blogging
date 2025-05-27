import type { ReactElement } from 'react';
import { Routes, Route } from 'react-router-dom';
import ArticlesPage from '../pages/ArticlesPage';
import AuthPage from '../pages/AuthPage';
import Layout from '../components/Layout/Layout';
import CreateArticlePage from '../pages/CreateArticlePage';
import ProtectedRoute from './ProtectedRoute';
import NotFoundPage from '../pages/NotFoundPage';
import AdminArticlePage from '../pages/AdminArticlePage';
import ArticleDetailPage from '../pages/ArticleDetailPage';

const NavigationRoutes = (): ReactElement => {
  return (
    <Routes>
      <Route element={<Layout />}>
        {/* Public */}
        <Route path="/" element={<ArticlesPage />} />
        <Route path="/login" element={<AuthPage />} />
        <Route path="/articles/:articleId" element={<ArticleDetailPage />} />

        {/* Protected */}
        <Route element={<ProtectedRoute />}>
          <Route path="/create-article" element={<CreateArticlePage />} />
          <Route path="/admin" element={<AdminArticlePage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};

export default NavigationRoutes;
