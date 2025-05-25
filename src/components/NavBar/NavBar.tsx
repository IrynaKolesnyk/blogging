import { useState, type ReactElement } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import logo from '../../assets/logo.png';
import type { RootState } from '../../store/store';
import { logout } from '../../store/authSlice';

import styles from './Navbar.module.scss';

const Navbar = (): ReactElement => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const accessToken = useSelector((state: RootState) => state.auth.accessToken);

  const isAuthenticated = Boolean(accessToken);

  const logOut = (): void => {
    dispatch(logout());
    navigate('/login');
  };

  const toggleDropdown = (): void => {
    setDropdownOpen((prev) => !prev);
  };

  const navLinkClass = ({ isActive }: { isActive: boolean }): string =>
    isActive ? `${styles.navLink} ${styles.activeNavLink}` : styles.navLink;

  return (
    <nav className={styles.navbar}>
      <div className={styles.navContent}>
        <div className={styles.left}>
          <NavLink to="/">
            <img src={logo} alt="Logo" width="39" height="44" />
          </NavLink>
          <NavLink to="/articles" className={navLinkClass}>
            Recent Articles
          </NavLink>
          <NavLink to="/about" className={navLinkClass}>
            About
          </NavLink>
        </div>

        <div className={styles.right}>
          {isAuthenticated ? (
            <>
              <NavLink to="/admin" className={navLinkClass}>
                My Articles
              </NavLink>
              <NavLink to="/create-article" className={navLinkClass}>
                Create Article
              </NavLink>
              <div className={styles.avatarContainer}>
                <button
                  className={`${styles.dropdownToggle} ${dropdownOpen ? styles.rotated : ''}`}
                  onClick={toggleDropdown}
                  aria-label="Toggle logout menu"
                >
                  ▼
                </button>
                <img src={logo} alt="Avatar" />
                {dropdownOpen && (
                  <div className={styles.dropdownMenu}>
                    <button onClick={logOut} className={styles.logoutButton}>
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <NavLink to="/login" className={styles.loginLink}>
              Log in
            </NavLink>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
