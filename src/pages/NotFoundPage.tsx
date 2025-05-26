import type { ReactElement } from 'react';
import notFoundImg from '../assets/imgNotFound.jpg';

const NotFoundPage = (): ReactElement => {
  return (
    <div
      style={{
        padding: '2rem',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <h1>404 — Page Not Found</h1>
      <img src={notFoundImg} alt="Article image" width="500" height="400" />
    </div>
  );
};

export default NotFoundPage;
