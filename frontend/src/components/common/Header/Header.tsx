import { NavLink, useLocation } from "react-router-dom";
import css from "./Header.module.css";
import LanguageSwitch from "../LanguageSwitch/LanguageSwitch";
import clsx from "clsx";

export default function Header() {
  const currentRoute = useLocation().pathname;

  const linkClass = () => {
    if (currentRoute == "/candles" || currentRoute == "/about") {
      return clsx(css.link, css.lightLink);
    } else {
      return clsx(css.link);
    }
  };
  return (
    <>
      <header className={css.header}>
        <img src="/logo-blue.png" alt="Logo" className={css.logo} />
        <nav className={css.nav}>
          <NavLink className={linkClass} to="/garden">
            Garden
          </NavLink>
          <NavLink className={linkClass} to="/candles">
            Candles
          </NavLink>
          <NavLink className={linkClass} to="/archives">
            Archives
          </NavLink>
          <NavLink className={linkClass} to="/gallery">
            Gallery
          </NavLink>
          <NavLink className={linkClass} to="/donate">
            Donate
          </NavLink>
          <NavLink className={linkClass} to="/about">
            About us
          </NavLink>
        </nav>
        <LanguageSwitch />
      </header>
    </>
  );
}
