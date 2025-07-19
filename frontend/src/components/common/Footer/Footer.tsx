import { Link, NavLink } from "react-router-dom";
import css from "./Footer.module.css";

export default function Footer() {
  return (
    <>
      <footer className={css.footer}>
        <div className={css.navWrapper}>
          <nav className={css.nav}>
            <NavLink to="/garden" className={css.navLink}>
              Garden
            </NavLink>
            <NavLink to="/candles" className={css.navLink}>
              Candles
            </NavLink>
            <NavLink to="/archives" className={css.navLink}>
              Archives
            </NavLink>
            <NavLink to="/gallery" className={css.navLink}>
              Gallery
            </NavLink>
            <NavLink to="/donate" className={css.navLink}>
              Donate
            </NavLink>
            <NavLink to="/about" className={css.navLink}>
              About us
            </NavLink>
          </nav>
          <div className={css.socialsWrapper}>
            <a href="#" target="_blank">
              <img
                className={css.socialIcon}
                src="/social-instagram.png"
                alt="Instagram"
              />
            </a>
            <a href="#" target="_blank">
              <img
                className={css.socialIcon}
                src="/social-facebook.png"
                alt="Facebook"
              />
            </a>
            <a href="#" target="_blank">
              <img
                className={css.socialIcon}
                src="/social-telegram.png"
                alt="Telegram"
              />
            </a>
            <a href="#" target="_blank">
              <img
                className={css.socialIcon}
                src="/social-email.png"
                alt="Email"
              />
            </a>
          </div>
        </div>
        <Link to="/">
          <img src="/logo-blue.png" alt="Logo" className={css.logo} />
        </Link>
        <div className={css.rightsWrapper}>
          <p className={css.rightsText}>© THE.DIGITAL.MEMORY.GARDEN</p>
          <p className={css.rightsText}>All rights reserved</p>
        </div>
      </footer>
    </>
  );
}
