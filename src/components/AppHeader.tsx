import { Link } from "react-router-dom";
import { useState } from "react";
import Logo from "../img/AppHeaderImg/Vector.png";
import styles from "../module/AppHeader.module.css";
import { useAuth } from "../context/AuthContext";

export const AppHeader: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  const toggleMenu = (): void => {
    setMenuOpen((prev) => !prev);
  };

  const closeMenu = (): void => {
    setMenuOpen(false);
  };

  const { isAuth } = useAuth();

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.logoWrapper}>
            <Link to="/" className={styles.logoLink} onClick={closeMenu}>
              <img src={Logo} alt="MovieSPACE" className={styles.logoImage} />
              <span className={styles.logoText}>MovieSPACE</span>
            </Link>
          </div>

          <button
            className={`${styles.burger} ${menuOpen ? styles.active : ""}`}
            onClick={toggleMenu}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
          >
            <span />
            <span />
            <span />
          </button>

          <nav
            id="mobile-navigation"
            className={`${styles.navList} ${
              menuOpen ? styles.navListOpen : ""
            }`}
          >
            <Link to="/" className={styles.navLink} onClick={closeMenu}>
              AllFilms
            </Link>

            <Link
              to="/watchlists"
              className={styles.navLink}
              onClick={closeMenu}
            >
              Watchlists
            </Link>
            {isAuth}
            <Link
              to="/login"
              className={styles.loginButton}
              onClick={closeMenu}
            >
              Sigh in
            </Link>
            <Link
              to="/register"
              className={styles.loginButton}
              onClick={closeMenu}
            >
              Sign up
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};
