import { Routes, Route } from 'react-router-dom';
import ArticlesPage from '../pages/ArticlesPage';
import AuthPage from '../pages/AuthPage';
import Layout from '../components/Layout/Layout';

const NavigationRoutes = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        {/* Public */}
        <Route path="/" element={<ArticlesPage />} />
        <Route path="/login" element={<AuthPage />} />
      </Route>
    </Routes>
  );
};

export default NavigationRoutes;
