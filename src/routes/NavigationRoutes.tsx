import type { ReactElement } from 'react';
import { Routes, Route } from 'react-router-dom';
import ArticlesPage from '../pages/ArticlesPage';
import AuthPage from '../pages/AuthPage';
import Layout from '../components/Layout/Layout';
import CreateArticlePage from '../pages/CreateArticlePage';
import ProtectedRoute from './ProtectedRoute';

const NavigationRoutes = (): ReactElement => {
  return (
    <Routes>
      <Route element={<Layout />}>
        {/* Public */}
        <Route path="/" element={<ArticlesPage />} />
        <Route path="/login" element={<AuthPage />} />

        {/* Protected */}
        <Route element={<ProtectedRoute />}>
          <Route path="/create-article" element={<CreateArticlePage />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default NavigationRoutes;
