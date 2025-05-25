import { useEffect, type ReactElement } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import styles from './LoginForm.module.scss';
import { useAppDispatch, useAppSelector } from '../../store/storeHooks';
import { login } from '../../store/authSlice';
import { useNavigate } from 'react-router-dom';

const loginSchema = z.object({
  email: z.string().email('incorrect email'),
  password: z.string().min(6, 'Min 6 characters'),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

const LoginForm = (): ReactElement => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { isLoading, error, accessToken } = useAppSelector(
    (state) => state.auth,
  );

  useEffect(() => {
    if (accessToken) {
      navigate('/create-article');
    }
  }, [accessToken, navigate]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormInputs): Promise<void> => {
    dispatch(login({ username: data.email, password: data.password }));
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      {error && <div className={styles.serverError}>{error}</div>}
      <h2 className={styles.title}>Log In</h2>

      <div className={styles.field}>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          placeholder="you@example.com"
          {...register('email')}
          disabled={isLoading}
        />
        {errors.email && (
          <span className={styles.error}>{errors.email.message}</span>
        )}
      </div>

      <div className={styles.field}>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          placeholder="********"
          {...register('password')}
          disabled={isLoading}
        />
        {errors.password && (
          <span className={styles.error}>{errors.password.message}</span>
        )}
      </div>

      <div className={styles.buttonWrapper}>
        <button type="submit" disabled={isLoading}>
          {isSubmitting ? 'Logging in...' : 'Log In'}
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
