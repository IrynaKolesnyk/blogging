import type { ReactElement } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../NavBar/NavBar';

import styles from './Layout.module.scss';

const Layout = (): ReactElement => {
  return (
    <>
      <Navbar />
      <main className={styles.container}>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
