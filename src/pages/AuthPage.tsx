import { Navigate } from 'react-router-dom';
import LoginForm from '../components/LoginForm/LoginForm';
import { useAppSelector } from '../store/storeHooks';

const AuthPage: React.FC = () => {
  const isAuthenticated = !!useAppSelector((state) => state.auth.accessToken);

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  return <LoginForm />;
};

export default AuthPage;
